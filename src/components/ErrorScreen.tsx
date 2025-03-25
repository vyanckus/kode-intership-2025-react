import React from "react";
import styled from "styled-components";
import { ReactComponent as UfoIcon } from "../assets/icons/flying-saucer.svg";

const ErrorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  font-weight: 600;
  font-size: 17px;
  line-height: 129%;
  text-align: center;
  color: #050510;
  margin-bottom: 12px;
`;

const ErrorSubMessage = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 125%;
  text-align: center;
  color: #97979b;
  margin-bottom: 12px;
`;

const RetryButton = styled.button`
  padding: 0;
  border: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 125%;
  text-align: center;
  color: #6534ff;
  background-color: transparent;
  cursor: pointer;
`;

const UfoIconStyled = styled(UfoIcon)`
  width: 56px;
  height: 56px;
  margin-bottom: 8px;
`;

interface ErrorScreenProps {
  onRetry: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ onRetry }) => {
  return (
    <ErrorContainer>
      <UfoIconStyled />
      <ErrorMessage>Какой-то сверхразум все сломал</ErrorMessage>
      <ErrorSubMessage>Постараемся быстро починить</ErrorSubMessage>
      <RetryButton onClick={onRetry}>Попробовать снова</RetryButton>
    </ErrorContainer>
  );
};

export default ErrorScreen;
