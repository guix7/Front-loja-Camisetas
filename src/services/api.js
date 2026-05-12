const BASE_URL = "https://ecommerce-backend-1-722j.onrender.com";


export async function registerUser(data) {
  const response = await fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // Mantido
  });
  return await response.json();
}


export async function loginUser(data) {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // Essencial para o cookie ser salvo
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Erro ao fazer Login");
  return result;
}


export async function getProducts() {
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "GET",
    credentials: "include", // Essencial para enviar o cookie de volta
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Erro ao buscar produtos");
  return result;
}


export async function postProduct(formData) {
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Erro ao criar Produto");
  return result;
}


export async function forgotPasswordRequest(data) {
  const response = await fetch(`${BASE_URL}/api/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: "include", 
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Erro no servidor');
  return result;
}


export async function resetPasswordConfirm(data) {
  const response = await fetch(`${BASE_URL}/api/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(data),
    credentials: "include", 
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Erro ao definir a senha');
  return result;
}