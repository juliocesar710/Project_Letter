import styled from "styled-components";

const AlertContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.sucess};
  padding: 15px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
  margin: 20px 0px 20px 0px;
  font-size: 14px;
  box-shadow: ${({ theme }) => theme.shadows.light};

  &:hover {
    background-color: ${({ theme }) => theme.colors.successDark};
  }
`;

const Sucess = ({ message }) => {
  return <AlertContainer>{message}</AlertContainer>;
};

export default Sucess;