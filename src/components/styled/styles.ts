import styled, { css as styledComponent } from 'styled-components';
import { ThemeColors } from '../../utils/theme';

interface StyledLine {
  color?: keyof ThemeColors;
}

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3';

interface StyledTextInterface {
  variant?: TextVariant;
  color?: keyof ThemeColors;
}

export const StyledText = styled.p<StyledTextInterface>`
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
