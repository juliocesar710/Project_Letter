import api from "../Config/apiClient";
import Cookies from "js-cookie";

export const deleteComment = async (commentId) => {
  try {
    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.post(`/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};