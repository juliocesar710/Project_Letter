import styled from "styled-components";

export const BaseButton = styled.button`
  display: ${({ hasFlex }) => (hasFlex ? "flex" : "inline-block")};
  align-items: ${({ hasFlex }) => (hasFlex ? "center" : "initial")};
  justify-content: ${({ hasFlex }) => (hasFlex ? "center" : "initial")};
  gap: ${({ gap }) => gap || "0"};
  width: ${({ width }) => width || "auto"};
  padding: ${({ padding, theme }) => padding || theme.padding.button};
  margin: ${({ margin }) => margin || "0"};
  border-radius: ${({ borderRadius, theme }) =>
    borderRadius || theme.borderRadius.small};
  border: ${({ border }) => border || "none"};

  background-color: ${({ bg, theme }) =>
    theme.colors[bg] || bg || theme.colors.primary};

  color: ${({ color, theme }) =>
    theme.colors[color] || color || theme.colors.inputBackground};

  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize || "1rem"};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ bgHover, theme, bg }) =>
      theme.colors[bgHover] ||
      bgHover ||
      (theme.colors[bg]
        ? theme.colors[`${bg}Dark`]
        : theme.colors.primaryDark)};

    transform: ${({ withTransform }) =>
      withTransform ? "translateY(-1px)" : "none"};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
    transform: none;
    opacity: 0.7;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ color, theme }) => color || theme.colors.text};
  font-size: ${({ size }) => size || "1.5rem"};
  position: ${({ position }) => position || "relative"};
  top: ${({ top }) => top || "auto"};
  right: ${({ right }) => right || "auto"};
  transform: translateY(-50%);

  &:hover {
    color: ${({ hoverColor, theme }) => hoverColor || theme.colors.primary};
  }
`;
