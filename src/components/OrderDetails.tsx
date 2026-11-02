import { Phone, Server, MapPin, MessageCircle } from 'lucide-react';
import { formatMoney, parseOrderDescription } from '../utils/orderDetails';
import './OrderDetails.css';

export default function OrderDetails({ description }: { description: string }) {
  const { products, checkout, raw } = parseOrderDescription(description);
  const hasCheckout = Boolean(
    checkout &&
      (checkout.phone || checkout.whatsapp || checkout.dialerServer || checkout.country || checkout.state)
  );

  if (products.length === 0 && !hasCheckout && !raw) {
    return <p className="order-details-empty">No extra details were saved with this order.</p>;
  }

  return (
    <div className="order-details">
      {products.length > 0 && (
        <div className="order-lines">
          <h4>Products</h4>
          <ul>
            {products.map((item, index) => (
              <li key={`${item.product}-${index}`}>
                <span>
                  {item.product}
                  <em>× {item.quantity}</em>
                </span>
                <strong>{formatMoney(item.price * item.quantity, '/mo')}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasCheckout && checkout && (
        <div className="order-contact-grid">
          {checkout.phone && (
            <div>
              <Phone size={14} />
              <span>
                <small>Phone</small>
                {checkout.phone}
              </span>
            </div>
          )}
          {checkout.whatsapp && (
            <div>
              <MessageCircle size={14} />
              <span>
                <small>WhatsApp</small>
                {checkout.whatsapp}
              </span>
            </div>
          )}
          {checkout.dialerServer && (
            <div>
              <Server size={14} />
              <span>
                <small>Dialer server</small>
                {checkout.dialerServer}
              </span>
            </div>
          )}
          {(checkout.country || checkout.state) && (
            <div>
              <MapPin size={14} />
              <span>
                <small>Location</small>
                {[checkout.state, checkout.country].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
        </div>
      )}

      {raw && <p className="order-details-raw">{raw}</p>}
    </div>
  );
}
