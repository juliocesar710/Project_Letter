import styled from "styled-components";
import { useTranslation } from "react-i18next";

const SortButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    gap: 0.5rem;
  }
`;

const SortButton = styled.button`
  padding: ${({ theme }) => theme.padding.button};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textContrast};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: background-color 0.2s ease;
  flex: 1;
  min-width: 120px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    padding: 0.5rem;
    min-width: 100px;
    font-size: 0.8rem;
  }
`;

const SortControls = ({ onSortAlphabetically, onSortByDate }) => {
  const { t } = useTranslation();

  return (
    <SortButtons>
      <SortButton onClick={onSortAlphabetically}>
        {t("sortAlphabetically")}
      </SortButton>
      <SortButton onClick={onSortByDate}>
        {t("sortByDate")}
      </SortButton>
    </SortButtons>
  );
};

export default SortControls;