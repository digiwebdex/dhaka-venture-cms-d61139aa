require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(sql);
    console.log('✅ Schema applied');
    process.exit(0);
  } catch (e) {
    console.error('❌ DB init failed:', e.message);
    process.exit(1);
  }
})();
