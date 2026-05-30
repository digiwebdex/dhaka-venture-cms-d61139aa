require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { pool } = require('./db');

const app = express();
const PORT = Number(process.env.PORT || 3101);
const HOST = process.env.HOST || '0.0.0.0';
const SERVICE_NAME = process.env.SERVICE_NAME || 'primeskyint-api';
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
const PUBLIC_UPLOAD_URL = process.env.PUBLIC_UPLOAD_URL || process.env.PUBLIC_URL || '';
const JWT_SECRET = process.env.JWT_SECRET || process.env.ADMIN_TOKEN || '';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || '';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';
const corsOrigins = (process.env.CORS_ORIGIN || 'https://primeskyint.com,https://www.primeskyint.com')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || corsOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '30d', immutable: true }));

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });
const writeLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false });
const publicFormLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false });

function sendError(res, status, message) {
  return res.status(status).json({ error: message });
}

function signToken(user) {
  return jwt.sign(
    { sub: String(user.id || user.username), username: user.username || user.email || ADMIN_USER, role: user.role || 'admin' },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '12h' }
  );
}

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const legacyToken = req.headers['x-admin-token'];
  const token = bearer || legacyToken;
  if (!JWT_SECRET || !token) return sendError(res, 401, 'Unauthorized');
  if (!bearer && process.env.ADMIN_TOKEN && legacyToken === process.env.ADMIN_TOKEN) {
    req.user = { username: ADMIN_USER, role: 'admin' };
    return next();
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (_e) {
    return sendError(res, 401, 'Unauthorized');
  }
}

async function audit(req, action, entityType, entityId, metadata = {}) {
  try {
    await pool.query(
      'INSERT INTO audit_logs (action, entity_type, entity_id, metadata, ip_address) VALUES ($1,$2,$3,$4,$5)',
      [action, entityType, entityId ? String(entityId) : null, metadata, req.ip]
    );
  } catch (_e) {
    // Audit logging must not break production requests.
  }
}

async function verifyAdminPassword(password) {
  if (ADMIN_PASSWORD_HASH) return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (ADMIN_PASS) return password === ADMIN_PASS;
  return false;
}

app.get('/api/health', async (_req, res) => {
  let database = 'disconnected';
  try {
    await pool.query('SELECT 1');
    database = 'connected';
  } catch (_e) {}
  res.json({
    status: database === 'connected' ? 'ok' : 'degraded',
    database,
    service: SERVICE_NAME,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
  });
});

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body || {};
  if (!JWT_SECRET) return sendError(res, 500, 'Server authentication is not configured');
  if (username === ADMIN_USER && await verifyAdminPassword(String(password || ''))) {
    const token = signToken({ id: username, username, role: 'admin' });
    return res.json({ token, user: { username, role: 'admin' } });
  }
  return sendError(res, 401, 'Invalid credentials');
});

app.post('/api/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && await verifyAdminPassword(String(password || ''))) {
    return res.json({ token: signToken({ id: username, username, role: 'admin' }) });
  }
  return sendError(res, 401, 'Invalid credentials');
});

app.post('/api/auth/logout', (_req, res) => res.json({ ok: true }));
app.get('/api/auth/me', requireAdmin, (req, res) => res.json({ user: req.user }));

function mapRow(row) {
  if (!row) return null;
  return { ...row.data, id: row.id, slug: row.slug, title: row.title, name: row.name, status: row.status, sortOrder: row.sort_order, createdAt: row.created_at, updatedAt: row.updated_at };
}

function crudJson({ table, route, idColumn = 'id', publicList = true, hasSlug = false, titleField = 'title' }) {
  const base = `/api/${route}`;
  if (publicList) {
    app.get(base, async (_req, res) => {
      try {
        const q = await pool.query(`SELECT * FROM ${table} ORDER BY created_at DESC`);
        res.json(q.rows.map(mapRow));
      } catch (_e) { sendError(res, 500, 'Failed to load data'); }
    });
  } else {
    app.get(base, requireAdmin, async (_req, res) => {
      try {
        const q = await pool.query(`SELECT * FROM ${table} ORDER BY created_at DESC`);
        res.json(q.rows.map(mapRow));
      } catch (_e) { sendError(res, 500, 'Failed to load data'); }
    });
  }

  app.get(`${base}/:id`, async (req, res) => {
    try {
      const field = hasSlug && !/^[0-9a-f-]{32,36}$/i.test(req.params.id) ? 'slug' : idColumn;
      const q = await pool.query(`SELECT * FROM ${table} WHERE ${field}=$1`, [req.params.id]);
      if (!q.rows[0]) return sendError(res, 404, 'Not found');
      res.json(mapRow(q.rows[0]));
    } catch (_e) { sendError(res, 500, 'Failed to load data'); }
  });

  app.post(base, requireAdmin, writeLimiter, async (req, res) => {
    try {
      const body = req.body || {};
      const title = body[titleField] || body.title || body.name || 'Untitled';
      const slug = body.slug || String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const data = { ...body };
      delete data.id;
      delete data.slug;
      delete data.title;
      delete data.name;
      delete data.status;
      delete data.sortOrder;
      const columns = table === 'categories'
        ? ['slug', 'name', 'type', 'data', 'sort_order']
        : table === 'testimonials' || table === 'team_members' || table === 'reviews'
          ? ['name', 'data', 'sort_order']
          : ['slug', 'title', 'data', 'sort_order'];
      const values = table === 'categories'
        ? [slug, body.name || title, body.type || 'general', data, body.sortOrder || 0]
        : table === 'testimonials' || table === 'team_members' || table === 'reviews'
          ? [body.name || title, data, body.sortOrder || 0]
          : [slug, title, data, body.sortOrder || 0];
      const placeholders = columns.map((_, i) => `$${i + 1}`).join(',');
      const q = await pool.query(`INSERT INTO ${table} (${columns.join(',')}) VALUES (${placeholders}) RETURNING *`, values);
      await audit(req, 'create', table, q.rows[0][idColumn], {});
      res.status(201).json(mapRow(q.rows[0]));
    } catch (_e) { sendError(res, 500, 'Failed to save data'); }
  });

  app.put(`${base}/:id`, requireAdmin, writeLimiter, async (req, res) => {
    try {
      const body = req.body || {};
      const data = { ...body };
      delete data.id;
      delete data.slug;
      delete data.title;
      delete data.name;
      delete data.status;
      delete data.sortOrder;
      const q = await pool.query(`UPDATE ${table} SET data=$2, updated_at=now() WHERE ${idColumn}=$1 RETURNING *`, [req.params.id, data]);
      if (!q.rows[0]) return sendError(res, 404, 'Not found');
      await audit(req, 'update', table, req.params.id, {});
      res.json(mapRow(q.rows[0]));
    } catch (_e) { sendError(res, 500, 'Failed to update data'); }
  });

  app.delete(`${base}/:id`, requireAdmin, writeLimiter, async (req, res) => {
    try {
      await pool.query(`DELETE FROM ${table} WHERE ${idColumn}=$1`, [req.params.id]);
      await audit(req, 'delete', table, req.params.id, {});
      res.json({ ok: true });
    } catch (_e) { sendError(res, 500, 'Failed to delete data'); }
  });
}

app.get('/api/settings', async (_req, res) => {
  try {
    const q = await pool.query('SELECT key, value FROM settings');
    res.json(Object.fromEntries(q.rows.map((r) => [r.key, r.value])));
  } catch (_e) { sendError(res, 500, 'Failed to load settings'); }
});

app.put('/api/settings', requireAdmin, writeLimiter, async (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body || {})) {
      await pool.query('INSERT INTO settings (key, value) VALUES ($1,$2::jsonb) ON CONFLICT (key) DO UPDATE SET value=$2::jsonb, updated_at=now()', [key, JSON.stringify(value)]);
    }
    await audit(req, 'update', 'settings', 'settings', {});
    res.json({ ok: true });
  } catch (_e) { sendError(res, 500, 'Failed to save settings'); }
});

app.get('/api/homepage-content', async (_req, res) => {
  try {
    const q = await pool.query('SELECT key, value FROM homepage_content');
    res.json(Object.fromEntries(q.rows.map((r) => [r.key, r.value])));
  } catch (_e) { sendError(res, 500, 'Failed to load homepage content'); }
});

app.put('/api/homepage-content', requireAdmin, writeLimiter, async (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body || {})) {
      await pool.query('INSERT INTO homepage_content (key, value) VALUES ($1,$2::jsonb) ON CONFLICT (key) DO UPDATE SET value=$2::jsonb, updated_at=now()', [key, JSON.stringify(value)]);
    }
    await audit(req, 'update', 'homepage_content', 'homepage_content', {});
    res.json({ ok: true });
  } catch (_e) { sendError(res, 500, 'Failed to save homepage content'); }
});

// Backward-compatible current routes.
app.get('/api/cms/:key', async (req, res) => {
  try {
    const q = await pool.query('SELECT value FROM cms_data WHERE key=$1', [req.params.key]);
    res.json(q.rows[0] ? q.rows[0].value : null);
  } catch (_e) { sendError(res, 500, 'Failed to load CMS data'); }
});

app.put('/api/cms/:key', requireAdmin, writeLimiter, async (req, res) => {
  try {
    await pool.query('INSERT INTO cms_data (key, value) VALUES ($1,$2::jsonb) ON CONFLICT (key) DO UPDATE SET value=$2::jsonb, updated_at=now()', [req.params.key, JSON.stringify(req.body)]);
    await audit(req, 'update', 'cms_data', req.params.key, {});
    res.json({ ok: true });
  } catch (_e) { sendError(res, 500, 'Failed to save CMS data'); }
});

app.get('/api/packages', async (req, res) => {
  try {
    const { category } = req.query;
    const q = category
      ? await pool.query('SELECT id, category, data, sort_order FROM packages WHERE category=$1 ORDER BY sort_order, created_at', [category])
      : await pool.query('SELECT id, category, data, sort_order FROM packages ORDER BY sort_order, created_at');
    res.json(q.rows.map((r) => ({ id: r.id, category: r.category, sortOrder: r.sort_order, ...r.data })));
  } catch (_e) { sendError(res, 500, 'Failed to load packages'); }
});

app.get('/api/packages/:id', async (req, res) => {
  try {
    const q = await pool.query('SELECT id, category, data, sort_order FROM packages WHERE id=$1', [req.params.id]);
    if (!q.rows[0]) return sendError(res, 404, 'Not found');
    const r = q.rows[0];
    res.json({ id: r.id, category: r.category, sortOrder: r.sort_order, ...r.data });
  } catch (_e) { sendError(res, 500, 'Failed to load package'); }
});

app.post('/api/packages', requireAdmin, writeLimiter, async (req, res) => {
  try {
    const { id, category = 'tour', sortOrder = 0, ...data } = req.body;
    const pid = id || `pkg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    await pool.query('INSERT INTO packages (id, category, data, sort_order) VALUES ($1,$2,$3,$4) ON CONFLICT (id) DO UPDATE SET category=$2, data=$3, sort_order=$4, updated_at=now()', [pid, category, data, sortOrder]);
    await audit(req, 'upsert', 'packages', pid, {});
    res.json({ id: pid, category, sortOrder, ...data });
  } catch (_e) { sendError(res, 500, 'Failed to save package'); }
});

app.put('/api/packages/:id', requireAdmin, writeLimiter, async (req, res) => {
  try {
    const { category = 'tour', sortOrder = 0, ...data } = req.body;
    const q = await pool.query('UPDATE packages SET category=$2, data=$3, sort_order=$4, updated_at=now() WHERE id=$1 RETURNING id', [req.params.id, category, data, sortOrder]);
    if (!q.rows[0]) return sendError(res, 404, 'Not found');
    await audit(req, 'update', 'packages', req.params.id, {});
    res.json({ id: req.params.id, category, sortOrder, ...data });
  } catch (_e) { sendError(res, 500, 'Failed to update package'); }
});

app.delete('/api/packages/:id', requireAdmin, writeLimiter, async (req, res) => {
  try {
    await pool.query('DELETE FROM packages WHERE id=$1', [req.params.id]);
    await audit(req, 'delete', 'packages', req.params.id, {});
    res.json({ ok: true });
  } catch (_e) { sendError(res, 500, 'Failed to delete package'); }
});

app.get('/api/bookings', requireAdmin, async (_req, res) => {
  try {
    const q = await pool.query('SELECT id, data, status, created_at, updated_at FROM bookings ORDER BY created_at DESC');
    res.json(q.rows.map((r) => ({ id: r.id, status: r.status, createdAt: r.created_at, updatedAt: r.updated_at, ...r.data })));
  } catch (_e) { sendError(res, 500, 'Failed to load bookings'); }
});

app.post('/api/bookings', publicFormLimiter, async (req, res) => {
  try {
    const data = req.body || {};
    const q = await pool.query('INSERT INTO bookings (data) VALUES ($1) RETURNING id, created_at', [data]);
    res.status(201).json({ id: q.rows[0].id, createdAt: q.rows[0].created_at, ...data });
  } catch (_e) { sendError(res, 500, 'Failed to create booking'); }
});

app.put('/api/bookings/:id', requireAdmin, writeLimiter, async (req, res) => {
  try {
    const { status = 'new', ...data } = req.body || {};
    await pool.query('UPDATE bookings SET status=$1, data=data || $2::jsonb, updated_at=now() WHERE id=$3', [status, JSON.stringify(data), req.params.id]);
    await audit(req, 'update', 'bookings', req.params.id, {});
    res.json({ ok: true });
  } catch (_e) { sendError(res, 500, 'Failed to update booking'); }
});

app.patch('/api/bookings/:id', requireAdmin, writeLimiter, async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query('UPDATE bookings SET status=$1, updated_at=now() WHERE id=$2', [status, req.params.id]);
    await audit(req, 'update', 'bookings', req.params.id, { status });
    res.json({ ok: true });
  } catch (_e) { sendError(res, 500, 'Failed to update booking'); }
});

app.delete('/api/bookings/:id', requireAdmin, writeLimiter, async (req, res) => {
  try {
    await pool.query('DELETE FROM bookings WHERE id=$1', [req.params.id]);
    await audit(req, 'delete', 'bookings', req.params.id, {});
    res.json({ ok: true });
  } catch (_e) { sendError(res, 500, 'Failed to delete booking'); }
});

app.get('/api/inquiries', requireAdmin, async (_req, res) => {
  try {
    const q = await pool.query('SELECT id, data, status, created_at, updated_at FROM inquiries ORDER BY created_at DESC');
    res.json(q.rows.map((r) => ({ id: r.id, status: r.status, createdAt: r.created_at, updatedAt: r.updated_at, ...r.data })));
  } catch (_e) { sendError(res, 500, 'Failed to load inquiries'); }
});

app.post('/api/inquiries', publicFormLimiter, async (req, res) => {
  try {
    const data = req.body || {};
    const q = await pool.query('INSERT INTO inquiries (data) VALUES ($1) RETURNING id, created_at', [data]);
    res.status(201).json({ id: q.rows[0].id, createdAt: q.rows[0].created_at, ...data });
  } catch (_e) { sendError(res, 500, 'Failed to create inquiry'); }
});

app.put('/api/inquiries/:id', requireAdmin, writeLimiter, async (req, res) => {
  try {
    const { status = 'new', ...data } = req.body || {};
    await pool.query('UPDATE inquiries SET status=$1, data=data || $2::jsonb, updated_at=now() WHERE id=$3', [status, JSON.stringify(data), req.params.id]);
    await audit(req, 'update', 'inquiries', req.params.id, {});
    res.json({ ok: true });
  } catch (_e) { sendError(res, 500, 'Failed to update inquiry'); }
});

app.delete('/api/inquiries/:id', requireAdmin, writeLimiter, async (req, res) => {
  try {
    await pool.query('DELETE FROM inquiries WHERE id=$1', [req.params.id]);
    await audit(req, 'delete', 'inquiries', req.params.id, {});
    res.json({ ok: true });
  } catch (_e) { sendError(res, 500, 'Failed to delete inquiry'); }
});

crudJson({ table: 'pages', route: 'pages', hasSlug: true });
crudJson({ table: 'services', route: 'services', hasSlug: true });
crudJson({ table: 'visa_services', route: 'visa-services', hasSlug: true });
crudJson({ table: 'categories', route: 'categories', hasSlug: true, titleField: 'name' });
crudJson({ table: 'blogs', route: 'blogs', hasSlug: true });
crudJson({ table: 'testimonials', route: 'testimonials', titleField: 'name' });
crudJson({ table: 'team_members', route: 'team', titleField: 'name' });
crudJson({ table: 'offers', route: 'offers', hasSlug: true });
crudJson({ table: 'reviews', route: 'reviews', titleField: 'name' });

app.get('/api/seo', async (_req, res) => {
  try {
    const q = await pool.query('SELECT page_slug, data FROM seo ORDER BY page_slug');
    res.json(q.rows.map((r) => ({ pageSlug: r.page_slug, ...r.data })));
  } catch (_e) { sendError(res, 500, 'Failed to load SEO data'); }
});

app.put('/api/seo/:pageSlug', requireAdmin, writeLimiter, async (req, res) => {
  try {
    await pool.query('INSERT INTO seo (page_slug, data) VALUES ($1,$2::jsonb) ON CONFLICT (page_slug) DO UPDATE SET data=$2::jsonb, updated_at=now()', [req.params.pageSlug, JSON.stringify(req.body || {})]);
    await audit(req, 'update', 'seo', req.params.pageSlug, {});
    res.json({ ok: true });
  } catch (_e) { sendError(res, 500, 'Failed to save SEO data'); }
});

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safe = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, safe);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('File type not allowed'));
  },
});

app.post('/api/upload', requireAdmin, writeLimiter, upload.single('file'), async (req, res) => {
  if (!req.file) return sendError(res, 400, 'No file');
  const url = `${PUBLIC_UPLOAD_URL.replace(/\/$/, '')}/${req.file.filename}`;
  try {
    await pool.query('INSERT INTO uploaded_files (filename, original_name, mime_type, size_bytes, url) VALUES ($1,$2,$3,$4,$5)', [req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, url]);
  } catch (_e) {}
  res.json({ url, filename: req.file.filename, size: req.file.size });
});

app.get('/api/dashboard/stats', requireAdmin, async (_req, res) => {
  try {
    const tables = ['packages', 'bookings', 'inquiries', 'pages', 'services', 'blogs', 'uploaded_files'];
    const stats = {};
    for (const table of tables) {
      const q = await pool.query(`SELECT count(*)::int AS count FROM ${table}`);
      stats[table] = q.rows[0].count;
    }
    res.json(stats);
  } catch (_e) { sendError(res, 500, 'Failed to load dashboard stats'); }
});

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) return sendError(res, 400, err.message);
  return sendError(res, 400, err.message || 'Bad request');
});

app.listen(PORT, HOST, () => {
  console.log(`${SERVICE_NAME} running on http://${HOST}:${PORT}`);
});
