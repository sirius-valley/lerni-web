import styled from "styled-components";
import { jsToCss } from "../utils/utils";

export interface StyledProps {
  style?: { [x: string]: any }
}

export const RootContainer = styled.div<StyledProps>`
  min-height: 100%;
  width: 100%;
  ${(props) => props.style && jsToCss(props.style)}
`;

export const Button = styled.button<StyledProps>`
  height: 40px;
  width: 100px;
  border-radius: 8px;
  ${(props) => props.style && jsToCss(props.style)}
`;
