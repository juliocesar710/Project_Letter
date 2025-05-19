import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { BookOpen, PenSquare, Users, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary || theme.colors.primaryDark} /* fallback */
  );
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 700px;
  margin-bottom: 2rem;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    font-size: 1rem;
  }
`;

const Quote = styled.blockquote`
  font-style: italic;
  color: ${({ theme }) => theme.colors.text};
  margin: 2rem auto;
  max-width: 600px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textContrast};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentDark};
  }
`;

const SectionTitle = styled.h2`
  margin-top: 4rem;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
  width: 100%;
  max-width: 900px;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground || "rgba(255, 255, 255, 0.08)"};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

// --- Component ---
const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goToLogin = () => navigate("/auth");

  return (
    <Container>
      <Title>{t("welcome")}</Title>
      <Description>{t("description of letter")}</Description>
      <Quote>
        {t("quote1")}
        <br />— George R.R. Martin
      </Quote>

      <Button onClick={goToLogin}>
        <PenSquare size={20} />
        {t("start writing")}
      </Button>

      <SectionTitle>{t("what you find here")}</SectionTitle>

      <FeaturesGrid>
        <FeatureCard>
          <Users size={32} />
          <FeatureTitle>{t("community")}</FeatureTitle>
          <FeatureText>{t("card1")}</FeatureText>
        </FeatureCard>
        <FeatureCard>
          <BookOpen size={32} />
          <FeatureTitle>{t("reviews")}</FeatureTitle>
          <FeatureText>{t("card2")}</FeatureText>
        </FeatureCard>
        <FeatureCard>
          <PenSquare size={32} />
          <FeatureTitle>{t("create")}</FeatureTitle>
          <FeatureText>{t("card3")}</FeatureText>
        </FeatureCard>
        <FeatureCard>
          <Sparkles size={32} />
          <FeatureTitle>{t("discoveries")}</FeatureTitle>
          <FeatureText>{t("card4")}</FeatureText>
        </FeatureCard>
      </FeaturesGrid>
    </Container>
  );
};

export default HomePage;
