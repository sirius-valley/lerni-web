import React from 'react';
import { StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import ProgramContent from '../ProgramContent';
import ProgramDetails from '../ProgramDetails';

const CreateProgram = () => {
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
          css={{ marginTop: '24px', justifyContent: 'center', alignItems: 'center', gap: '12px' }}
        >
          <ProgramDetails />
          <ProgramContent />
        </StyledColumn>
      </StyledColumn>
    </>
  );
};

export default CreateProgram;
