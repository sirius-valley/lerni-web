import styled from 'styled-components';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    padding: 6px 8px !important;
    color: ${({ theme }) => theme.black};
    font-size: 14px;
    transition: all 0.2s ease-in-out;

    & fieldset {
      border-color: ${({ theme }) => theme.gray200};
      border-width: 1px;
      transition: box-shadow 0.2s ease-in-out;
    }

    &:hover fieldset {
      border-color: ${({ theme }) => theme.gray200};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.gray200};
      transition: box-shadow 0.2s ease-in-out;
    }

    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.primary500};
      border-width: 1px;
      transition: box-shadow 0.2s ease-in-out;
    }

    &:hover.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.primary500};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.primary500};
      transition: box-shadow 0.2s ease-in-out;
    }
  }

  & input::placeholder {
    color: ${({ theme }) => theme.gray400};
  }

  & .MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input {
    padding: 2px;
  }
`;
