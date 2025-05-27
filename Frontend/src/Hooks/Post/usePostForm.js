import { useState } from "react";
import { postUser } from "../../api/Post/postUser"; 
import { useTranslation } from "react-i18next";

export const usePostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [selectedGenres, setSelectedGenres] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (genres) => {
    const normalizedGenres = Array.isArray(genres) ? genres : [genres];
    setFormData((prev) => ({ ...prev, genres: normalizedGenres }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
      const payload = {
        title: formData.title,
        description: formData.description,
        image: formData.image, 
        genreTexts: selectedGenres,
      };
      
      await postUser(payload);
      setSuccessMessage(t("postcreatedsuccess") || "Post criado com sucesso!");
      setFormData({
        title: "",
        description: "",
        image: "",
        genreTexts: [], // Reset para array vazio
      });
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      setErrorMessage(t("postcreateerror") || "Erro ao criar o post.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    selectedGenres, // Expõe os gêneros selecionados
    setSelectedGenres, // Expõe a função dedicada
    loading,
    successMessage,
    errorMessage,
    handleChange,
    setFormData: (newData) => {
      // Garante que genres sempre seja um array ao atualizar o formData
      const normalizedData = {
        ...newData,
        genreTexts: Array.isArray(newData.genreTexts) ? newData.genreTexts : []
      };
      setFormData(normalizedData);
    },
    handleGenreChange, // Nova função específica para gêneros
    handleSubmit,
  };
};