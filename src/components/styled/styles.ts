import styled from 'styled-components';
import { ThemeColors } from '../../utils/theme';
import { CSSProperties, jsToCss } from '../../utils/utils';

interface StyledLine {
  color?: keyof ThemeColors;
}

export interface StyledPropertiesInterface {
  css?: CSSProperties;
}

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3';

interface StyledTextInterface extends StyledPropertiesInterface {
  variant?: TextVariant;
  color?: keyof ThemeColors;
}

export const StyledText = styled.p<StyledTextInterface>`
  color: ${(props) => (props.color ? props.theme[props.color] : props.theme.primary900)};
  ${({ variant, theme }) => jsToCss(theme[variant || 'body1'])};
  ${({ css }) => css && jsToCss(css)};
`;

export const StyledImage = styled.img``;

export const StyledAvatar = styled.img<StyledPropertiesInterface>`
  border-radius: 50px;
  display: flex;
  justify-content: center;
  height: 36px;
  width: 36px;
  background-color: ${(props) => props.theme.gray100};
  ${({ css }) => css && jsToCss(css)};
`;

export const StyledRow = styled.div<StyledPropertiesInterface>`
  display: flex;
  flex-direction: row;
  ${({ css }) => css && jsToCss(css)};
`;

export const StyledColumn = styled.div<StyledPropertiesInterface>`
  display: flex;
  flex-direction: column;
  ${({ css }) => css && jsToCss(css)};
`;

export const StyledBox = styled.div<StyledPropertiesInterface>`
  ${({ css }) => css && jsToCss(css)};
`;

export const StyledLine = styled.div<StyledLine>`
  height: 1px;
  width: 100%;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.color ? props.theme[props.color] : props.theme.primary900)};
`;

export interface StyledProps {
  style?: { [x: string]: any };
}

export const RootContainer = styled.div<StyledPropertiesInterface>`
  min-height: 100vh;
  width: 100%;
  ${({ css }) => css && jsToCss(css)};
`;
