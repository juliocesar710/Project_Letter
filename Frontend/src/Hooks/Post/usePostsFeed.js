import { useEffect, useState } from "react";
import { getAllPosts } from "../../api/Post/GetAllPosts";

export const usePostsFeed = (postsPerPage = 10) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Erro ao buscar posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortAlphabetically = () => {
    const sorted = [...posts].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );
    setPosts(sorted);
  };

  const sortByDate = () => {
    const sorted = [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setPosts(sorted);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    scrollToTop();
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    scrollToTop();
  };

  return {
    posts,
    loading,
    currentPosts,
    currentPage,
    handleNextPage,
    handlePreviousPage,
    sortAlphabetically,
    sortByDate,
    isLastPage: indexOfLastPost >= posts.length,
    isFirstPage: currentPage === 1,
  };
};
