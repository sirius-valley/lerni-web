import React from 'react';
import { StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { ProgramItem } from '../../program/ProgramItem';
import { useNavigate } from 'react-router-dom';

const ProgramsList = () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9];
  const navigation = useNavigate();

  const handleAddNewProgram = () => {
    navigation('/create/program');
  };
  return (
    <StyledColumn
      css={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '24px 16px',
        gap: '16px',
      }}
    >
      <StyledRow css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <StyledText variant={'h2'}>Programas</StyledText>
        <Button
          onClick={handleAddNewProgram}
          variant={ComponentVariantType.PRIMARY}
          labelSize={'body3'}
          css={{ padding: '16px 8px', height: '30px' }}
        >
          Agregar
        </Button>
      </StyledRow>
      <StyledColumn css={{ gap: '0px', height: '100%', overflowY: 'scroll' }}>
        {list.map((item, key) => (
          <ProgramItem key={key} />
        ))}
      </StyledColumn>
    </StyledColumn>
  );
};

export default ProgramsList;
