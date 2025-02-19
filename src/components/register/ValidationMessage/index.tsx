import React from 'react';
import { StyledRow, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import CircleCheckIcon from '../../../assets/icons/CircleCheckIcon';
import MultiplyIcon from '../../../assets/icons/MultiplyIcon';

interface ValidationMessageInterface {
  isValid: boolean;
  message: string;
}

const ValidationMessage = ({ isValid, message }: ValidationMessageInterface) => {
  const theme = useTheme();
  return (
    <StyledRow css={{ gap: '8px', alignItems: 'center' }}>
      {isValid ? <CircleCheckIcon /> : <MultiplyIcon />}
      <StyledText css={{ color: theme.white }}>{message}</StyledText>
    </StyledRow>
  );
};

export default ValidationMessage;
