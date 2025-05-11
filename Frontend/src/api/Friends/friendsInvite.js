import api from "../Config/apiClient";
import Cookies from "js-cookie";

export const inviteFriend = async (friendId) => {
    try {
        const token = Cookies.get("authToken");
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
       
        const response = await api.post("/friendShip/invite", {friendId});
        
        return response.data;
    } catch (error) {
        console.error("Erro ao convidar amigo:", error);
        throw error;
    }
}