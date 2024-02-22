import React from 'react';
import { StyledRow, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import CheckIcon from '../../../assets/icons/CheckIcon';
import MultiplyIcon from '../../../assets/icons/MultiplyIcon';

interface ValidationMessageInterface {
  isValid: boolean;
  message: string;
}

const ValidationMessage = ({ isValid, message }: ValidationMessageInterface) => {
  const theme = useTheme();
  return (
    <StyledRow css={{ gap: '8px', alignItems: 'center' }}>
      {isValid ? <CheckIcon /> : <MultiplyIcon />}
      <StyledText css={{ color: theme.white }}>{message}</StyledText>
    </StyledRow>
  );
};

export default ValidationMessage;
