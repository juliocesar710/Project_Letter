import styled from "styled-components";
import Sucess from "../components/utils/Alerts/Sucess";
import Error from "../components/utils/Alerts/Error";
import GenreSelector from "../components/utils/GenreSelector";
import { useProfileForm } from "../Hooks/User/useProfileForm";
import { useTranslation } from "react-i18next";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background},
    ${({ theme }) => theme.colors.border}
  );
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const Form = styled.form`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.light};
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.padding.input};
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.inputBackground};

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.padding.input};
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.inputBackground};

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.padding.button};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inputBackground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;

const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  margin: 0 auto 20px auto;
  object-fit: cover;
  object-position: center;
  display: block;
`;

const ProfileForm = ({ isEdit = false }) => {
  const { t } = useTranslation();

  const {
    formData,
    selectedGenres,
    loading,
    successMessage,
    errorMessage,
    handleChange,
    setSelectedGenres,
    handleSubmit,
  } = useProfileForm();

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormTitle>{isEdit ? t("edit profile") : "Editando"}</FormTitle>

        <ProfileImage src={formData.profileImage} alt="Profile Image" />
        <Input
          type="text"
          name="name"
          placeholder={t("name")}
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder={t("email")}
          value={formData.email}
          onChange={handleChange}
        />
        <TextArea
          name="description"
          placeholder={t("biography")}
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          type="date"
          name="birthDate"
          placeholder={t("date of birth")}
          value={formData.birthDate}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="profileImage"
          placeholder="URL da Imagem de Perfil"
          value={formData.profileImage}
          onChange={handleChange}
        />
        <GenreSelector
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
        <Button type="submit" disabled={loading}>
          {loading ? t("saving") : isEdit ? t("save") : "Registrar"}
        </Button>
        {successMessage && <Sucess message={successMessage} />}
        {errorMessage && <Error message={errorMessage} />}
      </Form>
    </FormContainer>
  );
};

export default ProfileForm;
