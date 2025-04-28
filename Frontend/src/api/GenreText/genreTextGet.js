import api from "../Config/apiClient";
import Cookies from "js-cookie";


export const getUserGenresText = async () => {
  try {

    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get("/genreText/user");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar gêneros textuais do usuário:", error);
    throw error;
  }
};