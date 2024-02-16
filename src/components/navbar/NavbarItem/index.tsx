import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StyledBox } from '../../styled/styles';

interface NavbarItemProps {
  name: string;
  icon: any;
  onClick?: any;
}

export const NavbarItem = ({ name, icon: Icon, onClick }: NavbarItemProps) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  return (
    <StyledBox
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: '12px',
        backgroundColor: focused ? theme.primary200 : 'transparent',
      }}
    >
      <Icon color={focused ? theme.primary500 : theme.gray400} size={18} onClick={onClick} />
    </StyledBox>
  );
};
