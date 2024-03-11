import React from 'react';
import { StyledBox, StyledColumn, StyledImage, StyledRow, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import { ComponentVariantType } from '../../../utils/constants';
import Button from '../../styled/Button';
import { ButtonLabelSize } from '../../styled/Button/styles';

export const ProgramItem = () => {
  const theme = useTheme();
  return (
    <StyledRow
      style={{
        padding: '10px 8px',
        borderBottom: '1px solid',
        borderBottomColor: theme.gray200,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <StyledRow
        style={{ gap: 8, alignItems: 'center', justifyContent: 'center' }}
        onClick={() => alert('redireccionar a program details')}
      >
        <StyledImage
          width={40}
          height={40}
          style={{ borderRadius: 4 }}
          src="https://thumbs.dreamstime.com/b/bello-planeta-tierra-y-estrellas-brillantes-en-el-cosmos-infinito-nuevos-horizontes-la-exploraci%C3%B3n-del-espacio-elementos-de-esta-186771413.jpg"
        />
        <StyledColumn style={{ gap: 2 }}>
          <StyledText variant="body1" style={{ color: theme.primary950 }}>
            {'Nombre del programa'}
          </StyledText>
          <StyledText variant="body3" style={{ color: theme.gray400 }}>
            {'Detalles del programa'}
          </StyledText>
        </StyledColumn>
      </StyledRow>
      <StyledBox style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => alert('redireccionar a program details')}
          disabled={false}
          labelSize={ButtonLabelSize.BODY3}
          variant={ComponentVariantType.GHOST}
          css={{ color: theme.primary400 }}
        >
          Ver detalles
        </Button>
      </StyledBox>
    </StyledRow>
  );
};
