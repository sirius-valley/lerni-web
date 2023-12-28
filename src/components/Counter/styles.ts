import styled from 'styled-components';
import { jsToCss } from '../../utils/utils';

export interface StyledProps {
  css?: { [x: string]: any };
}

export const Button = styled.button<StyledProps>`
  height: 40px;
  width: 100px;
  border-radius: 8px;
  ${(props) => props.css && jsToCss(props.css)}
`;
