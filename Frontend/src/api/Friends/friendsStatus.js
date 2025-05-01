import api from "../Config/apiClient";
import Cookies from "js-cookie";


export const updateFriendshipStatus = async (friendStatus) => {
  try {

    const token = Cookies.get("authToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;


    const response = await api.patch("/friendShip/status", friendStatus);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar status de amizade AQUIIII:", error);
    throw error;
  }
};