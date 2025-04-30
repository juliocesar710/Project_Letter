import { findFriendship, findFriendProfile } from "../../repositories/NetWork/friendProfileRepository.js";

export const getFriendProfileService = async (userId, friendId) => {
  const friendship = await findFriendship(userId, friendId);

  if (!friendship) {
    throw new Error("Você não tem permissão para ver este perfil");
  }

  const friendProfile = await findFriendProfile(friendId);

  if (!friendProfile) {
    throw new Error("Perfil não encontrado");
  }

  // Formata os gêneros de texto
  const formattedProfile = {
    ...friendProfile,
    genres: friendProfile.GenreTextFromUser.map(gt => gt.genreText),
    GenreTextFromUser: undefined
  };

  return formattedProfile;
}; 