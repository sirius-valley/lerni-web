import React, { useState } from 'react';
import { LikesChart } from '../components/charts/LikesChart';
import ProfessorList from '../components/home/ProfessorList';
import ProgramsList from '../components/home/ProgramsList';
import { RootContainer, StyledColumn, StyledRow } from '../components/styled/styles';
import { AttendanceChart } from '../components/charts/AttendanceChart';

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
      <StyledRow css={{ gap: '16px', padding: '16px' }}>
        <LikesChart programId={'20f5a8dc-23d1-41bb-9d38-654b284f48eb'} />
        <AttendanceChart programId={'20f5a8dc-23d1-41bb-9d38-654b284f48eb'} />
        <LikesChart programId={'programId'} />
      </StyledRow>
    </RootContainer>
  );
};

export default Home;
