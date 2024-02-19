import styled from 'styled-components';
import { StyledRow } from '../styles';
import { TextInputProps } from '.';

export const StyledInput = styled.input<TextInputProps>`
  outline: none !important;
  border: none !important;
  width: 100%;
  color: ${(props) => {
    if (props.disabled) {
      return props.theme.gray400;
    } else {
      return props.theme.gray300;
    }
  }};
  &:focus-within {
    color: #171717;
  }
  background-color: ${(props) => {
    if (props.disabled) {
      return props.theme.gray200;
    } else {
      return props.theme.white;
    }
  }};
`;

export const StyledTextInput = styled(StyledRow)<TextInputProps>`
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  gap: 10px;
  width: 100%;
  border: 1px solid ${(props) => (props.error ? props.theme.red500 : props.theme.gray200)};
  background-color: ${(props) => (props.disabled ? props.theme.gray200 : props.theme.white)};
  color: ${(props) => (props.disabled ? props.theme.gray400 : props.theme.gray300)};

  &:hover {
    outline: 1px solid ${(props) => props.theme.primary500};
    transition: ease-in-out 0.1s;
  }

  &:focus-within {
    border-color: ${(props) => props.theme.primary500};
    transition: ease-in-out 0.3s;
  }

  & > input::placeholder {
    color: ${(props) => (props.disabled ? props.theme.gray400 : props.theme.gray300)};
  }
`;
