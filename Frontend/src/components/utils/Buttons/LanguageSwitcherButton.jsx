import { useTranslation } from "react-i18next";
import { BaseButton } from "../../../styles/Shared/buttons";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ display: "flex" }}>
      <BaseButton
        margin="0.5rem"
        padding="0.5rem"
        onClick={() => changeLanguage("pt")}
        disabled={currentLang === "pt"}
      >
        🇧🇷 Português
      </BaseButton>

      <BaseButton
        margin="0.5rem"
        padding="0.5rem"
        onClick={() => changeLanguage("en")}
        disabled={currentLang === "en"}
      >
        🇺🇸 English
      </BaseButton>
    </div>
  );
};

export default LanguageSwitcher;
