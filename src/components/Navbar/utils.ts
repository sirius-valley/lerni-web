import { HomeIcon } from '../../assets/icons/HomeIcon';
import { PillIcon } from '../../assets/icons/PillIcon';
import { PeopleIcon } from '../../assets/icons/PeopleIcon';
import { LibraryIcon } from '../../assets/icons/LibraryIcon';
import { TriviaIcon } from '../../assets/icons/TriviaIcon';
import { ClassIcon } from '../../assets/icons/ClassIcon';

export const NavBarItems = [
  {
    id: 'Home',
    name: 'Home',
    screen: 'home',
    icon: HomeIcon,
    redirect: '/',
    activeRoutes: ['/'],
  },
  {
    id: 'Library',
    name: 'Library',
    screen: 'library',
    icon: LibraryIcon,
    redirect: '/create/program',
    activeRoutes: ['/create/program'],
  },
  // {
  //   id: 'Pill',
  //   name: 'Pill',
  //   screen: 'pill',
  //   icon: PillIcon,
  //   redirect: '/',
  // },
  // {
  //   id: 'Trivia',
  //   name: 'Trivia',
  //   screen: 'trivia',
  //   icon: TriviaIcon,
  //   redirect: '/',
  // },
  // {
  //   id: 'Class',
  //   name: 'Class',
  //   screen: 'class',
  //   icon: ClassIcon,
  //   redirect: '/',
  // },
  // {
  //   id: 'People',
  //   name: 'People',
  //   screen: 'people',
  //   icon: PeopleIcon,
  //   redirect: '/',
  // },
];
