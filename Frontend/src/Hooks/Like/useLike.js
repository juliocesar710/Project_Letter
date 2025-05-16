import { useState } from "react";
import { postLike } from "../../api/Like/PostLike";
import { deleteLike } from "../../api/Like/DeleteLike";

export const useLike = (initialLiked, initialLikesCount, postId) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const toggleLike = async () => {
    try {
      if (liked) {
        await deleteLike(postId);
        setLikesCount((prev) => prev - 1);
      } else {
        await postLike(postId);
        setLikesCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Erro ao alternar like:", error);
    }
  };

  return { liked, likesCount, toggleLike };
};