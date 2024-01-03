import React from 'react';
import { StyledTextInput } from './styles';
import { TextInputStatus } from '../../../utils/constants.';

export interface TextInputProps {
  placeholder?: string;
  status?: TextInputStatus;
  css?: { [key in string]: string | number | boolean };
}

export const TextInput = ({
  placeholder,
  status = TextInputStatus.DEFAULT,
  css,
}: TextInputProps) => {
  return <StyledTextInput placeholder={placeholder} status={status} />;
};
