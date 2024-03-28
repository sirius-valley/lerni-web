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
  const content = [
    'Option 1',
    'Option 2',
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

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
          <Dropdown onChange={handleChange} value={selectedValue} content={content} />
          <ProfessorList />
        </StyledColumn>
      </StyledRow>
    </RootContainer>
  );
};

export default Home;
