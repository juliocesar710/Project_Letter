import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-top: 5px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;

const ResultItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const ResultImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const ResultName = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const FriendSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Aqui você implementaria a lógica de busca
    // Por enquanto, vamos simular resultados
    if (value.length > 2) {
      // Simulação de resultados
      setResults([
        { id: 1, name: 'Usuário 1', profileImage: 'https://via.placeholder.com/30' },
        { id: 2, name: 'Usuário 2', profileImage: 'https://via.placeholder.com/30' },
      ]);
    } else {
      setResults([]);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Buscar amigos..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {results.length > 0 && (
        <SearchResults>
          {results.map((user) => (
            <ResultItem key={user.id}>
              <ResultImage src={user.profileImage} alt={user.name} />
              <ResultName>{user.name}</ResultName>
            </ResultItem>
          ))}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default FriendSearch; 