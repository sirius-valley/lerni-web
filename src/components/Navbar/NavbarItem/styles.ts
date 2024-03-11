import styled from 'styled-components';
import { StyledBox } from '../../styled/styles';

interface StyledNavbarContainerProps {
  isSelected: boolean;
}

export const StyledNavbarContainer = styled(StyledBox)<StyledNavbarContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 12px;
  height: 44px;
  width: 44px;
  background-color: ${(props) => (props.isSelected ? props.theme.primary200 : 'transparent')};
  cursor: pointer;
  svg {
    path {
      fill: ${(props) => (props.isSelected ? props.theme.primary500 : props.theme.gray400)};
    }
  }
  &:hover {
    background-color: ${(props) => props.theme.primary200};
    svg {
      path {
        fill: ${(props) => props.theme.primary500};
      }
    }
  }
`;
