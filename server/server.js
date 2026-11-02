const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Vercel can hand the function a stripped path. Express routes are mounted at /api.
app.use((req, _res, next) => {
  if (!process.env.VERCEL) return next();

  const headerPath = req.headers['x-forwarded-uri'] || req.headers['x-invoke-path'];
  let url = typeof headerPath === 'string' && headerPath.startsWith('/') ? headerPath : String(req.url || '/');
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const parsed = new URL(url);
    url = `${parsed.pathname}${parsed.search}`;
  }

  const queryIndex = url.indexOf('?');
  const pathname = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const search = queryIndex === -1 ? '' : url.slice(queryIndex);
  if (!pathname.startsWith('/api')) {
    const suffix = pathname === '/' ? '' : pathname.startsWith('/') ? pathname : `/${pathname}`;
    url = `/api${suffix}${search}`;
  }
  req.url = url;
  next();
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Admin auth middleware
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, admin) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    if (!admin.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.admin = admin;
    next();
  });
}

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Check if user exists
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hashedPassword);

    // Generate token
    const token = jwt.sign({ id: result.lastInsertRowid, email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: result.lastInsertRowid, email }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, (req, res) => {
  try {
    const user = db.prepare('SELECT id, email, created_at FROM users WHERE id = ?').get(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user orders
app.get('/api/orders', authenticateToken, (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT o.*,
        (SELECT COUNT(*) FROM messages m
          WHERE m.order_id = o.id AND m.sender_type = 'admin' AND m.read_by_customer = 0) AS unread_messages
      FROM orders o
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `).all(req.user.id);
    res.json(orders);
  } catch (error) {
    console.error('Orders error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new order
app.post('/api/orders', authenticateToken, (req, res) => {
  try {
    const { service_type, description, price } = req.body;

    if (!service_type) {
      return res.status(400).json({ error: 'Service type is required' });
    }

    const result = db.prepare(`
      INSERT INTO orders (user_id, service_type, description, price, status)
      VALUES (?, ?, ?, ?, 'pending')
    `).run(req.user.id, service_type, description || '', price || 0);

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update order status
app.patch('/api/orders/:id', authenticateToken, (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    // Verify order belongs to user
    const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(orderId, req.user.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, orderId);

    const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============ ADMIN ENDPOINTS ============

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email, isAdmin: true }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Admin login successful',
      token,
      admin: { id: admin.id, email: admin.email }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all orders (admin)
app.get('/api/admin/orders', authenticateAdmin, (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT o.*, u.email as customer_email,
        (SELECT COUNT(*) FROM messages m
          WHERE m.order_id = o.id AND m.sender_type = 'customer' AND m.read_by_admin = 0) AS unread_messages
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `).all();
    res.json(orders);
  } catch (error) {
    console.error('Admin orders error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update order price (admin)
app.patch('/api/admin/orders/:id/price', authenticateAdmin, (req, res) => {
  try {
    const { price } = req.body;
    const orderId = req.params.id;

    db.prepare('UPDATE orders SET price = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(price, orderId);

    const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order price error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update order status (admin)
app.patch('/api/admin/orders/:id/status', authenticateAdmin, (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, orderId);

    const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get messages for an order (admin)
app.get('/api/admin/orders/:id/messages', authenticateAdmin, (req, res) => {
  try {
    const orderId = req.params.id;
    db.prepare(`
      UPDATE messages SET read_by_admin = 1
      WHERE order_id = ? AND sender_type = 'customer'
    `).run(orderId);
    const messages = db.prepare('SELECT * FROM messages WHERE order_id = ? ORDER BY created_at ASC').all(orderId);
    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Send message to customer (admin)
app.post('/api/admin/orders/:id/messages', authenticateAdmin, (req, res) => {
  try {
    const orderId = req.params.id;
    const { message } = req.body;

    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = db.prepare(`
      INSERT INTO messages (order_id, sender_type, sender_id, message, read_by_admin, read_by_customer)
      VALUES (?, 'admin', ?, ?, 1, 0)
    `).run(orderId, req.admin.id, String(message).trim());

    const newMessage = db.prepare('SELECT * FROM messages WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get messages for an order (customer)
app.get('/api/orders/:id/messages', authenticateToken, (req, res) => {
  try {
    const orderId = req.params.id;
    
    // Verify order belongs to user
    const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(orderId, req.user.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (req.query.markRead === '1') {
      db.prepare(`
        UPDATE messages SET read_by_customer = 1
        WHERE order_id = ? AND sender_type = 'admin'
      `).run(orderId);
    }

    const messages = db.prepare('SELECT * FROM messages WHERE order_id = ? ORDER BY created_at ASC').all(orderId);
    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Send message to admin (customer)
app.post('/api/orders/:id/messages', authenticateToken, (req, res) => {
  try {
    const orderId = req.params.id;
    const { message } = req.body;

    // Verify order belongs to user
    const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(orderId, req.user.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = db.prepare(`
      INSERT INTO messages (order_id, sender_type, sender_id, message, read_by_admin, read_by_customer)
      VALUES (?, 'customer', ?, ?, 0, 1)
    `).run(orderId, req.user.id, String(message).trim());

    const newMessage = db.prepare('SELECT * FROM messages WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY name ASC').all();
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit contact form (public)
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = db.prepare(`
      INSERT INTO contact_messages (name, email, message)
      VALUES (?, ?, ?)
    `).run(name, email, message);

    res.status(201).json({ 
      message: 'Message sent successfully',
      id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all contact messages (admin)
app.get('/api/admin/contact-messages', authenticateAdmin, (req, res) => {
  try {
    const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
    res.json(messages);
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update contact message status (admin)
app.patch('/api/admin/contact-messages/:id/status', authenticateAdmin, (req, res) => {
  try {
    const { status } = req.body;
    const messageId = req.params.id;

    db.prepare('UPDATE contact_messages SET status = ? WHERE id = ?').run(status, messageId);

    const updatedMessage = db.prepare('SELECT * FROM contact_messages WHERE id = ?').get(messageId);
    res.json(updatedMessage);
  } catch (error) {
    console.error('Update message status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Customer support inbox
app.get('/api/support/messages', authenticateToken, (req, res) => {
  try {
    const unread = db.prepare(`
      SELECT COUNT(*) AS count FROM support_messages
      WHERE user_id = ? AND sender_type = 'admin' AND read_by_customer = 0
    `).get(req.user.id);

    if (req.query.markRead === '1') {
      db.prepare(`
        UPDATE support_messages SET read_by_customer = 1
        WHERE user_id = ? AND sender_type = 'admin'
      `).run(req.user.id);
    }

    const messages = db.prepare(`
      SELECT * FROM support_messages WHERE user_id = ? ORDER BY created_at ASC
    `).all(req.user.id);

    res.json({ messages, unread: unread.count });
  } catch (error) {
    console.error('Support messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/support/messages', authenticateToken, (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = db.prepare(`
      INSERT INTO support_messages (user_id, sender_type, sender_id, message, read_by_admin, read_by_customer)
      VALUES (?, 'customer', ?, ?, 0, 1)
    `).run(req.user.id, req.user.id, String(message).trim());

    const created = db.prepare('SELECT * FROM support_messages WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(created);
  } catch (error) {
    console.error('Send support message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/support-threads', authenticateAdmin, (req, res) => {
  try {
    const threads = db.prepare(`
      SELECT
        u.id AS user_id,
        u.email AS customer_email,
        (SELECT message FROM support_messages sm WHERE sm.user_id = u.id ORDER BY created_at DESC LIMIT 1) AS last_message,
        (SELECT sender_type FROM support_messages sm WHERE sm.user_id = u.id ORDER BY created_at DESC LIMIT 1) AS last_sender,
        (SELECT created_at FROM support_messages sm WHERE sm.user_id = u.id ORDER BY created_at DESC LIMIT 1) AS last_at,
        (SELECT COUNT(*) FROM support_messages sm
          WHERE sm.user_id = u.id AND sm.sender_type = 'customer' AND sm.read_by_admin = 0) AS unread
      FROM users u
      WHERE EXISTS (SELECT 1 FROM support_messages sm WHERE sm.user_id = u.id)
      ORDER BY last_at DESC
    `).all();
    res.json(threads);
  } catch (error) {
    console.error('Support threads error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/support-threads/:userId/messages', authenticateAdmin, (req, res) => {
  try {
    const userId = req.params.userId;
    const user = db.prepare('SELECT id, email FROM users WHERE id = ?').get(userId);
    if (!user) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    db.prepare(`
      UPDATE support_messages SET read_by_admin = 1
      WHERE user_id = ? AND sender_type = 'customer'
    `).run(userId);

    const messages = db.prepare(`
      SELECT * FROM support_messages WHERE user_id = ? ORDER BY created_at ASC
    `).all(userId);
    res.json({ customer_email: user.email, messages });
  } catch (error) {
    console.error('Admin support messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/admin/support-threads/:userId/messages', authenticateAdmin, (req, res) => {
  try {
    const userId = req.params.userId;
    const { message } = req.body;
    const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
    if (!user) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = db.prepare(`
      INSERT INTO support_messages (user_id, sender_type, sender_id, message, read_by_admin, read_by_customer)
      VALUES (?, 'admin', ?, ?, 1, 0)
    `).run(userId, req.admin.id, String(message).trim());

    const created = db.prepare('SELECT * FROM support_messages WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(created);
  } catch (error) {
    console.error('Admin send support message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product price (admin)
app.patch('/api/admin/products/:id/price', authenticateAdmin, (req, res) => {
  try {
    const { price } = req.body;
    const productId = req.params.id;

    db.prepare('UPDATE products SET price = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(price, productId);

    const updatedProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Update product price error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.use((err, _req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Server error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
