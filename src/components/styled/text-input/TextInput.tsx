import React from 'react';
import { StyledTextInput } from './styles';

export interface TextInputProps {
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  onChange: (value: string) => void;
  value: string;
  css?: { [key in string]: string | number | boolean };
}

export const TextInput = ({
  placeholder,
  disabled = false,
  error = false,
  onChange,
  value,
  css,
}: TextInputProps) => {
  return (
    <StyledTextInput
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      css={css}
      disabled={disabled}
      error={error}
    />
  );
};
