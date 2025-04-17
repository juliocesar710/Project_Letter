import React from "react";
import styled from "styled-components";

const AlertContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.inputBackground};
  padding: 15px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
  box-shadow: ${({ theme }) => theme.shadows.light};
`;

const Alert = ({ message }) => {
  return <AlertContainer>{message}</AlertContainer>;
};

export default Alert;