import { IconInterface } from '../../utils/utils';
import React from 'react';

export const SquaredIcon = ({ size, color }: IconInterface) => {
  return (
    <svg
      width={size ? size : '16'}
      height={size ? size : '16'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width={'15'} height="15" rx="1.5" stroke={color ?? 'black'} />
    </svg>
  );
};
