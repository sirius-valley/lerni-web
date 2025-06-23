import React from 'react';
import { StyledBox, StyledColumn, StyledImage, StyledRow, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import { ComponentVariantType } from '../../../utils/constants';
import Button from '../../styled/Button';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { ProgramListItem } from '../../../redux/service/types/program.types';
import { useNavigate } from 'react-router-dom';

export const ProgramItem = ({ programVersionId, name, icon }: ProgramListItem) => {
  const theme = useTheme();
  const route = useNavigate();

  const redirectToDetails = () => {
    route(`/details/program/${programVersionId}`, { state: { programVersionId } });
  };

  return (
    <StyledRow
      style={{
        padding: '10px 8px',
        borderBottom: '1px solid',
        borderBottomColor: theme.gray200,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        cursor: 'pointer',
      }}
      onClick={redirectToDetails}
    >
      <StyledRow style={{ gap: 8, alignItems: 'center', justifyContent: 'center' }}>
        <StyledImage
          width={40}
          height={40}
          style={{ borderRadius: 4, objectFit: 'cover' }}
          src={icon}
        />
        <StyledColumn style={{ gap: 2 }}>
          <StyledText variant="body1" style={{ color: theme.primary950 }}>
            {name}
          </StyledText>
          <StyledText variant="body3" style={{ color: theme.gray400 }}>
            {programVersionId}
          </StyledText>
        </StyledColumn>
      </StyledRow>
      <StyledBox style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={redirectToDetails}
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
