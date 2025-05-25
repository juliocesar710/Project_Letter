import styled from "styled-components";
import { useSearchBar } from "../../Hooks/Feed/useSearchBar";
import { useTranslation } from "react-i18next";
import { Input } from "../../styles/Shared/Inputs";
import {
  BaseButton,
  IconButton,
} from "../../styles/Shared/buttons";
const SearchContainer = styled.div`
  display: flex;

  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  position: relative;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

const Select = styled.select`
  width: ${({ width }) => width || "auto"};
  padding: ${({ theme }) => theme.padding.input};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    outline: none;
  }

  option {
    background-color: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SearchBar = ({ onSearch, onClear }) => {
  const { t } = useTranslation();
  const {
    title,
    setTitle,
    genreName,
    setGenreName,
    genres,
    handleSearch,
    handleClear,
  } = useSearchBar(onSearch, onClear);

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Buscar por título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {title && (
        <IconButton
          position="absolute"
          top="1.5rem"
          right="1rem"
          size="2rem"
          onClick={handleClear}
          aria-label="Limpar pesquisa"
        >
          &times;
        </IconButton>
      )}

      <BaseButton width="300px" onClick={handleSearch}>
        {t("search")}
      </BaseButton>

      <Select value={genreName} onChange={(e) => setGenreName(e.target.value)}>
        <option value="">{t("allGenres")}</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.genreName}>
            {genre.genreName}
          </option>
        ))}
      </Select>
    </SearchContainer>
  );
};

export default SearchBar;
