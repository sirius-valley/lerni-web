import React from 'react';
import { StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import { NavBar } from '../../Navbar';
import { useTheme } from 'styled-components';
import ProgramContent from '../ProgramContent';
import ProgramDetails from '../ProgramDetails';

const CreateProgram = () => {
  const theme = useTheme();
  return (
    <>
      <StyledRow
        css={{
          width: '1440px',
          height: '66px',
          background: '#FAFAFA',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledText variant="h2">Crear nuevo programa</StyledText>
      </StyledRow>

      <StyledColumn
        css={{
          background: theme.gray200,
          height: '100vh',
          width: '100vw',
        }}
      >
        <NavBar />

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
