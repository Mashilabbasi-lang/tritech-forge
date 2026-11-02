export interface OrderLineItem {
  product: string;
  quantity: number;
  price: number;
}

export interface OrderCheckout {
  phone?: string;
  dialerServer?: string;
  country?: string;
  state?: string;
  whatsapp?: string;
}

export interface ParsedOrder {
  products: OrderLineItem[];
  checkout: OrderCheckout | null;
  raw: string;
}

export function parseOrderDescription(description: string | null | undefined): ParsedOrder {
  if (!description) {
    return { products: [], checkout: null, raw: '' };
  }

  try {
    const parsed = JSON.parse(description);
    if (parsed && typeof parsed === 'object') {
      const products = Array.isArray(parsed.products)
        ? parsed.products.map((item: Partial<OrderLineItem>) => ({
            product: String(item.product || 'Product'),
            quantity: Number(item.quantity) || 1,
            price: Number(item.price) || 0,
          }))
        : [];
      const checkout =
        parsed.checkout && typeof parsed.checkout === 'object'
          ? (parsed.checkout as OrderCheckout)
          : null;
      if (products.length > 0 || checkout) {
        return { products, checkout, raw: '' };
      }
    }
  } catch {
    // Older orders may store plain text.
  }

  return { products: [], checkout: null, raw: description };
}

export function formatMoney(value: number | null | undefined, suffix = '') {
  const amount = Number(value);
  const safe = Number.isFinite(amount) ? amount : 0;
  return `$${safe.toFixed(2)}${suffix}`;
}

export function statusSlug(status: string | null | undefined) {
  return (status || 'pending').toLowerCase().trim().replace(/\s+/g, '-');
}

export function formatStatus(status: string | null | undefined) {
  return statusSlug(status)
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
