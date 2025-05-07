import AuthForm from "./AuthForm";
import { siginin } from "../../api/Auth/userLogin";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation();
  return (
    <AuthForm
      title={t("login")}
      redirectPath="/profile"
      onSubmitAPI={siginin}
      fields={[
        { name: "email", type: "email", placeholder: t("email") },
        { name: "password", type: "password", placeholder: t("password") },
      ]}
    />
  );
};

export default LoginForm;
