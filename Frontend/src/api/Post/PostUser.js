import api from "../Config/apiClient";
import Cookies from "js-cookie";


export const postUser = async (user) => {
  try {
     const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.post("/api/post", user);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    throw error;
  }
};