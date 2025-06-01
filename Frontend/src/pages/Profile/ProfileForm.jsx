import { Input, TextArea } from "../../styles/Shared/inputs";
import { BaseButton } from "../../styles/Shared/buttons";
import { Form, FormContainer, FormTitle } from "../../styles/Shared/form";
import {
  ProfileImage,
  ProfileImageContainer,
} from "../../styles/Shared/profile";
import Sucess from "../../components/utils/Alerts/Sucess";
import Error from "../../components/utils/Alerts/Error";
import GenreSelector from "../../components/utils/GenreSelector";
import { useProfileForm } from "../../Hooks/User/useProfileForm";
import { useTranslation } from "react-i18next";
import Header from "../../components/utils/Layout/Header";
import styled from "styled-components";

// New styled component for labels
const InputLabel = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
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
    <>
      <Header />
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormTitle>{isEdit ? t("editProfile") : "Editando"}</FormTitle>
          <ProfileImageContainer>
            <ProfileImage src={formData.profileImage} alt="Profile Image" />
          </ProfileImageContainer>

          <InputLabel htmlFor="name">{t("name")}</InputLabel>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder={t("name")}
            value={formData.name}
            onChange={handleChange}
          />

          <InputLabel htmlFor="email">{t("email")}</InputLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder={t("email")}
            value={formData.email}
            onChange={handleChange}
          />

          <InputLabel htmlFor="description">{t("biography")}</InputLabel>
          <TextArea
            id="description"
            name="description"
            placeholder={t("biography")}
            value={formData.description}
            onChange={handleChange}
          />

          <InputLabel htmlFor="birthDate">{t("date of birth")}</InputLabel>
          <Input
            id="birthDate"
            type="date"
            name="birthDate"
            placeholder={t("date of birth")}
            value={formData.birthDate}
            onChange={handleChange}
          />

          <InputLabel htmlFor="profileImage">
            URL da Imagem de Perfil
          </InputLabel>
          <Input
            id="profileImage"
            type="text"
            name="profileImage"
            placeholder="URL da Imagem de Perfil"
            value={formData.profileImage}
            onChange={handleChange}
          />

          <GenreSelector
            initialSelected={selectedGenres}
            onChange={setSelectedGenres}
          />

          <BaseButton width="100%" type="submit" disabled={loading}>
            {loading ? t("saving") : isEdit ? t("save") : "Registrar"}
          </BaseButton>
          {successMessage && <Sucess message={successMessage} />}
          {errorMessage && <Error message={errorMessage} />}
        </Form>
      </FormContainer>
    </>
  );
};

export default ProfileForm;
