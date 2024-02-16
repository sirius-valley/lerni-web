import React from 'react';
import { SendIconInterface } from '../../utils/utils';
import { HomeIcon } from '../../assets/icons/HomeIcon';
import { BooksIcon } from '../../assets/icons/BooksIcon';
import { PillIcon } from '../../assets/icons/PillIcon';
import { BoltIcon } from '../../assets/icons/BoltIcon';
import { ScreenIcon } from '../../assets/icons/ScreenIcon';
import { PeopleIcon } from '../../assets/icons/PeopleIcon';
import { LogoutIcon } from '../../assets/icons/LogoutIcon';
import { StyledBox, StyledColumn } from '../styled/styles';
import { useTheme } from 'styled-components';
import { NavbarItem } from './NavbarItem';
import { LogoIcon } from '../../assets/icons/LogoIcon';
import { RightArrowIcon } from '../../assets/icons/RightArrowIcon';

interface NavbarItem {
  id: string;
  name: string;
  screen: string;
  iconName: React.FC<SendIconInterface>;
}

export const NavBarItems: NavbarItem[] = [
  //Estaría bueno pasar esto a un constants ???
  {
    id: 'Home',
    name: 'Home',
    screen: 'home',
    iconName: HomeIcon,
  },
  {
    id: 'Books',
    name: 'Books',
    screen: 'books',
    iconName: BooksIcon,
  },
  {
    id: 'Pill',
    name: 'Pill',
    screen: 'pill',
    iconName: PillIcon,
  },
  {
    id: 'Trivia',
    name: 'Trivia',
    screen: 'trivia',
    iconName: BoltIcon,
  },
  {
    id: 'Share',
    name: 'Share',
    screen: 'share',
    iconName: ScreenIcon,
  },
  {
    id: 'People',
    name: 'People',
    screen: 'people',
    iconName: PeopleIcon,
  },
];

const handleClick = () => {
  alert('Router push screen');
};

export const NavBar = () => {
  const theme = useTheme();
  return (
    <StyledColumn
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100vh',
        width: 72,
        backgroundColor: theme.white,
        padding: '18px 12px 24px 12px',
        gap: 12,
      }}
    >
      <StyledColumn style={{ gap: 12 }}>
        <StyledColumn
          style={{
            width: 72,
            height: 72,
            gap: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StyledBox
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 40,
              height: 40,
              padding: '7px 9px',
              borderRadius: 9,
              backgroundColor: theme.primary500,
            }}
          >
            <LogoIcon size={22} />
          </StyledBox>
          <RightArrowIcon color={theme.gray300} size={13} />
        </StyledColumn>
        <StyledColumn style={{ padding: '28px 12px 0px 12px', gap: 6 }}>
          {NavBarItems.map((item, idx) => (
            <NavbarItem key={idx} name={item.name} icon={item.iconName} onClick={handleClick} />
          ))}
        </StyledColumn>
      </StyledColumn>
      <StyledColumn
        style={{
          gap: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledBox
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 12 }}
        >
          <LogoutIcon />
        </StyledBox>
        <StyledBox
          style={{ backgroundColor: theme.gray300, borderRadius: 100, width: 42, height: 42 }}
        />
      </StyledColumn>
    </StyledColumn>
  );
};
