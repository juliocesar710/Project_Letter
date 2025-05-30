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
