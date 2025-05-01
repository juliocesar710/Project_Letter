import { getFriendProfileService } from "../../services/NetWork/friendProfileService.js";

export const getFriendProfile = async (req, res) => {
  try {
    const { friendId } = req.params;
    const userId = req.user.id;

    const friendProfile = await getFriendProfileService(userId, friendId);
    return res.json(friendProfile);
  } catch (error) {
    console.error("Erro ao buscar perfil do amigo:", error);
    
    if (error.message === "Você não tem permissão para ver este perfil") {
      return res.status(403).json({ error: error.message });
    }
    
    if (error.message === "Perfil não encontrado") {
      return res.status(404).json({ error: error.message });
    }
    
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}; 