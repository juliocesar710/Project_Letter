import { useEffect, useState } from "react";
import { getAllGenresText } from "../../api/GenreText/genreTextGetAll";

export const useSearchBar = (onSearch, onClear) => {
  const [title, setTitle] = useState("");
  const [genreName, setGenreName] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAllGenresText();
        setGenres(data);
      } catch (err) {
        console.error("Erro ao carregar gêneros:", err);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = () => {
    onSearch({ title, genreName });
  };

  const handleClear = () => {
    setTitle("");
    setGenreName("");
    onClear();
  };

  return {
    title,
    setTitle,
    genreName,
    setGenreName,
    genres,
    handleSearch,
    handleClear,
  };
};
