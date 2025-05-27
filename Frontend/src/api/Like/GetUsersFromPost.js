import api from "../Config/apiClient";
import Cookies from "js-cookie";

export const getUsersFromPost = async (postId) => {
  try {
    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.get(`/likes/${postId}/users`);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    throw error;
  }
}