const BASE_URL = 'https://dummyjson.com';

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
}

export async function getProduct(id: number) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return response.json();
}

export async function searchProducts(query: string) {
  const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
  return response.json();
}

export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json();
}