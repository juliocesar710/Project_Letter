import { useState } from "react";
import { getAllPosts } from "../api/Post/GetAllPosts";
export const useSearchPosts = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async ({ title = "", genreName = "" }) => {
    setLoading(true);
    try {
      const filters = {};
      if (title) filters.title = title;
      if (genreName) filters.genreName = genreName; // Adiciona o filtro pelo nome do gênero textual

      const posts = await getAllPosts(filters);

      // Filtrar os posts no frontend, caso o backend não suporte o filtro diretamente
      const filteredPosts = genreName
        ? posts.filter((post) =>
            post.genreTexts.some((genre) =>
              genre.name.toLowerCase().includes(genreName.toLowerCase())
            )
          )
        : posts;

      setResults(filteredPosts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return { results, loading, search, clearResults };
};