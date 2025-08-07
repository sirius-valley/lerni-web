import { HomeIcon } from '../../assets/icons/HomeIcon';
import { PillIcon } from '../../assets/icons/PillIcon';
import { PeopleIcon } from '../../assets/icons/PeopleIcon';
import { LibraryIcon } from '../../assets/icons/LibraryIcon';
import { TriviaIcon } from '../../assets/icons/TriviaIcon';
import { ClassIcon } from '../../assets/icons/ClassIcon';
import { EntityType } from '../../utils/permissions';

export const NavBarItems = [
  {
    id: 'Home',
    name: 'Home',
    screen: 'home',
    icon: HomeIcon,
    redirect: '/',
    activeRoutes: ['/'],
    permissionsRequired: [],
    entityForPermissions: [],
  },
  {
    id: 'Library',
    name: 'Library',
    screen: 'library',
    icon: LibraryIcon,
    redirect: '/create/program',
    activeRoutes: ['/create/program', '/create/collection'],
    permissionsRequired: ['create'],
    entityForPermissions: [EntityType.PROGRAM],
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
