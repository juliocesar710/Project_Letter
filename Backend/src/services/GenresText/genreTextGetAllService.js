import {getAllGenresTextRepository } from '../../repositories/GenresText/genreTextGetAllRespository.js';

export const getAllGenresTextService = async () => {
  try {
    const genresText = await getAllGenresTextRepository();
    return genresText;
  } catch (error) {
    console.error('Error in getAllGenresTextService:', error);
    throw new Error('Could not fetch all genres text');
  }
}