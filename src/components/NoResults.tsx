import React from "react";
import styled from "styled-components";
import MagnifierIcon from "../assets/icons/magnifying-glass.svg";

const NoResultsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  font-weight: 600;
  font-size: 17px;
  line-height: 129%;
  text-align: center;
  color: #050510;
  margin-bottom: 12px;
`;

const SubMessage = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 125%;
  text-align: center;
  color: #97979b;
`;

const MagnifierIconStyled = styled.img`
  width: 56px;
  height: 56px;
  margin-bottom: 8px;
  opacity: 0.5;
`;

const NoResults: React.FC = () => {
  return (
    <NoResultsContainer>
      <MagnifierIconStyled src={MagnifierIcon} alt="No results" />
      <Message>Мы никого не нашли</Message>
      <SubMessage>Попробуйте скорректировать запрос</SubMessage>
    </NoResultsContainer>
  );
};

export default NoResults;