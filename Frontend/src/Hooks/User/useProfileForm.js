import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { updateUser } from "../../api/Auth/userUpdate";
import { useTranslation } from "react-i18next";

export const useProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    birthDate: "",
    profileImage: "",
    interests: [],
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {t} = useTranslation();

  useEffect(() => {
    const userData = JSON.parse(Cookies.get("userData") || "{}");
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      description: userData.description || "",
      birthDate: userData.birthDate || "",
      profileImage: userData.profileImage || "",
    });
    setSelectedGenres(userData.interests || []);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const payload = {
      ...formData,
      birthDate: formData.birthDate
        ? new Date(formData.birthDate).toISOString()
        : null,
      genres: selectedGenres,
    };

    try {
      const updatedUser = await updateUser(payload);
      Cookies.set("userData", JSON.stringify(updatedUser), { expires: 1 });
      setTimeout(() => {setLoading(false), setSuccessMessage(t("userupdatesuccess"));}, 2000);
      
    } catch (error) {
      setErrorMessage("Erro ao atualizar o usuário. Tente novamente.");
      console.error(error);
    }
  };

  return {
    formData,
    selectedGenres,
    loading,
    successMessage,
    errorMessage,
    handleChange,
    setSelectedGenres,
    handleSubmit,
  };
};
