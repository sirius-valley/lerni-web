import React from 'react';
import { StyledTextInput } from './styles';
import { TextInputStatus } from '../../../utils/constants';

export interface TextInputProps {
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  status?: TextInputStatus;
  css?: { [key in string]: string | number | boolean };
}

export const TextInput = ({
  placeholder,
  disabled = false,
  error = false,
  status = TextInputStatus.DEFAULT,
  css,
}: TextInputProps) => {
  return (
    <StyledTextInput placeholder={placeholder} status={status} disabled={disabled} error={error} />
  );
};
