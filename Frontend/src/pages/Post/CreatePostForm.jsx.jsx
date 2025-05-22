import styled from "styled-components";

import {
  FormContainer,
} from "../../styles/Shared/form";
import { Input, TextArea } from "../../styles/Shared/Inputs";
import { Button } from "../../styles/Shared/buttons";
import Sucess from "../../components/utils/Alerts/Sucess";
import Error from "../../components/utils/Alerts/Error";
import GenreSelector from "../../components/utils/GenreSelector";
import { usePostForm } from "../../Hooks/Post/usePostForm";
import { useTranslation } from "react-i18next";

const StyledForm = styled.form`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.light};
  padding: ${({ theme }) => theme.padding.container};
  width: 100%;
  max-width: 500px;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.borderFocus}20;
  }
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

const CreatePostForm = () => {
  const {
    formData,
    selectedGenres,
    loading,
    successMessage,
    errorMessage,
    handleChange,
    setSelectedGenres,
    handleSubmit,
  } = usePostForm();
  const { t } = useTranslation();

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        {successMessage && <Sucess message={successMessage} />}
        {errorMessage && <Error message={errorMessage} />}

        <FormField>
          <Input
            type="text"
            name="title"
            placeholder={t("title")}
            value={formData.title}
            onChange={handleChange}
            disabled={loading}
          />
        </FormField>

        <FormField>
          <TextArea
            name="description"
            placeholder={t("description")}
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
          />
        </FormField>
        <FormField>
          <Input
            type="text"
            name="image"
            placeholder="URL da imagem"
            value={formData.image}
            onChange={handleChange}
            disabled={loading}
          />
        </FormField>

        {formData.image && (
          <FormField>
            <img
              src={formData.image}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "8px",
                marginTop: "10px",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </FormField>
        )}

        <FormField>
          <GenreSelector
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            disabled={loading}
          />
        </FormField>

        <Button type="submit" disabled={loading}>
          {loading ? t("creating") : t("createpost")}
        </Button>
      </StyledForm>
    </FormContainer>
  );
};

export default CreatePostForm;
