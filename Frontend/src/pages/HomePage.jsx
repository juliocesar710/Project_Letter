import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BookOpen, PenSquare, Users, Sparkles, Bookmark } from "lucide-react";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  text-align: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 800px;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Quote = styled.blockquote`
  font-size: 1.2rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  position: relative;

  &::before,
  &::after {
    content: '"';
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.5;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  width: 100%;
  max-width: 900px;

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textContrast};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentDark};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/auth");
  };

  const handleExplore = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container>
      <BookOpen
        size={64}
        color="var(--theme-colors-accent)"
        style={{ marginBottom: "1rem" }}
      />

      <Title>{t("welcome")}</Title>

      <Description>{t("description of letter")}</Description>

      <Quote>
        {t("quote1")}
        <br />— George R.R. Martin
      </Quote>

      <ButtonGroup>
        <Button onClick={handleLogin}>
          <PenSquare size={20} />
          {t("start writing")}
        </Button>
        <SecondaryButton onClick={handleExplore}>
          <Bookmark size={20} />
          {t("explore books")}
        </SecondaryButton>
      </ButtonGroup>

      <div id="features" style={{ marginTop: "4rem" }}>
        <Title style={{ fontSize: "1.3rem" }}>{t("what you find here")}</Title>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <Users size={32} />
            </FeatureIcon>
            <FeatureTitle>{t("community")}</FeatureTitle>
            <FeatureText>{t("card1")}</FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <BookOpen size={32} />
            </FeatureIcon>
            <FeatureTitle>{t("reviews")}</FeatureTitle>
            <FeatureText>{t("card2")}</FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <PenSquare size={32} />
            </FeatureIcon>
            <FeatureTitle>{t("create")}</FeatureTitle>
            <FeatureText>
              {t("card3")}
            </FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Sparkles size={32} />
            </FeatureIcon>
            <FeatureTitle>{t("discoveries")}</FeatureTitle>
            <FeatureText>
              {t("card4")}
            </FeatureText>
          </FeatureCard>
        </FeaturesGrid>
      </div>

      <div
        style={{
          margin: "3rem 0",
          minHeight: "300px",
          width: "100%",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "16px",
        }}
      >
      </div>
    </Container>
  );
};

export default HomePage;
