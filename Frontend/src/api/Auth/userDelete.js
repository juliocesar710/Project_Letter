import api from "../Config/apiClient";
import Cookies from "js-cookie";

export const userDelete = async (userId) => {
  try {
    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.delete("auth/delete", userId);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
