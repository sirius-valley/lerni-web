import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StyledBox } from '../../styled/styles';
import { IconInterface } from '../../../utils/utils';
import { StyledNavbarContainer } from './styles';

interface NavbarItemProps {
  name: string;
  icon: React.FC<IconInterface>;
  onClick?: () => void;
  isSelected?: boolean;
}

export const NavbarItem = ({ name, icon: Icon, onClick, isSelected }: NavbarItemProps) => {
  return (
    <StyledNavbarContainer isSelected={!!isSelected} onClick={onClick}>
      <Icon size={20} />
    </StyledNavbarContainer>
  );
};
