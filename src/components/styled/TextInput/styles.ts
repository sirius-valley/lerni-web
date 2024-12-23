import styled from 'styled-components';
import { StyledRow } from '../styles';
import { InputBoxProps, TextInputProps } from '.';
import { ChangeEvent } from 'react';

interface StyledInputProps extends Omit<TextInputProps, 'onChange'> {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const StyledInput = styled.input<StyledInputProps>`
  outline: none !important;
  border: none !important;
  transition: all 0.2s ease-in-out;
  padding: 6px 8px;
  width: 100%;
  font-size: 14px;
  color: ${(props) => {
    if (props.disabled) {
      return props.theme.gray400;
    } else {
      return props.theme.primary950;
    }
  }};
  background-color: ${(props) => {
    if (props.disabled) {
      return props.theme.gray200;
    } else {
      return props.theme.white;
    }
  }};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledTextArea = styled.textarea<StyledInputProps>`
  outline: none !important;
  border: none !important;
  transition: all 0.2s ease-in-out;
  padding: 6px 8px;
  width: 100%;
  height: 100%;
  color: ${(props) => {
    if (props.disabled) {
      return props.theme.gray400;
    } else {
      return props.theme.primary950;
    }
  }};
  background-color: ${(props) => {
    if (props.disabled) {
      return props.theme.gray200;
    } else {
      return props.theme.white;
    }
  }};
  text-overflow: ellipsis;
  resize: none;
  font-family: Roboto;
  font-size: 14px;
  &::placeholder {
    color: ${(props) => (props.disabled ? props.theme.gray400 : props.theme.gray300)};
  }
`;

export const StyledTextInputBox = styled(StyledRow)<InputBoxProps>`
  justify-content: space-between;
  outline: 1px solid transparent;
  align-items: center;
  padding: 6px 8px;
  border-radius: 8px;
  gap: 10px;
  width: 100%;
  border: 1px solid
    ${(props) => (props.error === 'true' ? props.theme.red500 : props.theme.gray200)};
  background-color: ${(props) => (props.disabled ? props.theme.gray200 : props.theme.white)};
  color: ${(props) => props.theme.primary950};
  transition: all 0.2s ease-in-out;

  &:hover {
    outline: 1px solid
      ${(props) =>
        props.error === 'true'
          ? props.theme.red500
          : props.focused === 'true'
            ? props.theme.primary500
            : props.theme.gray200};
  }

  &:focus-within {
    border-color: ${(props) =>
      props.error === 'true'
        ? props.theme.red500
        : props.disabled
          ? props.theme.gray200
          : props.theme.primary500};
  }

  & > input::placeholder {
    color: ${(props) => (props.disabled ? props.theme.gray400 : props.theme.gray300)};
  }
`;
