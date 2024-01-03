import { TextInputProps } from './TextInput';
import styled from 'styled-components';

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
    if (props.error) {
      return props.theme.red500;
    } else if (props.disabled) {
      return props.theme.gray400;
    } else {
      return props.theme.gray900;
    }
  }};

  background-color: ${(props) => {
    if (props.error) {
      return props.theme.white;
    } else if (props.disabled) {
      return props.theme.gray200;
    } else {
      return props.theme.white;
    }
  }};

  & ::placeholder {
    color: ${(props) => props.theme.gray300};
    background-color: ${(props) => props.theme.white};
  }

  :focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
`;
