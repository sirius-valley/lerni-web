import styled from 'styled-components';
import { StyledColumn } from '../styles';

interface StyledFileUploadBox {
  hasCorrectValue?: boolean;
  error?: boolean;
  disabled?: boolean;
  focused?: boolean;
}

export const StyledFileUploadContainer = styled(StyledColumn)<StyledFileUploadBox>`
  border-radius: 16px;
  outline: 1px solid transparent;
  border: 1px solid
    ${({ theme, error, hasCorrectValue }) => {
      if (hasCorrectValue) return theme.primary400;
      if (error) return theme.red500;
      return theme.gray200;
    }};
  padding: 6px 12px;
  gap: 10px;
  width: 100%;
  background-color: ${({ disabled, theme }) => {
    if (disabled) return theme.gray200;
    return theme.white;
  }};

  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.primary950};
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover {
    outline: 1px solid
      ${(props) =>
        props.error
          ? props.theme.red500
          : props.focused
            ? props.theme.primary500
            : props.theme.gray200};
  }

  &:focus-within {
    border-color: ${(props) =>
      props.error
        ? props.theme.red500
        : props.disabled
          ? props.theme.gray200
          : props.theme.primary500};
  }

  & > input::placeholder {
    color: ${(props) => (props.disabled ? props.theme.gray400 : props.theme.gray300)};
  }
`;
