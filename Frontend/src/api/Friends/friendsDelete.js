import api from "../Config/apiClient";
import Cookies from "js-cookie";

export const deleteFriendship = async (friendId) => {
    try {
        const token = Cookies.get("authToken");
        const userData = JSON.parse(Cookies.get("userData") || "{}");
        const userId = userData.id;

        if (!userId) {
            throw new Error("ID do usuário não encontrado");
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("dados: ", userId, friendId)
        const response = await api.delete("/friendShip/delete", {
            data: { userId, friendId }
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao deletar amizade:", error);
        throw error;
    }
};