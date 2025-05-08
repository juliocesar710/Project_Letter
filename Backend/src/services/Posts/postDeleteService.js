import prisma from "../../utils/prismaClient.js";
import { deletePostRepository } from "../../repositories/Posts/postDeleteRepository.js";

export const deletePostService = async (userId, postId) => {
  const postIdInt = parseInt(postId, 10);

  if (isNaN(postIdInt)) {
    throw new Error("Invalid postId. It must be a number.");
  }

  const post = await prisma.post.findUnique({
    where: { id: postIdInt },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.userId !== userId) {
    throw new Error("You are not authorized to delete this post");
  }

  const deletedPost = await deletePostRepository(postIdInt);
  return deletedPost;
};