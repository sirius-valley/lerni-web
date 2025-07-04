import React, { useEffect } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { useTheme } from 'styled-components';
import ProgramDetailsComponent from '../components/program/ProgramDetails';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useProgramDetailsQuery } from '../redux/service/program.service';
import { ProgramStudents } from '../components/program/ProgramStudents';
import ProgramContent from '../components/program/ProgramContent';
import { ProgramQuestionnaire } from '../components/program/ProgramQuestionnaire';
import { ProgramTrivia } from '../components/program/ProgramTrivia';
import { useLDispatch, useLSelector } from '../redux/hooks';
import { isLoading, resetProgramSlice } from '../redux/slices/program.slice';
import { ProgramStatistics } from '../components/program/ProgramStatistics';
import { api } from '../redux/service/api';
import { errorToast } from '../components/Toasts';
import { useMeQuery } from '../redux/service/auth.service';
import { usePermissions } from '../utils/permissions';
import { getUpdatedAndDeletedStudents } from '../utils/transformBody';

const ProgramDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useLDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isError, isLoading: programLoading } = useProgramDetailsQuery(id as string);
  const { data: meData, isError: meError } = useMeQuery();

  const program = useLSelector((state) => state.program);

  const { canOnlyReadProgram } = usePermissions();
  const canOnlyRead = canOnlyReadProgram();

  useEffect(() => {
    dispatch(isLoading(true));
  }, []);

  const handleSave = () => {
    const studentsUpdated = getUpdatedAndDeletedStudents(
      program.studentsState.initial,
      program.studentsState.current,
    );

    console.log('');
    console.log('studentsUpdated', studentsUpdated);
  };

  useEffect(() => {
    return () => {
      dispatch(api.util.invalidateTags(['ProgramDetails']));
      dispatch(resetProgramSlice());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      errorToast('El programa no existe');
      navigate('/');
    }
  }, [isError]);

  return (
    <StyledBox css={{ height: '100%' }}>
      <StyledRow
        css={{
          width: '100%',
          height: '66px',
          background: theme.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledText variant="h2">Detalles de programa</StyledText>
      </StyledRow>

      <StyledColumn
        css={{
          background: theme.gray200,
          minHeight: '90vh',
          width: '100vw',
        }}
      >
        <StyledColumn
          css={{
            marginTop: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '32px',
          }}
        >
          <ProgramDetailsComponent />
          <ProgramStatistics />
          <ProgramContent />
          <ProgramQuestionnaire />
          <ProgramTrivia />
          <ProgramStudents programVersionId={id} />
          {!canOnlyRead && (
            <Button
              variant={ComponentVariantType.PRIMARY}
              onClick={handleSave}
              labelSize={'body3'}
              css={{
                marginTop: '8px',
                width: 'auto',
                height: '30px',
                padding: '8px 16px 8px 16px',
                fontFamily: 'Roboto-Bold',
                cursor: 'pointer',
              }}
            >
              Guardar
            </Button>
          )}
        </StyledColumn>
      </StyledColumn>
    </StyledBox>
  );
};

export default ProgramDetails;
