import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getAllPosts } from "../../api/Post/GetAllPosts";

export const useInterestPosts = (postsPerPage = 10) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(Cookies.get("userData") || "{}");
        const interests = userData.genreTexts || [];
       

        const allPosts = await getAllPosts();

        const filteredPosts = allPosts.filter((post) =>
          post.genreTexts?.some((postGenre) =>
            interests.includes(postGenre.name)
          )
        );

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Erro ao buscar posts por interesse:", error.message);
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

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    loading,
    currentPosts,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    sortAlphabetically,
    sortByDate,
    totalPosts: posts.length,
  };
};
