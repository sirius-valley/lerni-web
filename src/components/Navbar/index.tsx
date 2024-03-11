import React from 'react';
import { LogoutIcon } from '../../assets/icons/LogoutIcon';
import { StyledBox, StyledColumn } from '../styled/styles';
import { useTheme } from 'styled-components';
import { NavbarItem } from './NavbarItem';
import { LogoIcon } from '../../assets/icons/LogoIcon';
import { RightArrowIcon } from '../../assets/icons/RightArrowIcon';
import { useLDispatch } from '../../redux/hooks';
import { resetAllStates } from '../../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavBarItems } from './utils';

export const NavBar = () => {
  const theme = useTheme();
  const dispatch = useLDispatch();
  const navigate = useNavigate();

  const handleLogout = () => dispatch(resetAllStates());
  const { pathname } = useLocation();

  return (
    <StyledColumn
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        bottom: 0,
        width: 72,
        backgroundColor: theme.white,
        padding: '18px 15px 24px 15px',
        gap: 12,
      }}
    >
      <StyledColumn style={{ gap: 15 }}>
        <StyledColumn
          style={{
            width: 72,
            height: 72,
            gap: 12,
            padding: '0px 16px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StyledBox
            onClick={() => alert('ir a home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 40,
              height: 40,
              padding: '7px 9px',
              borderRadius: 9,
              backgroundColor: theme.primary500,
              cursor: 'pointer',
            }}
          >
            <LogoIcon size={22} />
          </StyledBox>
          <StyledBox
            onClick={() => alert('volver para atras')}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <RightArrowIcon color={theme.gray300} size={13} />
          </StyledBox>
        </StyledColumn>
        <StyledColumn style={{ padding: '28px 12px 0px 12px', gap: 6 }}>
          {NavBarItems.map((item, idx) => (
            <NavbarItem
              key={idx}
              name={item.name}
              icon={item.icon}
              isSelected={item.activeRoutes.includes(pathname)}
              onClick={() => navigate(item.redirect)}
            />
          ))}
        </StyledColumn>
      </StyledColumn>
      <StyledColumn
        style={{
          gap: 6,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledBox
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            width: 42,
            height: 42,
            cursor: 'pointer',
          }}
          onClick={handleLogout}
        >
          <LogoutIcon color={theme.gray400} size={18} />
        </StyledBox>
        <StyledBox
          onClick={() => alert('Ir a profile')}
          style={{
            backgroundColor: theme.gray300,
            borderRadius: 100,
            width: 42,
            height: 42,
            cursor: 'pointer',
          }}
        />
      </StyledColumn>
    </StyledColumn>
  );
};
