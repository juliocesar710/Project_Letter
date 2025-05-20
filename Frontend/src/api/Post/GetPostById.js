import api from "../Config/apiClient";
import Cookies from "js-cookie";

export const getPostById = async (postId) => {
  try {
    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.get(`/api/postGet/${postId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("Post não encontrado.");
      return null; 
    }

    console.error("Erro ao obter post:", error);
    throw error;
  }
}