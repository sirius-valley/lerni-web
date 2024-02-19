import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StyledBox } from '../../styled/styles';

interface NavbarItemProps {
  name: string;
  icon: any;
  onClick?: any;
  focused?: boolean;
}

export const NavbarItem = ({ name, icon: Icon, onClick, focused }: NavbarItemProps) => {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  return (
    <StyledBox
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 12,
        height: 44,
        width: 44,
        backgroundColor: focused ? theme.primary200 : 'transparent',
        cursor: 'pointer',
      }}
    >
      <Icon
        color={hover ? theme.primary500 : focused ? theme.primary950 : theme.gray400}
        size={20}
        onClick={onClick}
      />
    </StyledBox>
  );
};
