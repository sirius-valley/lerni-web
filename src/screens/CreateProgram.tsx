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
import { useLDispatch, useLSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useCreateProgramMutation } from '../redux/service/program.service';
import { errorToast, successToast } from '../components/Toasts';
import { transformedValues } from '../utils/transformBody';
import { resetProgramSlice } from '../redux/slices/program.slice';

const CreateProgram = () => {
  const theme = useTheme();
  const program = useLSelector((state) => state.program);
  const navigate = useNavigate();
  const dispatch = useLDispatch();

  const [createProgram, { isError, error, data, isSuccess }] = useCreateProgramMutation();

  const handleSave = () => {
    const allFieldsFilled = Object.values(program).every((value) => value !== '');
    if (allFieldsFilled) {
      createProgram(transformedValues(program)).then((res: any) => {
        navigate('/');
        dispatch(resetProgramSlice());
        successToast('Programa creado exitosamente!');
      });
    }
  };

  useEffect(() => {
    if (isError) {
      errorToast('Algo ha salido mal! ');
    }
  }, [isError]);

  useEffect(() => {
    return () => {
      dispatch(resetProgramSlice());
    };
  }, []);

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
          <ProgramQuestionnaire />
          <ProgramTrivia />
          <ProgramStudents />
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
