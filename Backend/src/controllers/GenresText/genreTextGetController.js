import { getGenresTextService } from '../../services/GenresText/genreTextGetService.js';

export const genreTextGet = async (req, res) => {
  try {
    const  userId  = req.user.id;
    const genresText = await getGenresTextService(userId);
    res.status(200).json(genresText);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}