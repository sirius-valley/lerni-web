import React from 'react';
import { StyledTextInput } from './styles';
import { TextInputStatus } from '../../../utils/constants';

export interface TextInputProps {
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  css?: { [key in string]: string | number | boolean };
}

export const TextInput = ({
  placeholder,
  disabled = false,
  error = false,
  css,
}: TextInputProps) => {
  return <StyledTextInput placeholder={placeholder} css={css} disabled={disabled} error={error} />;
};
