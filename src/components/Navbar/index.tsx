import React from 'react';
import { IconInterface } from '../../utils/utils';
import { HomeIcon } from '../../assets/icons/HomeIcon';
import { PillIcon } from '../../assets/icons/PillIcon';
import { PeopleIcon } from '../../assets/icons/PeopleIcon';
import { LogoutIcon } from '../../assets/icons/LogoutIcon';
import { StyledBox, StyledColumn } from '../styled/styles';
import { useTheme } from 'styled-components';
import { NavbarItem } from './NavbarItem';
import { LogoIcon } from '../../assets/icons/LogoIcon';
import { RightArrowIcon } from '../../assets/icons/RightArrowIcon';
import { LibraryIcon } from '../../assets/icons/LibraryIcon';
import { TriviaIcon } from '../../assets/icons/TriviaIcon';
import { ClassIcon } from '../../assets/icons/ClassIcon';

interface NavbarItem {
  id: string;
  name: string;
  screen: string;
  iconName: React.FC<IconInterface>;
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
    id: 'Library',
    name: 'Library',
    screen: 'library',
    iconName: LibraryIcon,
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
    iconName: TriviaIcon,
  },
  {
    id: 'Class',
    name: 'Class',
    screen: 'class',
    iconName: ClassIcon,
  },
  {
    id: 'People',
    name: 'People',
    screen: 'people',
    iconName: PeopleIcon,
  },
];

const handleClick = () => {
  alert('ruta pusheada');
};

export const NavBar = () => {
  const theme = useTheme();
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
            <NavbarItem key={idx} name={item.name} icon={item.iconName} onClick={handleClick} />
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
          onClick={() => alert('Cerrar Sesión')}
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
