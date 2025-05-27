import { useEffect, useState } from "react";
import { getAllGenresText } from "../../api/GenreText/genreTextGetAll";

export const useGenreSelector = (initialSelected = []) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(initialSelected);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAllGenresText();
        setGenres(data);
      } catch (error) {
        console.error("Erro ao buscar gêneros textuais:", error);
      }
    };

    fetchGenres();
  }, []);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  return {
    genres,
    selectedGenres,
    setSelectedGenres,
    toggleGenre,
  };
};
