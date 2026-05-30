require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { pool } = require('./db');

const app = express();
const PORT = Number(process.env.PORT || 3101);
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
const PUBLIC_URL = process.env.PUBLIC_URL || '';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || '';

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '30d' }));

// --- Auth middleware (only for write ops) ---
function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// --- Health ---
app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// --- Admin login: exchange username/password for the admin token ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!ADMIN_PASS || !ADMIN_TOKEN) {
    return res.status(500).json({ error: 'Server not configured (ADMIN_PASS / ADMIN_TOKEN missing)' });
  }
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ token: ADMIN_TOKEN });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// =========================================================
// PACKAGES (full CRUD with category filter)
// =========================================================
app.get('/api/packages', async (req, res) => {
  try {
    const { category } = req.query;
    const q = category
      ? await pool.query('SELECT id, category, data, sort_order FROM packages WHERE category=$1 ORDER BY sort_order, created_at', [category])
      : await pool.query('SELECT id, category, data, sort_order FROM packages ORDER BY sort_order, created_at');
    res.json(q.rows.map(r => ({ id: r.id, category: r.category, sortOrder: r.sort_order, ...r.data })));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/packages/:id', async (req, res) => {
  try {
    const q = await pool.query('SELECT id, category, data, sort_order FROM packages WHERE id=$1', [req.params.id]);
    if (!q.rows[0]) return res.status(404).json({ error: 'Not found' });
    const r = q.rows[0];
    res.json({ id: r.id, category: r.category, sortOrder: r.sort_order, ...r.data });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/packages', requireAdmin, async (req, res) => {
  try {
    const { id, category = 'tour', sortOrder = 0, ...data } = req.body;
    const pid = id || `pkg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    await pool.query(
      `INSERT INTO packages (id, category, data, sort_order) VALUES ($1,$2,$3,$4)
       ON CONFLICT (id) DO UPDATE SET category=$2, data=$3, sort_order=$4, updated_at=now()`,
      [pid, category, data, sortOrder]
    );
    res.json({ id: pid, category, sortOrder, ...data });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/packages/:id', requireAdmin, async (req, res) => {
  try {
    const { category = 'tour', sortOrder = 0, ...data } = req.body;
    const q = await pool.query(
      `UPDATE packages SET category=$2, data=$3, sort_order=$4, updated_at=now() WHERE id=$1 RETURNING id`,
      [req.params.id, category, data, sortOrder]
    );
    if (!q.rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json({ id: req.params.id, category, sortOrder, ...data });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/packages/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM packages WHERE id=$1', [req.params.id]);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// =========================================================
// BOOKINGS
// =========================================================
app.get('/api/bookings', requireAdmin, async (_req, res) => {
  try {
    const q = await pool.query('SELECT id, data, status, created_at FROM bookings ORDER BY created_at DESC');
    res.json(q.rows.map(r => ({ id: r.id, status: r.status, createdAt: r.created_at, ...r.data })));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const data = req.body || {};
    const q = await pool.query('INSERT INTO bookings (data) VALUES ($1) RETURNING id, created_at', [data]);
    res.json({ id: q.rows[0].id, createdAt: q.rows[0].created_at, ...data });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.patch('/api/bookings/:id', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query('UPDATE bookings SET status=$1 WHERE id=$2', [status, req.params.id]);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/bookings/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM bookings WHERE id=$1', [req.params.id]);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// =========================================================
// CMS — generic key/value (hero, services, footer, seo, content, settings, stats, visa, flight-offers, umrah-offer, etc.)
// =========================================================
app.get('/api/cms/:key', async (req, res) => {
  try {
    const q = await pool.query('SELECT value FROM cms_data WHERE key=$1', [req.params.key]);
    res.json(q.rows[0] ? q.rows[0].value : null);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/cms/:key', requireAdmin, async (req, res) => {
  try {
    await pool.query(
      `INSERT INTO cms_data (key, value) VALUES ($1,$2::jsonb)
       ON CONFLICT (key) DO UPDATE SET value=$2::jsonb, updated_at=now()`,
      [req.params.key, JSON.stringify(req.body)]
    );
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// =========================================================
// IMAGE UPLOAD
// =========================================================
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
    if (/^image\/(jpeg|png|webp|gif|svg\+xml)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files allowed'));
  },
});

app.post('/api/upload', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const url = `${PUBLIC_URL}/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename, size: req.file.size });
});

app.delete('/api/upload/:filename', requireAdmin, (req, res) => {
  const safe = path.basename(req.params.filename);
  const fp = path.join(UPLOAD_DIR, safe);
  if (fs.existsSync(fp)) fs.unlinkSync(fp);
  res.json({ ok: true });
});

// =========================================================
app.listen(PORT, '127.0.0.1', () => {
  console.log(`✅ Prime Sky API running on http://127.0.0.1:${PORT}`);
});
