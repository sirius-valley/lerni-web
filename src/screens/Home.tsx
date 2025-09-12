import React, { useEffect } from 'react';
import ProfessorList from '../components/home/ProfessorList';
import ProgramsList from '../components/home/ProgramsList';
import { RootContainer, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import AllProgramsChart from '../components/charts/AllProgramsChart';
import { InstitutionsList } from '../components/charts/InstitutionsList';
import { StudentsRegisteredChart } from '../components/charts/StudentsRegisteredChart';
import CollectionsList from '../components/home/CollectionsList';
import { useMeQuery } from '../redux/service/auth.service';
import { usePermissions } from '../utils/permissions';
import { useLDispatch } from '../redux/hooks';
import { api } from '../redux/service/api';
import { resetCollectionSlice } from '../redux/slices/collection.slice';

const Home = () => {
  const { data, isError } = useMeQuery();

  const { canReadCollection, canReadProgram, hasFullAccess, hasNoPermissions } = usePermissions();
  const viewPrograms = canReadProgram();
  const viewCollections = canReadCollection();
  const dispatch = useLDispatch();

  useEffect(() => {
    dispatch(api.util.invalidateTags(['CollectionDetails', 'CollectionStudentsList']));
    dispatch(resetCollectionSlice());
  }, []);

  return (
    <RootContainer
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        paddingLeft: '72px',
        overflow: 'hidden',
      }}
    >
      {hasNoPermissions() ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            width: '100%',
          }}
        >
          <StyledText variant="h2">No tienes permisos aún</StyledText>
        </div>
      ) : (
        <StyledRow
          css={{
            overflow: 'auto',
            width: '100%',
            height: '100vh',
            gap: '20px',
            padding: '30px 65px',
            flexWrap: 'wrap',
            alignItems: hasFullAccess() ? 'center' : 'center',
            justifyContent: hasFullAccess() ? 'center' : 'center',
          }}
        >
          <StyledColumn
            css={{
              overflow: 'hidden',
              height: hasFullAccess() ? '100%' : 'auto',
              flex: '1 1 400px',
              justifyContent: 'space-between',
              gap: '20px',
              minWidth: '560px',
              maxWidth: '560px',
              ...(hasFullAccess() ? {} : { alignSelf: 'center' }),
            }}
          >
            {viewPrograms && <ProgramsList />}
            {viewCollections && <CollectionsList />}
          </StyledColumn>
          <StyledColumn
            css={{
              overflow: 'hidden',
              height: '100%',
              flex: '1 1 400px',
              justifyContent: 'space-between',
              gap: '20px',
              minWidth: '560px',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '560px',
            }}
          >
            <StyledRow
              css={{
                gap: '20px',
                width: 'fit-content',
                maxWidth: '100%',
                alignItems: 'flex-start',
                overflowX: 'scroll',
                overflowY: 'hidden',
              }}
            >
              <AllProgramsChart />
              <StudentsRegisteredChart />
            </StyledRow>
            <InstitutionsList />
            <ProfessorList />
          </StyledColumn>
        </StyledRow>
      )}
    </RootContainer>
  );
};

export default Home;
