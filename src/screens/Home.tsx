import React, { useEffect, useState } from 'react';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { ButtonLabelSize } from '../components/styled/Button/styles';
import SendIcon from '../assets/icons/SendIcon';
import { ProgramItem } from '../components/program/ProgramItem';
import { RootContainer, StyledColumn, StyledRow } from '../components/styled/styles';
import ProgramsList from '../components/home/ProgramsList';
import ProfessorList from '../components/home/ProfessorList';
import { Dropdown } from '../components/Dropdown';

const Home = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

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
        <StyledColumn css={{ flex: 1, gap: '12px' }}>
          <ProfessorList />
        </StyledColumn>
      </StyledRow>
    </RootContainer>
  );
};

export default Home;
