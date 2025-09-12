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

// Default images
export const DEFAULT_IMAGE_URL =
  'https://lerni-images-2024.s3.amazonaws.com/default_image_program.jpg';
