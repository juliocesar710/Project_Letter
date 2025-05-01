import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFriendProfile } from "../api/Friends/friendsProfile";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background},
    ${({ theme }) => theme.colors.border}
  );
  position: relative;
`;

const ProfileCard = styled.div`
  flex: 1;
  max-width: 800px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const BackButton = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ProfileImage = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-bottom: 16px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInitial = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const GenreTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
`;

const FriendProfile = () => {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendProfile = async () => {
      try {
        const data = await getFriendProfile(friendId);
        console.log("data: ",data);
        setFriend(data);
      } catch (err) {
        setError(err.error || "Erro ao carregar perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchFriendProfile();
  }, [friendId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <PageContainer>
      <ProfileCard>
        <BackButton onClick={() => navigate(-1)}>← Voltar</BackButton>

        <div className="flex flex-col items-center my-8">
          {friend.profileImage ? (
            <ProfileImage>
              <img src={friend.profileImage} alt={friend.name} />
            </ProfileImage>
          ) : (
            <ProfileInitial>
              {friend.name.charAt(0).toUpperCase()}
            </ProfileInitial>
          )}
          <h1 className="text-2xl font-bold mb-2">{friend.name}</h1>
          <p className="text-gray-500">
            Membro desde {format(new Date(friend.createdAt), "MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>

        {friend.description && (
          <div className="mb-6">
            <SectionTitle>Sobre</SectionTitle>
            <p>{friend.description}</p>
          </div>
        )}

        {friend.birthDate && (
          <div className="mb-6">
            <SectionTitle>Data de Nascimento</SectionTitle>
            <p>
              {format(new Date(friend.birthDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
        )}

        {friend.genres && friend.genres.length > 0 && (
          <div>
            <SectionTitle>Gêneros Preferidos</SectionTitle>
            <div className="flex flex-wrap">
              {friend.genres.map((genre) => (
                <GenreTag key={genre.id}>
                  {genre.name}
                </GenreTag>
              ))}
            </div>
          </div>
        )}
      </ProfileCard>
    </PageContainer>
  );
};

export default FriendProfile; 