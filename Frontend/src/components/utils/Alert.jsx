import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const AlertContainer = styled.div`
  background-color: ${theme.colors.error};
  color: ${theme.colors.inputBackground};
  padding: 15px;
  border-radius: ${theme.borderRadius.medium};
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
  box-shadow: ${theme.shadows.light};
`;

const Alert = ({ message }) => {
  return <AlertContainer>{message}</AlertContainer>;
};

export default Alert;