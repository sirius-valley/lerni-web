import React, { useEffect } from 'react';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { ButtonLabelSize } from '../components/styled/Button/styles';
import SendIcon from '../assets/icons/SendIcon';
import { ProgramItem } from '../components/program/ProgramItem';
import { RootContainer, StyledColumn, StyledRow } from '../components/styled/styles';
import ProgramsList from '../components/home/ProgramsList';
import ProfessorList from '../components/home/ProfessorList';

const Home = () => {
  const handleButton = () => {
    alert('hello');
  };

  return (
    <RootContainer
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <StyledRow css={{ width: '1100px', height: '870px', gap: '40px' }}>
        <ProgramsList />
        <StyledColumn css={{ flex: 1 }}>
          <ProfessorList />
        </StyledColumn>
      </StyledRow>
    </RootContainer>
  );
};

export default Home;
