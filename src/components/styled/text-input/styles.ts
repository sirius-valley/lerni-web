import { TextInputProps } from './TextInput';
import styled, { DefaultTheme, useTheme } from 'styled-components';

export const StyledTextInput = styled.input<TextInputProps>`
  border-radius: 8px;
  outline: none !important;
  border: none !important;
  padding: 6px 16px 6px 16px;
  gap: 8px;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  color: ${(props) => {
    const theme = useTheme();
    if (props.error) {
      return theme.red500;
    } else if (props.disabled) {
      return theme.gray400;
    } else {
      return theme.gray900;
    }
  }};

  background-color: ${(props) => {
    const theme = useTheme();
    if (props.error) {
      return theme.white;
    } else if (props.disabled) {
      return theme.gray200;
    } else {
      return theme.white;
    }
  }};

  :placeholder {
    color: ${(props) => props.theme.gray300};
    background-color: ${(props) => props.theme.white};
  }

  :focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
`;
