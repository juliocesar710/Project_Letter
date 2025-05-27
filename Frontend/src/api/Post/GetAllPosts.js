import api from "../Config/apiClient";

export const getAllPosts = async (params = {}) => {
  try {
    const { id, ...otherParams } = params;

    if (id) {
      const response = await api.get(`/api/postGet/${id}`);
      return response.data;
    }

    const response = await api.get("/api/postGetAll", { params: otherParams });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};