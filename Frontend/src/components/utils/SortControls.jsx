import styled from "styled-components";
import { useTranslation } from "react-i18next";

const SortButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.primary || "#3498db"};
    color: ${({ theme }) => theme.colors.onPrimary || "#fff"};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark || "#2874a6"};
    }
  }
`;

const SortControls = ({ onSortAlphabetically, onSortByDate }) => {
  const { t } = useTranslation();

  return (
    <SortButtons>
      <button onClick={onSortAlphabetically}>{t("sortAlphabetically")}</button>
      <button onClick={onSortByDate}>{t("sortByDate")}</button>
    </SortButtons>
  );
};

export default SortControls;