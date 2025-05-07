import AuthForm from "./AuthForm";
import { signup } from "../../api/Auth/userRegister";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const { t } = useTranslation();
  return (
    <AuthForm
      title={t("register")}
      redirectPath="/profile"
      onSubmitAPI={signup}
      fields={[
        { name: "name", type: "text", placeholder: t("name") },
        { name: "email", type: "email", placeholder: t("email") },
        { name: "password", type: "password", placeholder: t("password") },
        {
          name: "confirmPassword",
          type: "password",
          placeholder: t("confirm password"),
        },
      ]}
    />
  );
};

export default RegisterForm;
