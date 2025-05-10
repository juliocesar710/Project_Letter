import api from "../Config/apiClient";

export const getAllGenresText = async () => {
  try {
    const response = await api.get("/genreText/all");
   
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar gêneros textuais:", error);
    throw error;
  }
};