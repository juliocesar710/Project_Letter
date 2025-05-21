import styled from "styled-components";
import {
 
  Button,
  ErrorMessage,
  FormTitle,
} from "../../styles/SharedComponents";
import { Input } from "../../styles/Shared/Inputs";
import { Eye, EyeOff } from "lucide-react";
import { useAuthForm } from "../../Hooks/Auth/useAuthForm";
import { useTranslation } from "react-i18next";
const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  padding: ${({ theme }) => theme.padding.container};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.shadows.light};
`;
const InputGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.padding.button};
  position: relative;
`;
const PasswordToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.subtleText};
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    background-color: ${({ theme }) => theme.colors.secondary}30;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.borderFocus};
  }
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
  const { t } = useTranslation();
  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{title}</FormTitle>

      {fields.map(({ name, type, placeholder }) => (
        <InputGroup key={name}>
          {type === "password" ? (
            <>
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
                  showPassword[name] ? t("hide_password") : t("show_password")
                }
              >
                {showPassword[name] ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </PasswordToggleButton>
            </>
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
        </InputGroup>
      ))}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Button type="submit" disabled={loading}>
        {loading ? t("sending") : title}
      </Button>
    </FormContainer>
  );
};

export default AuthForm;
