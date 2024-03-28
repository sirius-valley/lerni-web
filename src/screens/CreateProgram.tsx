import React, { useEffect } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import { useTheme } from 'styled-components';
import ProgramContent from '../components/program/ProgramContent';
import ProgramDetails from '../components/program/ProgramDetails';
import { ProgramQuestionnaire } from '../components/program/ProgramQuestionnaire';
import { ProgramTrivia } from '../components/program/ProgramTrivia';
import { ProgramStudents } from '../components/program/ProgramStudents';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { useLSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useCreateProgramMutation } from '../redux/api/program.service';
import { errorToast, successToast } from '../components/Toasts';

const CreateProgram = () => {
  const theme = useTheme();
  const program = useLSelector((state) => state.program);
  const navigate = useNavigate();

  const [createProgram, { isError, error, data, isSuccess }] = useCreateProgramMutation();

  const handleSave = () => {
    const allFieldsFilled = Object.values(program).every((value) => value !== '');

    if (!allFieldsFilled) createProgram(program);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      successToast('Programa creado exitosamente!');
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      errorToast('Algo ha salido mal! ');
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
        </StyledColumn>
      </StyledColumn>
    </StyledBox>
  );
};

export default CreateProgram;
