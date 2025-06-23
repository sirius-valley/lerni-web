import React from 'react';
import { IconInterface } from '../../utils/utils';

const CloseIcon = ({ size = 20, color = '#CBCFD3' }: IconInterface) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 5L5 15" stroke={color} />
      <path d="M5 5L15 15" stroke={color} />
    </svg>
  );
};

export default CloseIcon;
