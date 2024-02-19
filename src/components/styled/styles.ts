import styled, { css as styledComponent } from 'styled-components';
import { TextInputProps } from './TextInput';
import { ThemeColors } from '../../utils/theme';

interface StyledLine {
  color?: keyof ThemeColors;
}

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3';

interface StyledTextInterface {
  variant?: TextVariant;
  color?: keyof ThemeColors;
}

export const StyledText = styled.text<StyledTextInterface>`
  color: ${(props) => (props.color ? props.theme[props.color] : props.theme.primary900)};
  ${({ variant, theme }) => styledComponent(theme[variant || 'body1'])};
`;

export const StyledImage = styled.img``;

export const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledBox = styled.div``;

export const StyledLine = styled.div<StyledLine>`
  height: 1px;
  width: 100%;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.color ? props.theme[props.color] : props.theme.primary900)};
`;

export const StyledInput = styled.input<TextInputProps>`
  outline: none !important;
  border: none !important;
  /* padding: 12px 16px; */
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
    border: 2px solid;
    transition: ease-in-out 0.1s;
  }

  &:focus-within {
    border-color: ${(props) => props.theme.primary500};
    transition: ease-in-out 0.3s;
  }

  & > input::placeholder {
    color: ${(props) => props.theme.gray300};
  }
`;
