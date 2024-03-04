import React, { useState } from 'react';
import { StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import { useTheme } from 'styled-components';
import ProgramContent from '../components/program/ProgramContent';
import ProgramDetails from '../components/program/ProgramDetails';
import { ProgramQuestionnaire } from '../components/program/ProgramQuestionnaire';
import { ProgramTrivia } from '../components/program/ProgramTrivia';
import { ProgramStudents } from '../components/program/ProgramStudents';
import { Card } from '@mui/material';
import { TextInput } from '../components/styled/TextInput';

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
        </StyledColumn>
      </StyledColumn>
    </>
  );
};

export default CreateProgram;
