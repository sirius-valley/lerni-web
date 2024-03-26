import React from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import { useTheme } from 'styled-components';
import ProgramContent from '../components/program/ProgramContent';
import ProgramDetails from '../components/program/ProgramDetails';
import { ProgramQuestionnaire } from '../components/program/ProgramQuestionnaire';
import { ProgramTrivia } from '../components/program/ProgramTrivia';
import { ProgramStudents } from '../components/program/ProgramStudents';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { useLDispatch } from '../redux/hooks';
import { setModalOpen } from '../redux/slices/utils.slice';

const CreateProgram = () => {
  const theme = useTheme();
  const dispatch = useLDispatch();

  const createProfessor = () => {
    dispatch(setModalOpen({ modalType: 'PROFESSOR_CREATE' }));
  };
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
        <StyledText variant="h2">Crear nuevo programa</StyledText>
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
          <ProgramDetails />
          <ProgramContent />
          <ProgramQuestionnaire hasPills hasQuestionnaire={true} />
          <ProgramTrivia hasPills hasTrivia={false} />
          <ProgramStudents hasPills />
          <Button
            variant={ComponentVariantType.PRIMARY}
            onClick={createProfessor}
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
            Crear profesor
          </Button>
          <Button
            variant={ComponentVariantType.PRIMARY}
            onClick={() => alert('To be defined')}
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
        </StyledColumn>
      </StyledColumn>
    </StyledBox>
  );
};

export default CreateProgram;
