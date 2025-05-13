import styled from "styled-components";
import { useSearchBar } from "../../Hooks/Feed/useSearchBar";
import { useTranslation } from "react-i18next";

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const Input = styled.input`
  padding: 8px;
  padding-right: 30px; /* Espaço para o X */
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex: 1;
  width: 100%;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InputSearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
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
      <InputSearchContainer>
        <Input
          type="text"
          placeholder="Buscar por título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {title && (
          <ClearButton onClick={handleClear} aria-label="Limpar pesquisa">
            &times;
          </ClearButton>
        )}
      </InputSearchContainer>
      <Button onClick={handleSearch}>{t("search")}</Button>

      <Select
        value={genreName}
        onChange={(e) => setGenreName(e.target.value)}
      >
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