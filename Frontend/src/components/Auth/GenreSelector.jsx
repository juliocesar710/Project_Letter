import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllGenresText } from "../../api/GenreText/genreTextGetAll";

const GenreContainer = styled.div`
  margin-bottom: 15px;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
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
`;

const GenreSelector = ({ selectedGenres, setSelectedGenres }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAllGenresText();
        setGenres(data);
      } catch (error) {
        console.error("Erro ao buscar gêneros textuais:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <GenreContainer>
      <label>Gêneros Textuais:</label>
      <GenreList>
        {genres.map((genre) => (
          <GenreBadge
            key={genre.genreName}
            selected={selectedGenres.includes(genre.genreName)}
          >
            <HiddenCheckbox
              type="checkbox"
              checked={selectedGenres.includes(genre.genreName)}
              onChange={() => handleGenreChange(genre.genreName)}
            />
            {genre.genreName}
          </GenreBadge>
        ))}
      </GenreList>
    </GenreContainer>
  );
};

export default GenreSelector;
