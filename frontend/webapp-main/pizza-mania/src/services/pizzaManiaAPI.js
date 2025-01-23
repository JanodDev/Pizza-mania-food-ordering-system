export const API_URL = 'http://localhost:3000/api';

export async function getProductsWithCategory(category) {
  const res = await fetch(`${API_URL}/products/category/${category}`);
  if (!res.ok) throw Error(`Couldn't find items`);
  const data = await res.json();
  return data;
}
