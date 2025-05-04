import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";
import { useAuthForm } from "../../Hooks/useAuthForm";

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.padding.container};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.inputBackground};

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inputBackground};
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin: 5px 0;
`;
const AuthForm = ({ title, fields, onSubmitAPI, redirectPath }) => {
  const {
    formData,
    error,
    loading,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useAuthForm({ fields, onSubmitAPI, redirectPath });

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{title}</FormTitle>
      {fields.map(({ name, type, placeholder }) => (
        <div key={name}>
          {type === "password" ? (
            <PasswordInputWrapper>
              <Input
                type={showPassword[name] ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required
              />
              <PasswordToggleButton
                type="button"
                onClick={() => togglePasswordVisibility(name)}
                aria-label={
                  showPassword[name] ? "Ocultar senha" : "Mostrar senha"
                }
              >
                {showPassword[name] ? <EyeOff size={18} /> : <Eye size={18} />}
              </PasswordToggleButton>
            </PasswordInputWrapper>
          ) : (
            <Input
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          )}
        </div>
      ))}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="submit" disabled={loading}>
        {loading ? "Enviando..." : title}
      </Button>
    </FormContainer>
  );
};

export default AuthForm;
