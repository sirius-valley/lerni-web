export enum ComponentVariantType {
  DARK = 'dark',
  PRIMARY = 'primary',
  RED = 'red',
  GHOST = 'ghost',
}

export type TriviaStatus =
  | 'Won'
  | 'Lost'
  | 'Tied'
  | 'In Progress'
  | 'Challenged'
  | 'Waiting'
  | 'Not Started';
