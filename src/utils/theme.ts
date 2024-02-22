export const theme = {
  primary950: '#000C0F',
  primary900: '#001B23',
  primary800: '#072C37',
  primary700: '#095869',
  primary650: '#005067',
  primary600: '#307F90',
  primary500: '#18BAC8',
  primary400: '#33C7D3',
  primary200: '#C6EFFC',
  blue500: '#273873',
  white: '#FFFFFF',
  red400: '#EC7F74',
  red500: '#FC6464',
  red600: '#B93333',
  gray50: '#f8fafc',
  gray100: '#f1f5f9',
  gray200: '#e2e8f0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64758B',
  gray600: '#475569',
  gray800: '#1E293B',
  gray900: '#0F172A',
  gray950: '#020617',
  success: '#0EB51F',
  warning: '#F99D32',
  error: '#D84545',
  h1: {
    fontFamily: 'Roboto-Bold',
    fontSize: '24px',
  },
  h2: {
    fontFamily: 'Roboto-Bold',
    fontSize: '20px',
  },
  h3: {
    fontFamily: 'Roboto-Bold',
    fontSize: '18px',
  },
  h4: {
    fontFamily: 'Roboto-Bold',
    fontSize: '16px',
  },
  body1: {
    fontFamily: 'Roboto',
    fontSize: '16px',
  },
  body2: {
    fontFamily: 'Roboto',
    fontSize: '14px',
  },
  body3: {
    fontFamily: 'Roboto',
    fontSize: '12px',
  },
};

export type MyTheme = typeof theme;
export type ThemeColors = Omit<MyTheme, 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3'>;
export type ThemeFonts = Pick<MyTheme, 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3'>;
