import api from "../Config/apiClient";
import Cookies from "js-cookie";


export const getFriendProfile = async (friendId) => {
  try {

    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get(`/friendShip/profile/${friendId}`, {
      
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar perfil do amigo" };
  }
}; 