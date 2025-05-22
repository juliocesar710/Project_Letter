import styled from "styled-components";

export const Button = styled.button`
  width: ${({ width }) => width || "100%"};
  padding: ${({ theme }) => theme.padding.button};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inputBackground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;
export const ClearButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1rem;

  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const ConfirmButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.inputBackground};
  background-color: ${({ confirm, theme }) =>
    confirm ? theme.colors.primaryDark : theme.colors.error};
  box-shadow: ${({ theme }) => theme.shadows.light};

  &:hover {
    opacity: 0.9;
  }
`;
export const LanguageButton = styled.button`
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
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const DeleteButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.errorDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;
export const ProfileButton = styled.button`
  display: flex; 
  align-items: center; 
  justify-content: center; 
  padding: 10px; 
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inputBackground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  height: 40px;
  width: 40px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.primary}10;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
    transform: translateY(-1px);
  }
`;


export const BaseButton = styled.button`
  display: ${({ hasFlex }) => (hasFlex ? 'flex' : 'inline-block')};
  align-items: ${({ hasFlex }) => (hasFlex ? 'center' : 'initial')};
  justify-content: ${({ hasFlex }) => (hasFlex ? 'center' : 'initial')};
  gap: ${({ gap }) => gap || '0'};
  width: ${({ width }) => width || 'auto'};
  padding: ${({ padding, theme }) => padding || theme.padding.button};
  margin: ${({ margin }) => margin || "0"};
  border-radius: ${({ borderRadius, theme }) => borderRadius || theme.borderRadius.small};
  border: ${({ border }) => border || 'none'};

  background-color: ${({ bg, theme }) => 
    theme.colors[bg] || bg || theme.colors.primary};

  color: ${({ color, theme }) => 
    theme.colors[color] || color || theme.colors.inputBackground};

  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ bgHover, theme, bg }) => 
      theme.colors[bgHover] || bgHover || 
      (theme.colors[bg] ? theme.colors[`${bg}Dark`] : theme.colors.primaryDark)};
      
    transform: ${({ withTransform }) => (withTransform ? 'translateY(-1px)' : 'none')};
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
  font-size: ${({ size }) => size || '1.5rem'};
  position: ${({ position }) => position || 'relative'};
  top: ${({ top }) => top || 'auto'};
  right: ${({ right }) => right || 'auto'};
  transform: translateY(-50%);

  &:hover {
    color: ${({ hoverColor, theme }) => hoverColor || theme.colors.primary};
  }
`;
