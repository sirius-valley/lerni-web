import React from 'react';
import { StyledBox, StyledColumn, StyledImage, StyledRow, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import { ComponentVariantType } from '../../../utils/constants';
import Button from '../../styled/Button/Button';
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
          src="https://media.discordapp.net/attachments/1163814783913562132/1205135747443855371/image_1.png?ex=65d74520&is=65c4d020&hm=3083227db29e72488b3f85c474178f024f2a838149f14330187c027b8591eb9b&=&format=webp&quality=lossless&width=218&height=220"
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
          label="Ver detalles"
          variant={ComponentVariantType.GHOST}
          css={{ color: theme.primary400 }}
        />
      </StyledBox>
    </StyledRow>
  );
};
