import { getAllGenresTextService } from "../../services/GenresText/genreTextGetAllService.js";

export const getAllGenresText = async (req, res) => {
  try {
    const genresText = await getAllGenresTextService();
    return res.status(200).json(genresText);
  } catch (error) {
    console.error("Error in getAllGenresTextController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}