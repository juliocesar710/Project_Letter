import api from "../Config/apiClient";
import Cookies from "js-cookie";

export const getPostsFromUser = async (userId) => {
  try {
    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.get(`/likes/user/${userId}`);
    console.log("Posts from user:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts from user:", error);
    throw error;
  }
};
