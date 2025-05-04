import AuthForm from "./AuthForm";
import { siginin } from "../../api/Auth/userLogin";

const LoginForm = () => {
  return (
    <AuthForm
      title="Entrar"
      redirectPath="/profile"
      onSubmitAPI={siginin}
      fields={[
        { name: "email", type: "email", placeholder: "E-mail" },
        { name: "password", type: "password", placeholder: "Senha" },
      ]}
    />
  );
};

export default LoginForm;
