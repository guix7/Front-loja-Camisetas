const BASE_URL = "https://ecommerce-backend-1-722j.onrender.com";

export async function registerUser(data) {
  const response = await fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return await response.json();
}

export async function loginUser(data) {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erro ao fazer Login");
  }

  return result;
}

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erro ao buscar produtos");
  }

  return result;
}

export async function postProduct(formData) {
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erro ao criar Produto");
  }

  return result;
}


export async function forgotPasswordRequest(data) {
  try {
    console.log(JSON.stringify(data))
    const response = await fetch(`${BASE_URL}/api/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Se o backend não responder (servidor desligado), ele trava aqui.
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Erro no servidor');
    }

    return responseData;
  } catch (error) {
    console.error("Erro detalhado no fetch:", error); // Adicione isso para ver o erro real
    throw error;
  }
}

export async function resetPasswordConfirm(data) {
  const response = await fetch(`${BASE_URL}/api/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if(!response.ok){
    throw new Error(result.message || 'Erro ao definir a senha');
  }

  return result
}
