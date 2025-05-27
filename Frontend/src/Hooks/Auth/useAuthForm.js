import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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

    if (
      fields.some((field) => field.name === "confirmPassword") &&
      formData.password !== formData.confirmPassword
    ) {
      setError(t("error password"));
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
      if (error.response?.data?.message === "User not found") {
        console.log(error.response?.data?.message);
        setError(t("error user not found"));
      } else if (error.response?.data?.message === "Email already exists") {
        setError(t("email already exists"));
      } else if (error.response?.data?.message === "Invalid password") {
        setError(t("error invalid password"));
      } else setError(error.response?.data?.message || "Erro ao processar.");
      setLoading(false);
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
