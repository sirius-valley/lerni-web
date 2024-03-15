import React from 'react';
import { StyledColumn } from '../components/styled/styles';
import { NavBar } from '../components/Navbar';
import { useTheme } from 'styled-components';
import { Outlet } from 'react-router-dom';

const NavigationLayout = () => {
  const theme = useTheme();
  return (
    <StyledColumn
      css={{
        background: theme.gray200,
        height: '100vh',
        width: '100vw',
      }}
    >
      <NavBar />
      <StyledColumn
        css={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          overflowX: 'hidden',
          height: '100%',
        }}
      >
        <Outlet />
      </StyledColumn>
    </StyledColumn>
  );
};

export default NavigationLayout;
