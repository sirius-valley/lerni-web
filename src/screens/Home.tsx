import React from 'react';
import ProfessorList from '../components/home/ProfessorList';
import ProgramsList from '../components/home/ProgramsList';
import { RootContainer, StyledColumn, StyledRow } from '../components/styled/styles';
import AllProgramsChart from '../components/charts/AllProgramsChart';
import { StudentsRegisteredChart } from '../components/charts/StudentsRegisteredChart';
import CollectionsList from '../components/home/CollectionsList';
import { useMeQuery } from '../redux/service/auth.service';
import { useLSelector } from '../redux/hooks';
import { usePermissions } from '../utils/permissions';

const Home = () => {
  const { data, isError } = useMeQuery();

  const { canReadCollection, canReadProgram } = usePermissions();
  const viewPrograms = canReadProgram();
  const viewCollections = canReadCollection();

  return (
    <RootContainer
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        paddingLeft: '72px',
      }}
    >
      <StyledRow css={{ width: '1280px', height: '100vh', gap: '40px', padding: '30px 65px' }}>
        <StyledColumn
          css={{
            overflow: 'hidden',
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {viewPrograms && <ProgramsList />}
          {viewCollections && <CollectionsList />}
        </StyledColumn>
        <StyledColumn
          css={{
            overflow: 'hidden',
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
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
