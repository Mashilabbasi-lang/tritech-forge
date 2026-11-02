import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Plus, Clock, CheckCircle, XCircle,
  LogOut, User, ShoppingCart, MessageCircle, Send, Menu, X
} from 'lucide-react';
import OrderDetails from '../components/OrderDetails';
import OrderMessageThread from '../components/OrderMessageThread';
import { formatMoney, formatStatus, statusSlug } from '../utils/orderDetails';
import './Dashboard.css';

interface Order {
  id: number;
  service_type: string;
  status: string;
  description: string;
  price: number;
  created_at: string;
  unread_messages?: number;
}

interface UserProfile {
  id: number;
  email: string;
  created_at: string;
}

interface SupportMessage {
  id: number;
  sender_type: 'customer' | 'admin';
  message: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [supportUnread, setSupportUnread] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [chatError, setChatError] = useState('');
  const [sendingChat, setSendingChat] = useState(false);
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [checkoutForm, setCheckoutForm] = useState({
    phone: '',
    dialerServer: '',
    country: '',
    state: '',
    whatsapp: '',
  });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchData();
    const timer = window.setInterval(fetchData, 15000);
    return () => window.clearInterval(timer);
  }, [navigate]);

  const fetchData = async () => {
    const token = localStorage.getItem('authToken');
    
    try {
      // Fetch profile
      const profileRes = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
      }

      // Fetch orders
      const ordersRes = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }

      // Fetch products
      const productsRes = await fetch('/api/products');
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      }

      const supportRes = await fetch('/api/support/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (supportRes.ok) {
        const supportData = await supportRes.json();
        setSupportUnread(supportData.unread || 0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, change: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    const orderDetails = cart.map(item => ({
      product: item.product.name,
      quantity: item.quantity,
      price: item.product.price
    }));

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          service_type: 'Product Order',
          description: JSON.stringify({
            products: orderDetails,
            checkout: checkoutForm
          }),
          price: getCartTotal(),
          status: 'In Progress'
        })
      });

      if (response.ok) {
        const created = await response.json();
        setCart([]);
        setCheckoutForm({
          phone: '',
          dialerServer: '',
          country: '',
          state: '',
          whatsapp: '',
        });
        setNotice({
          type: 'ok',
          text: `Order #${created.id} is in. The admin team can see your products, phone, WhatsApp, and dialer server.`,
        });
        setActiveTab('orders');
        fetchData();
      } else {
        const data = await response.json().catch(() => ({}));
        setNotice({ type: 'err', text: data.error || 'Could not place the order. Try again.' });
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setNotice({ type: 'err', text: 'Could not reach the server. Make sure it is running and try again.' });
    }
  };

  const loadSupportMessages = async (markRead: boolean) => {
    const token = localStorage.getItem('authToken');
    const res = await fetch(
      `/api/support/messages${markRead ? '?markRead=1' : ''}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages || []);
      setSupportUnread(markRead ? 0 : data.unread || 0);
    }
  };

  useEffect(() => {
    if (activeTab !== 'chat') return;
    loadSupportMessages(true);
    const timer = window.setInterval(() => loadSupportMessages(true), 5000);
    return () => window.clearInterval(timer);
  }, [activeTab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sendingChat) return;

    setSendingChat(true);
    setChatError('');
    const token = localStorage.getItem('authToken');
    try {
      const res = await fetch('/api/support/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newMessage.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Could not send message');
      }
      setNewMessage('');
      await loadSupportMessages(true);
    } catch (error) {
      setChatError(error instanceof Error ? error.message : 'Could not send message');
    } finally {
      setSendingChat(false);
    }
  };

  const getStatusIcon = (status: string) => {
    const slug = statusSlug(status);
    switch (slug) {
      case 'completed':
        return <CheckCircle size={20} className="status-icon completed" />;
      case 'cancelled':
        return <XCircle size={20} className="status-icon cancelled" />;
      case 'in-progress':
        return <Clock size={20} className="status-icon in-progress" />;
      default:
        return <Clock size={20} className="status-icon pending" />;
    }
  };

  const activeOrders = orders.filter((order) => !['completed', 'cancelled'].includes(statusSlug(order.status))).length;
  const orderUnread = orders.reduce((sum, order) => sum + (order.unread_messages || 0), 0);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`dashboard-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <button
            className="mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <div className="sidebar-branding">
            <img src="/favicon.png" alt="TriTech Forge" className="sidebar-logo" />
            <h2>TriTech<span className="gradient-text">Forge</span></h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('orders');
              setIsMobileMenuOpen(false);
            }}
          >
            <Package size={20} />
            <span>My Orders</span>
            {orderUnread > 0 && <span className="nav-badge">{orderUnread}</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'new-order' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('new-order');
              setIsMobileMenuOpen(false);
            }}
          >
            <Plus size={20} />
            <span>New Order</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('cart');
              setIsMobileMenuOpen(false);
            }}
          >
            <ShoppingCart size={20} />
            <span>Cart {getCartCount() > 0 && `(${getCartCount()})`}</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('chat');
              setIsMobileMenuOpen(false);
            }}
          >
            <MessageCircle size={20} />
            <span>Chat with Support</span>
            {supportUnread > 0 && <span className="nav-badge">{supportUnread}</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('profile');
              setIsMobileMenuOpen(false);
            }}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            <h1>
              {activeTab === 'orders' && 'My Orders'}
              {activeTab === 'new-order' && 'Select Products'}
              {activeTab === 'cart' && 'Shopping Cart'}
              {activeTab === 'checkout' && 'Checkout'}
              {activeTab === 'chat' && 'Chat with Support'}
              {activeTab === 'profile' && 'My Profile'}
            </h1>
          </div>
          <div className="user-info">
            <button
              className="cart-header-btn"
              onClick={() => setActiveTab('cart')}
            >
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="cart-badge">{getCartCount()}</span>
              )}
            </button>
            <span>{profile?.email}</span>
          </div>
        </div>

        <div className="dashboard-main">
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="orders-section"
            >
              {notice && (
                <div className={`dash-notice ${notice.type}`}>{notice.text}</div>
              )}
              {orders.length === 0 ? (
                <div className="empty-state">
                  <ShoppingCart size={64} />
                  <h3>No orders yet</h3>
                  <p>Create your first order to get started</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setActiveTab('new-order')}
                  >
                    <Plus size={20} />
                    Create Order
                  </button>
                </div>
              ) : (
                <>
                  <div className="dash-stats">
                    <div>
                      <span>Orders</span>
                      <strong>{orders.length}</strong>
                    </div>
                    <div>
                      <span>Active</span>
                      <strong>{activeOrders}</strong>
                    </div>
                    <div>
                      <span>Monthly total</span>
                      <strong>{formatMoney(orders.reduce((sum, order) => sum + (Number(order.price) || 0), 0), '/mo')}</strong>
                    </div>
                  </div>
                  <div className="orders-grid">
                    {orders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="order-card"
                      >
                        <div className="order-header">
                          <div>
                            <p className="order-id">Order #{order.id}</p>
                            <h3>{order.service_type}</h3>
                          </div>
                          <div className="order-status">
                            {getStatusIcon(order.status)}
                            <span className={`status-text ${statusSlug(order.status)}`}>
                              {formatStatus(order.status)}
                            </span>
                          </div>
                        </div>
                        <OrderDetails description={order.description} />
                        <div className="order-footer">
                          <span className="order-price">{formatMoney(order.price, '/mo')}</span>
                          <span className="order-date">
                            {new Date(order.created_at).toLocaleString()}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="order-thread-toggle"
                          onClick={() => {
                            const next = openOrderId === order.id ? null : order.id;
                            setOpenOrderId(next);
                            if (next) {
                              window.setTimeout(fetchData, 700);
                            }
                          }}
                        >
                          <MessageCircle size={16} />
                          {openOrderId === order.id ? 'Hide order messages' : 'Message about this order'}
                          {(order.unread_messages || 0) > 0 && (
                            <span className="nav-badge">{order.unread_messages}</span>
                          )}
                        </button>
                        {openOrderId === order.id && <OrderMessageThread orderId={order.id} />}
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'new-order' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="products-section"
            >
              <div className="products-grid">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className="product-card"
                  >
                    <div className="product-icon">{product.icon}</div>
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">${product.price}/mo</span>
                      <button
                        className="btn btn-primary btn-add-cart"
                        onClick={() => addToCart(product)}
                      >
                        <Plus size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'cart' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="cart-section"
            >
              {cart.length === 0 ? (
                <div className="empty-state">
                  <ShoppingCart size={64} />
                  <h3>Your cart is empty</h3>
                  <p>Add some products to get started</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setActiveTab('new-order')}
                  >
                    <Plus size={20} />
                    Browse Products
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div key={item.product.id} className="cart-item">
                        <div className="cart-item-info">
                          <span className="cart-item-icon">{item.product.icon}</span>
                          <div>
                            <h4>{item.product.name}</h4>
                            <p>{item.product.description}</p>
                          </div>
                        </div>
                        <div className="cart-item-actions">
                          <div className="quantity-control">
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(item.product.id, -1)}
                            >
                              -
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(item.product.id, 1)}
                            >
                              +
                            </button>
                          </div>
                          <span className="cart-item-price">
                            ${(item.product.price * item.quantity).toFixed(2)}/mo
                          </span>
                          <button
                            className="btn-remove"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <XCircle size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-summary">
                    <div className="cart-total">
                      <span>Total:</span>
                      <span className="total-amount">${getCartTotal().toFixed(2)}/mo</span>
                    </div>
                    <button
                      className="btn btn-primary btn-large"
                      onClick={() => setActiveTab('checkout')}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'checkout' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="checkout-section"
            >
              <div className="checkout-container">
                <div className="checkout-summary">
                  <h3>Order Summary</h3>
                  {cart.map((item) => (
                    <div key={item.product.id} className="checkout-item">
                      <span>{item.product.icon} {item.product.name} × {item.quantity}</span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}/mo</span>
                    </div>
                  ))}
                  <div className="checkout-total">
                    <strong>Total:</strong>
                    <strong>${getCartTotal().toFixed(2)}/mo</strong>
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="checkout-form">
                  <h3>Billing Information</h3>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      value={checkoutForm.phone}
                      onChange={(e) =>
                        setCheckoutForm({ ...checkoutForm, phone: e.target.value })
                      }
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dialerServer">Dialer Server Hosted In *</label>
                    <input
                      type="text"
                      id="dialerServer"
                      value={checkoutForm.dialerServer}
                      onChange={(e) =>
                        setCheckoutForm({ ...checkoutForm, dialerServer: e.target.value })
                      }
                      placeholder="e.g., AWS US-East, Google Cloud, etc."
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="country">Country *</label>
                      <input
                        type="text"
                        id="country"
                        value={checkoutForm.country}
                        onChange={(e) =>
                          setCheckoutForm({ ...checkoutForm, country: e.target.value })
                        }
                        placeholder="United States"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">State *</label>
                      <input
                        type="text"
                        id="state"
                        value={checkoutForm.state}
                        onChange={(e) =>
                          setCheckoutForm({ ...checkoutForm, state: e.target.value })
                        }
                        placeholder="California"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="whatsapp">WhatsApp Number *</label>
                    <input
                      type="tel"
                      id="whatsapp"
                      value={checkoutForm.whatsapp}
                      onChange={(e) =>
                        setCheckoutForm({ ...checkoutForm, whatsapp: e.target.value })
                      }
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>

                  <div className="checkout-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setActiveTab('cart')}
                    >
                      Back to Cart
                    </button>
                    <button type="submit" className="btn btn-primary btn-large">
                      Complete Order
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="chat-section"
            >
              <div className="chat-container">
                <div className="chat-banner">
                  Messages sent here are saved and show up in the admin dashboard.
                </div>
                <div className="chat-messages">
                  {messages.length === 0 && (
                    <div className="chat-empty">
                      <MessageCircle size={36} />
                      <p>Ask about billing, setup, or an order. An admin will reply in this thread.</p>
                    </div>
                  )}
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`message ${message.sender_type === 'customer' ? 'user' : 'support'}`}
                    >
                      <div className="message-avatar">
                        {message.sender_type === 'admin' ? '👨‍💼' : '👤'}
                      </div>
                      <div className="message-content">
                        <p>{message.message}</p>
                        <span className="message-time">
                          {new Date(message.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="chat-input-form">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                  />
                  <button type="submit" className="chat-send-btn" disabled={sendingChat || !newMessage.trim()}>
                    <Send size={20} />
                  </button>
                </form>
                {chatError && <p className="thread-error chat-form-error">{chatError}</p>}
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="profile-section"
            >
              <div className="profile-card">
                <div className="profile-avatar">
                  <User size={48} />
                </div>
                <div className="profile-details">
                  <div className="profile-field">
                    <label>Email</label>
                    <p>{profile?.email}</p>
                  </div>
                  <div className="profile-field">
                    <label>Member Since</label>
                    <p>{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div className="profile-field">
                    <label>Total Orders</label>
                    <p>{orders.length}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
