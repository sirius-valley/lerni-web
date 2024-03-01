import React, { useState } from 'react';
import { StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import ProgramContent from '../ProgramContent';
import ProgramDetails from '../ProgramDetails';
import { ProgramQuestionnaire } from '../ProgramQuestionnaire';
import { ProgramTrivia } from '../ProgramTrivia';
import { ProgramStudents } from '../ProgramStudents';
import { Card } from '@mui/material';
import { TextInput } from '../../styled/TextInput';

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
