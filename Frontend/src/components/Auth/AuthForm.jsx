import styled from "styled-components";
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

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.padding.container};
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const InputGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.padding.button};
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.padding.input};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSize.base};
  background-color: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.subtleText};
  }
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

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.padding.button};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textContrast};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.light};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSize.small};
  margin: ${({ theme }) => theme.padding.button} 0;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.error}10;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border-left: 3px solid ${({ theme }) => theme.colors.error};
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