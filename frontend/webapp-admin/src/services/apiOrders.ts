import { API_URL } from './apiItems';

export async function getOrders() {
  const res = await fetch(`${API_URL}/orders/`);
  if (!res.ok) throw Error(`Couldn't find orders`);
  const data = await res.json();
  return data;
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/orders/${id}`);
  if (!res.ok) throw Error(`Couldn't find order`);
  const data = await res.json();
  return data;
}

export async function markDelivered(id) {
  const res = await fetch(`${API_URL}/orders/${id}/deliver`, {
    method: 'PATCH', // Changed from default GET to PATCH
    headers: {
      'Content-Type': 'application/json',
      // Add any auth headers if needed
      // 'Authorization': `Bearer ${token}`
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to mark order as delivered');
  }

  const data = await res.json();
  return data;
}
