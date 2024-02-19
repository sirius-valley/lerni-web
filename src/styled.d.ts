import 'styled-components';
import { MyTheme } from './utils/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends MyTheme {}
}
