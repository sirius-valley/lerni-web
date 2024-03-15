import styled from 'styled-components';
import { StyledBox, StyledColumn } from '../../components/styled/styles';

export const StyledModal = styled(StyledColumn)`
  width: 342px;
  align-items: center;
  padding: 24px;
  gap: 16px;
  background-color: ${(props) => props.theme.primary700};
  border-radius: 8px;
  border: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.primary650};
`;

export const BlurView = styled(StyledBox)`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  background: rgba(0, 42, 55, 0.7);
  backdrop-filter: blur(10px);
`;
