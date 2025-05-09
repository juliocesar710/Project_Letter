import api from "../Config/apiClient";
import Cookies from "js-cookie";

export const getAllPostByUser = async () => {
  try {
    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.get("/api/postGetAllUser");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("Nenhum post encontrado para este usuário.");
      return []; 
    }

    console.error("Erro ao obter posts:", error);
    throw error;
  }
};

