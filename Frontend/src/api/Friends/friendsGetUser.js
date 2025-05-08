import api from "../Config/apiClient";
import Cookies from "js-cookie";


export const friendsGetUser = async () => {

    try {
        const token = Cookies.get("authToken");
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
        const response = await api.get("/friendShip/get");
     
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
}
