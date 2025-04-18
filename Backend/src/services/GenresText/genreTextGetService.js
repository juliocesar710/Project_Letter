import { getGenresTextRepository } from "../../repositories/GenresText/genreTextGetRepository.js";


export const getGenresTextService = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const genresText = await getGenresTextRepository(userId);

  if (!genresText || genresText.length === 0) {
    throw new Error("No genres text found for the user");
  }

  return genresText;
}