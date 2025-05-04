import AuthForm from "./AuthForm";
import { signup } from "../../api/Auth/userRegister";

const RegisterForm = () => {
  return (
    <AuthForm
      title="Registrar"
      redirectPath="/profile"
      onSubmitAPI={signup}
      fields={[
        { name: "name", type: "text", placeholder: "Nome" },
        { name: "email", type: "email", placeholder: "E-mail" },
        { name: "password", type: "password", placeholder: "Senha" },
        { name: "confirmPassword", type: "password", placeholder: "Confirmar Senha" },
      ]}
    />
  );
};

export default RegisterForm;
