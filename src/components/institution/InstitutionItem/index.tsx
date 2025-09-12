import React from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import { ComponentVariantType } from '../../../utils/constants';
import Button from '../../styled/Button';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { useNavigate } from 'react-router-dom';
import { CollectionIcon } from '../../../assets/icons/CollectionIcon';

interface InstitutionItemProps {
  id: string;
  name: string;
  studentLimit: number;
  image?: string;
}

export const InstitutionItem = ({ id, name, studentLimit, image }: InstitutionItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const redirectToDetails = () => {
    navigate(`/details/institution/${id}`, { state: { id } });
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
        <StyledBox
          style={{
            display: 'flex',
            borderRadius: 4,
            width: 40,
            height: 40,
            background: theme.gray200,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4,
              }}
            />
          ) : (
            <CollectionIcon />
          )}
        </StyledBox>
        <StyledColumn style={{ gap: 2 }}>
          <StyledText variant="body1" style={{ color: theme.primary950 }}>
            {name}
          </StyledText>
          <StyledText variant="body3" style={{ color: theme.gray400 }}>
            Límite: {studentLimit.toLocaleString()}
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
