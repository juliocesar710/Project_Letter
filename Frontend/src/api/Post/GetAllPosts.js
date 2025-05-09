import api from "../Config/apiClient";

export const getAllPosts = async () => {
  try {
    const response = await api.get("/api/postGetAll");
    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
