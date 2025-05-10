import { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllGenresText } from "../../api/GenreText/genreTextGetAll"; // ou caminho correto

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex: 1;
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
`;

const SearchBar = ({ onSearch }) => {
  const [title, setTitle] = useState("");
  const [genreId, setGenreId] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAllGenresText();
        console.log("data", data);
      
        setGenres(data);
      } catch (err) {
        console.error("Erro ao carregar gêneros:", err);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = () => {
    onSearch({ title, genreId: genreId || null });
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Buscar por título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Select
        value={genreId}
        onChange={(e) => setGenreId(e.target.value)}
      >
        <option value="">Todos os Gêneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.genreName}
          </option>
        ))}
      </Select>
      <Button onClick={handleSearch}>Buscar</Button>
    </SearchContainer>
  );
};

export default SearchBar;
