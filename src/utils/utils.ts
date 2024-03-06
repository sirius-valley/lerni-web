import { ComponentVariantType } from './constants';
import { theme } from './theme';

// type CSSProperties = { [key: string]: string | number};
export type CSSProperties = {
  [key: string]:
    | string
    | number
    | {
        [x: string]: string | number;
      };
};

export const getTokenFromLocalStorage = () => localStorage.getItem('token');

const camelToDash = (str: string): string => {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};

export const jsToCss = (styles: CSSProperties): string => {
  return Object.keys(styles)
    .map((key) => `${camelToDash(key)}: ${styles[key]};`)
    .join('\n');
};

export const getStyleColorByVariant = (componentVariant: ComponentVariantType) => {
  switch (componentVariant) {
    case ComponentVariantType.PRIMARY:
      return theme.primary500;
    case ComponentVariantType.DARK:
      return theme.primary800;
    case ComponentVariantType.RED:
      return theme.red500;
    default:
      return theme.gray300;
  }
};

export interface IconInterface {
  color?: string;
  size?: number;
}
