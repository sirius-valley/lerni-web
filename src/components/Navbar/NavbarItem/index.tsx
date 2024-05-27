import React from 'react';
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
    <StyledNavbarContainer selected={!!isSelected} onClick={onClick}>
      <Icon size={20} />
    </StyledNavbarContainer>
  );
};
