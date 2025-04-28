import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllGenresText } from "../../api/GenreText/genreTextGetAll";

const GenreContainer = styled.div`
  margin-bottom: 15px;
`;

const GenreItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
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
      {genres.map((genre) => (
        <GenreItem key={genre.genreName}>
          <Checkbox
            type="checkbox"
            checked={selectedGenres.includes(genre.genreName)}
            onChange={() => handleGenreChange(genre.genreName)}
          />
          {genre.genreName}
        </GenreItem>
      ))}
    </GenreContainer>
  );
};

export default GenreSelector;