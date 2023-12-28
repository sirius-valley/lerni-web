import styled from 'styled-components';
import { jsToCss } from '../utils/utils';

export interface StyledProps {
  style?: { [x: string]: any };
}

export const RootContainer = styled.div<StyledProps>`
  min-height: 100vh;
  width: 100%;
  ${(props) => props.style && jsToCss(props.style)}
`;
