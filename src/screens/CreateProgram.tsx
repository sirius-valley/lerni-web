import React, { useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import { useTheme } from 'styled-components';
import ProgramContent from '../components/program/ProgramContent';
import ProgramDetails from '../components/program/ProgramDetails';
import { ProgramQuestionnaire } from '../components/program/ProgramQuestionnaire';
import { ProgramTrivia } from '../components/program/ProgramTrivia';
import { ProgramStudents } from '../components/program/ProgramStudents';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { ButtonLabelSize } from '../components/styled/Button/styles';

const CreateProgram = () => {
  const [value, setValue] = useState('');

  const handleChange = (value: string) => {
    setValue(value);
  };
  const theme = useTheme();
  return (
    <>
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
          minHeight: '100vh',
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
            onClick={() => console.log('open modal')}
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
    </>
  );
};

export default CreateProgram;
