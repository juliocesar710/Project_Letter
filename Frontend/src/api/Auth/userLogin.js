import api from "../Config/apiClient";

export const siginin = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    console.log("Usuário registrado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao registrar usuário:",
      error.response?.data || error.message
    );
    throw error;
  }
}