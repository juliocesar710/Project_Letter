import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MoveRight, MoveLeft, Mail } from "lucide-react";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px; 
  align-items: center;
  padding: ${({ theme }) => theme.padding.container};
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primaryDark};
  box-shadow: ${({ theme }) => theme.shadows.light};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    gap: 5px;
  }
`;

const NavButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.inputBackground};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  min-width: 40px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuickLink = styled(NavButton)`
  background: none;
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 10px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.inputBackground};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
const AppNameButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: "Playfair Display", serif; /* ou outra caligráfica */
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
  }
`;

const AppNameText = styled.p`
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: none;
      color: ${({ theme }) => theme.colors.text};
      font-family: "Playfair Display", serif; /* ou outra caligráfica */
      font-size: 1.2rem;
      cursor: pointer;
      font-weight: bold;
      text-decoration: none;
      &:hover {
        color: ${({ theme }) => theme.colors.accent};
        text-decoration: underline;
      }
      &:active {
        transform: translateY(0);
      }

`

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <NavGroup>
        <NavButton
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          title="Voltar"
        >
          <MoveLeft size={20} />
        </NavButton>
        <NavButton
          onClick={() => navigate(1)}
          aria-label="Avançar"
          title="Avançar"
        >
          <MoveRight size={20} />
        </NavButton>
        <AppNameButton onClick={() => navigate("/")} title="Início">
          <Mail size={18} />
          <AppNameText>Letter</AppNameText>
        </AppNameButton>
      </NavGroup>

      <NavGroup>
        <QuickLink onClick={() => navigate("/feed")} title="Feed">
          Feed
        </QuickLink>
        <QuickLink onClick={() => navigate("/profile")} title="Perfil">
          Perfil
        </QuickLink>
        <QuickLink onClick={() => navigate("/friends")} title="Amigos">
          Amigos
        </QuickLink>
      </NavGroup>
    </HeaderContainer>
  );
};

export default Header;
