import { useTranslation } from "react-i18next";
import { LanguageButton } from "../../../styles/Shared/buttons";

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
