import styled from "styled-components";

const Container = styled.div`
  display: flex; /* Coloca os 3 blocos lado a lado */
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SideBarLeft = styled.aside`
  width: 20%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const MainContent = styled.main`
  width: 60%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
  padding: 1rem;
`;

const SideBarRight = styled.aside`
  width: 20%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.surfaceDark};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
`;

const FeedPage = () => {
  return (
    <Container>
      <SideBarLeft>
        {/* Futuro componente: <UserInfo /> */}
      </SideBarLeft>

      <MainContent>
        {/* Futuro componente: <PostList /> */}
      </MainContent>

      <SideBarRight>
        {/* Futuro componente: <Suggestions /> ou <Ranking /> */}
      </SideBarRight>
    </Container>
  );
};

export default FeedPage;
