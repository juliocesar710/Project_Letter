import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getAllPosts } from "../../api/Post/GetAllPosts";
import { friendsGetUser } from "../../api/Friends/friendsGetUser";

export const useFriendsPosts = (postsPerPage = 5) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(Cookies.get("userData") || "{}");

        const friends = await friendsGetUser(userData);
        const friendIds = friends.map((f) => f.friend.id);

        const allPosts = await getAllPosts();

        const filteredPosts = allPosts.filter(
          (post) => friendIds.includes(post.user.id) || post.user.id === userData.id
        );

        setPosts(filteredPosts);
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
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return {
    loading,
    currentPosts,
    currentPage,
    totalPages,
    setCurrentPage,
    sortAlphabetically,
    sortByDate,
    totalPosts: posts.length,
  };
};
