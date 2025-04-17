import React from "react";
import styled from "styled-components";

const AlertContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.sucess};
  color: ${({ theme }) => theme.colors.textOnSucess};
  padding: 15px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
  box-shadow: ${({ theme }) => theme.shadows.light};
`;

const Sucess = ({ message }) => {
  return <AlertContainer>{message}</AlertContainer>;
};

export default Sucess;