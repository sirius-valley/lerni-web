import React from 'react';
import { useLDispatch } from '../../../redux/hooks';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { useTheme } from 'styled-components';
import Button from '../../../components/styled/Button';
import { ModalProps } from '../interfaces';
import { ComponentVariantType } from '../../../utils/constants';
import Card from '../../../components/Card';
import MultiplyIcon from '../../../assets/icons/MultiplyIcon';
import CloseIcon from '../../../assets/icons/CloseIcon';
import { IconButton } from '@mui/material';

interface CreatePillModalProps extends ModalProps {
  openModal?: boolean;
}

const CreatePillModal = ({ handleOnClose }: CreatePillModalProps) => {
  const theme = useTheme();
  const dispatch = useLDispatch();

  const handleGoToIntroduction = () => {
    handleOnClose();
  };

  const cardHeader = () => (
    <StyledRow
      css={{
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <StyledColumn css={{ marginTop: '8px', gap: '12px' }}>
        <StyledText variant="h1">Cargar píldora</StyledText>
        <StyledText variant="body2">
          En esta sección se deberá cargar la píldora del programa
        </StyledText>
      </StyledColumn>
      <StyledBox onClick={() => handleOnClose()} css={{ padding: 8, cursor: 'pointer' }}>
        <CloseIcon />
      </StyledBox>
    </StyledRow>
  );

  return (
    <Card
      headerComponent={cardHeader()}
      css={{
        width: '568px',
        zIndex: 30,
      }}
    >
      <StyledColumn css={{ height: '500px', width: '400px' }}></StyledColumn>
    </Card>
  );
};

export default CreatePillModal;
