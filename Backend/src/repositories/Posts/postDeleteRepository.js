import prisma from '../../utils/prismaClient.js';

export const deletePostRepository = async (postId) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return deletedPost;
  } catch (error) {
    throw new Error('Error deleting post: ' + error.message);
  }
};