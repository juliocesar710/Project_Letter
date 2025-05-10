import { useState } from "react";
import { getAllPosts } from "../api/Post/GetAllPosts";

export const useSearchPosts = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async ({ title = "", genreId = null }) => {
    setLoading(true);
    try {
      const filters = {};
      if (title) filters.title = title;
      if (genreId) filters.genreId = genreId;

      const posts = await getAllPosts(filters);
      setResults(posts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, search };
};
