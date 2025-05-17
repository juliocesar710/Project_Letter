import api from "../Config/apiClient";
import Cookies from "js-cookie";

export const getComment = async (postId) => {
  try {
    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get(`/comments/post/${postId}`);
    console.log("Response from API:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
