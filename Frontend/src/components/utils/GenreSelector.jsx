import { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useGenreSelector } from "../../Hooks/utils/useGenreSelector";

const GenreContainer = styled.div`
  margin-bottom: 15px;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const TitleCheckList = styled.label`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

const GenreBadge = styled.label`
  padding: 8px 16px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.background};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.background : theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.light};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const HiddenCheckbox = styled.input`
  display: none;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const GenreSelector = ({ onChange, initialSelected = [] }) => {
  const { t } = useTranslation();
  const { genres, selectedGenres, toggleGenre } =
    useGenreSelector(initialSelected);

  useEffect(() => {
    if (onChange) onChange(selectedGenres);
  }, [selectedGenres, onChange]);

  return (
    <GenreContainer>
      <label>
        <TitleCheckList>{t("text genre")}</TitleCheckList>
      </label>
      <GenreList>
        {genres.map((genre) => (
          <GenreBadge
            key={genre.genreName}
            selected={selectedGenres.includes(genre.genreName)}
          >
            <HiddenCheckbox
              type="checkbox"
              checked={selectedGenres.includes(genre.genreName)}
              onChange={() => toggleGenre(genre.genreName)}
            />
            {genre.genreName}
          </GenreBadge>
        ))}
      </GenreList>
    </GenreContainer>
  );
};

export default GenreSelector;
