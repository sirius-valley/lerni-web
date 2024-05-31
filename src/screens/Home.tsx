import React from 'react';
import ProfessorList from '../components/home/ProfessorList';
import ProgramsList from '../components/home/ProgramsList';
import { RootContainer, StyledColumn, StyledRow } from '../components/styled/styles';
import AllProgramsChart from '../components/charts/AllProgramsChart';
import { StudentsRegisteredChart } from '../components/charts/StudentsRegisteredChart';

const Home = () => {
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
      <StyledRow
        css={{ height: '870px', gap: '40px', padding: '65px', justifyContent: 'space-between' }}
      >
        <ProgramsList />
        <StyledColumn css={{ flex: 1, gap: '12px', justifyContent: 'center' }}>
          <StyledRow css={{ gap: '30px' }}>
            <AllProgramsChart />
            <StudentsRegisteredChart />
          </StyledRow>
          <ProfessorList />
        </StyledColumn>
      </StyledRow>
    </RootContainer>
  );
};

export default Home;
