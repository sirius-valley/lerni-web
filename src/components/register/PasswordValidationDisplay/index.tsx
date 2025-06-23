import React from 'react';
import { StyledColumn } from '../../styled/styles';
import ValidationMessage from '../ValidationMessage';

interface PasswordValidationDisplayInterface {
  password: string;
}

const PasswordValidationDisplay = ({ password }: PasswordValidationDisplayInterface) => {
  const validateCharLength = () => password.length >= 8;
  const containsNumbers = () => /\d/.test(password);
  const hasUppercase = () => /\p{Lu}/u.test(password);

  const validations = [
    { action: validateCharLength, message: 'Más de 8 caracteres' },
    { action: containsNumbers, message: 'Al menos 1 número' },
    { action: hasUppercase, message: 'Al menos 1 mayúscula' },
  ];

  return (
    <StyledColumn css={{ gap: '8px' }}>
      {validations.map((validation, idx) => (
        <ValidationMessage key={idx} isValid={validation.action()} message={validation.message} />
      ))}
    </StyledColumn>
  );
};

export default PasswordValidationDisplay;
