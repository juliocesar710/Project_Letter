import api from "../Config/apiClient";

export const getAllPosts = async (params = {}) => {
  try {
    const { id, ...otherParams } = params;

    if (id) {
      // Se o ID for fornecido, busca apenas o post específico
      const response = await api.get(`/api/postGet/${id}`);
      return response.data;
    }

    // Caso contrário, busca todos os posts com os filtros fornecidos
    const response = await api.get("/api/postGetAll", { params: otherParams });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};