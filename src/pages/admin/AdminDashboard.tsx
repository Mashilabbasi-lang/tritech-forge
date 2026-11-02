import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, LogOut, MessageCircle, Send, DollarSign, CheckCircle,
  XCircle, Clock, Menu, X, User, Inbox, Mail, MessagesSquare
} from 'lucide-react';
import OrderDetails from '../../components/OrderDetails';
import { formatMoney, formatStatus, statusSlug } from '../../utils/orderDetails';
import './AdminDashboard.css';

interface Order {
  id: number;
  user_id: number;
  customer_email: string;
  service_type: string;
  status: string;
  description: string;
  price: number;
  created_at: string;
  unread_messages?: number;
}

interface Message {
  id: number;
  order_id: number;
  sender_type: 'admin' | 'customer';
  sender_id: number;
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

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

interface SupportThread {
  user_id: number;
  customer_email: string;
  last_message: string;
  last_sender: string;
  last_at: string;
  unread: number;
}

interface SupportMessage {
  id: number;
  user_id: number;
  sender_type: 'admin' | 'customer';
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<{ orderId: number; price: number } | null>(null);
  const [editingProductPrice, setEditingProductPrice] = useState<{ productId: string; price: number } | null>(null);
  const [supportThreads, setSupportThreads] = useState<SupportThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<SupportThread | null>(null);
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([]);
  const [supportDraft, setSupportDraft] = useState('');
  const [sendingSupport, setSendingSupport] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchData();
    const timer = window.setInterval(fetchData, 12000);
    return () => window.clearInterval(timer);
  }, [navigate]);

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const ordersRes = await fetch('/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }

      const productsRes = await fetch('/api/products');
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      }

      const contactRes = await fetch('/api/admin/contact-messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        setContactMessages(contactData);
      }

      const threadsRes = await fetch('/api/admin/support-threads', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (threadsRes.ok) {
        const threadsData = await threadsRes.json();
        setSupportThreads(threadsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (orderId: number) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    fetchMessages(order.id);
    setActiveTab('chat');
    setOrders((current) =>
      current.map((item) => (item.id === order.id ? { ...item, unread_messages: 0 } : item))
    );
  };

  const loadSupportThread = async (thread: SupportThread) => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`/api/admin/support-threads/${thread.user_id}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setSupportMessages(data.messages || []);
      setSupportThreads((current) =>
        current.map((item) => (item.user_id === thread.user_id ? { ...item, unread: 0 } : item))
      );
    }
  };

  const openSupportThread = async (thread: SupportThread) => {
    setSelectedThread(thread);
    setActiveTab('support');
    await loadSupportThread(thread);
  };

  const handleSendSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportDraft.trim() || !selectedThread || sendingSupport) return;
    setSendingSupport(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(
        `/api/admin/support-threads/${selectedThread.user_id}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: supportDraft.trim() }),
        }
      );
      if (res.ok) {
        setSupportDraft('');
        await openSupportThread(selectedThread);
      }
    } catch (error) {
      console.error('Error sending support reply:', error);
    } finally {
      setSendingSupport(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedOrder) return;

    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: newMessage })
      });

      if (res.ok) {
        setNewMessage('');
        fetchMessages(selectedOrder.id);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId: number, status: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        fetchData();
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(prev => prev ? { ...prev, status } : null);
        }
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleUpdateOrderPrice = async () => {
    if (!editingPrice) return;

    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/orders/${editingPrice.orderId}/price`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ price: editingPrice.price })
      });

      if (res.ok) {
        fetchData();
        setEditingPrice(null);
        if (selectedOrder?.id === editingPrice.orderId) {
          setSelectedOrder(prev => prev ? { ...prev, price: editingPrice.price } : null);
        }
      }
    } catch (error) {
      console.error('Error updating order price:', error);
    }
  };

  const handleUpdateProductPrice = async () => {
    if (!editingProductPrice) return;

    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/products/${editingProductPrice.productId}/price`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ price: editingProductPrice.price })
      });

      if (res.ok) {
        fetchData();
        setEditingProductPrice(null);
      }
    } catch (error) {
      console.error('Error updating product price:', error);
    }
  };

  const handleMarkAsRead = async (messageId: number) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/contact-messages/${messageId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'read' })
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
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

  useEffect(() => {
    if (activeTab !== 'support' || !selectedThread) return;
    const thread = selectedThread;
    const timer = window.setInterval(() => {
      loadSupportThread(thread);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [activeTab, selectedThread]);

  const supportUnread = supportThreads.reduce((sum, thread) => sum + (thread.unread || 0), 0);
  const orderUnread = orders.reduce((sum, order) => sum + (order.unread_messages || 0), 0);
  const pendingOrders = orders.filter((order) => statusSlug(order.status) === 'pending').length;

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
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

      <div className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <button
            className="mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
          <div className="sidebar-branding">
            <img src="/favicon.png" alt="Admin" className="sidebar-logo" />
            <h2>Admin Panel</h2>
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
            <span>All Orders</span>
            {orderUnread > 0 && <span className="nav-badge">{orderUnread}</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('support');
              setIsMobileMenuOpen(false);
            }}
          >
            <MessagesSquare size={20} />
            <span>Customer Chats</span>
            {supportUnread > 0 && <span className="nav-badge">{supportUnread}</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('messages');
              setIsMobileMenuOpen(false);
            }}
          >
            <Inbox size={20} />
            <span>Contact Form ({contactMessages.filter(m => m.status === 'unread').length})</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('products');
              setIsMobileMenuOpen(false);
            }}
          >
            <DollarSign size={20} />
            <span>Product Pricing</span>
          </button>
          {selectedOrder && (
            <button
              className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('chat');
                setIsMobileMenuOpen(false);
              }}
            >
              <MessageCircle size={20} />
              <span>Order Chat</span>
            </button>
          )}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <div className="header-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1>
              {activeTab === 'orders' && 'All Orders'}
              {activeTab === 'support' && (selectedThread ? `Chat · ${selectedThread.customer_email}` : 'Customer Chats')}
              {activeTab === 'messages' && 'Contact Form'}
              {activeTab === 'products' && 'Product Pricing'}
              {activeTab === 'chat' && `Order #${selectedOrder?.id} · ${selectedOrder?.customer_email}`}
            </h1>
          </div>
        </div>

        <div className="admin-main">
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="orders-section"
            >
              <div className="dash-stats">
                <div>
                  <span>Orders</span>
                  <strong>{orders.length}</strong>
                </div>
                <div>
                  <span>Pending</span>
                  <strong>{pendingOrders}</strong>
                </div>
                <div>
                  <span>Unread chats</span>
                  <strong>{supportUnread + orderUnread}</strong>
                </div>
                <div>
                  <span>Monthly total</span>
                  <strong>{formatMoney(orders.reduce((sum, order) => sum + (Number(order.price) || 0), 0), '/mo')}</strong>
                </div>
              </div>
              {orders.length === 0 ? (
                <div className="empty-state">
                  <Package size={64} />
                  <h3>No orders yet</h3>
                  <p>Customer checkouts will show products, phone, WhatsApp, and dialer details here.</p>
                </div>
              ) : (
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
                        <h3>Order #{order.id}</h3>
                        <p className="customer-email">
                          <User size={14} /> {order.customer_email}
                        </p>
                      </div>
                      <div className="order-status">
                        {getStatusIcon(order.status)}
                        <span className={`status-text ${statusSlug(order.status)}`}>
                          {formatStatus(order.status)}
                        </span>
                      </div>
                    </div>
                    <p className="order-type">{order.service_type}</p>
                    <OrderDetails description={order.description} />
                    <div className="order-footer">
                      <div className="price-edit">
                        {editingPrice?.orderId === order.id ? (
                          <div className="price-input-group">
                            <input
                              type="number"
                              value={editingPrice.price}
                              onChange={(e) =>
                                setEditingPrice({ ...editingPrice, price: parseFloat(e.target.value) })
                              }
                              className="price-input"
                            />
                            <button
                              className="btn-save"
                              onClick={handleUpdateOrderPrice}
                            >
                              Save
                            </button>
                            <button
                              className="btn-cancel"
                              onClick={() => setEditingPrice(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span
                            className="order-price"
                            onClick={() =>
                              setEditingPrice({ orderId: order.id, price: Number(order.price) || 0 })
                            }
                          >
                            {formatMoney(order.price, '/mo')} <DollarSign size={14} />
                          </span>
                        )}
                      </div>
                      <div className="status-buttons">
                        <button
                          className="btn-status pending"
                          onClick={() => handleUpdateOrderStatus(order.id, 'pending')}
                        >
                          Pending
                        </button>
                        <button
                          className="btn-status in-progress"
                          onClick={() => handleUpdateOrderStatus(order.id, 'in progress')}
                        >
                          In progress
                        </button>
                        <button
                          className="btn-status completed"
                          onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                        >
                          Complete
                        </button>
                        <button
                          className="btn-status cancelled"
                          onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div className="order-card-actions">
                      <span className="order-date">
                        {new Date(order.created_at).toLocaleString()}
                      </span>
                      <button type="button" className="btn-open-chat" onClick={() => handleOrderClick(order)}>
                        <MessageCircle size={16} />
                        Order chat
                        {(order.unread_messages || 0) > 0 && (
                          <span className="nav-badge">{order.unread_messages}</span>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              )}
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="products-section"
            >
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-icon">{product.icon}</div>
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      {editingProductPrice?.productId === product.id ? (
                        <div className="price-edit-group">
                          <input
                            type="number"
                            value={editingProductPrice.price}
                            onChange={(e) =>
                              setEditingProductPrice({ ...editingProductPrice, price: parseFloat(e.target.value) })
                            }
                            className="price-input"
                          />
                          <button className="btn-save" onClick={handleUpdateProductPrice}>
                            Save
                          </button>
                          <button
                            className="btn-cancel"
                            onClick={() => setEditingProductPrice(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span
                          className="product-price"
                          onClick={() =>
                            setEditingProductPrice({ productId: product.id, price: product.price })
                          }
                        >
                          ${product.price}/mo <DollarSign size={16} />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="messages-section"
            >
              {contactMessages.length === 0 ? (
                <div className="empty-state">
                  <Inbox size={64} />
                  <h3>No messages yet</h3>
                  <p>Contact form submissions will appear here</p>
                </div>
              ) : (
                <div className="messages-grid">
                  {contactMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`message-card ${msg.status}`}
                    >
                      <div className="message-card-header">
                        <div className="message-sender">
                          <User size={16} />
                          <strong>{msg.name}</strong>
                        </div>
                        <span className={`message-status ${msg.status}`}>
                          {msg.status}
                        </span>
                      </div>
                      <p className="message-email">
                        <Mail size={14} /> {msg.email}
                      </p>
                      <p className="message-text">{msg.message}</p>
                      <div className="message-card-footer">
                        <span className="message-date">
                          {new Date(msg.created_at).toLocaleString()}
                        </span>
                        {msg.status === 'unread' && (
                          <button
                            className="btn-mark-read"
                            onClick={() => handleMarkAsRead(msg.id)}
                          >
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="support-layout"
            >
              <div className="thread-list">
                {supportThreads.length === 0 ? (
                  <div className="empty-state compact">
                    <MessagesSquare size={48} />
                    <h3>No customer chats yet</h3>
                    <p>Messages from a logged-in customer’s dashboard appear here.</p>
                  </div>
                ) : (
                  supportThreads.map((thread) => (
                    <button
                      key={thread.user_id}
                      type="button"
                      className={`thread-item ${selectedThread?.user_id === thread.user_id ? 'active' : ''}`}
                      onClick={() => openSupportThread(thread)}
                    >
                      <div>
                        <strong>{thread.customer_email}</strong>
                        <p>{thread.last_message}</p>
                      </div>
                      <div className="thread-meta">
                        <span>{new Date(thread.last_at).toLocaleString()}</span>
                        {thread.unread > 0 && <span className="nav-badge">{thread.unread}</span>}
                      </div>
                    </button>
                  ))
                )}
              </div>
              <div className="chat-container">
                {!selectedThread ? (
                  <div className="chat-empty">
                    <MessageCircle size={36} />
                    <p>Select a customer to read and reply.</p>
                  </div>
                ) : (
                  <>
                    <div className="chat-messages">
                      {supportMessages.length === 0 && (
                        <div className="chat-empty">
                          <p>No messages in this thread yet.</p>
                        </div>
                      )}
                      {supportMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`message ${message.sender_type === 'admin' ? 'admin' : 'customer'}`}
                        >
                          <div className="message-avatar">
                            {message.sender_type === 'admin' ? '👨‍💼' : '👤'}
                          </div>
                          <div className="message-content">
                            <p>{message.message}</p>
                            <span className="message-time">
                              {new Date(message.created_at).toLocaleString([], {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSendSupport} className="chat-input-form">
                      <input
                        type="text"
                        value={supportDraft}
                        onChange={(e) => setSupportDraft(e.target.value)}
                        placeholder={`Reply to ${selectedThread.customer_email}`}
                        className="chat-input"
                      />
                      <button type="submit" className="chat-send-btn" disabled={sendingSupport || !supportDraft.trim()}>
                        <Send size={20} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && selectedOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="chat-section"
            >
              <div className="order-chat-summary">
                <div>
                  <strong>{selectedOrder.service_type}</strong>
                  <span>{formatStatus(selectedOrder.status)} · {formatMoney(selectedOrder.price, '/mo')}</span>
                </div>
                <OrderDetails description={selectedOrder.description} />
              </div>
              <div className="chat-container">
                <div className="chat-messages">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${message.sender_type === 'admin' ? 'admin' : 'customer'}`}
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
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="chat-input-form">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type message to customer..."
                    className="chat-input"
                  />
                  <button type="submit" className="chat-send-btn">
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
