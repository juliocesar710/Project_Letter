import api from "../Config/apiClient";
import Cookies from "js-cookie";

export const deletePost = async (postId) => {
  try {
    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.delete(`/api/postDelete/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar o post:", error);
    throw error;
  }
}