import React from 'react';
import { IconInterface } from '../../utils/utils';

const EllipseIcon = ({ size, color }: IconInterface) => {
  return (
    <svg
      width={size ?? '16'}
      height={size ?? '16'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7.5" stroke={color ?? 'black'} />
    </svg>
  );
};

export default EllipseIcon;
