import React from 'react';
import { IconInterface } from '../../utils/utils';

interface FilterIconProps extends IconInterface {
  size?: number;
  color?: string;
  selected?: boolean;
}

const FilterIcon = ({ size, color, selected }: FilterIconProps) => {
  return (
    <svg
      width={size ?? '16'}
      height={size ?? '16'}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      {selected ? (
        <path
          d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
          fill={color ?? '#000'}
        />
      ) : (
        <path
          d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
          fill="none"
          stroke={color ?? '#000'}
          strokeWidth="16"
        />
      )}
    </svg>
  );
};

export default FilterIcon;
