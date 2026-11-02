import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

interface ThreadMessage {
  id: number;
  sender_type: 'admin' | 'customer';
  message: string;
  created_at: string;
}

export default function OrderMessageThread({ orderId }: { orderId: number }) {
  const [messages, setMessages] = useState<ThreadMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`/api/orders/${orderId}/messages?markRead=1`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setMessages(await res.json());
    }
  };

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 5000);
    return () => window.clearInterval(timer);
  }, [orderId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || sending) return;
    setSending(true);
    setError('');
    const token = localStorage.getItem('authToken');
    try {
      const res = await fetch(`/api/orders/${orderId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: draft.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Could not send message');
      }
      setDraft('');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="order-thread">
      <div className="order-thread-messages">
        {messages.length === 0 ? (
          <p>No messages on this order yet. Anything you send here shows up in the admin order chat.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`thread-bubble ${message.sender_type === 'customer' ? 'mine' : 'theirs'}`}
            >
              <p>{message.message}</p>
              <span>
                {message.sender_type === 'admin' ? 'Admin' : 'You'} ·{' '}
                {new Date(message.created_at).toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSend} className="order-thread-form">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message the team about this order..."
        />
        <button type="submit" disabled={sending || !draft.trim()} aria-label="Send order message">
          <Send size={16} />
        </button>
      </form>
      {error && <p className="thread-error">{error}</p>}
    </div>
  );
}
