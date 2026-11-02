const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

function resolveDbPath() {
  if (!process.env.VERCEL) {
    return path.join(__dirname, 'tritechforge.db');
  }

  const runtimePath = path.join('/tmp', 'tritechforge.db');
  const seedPath = path.join(__dirname, 'tritechforge.db');
  if (!fs.existsSync(runtimePath) && fs.existsSync(seedPath)) {
    fs.copyFileSync(seedPath, runtimePath);
  }
  return runtimePath;
}

const db = new Database(resolveDbPath());

function ensureColumn(table, column, definition) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all();
  if (!cols.some((col) => col.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    return true;
  }
  return false;
}

// Initialize database tables
function initDB() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Admin users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      service_type TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      description TEXT,
      price REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Messages table for admin-customer communication
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      sender_type TEXT NOT NULL,
      sender_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    )
  `);

  // Products table for admin to manage pricing
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      icon TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Contact form messages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Logged-in customer support chat (not tied to one order)
  db.exec(`
    CREATE TABLE IF NOT EXISTS support_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      sender_type TEXT NOT NULL,
      sender_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      read_by_admin INTEGER DEFAULT 0,
      read_by_customer INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  const addedAdminRead = ensureColumn('messages', 'read_by_admin', 'INTEGER DEFAULT 0');
  const addedCustomerRead = ensureColumn('messages', 'read_by_customer', 'INTEGER DEFAULT 0');
  if (addedAdminRead || addedCustomerRead) {
    db.exec('UPDATE messages SET read_by_admin = 1, read_by_customer = 1');
  }

  // Insert default admin if not exists
  const adminCheck = db.prepare('SELECT * FROM admins WHERE email = ?').get('admin@tritechforge.com');
  if (!adminCheck) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync('Admin@123', 10);
    db.prepare('INSERT INTO admins (email, password) VALUES (?, ?)').run('admin@tritechforge.com', hashedPassword);
    console.log('✅ Default admin created: admin@tritechforge.com / Admin@123');
  }

  // Insert default products if not exists
  const productCheck = db.prepare('SELECT COUNT(*) as count FROM products').get();
  if (productCheck.count === 0) {
    const insertProduct = db.prepare('INSERT INTO products (id, name, description, price, icon) VALUES (?, ?, ?, ?, ?)');
    insertProduct.run('solar-bot', 'Solar Bot', 'AI assistant for solar energy consultations and lead qualification', 299, '☀️');
    insertProduct.run('aca-bot', 'ACA Bot', 'Healthcare insurance (Obamacare) enrollment and support bot', 349, '🏥');
    insertProduct.run('medicare-bot', 'Medicare Bot', 'Medicare enrollment assistance and information bot', 349, '👴');
    insertProduct.run('final-expense-bot', 'Final Expense Bot', 'Final expense insurance consultation and qualification bot', 299, '💼');
    console.log('✅ Default products created');
  }

  console.log('✅ Database initialized');
}

initDB();

module.exports = db;
