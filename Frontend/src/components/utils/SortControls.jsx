import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { BaseButton } from "../../styles/Shared/buttons";

const SortButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    gap: 0.5rem;
  }
`;



const SortControls = ({ onSortAlphabetically, onSortByDate }) => {
  const { t } = useTranslation();

  return (
    <SortButtons>
      <BaseButton
      width="50%"
      onClick={onSortAlphabetically}>
        {t("sortAlphabetically")}
      </BaseButton>
      <BaseButton
            width="50%"

      onClick={onSortByDate}>
        {t("sortByDate")}
      </BaseButton>
    </SortButtons>
  );
};

export default SortControls;