import api from "../Config/apiClient";
import Cookies from "js-cookie";

export const postLike = async (postId) => {
  try {
    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.post(`/likes/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    throw error;
  }
}