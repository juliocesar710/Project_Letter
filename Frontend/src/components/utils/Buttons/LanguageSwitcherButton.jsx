import styled from "styled-components";
import { useTranslation } from "react-i18next";

const LanguageButton = styled.button`
  padding: ${({ theme }) => theme.padding.button};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
  margin: 1rem 0.5rem 0.5rem 0;
  transition: all 0.2s ease;
  

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: default;
    transform: none;
  }
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <LanguageButton
        onClick={() => changeLanguage("pt")}
        disabled={currentLang === "pt"}
      >
        🇧🇷 Português
      </LanguageButton>

      <LanguageButton
        onClick={() => changeLanguage("en")}
        disabled={currentLang === "en"}
      >
        🇺🇸 English
      </LanguageButton>
    </div>
  );
};

export default LanguageSwitcher;
