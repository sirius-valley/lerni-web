import { TextInputStatus } from '../../../utils/constants.';
import { TextInputProps } from './TextInput';
import styled, { DefaultTheme, useTheme } from 'styled-components';

type StyledTextInputProps = {
  status: TextInputStatus;
} & TextInputProps;

export const StyledTextInput = styled.input<StyledTextInputProps>`
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
    const statusColors = {
      [TextInputStatus.DEFAULT]: {
        color: theme.gray900,
        backgroundcolor: theme.white,
      },
      [TextInputStatus.PLACEHOLDER]: {
        color: theme.gray300,
        backgroundColor: theme.white,
      },
      [TextInputStatus.ERROR]: {
        color: theme.red500,
        backgroundColor: theme.white,
      },
      [TextInputStatus.DISABLED]: {
        color: theme.gray400,
        backgroundColor: theme.gray200,
      },
    };
    return statusColors[props.status].color;
  }};
  background-color: ${(props) => {
    const theme = useTheme();
    const statusColors = {
      [TextInputStatus.DEFAULT]: {
        color: theme.gray900,
        backgroundColor: theme.white,
      },
      [TextInputStatus.PLACEHOLDER]: {
        color: theme.gray300,
        backgroundColor: theme.white,
      },
      [TextInputStatus.ERROR]: {
        color: theme.red500,
        backgroundColor: theme.white,
      },
      [TextInputStatus.DISABLED]: {
        color: theme.gray400,
        backgroundColor: theme.gray200,
      },
    };
    return statusColors[props.status].backgroundColor;
  }};

  :focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
`;
