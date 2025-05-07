import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useAuthForm = ({ fields, onSubmitAPI, redirectPath }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: false }), {})
  );

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = (fieldName) => {
    setShowPassword((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const hasEmpty = fields.some((field) => !formData[field.name]);
    if (hasEmpty) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (
      fields.some((field) => field.name === "confirmPassword") &&
      formData.password !== formData.confirmPassword
    ) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      const data = await onSubmitAPI(formData);

      Cookies.set("authToken", data.token, { expires: 1 });
      Cookies.set("userData", JSON.stringify(data.user), { expires: 1 });

      setTimeout(() => {
        setLoading(false), navigate(redirectPath);
      }, 1500);
    } catch (error) {
      if (error.response?.data?.message === "User not found to here") {
        setError("Usuário não encontrado no banco de dados.");
      } else if (
        error.response?.data?.message === "Email and password are required"
      ) {
        setError("Email já está em uso.");
      } else if (error.response?.data?.message === "Invalid password") {
        setError("Senha inválida.");
      } else setError(error.response?.data?.message || "Erro ao processar.");
    }
  };

  return {
    formData,
    error,
    loading,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  };
};
