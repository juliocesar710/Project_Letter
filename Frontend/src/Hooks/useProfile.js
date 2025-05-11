// src/Hooks/useProfile.js ou .ts

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getUserGenresText } from "../api/GenreText/genreTextGet";
import { userDelete } from "../api/Auth/userDelete";

export const useProfile = () => {
  const [userGenres, setUserGenres] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const navigate = useNavigate();

  const userData = JSON.parse(Cookies.get("userData") || "{}");

  const user = {
    name: userData.name || "Usuário",
    email: userData.email || "email@exemplo.com",
    bio: userData.description || "Sem biografia disponível.",
    birthDate: userData.birthDate || "Data de nascimento não informada.",
    profileImage: userData.profileImage || "link para imagem padrão",
    interests: userGenres,
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getUserGenresText();
        setUserGenres(genres.map((g) => g.genreName));
      } catch (err) {
        console.error("Erro ao buscar gêneros:", err);
      }
    };
    fetchGenres();
  }, []);

  const handleLogout = () => setConfirmLogout(true);

  const confirmLogoutAction = () => {
    Cookies.remove("authToken");
    Cookies.remove("userData");
    navigate("/auth");
    setConfirmLogout(false);
  };

  const cancelLogout = () => setConfirmLogout(false);

  const handleDeleteAccount = () => setConfirmDelete(true);

  const confirmDeleteAccount = async () => {
    try {
      await userDelete(userData.id);
      Cookies.remove("authToken");
      Cookies.remove("userData");
      navigate("/auth");
    } catch (err) {
      console.error("Erro ao deletar conta:", err);
    } finally {
      setConfirmDelete(false);
    }
  };

  const cancelDeleteAccount = () => setConfirmDelete(false);

  return {
    user,
    confirmDelete,
    confirmLogout, 
    handleLogout,
    handleDeleteAccount,
    confirmDeleteAccount,
    cancelDeleteAccount,
    confirmLogoutAction, 
    cancelLogout, 
  };
};
