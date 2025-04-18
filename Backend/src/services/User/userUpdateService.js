import { updateUserRepository } from "../../repositories/User/userUpdateRepository.js";

export const updateUserService = async (userId, data) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const { genres, ...userData } = data;

 
  if (genres) {
    await updateUserRepository.updateGenres(userId, genres);
  }

  
  if (Object.keys(userData).length > 0) {
    await updateUserRepository.updateUserData(userId, userData);
  }

 
  const updatedUser = await updateUserRepository.getUserById(userId);
  return updatedUser;
};