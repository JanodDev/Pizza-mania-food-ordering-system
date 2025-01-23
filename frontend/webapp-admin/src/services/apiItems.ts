export const API_URL = 'http://localhost:3000/api';

export async function getPizza() {
  const res = await fetch(`${API_URL}/products/`);
  if (!res.ok) throw Error(`Couldn't find items`);
  const data = await res.json();
  return data;
}

export async function getOnePizza(id) {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw Error(`Couldn't find items`);
  const data = await res.json();
  return data;
}

export async function createPizza(newPizza) {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      body: JSON.stringify(newPizza),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw new Error('Error in creating pizza');
  }
}

export async function updatePizza(id, updatedPizza) {
  console.log(id);
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPizza),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to update pizza');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error in updating pizza');
  }
}

export async function deletePizza(id) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to delete pizza');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error in deleting pizza');
  }
}
