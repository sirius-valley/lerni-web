import React from 'react';
import { StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Card from '../../Card';
import Button from '../../styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { ProgramItem } from '../../program/ProgramItem';
import ProfessorItem from '../ProfessorItem';

const ProfessorList = () => {
  const l = [1, 2, 3, 4, 5, 6, 7, 55, 5, 5, 5, 5, 5, 5, 5];
  const handleAddNewProfessor = () => {
    console.log('h');
  };
  return (
    <StyledColumn
      css={{
        maxWidth: '600px',
        width: '100%',
        maxHeight: '242px',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '24px 16px',
        gap: '16px',
      }}
    >
      <StyledRow css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <StyledText variant={'h2'}>Profesores</StyledText>
        <Button
          onClick={handleAddNewProfessor}
          variant={ComponentVariantType.PRIMARY}
          labelSize={'body3'}
          css={{ padding: '16px 8px', height: '30px' }}
        >
          Agregar
        </Button>
      </StyledRow>
      <StyledColumn css={{ gap: '0px', height: '100%', overflowY: 'scroll' }}>
        {l.map((item, index) => (
          <ProfessorItem
            key={'professor-' + index}
            id={''}
            name={'Cristian'}
            surname={'Romero'}
            imgURL={
              'https://thumbs.dreamstime.com/b/bello-planeta-tierra-y-estrellas-brillantes-en-el-cosmos-infinito-nuevos-horizontes-la-exploraci%C3%B3n-del-espacio-elementos-de-esta-186771413.jpg'
            }
          />
        ))}
      </StyledColumn>
    </StyledColumn>
  );
};

export default ProfessorList;
