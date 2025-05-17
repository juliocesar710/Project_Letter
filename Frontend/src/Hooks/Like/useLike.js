import { useState, useEffect } from "react";
import { postLike } from "../../api/Like/PostLike";
import { deleteLike } from "../../api/Like/DeleteLike";
import { getUsersFromPost } from "../../api/Like/getUsersFromPost";
import Cookies from "js-cookie";

export const useLike = (initialLiked, initialLikesCount, postId) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const users = await getUsersFromPost(postId);
        const userData = Cookies.get("userData");
        const loggedUserId = userData ? JSON.parse(userData).id : null;
        
        const userLiked = users.some(user => user.id === loggedUserId);
        setLiked(userLiked);
      } catch (error) {
        console.error("Erro ao verificar likes:", error);
        setLiked(initialLiked); // Fallback para o valor inicial
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLikeStatus();
  }, [postId, initialLiked]);

  const toggleLike = async () => {
    if (isLoading) return;
    
    try {
      if (liked) {
        await deleteLike(postId);
        setLikesCount(prev => prev - 1);
      } else {
        await postLike(postId);
        setLikesCount(prev => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Erro ao alternar like:", error);
    }
  };

  return { liked, likesCount, toggleLike, isLoading };
};