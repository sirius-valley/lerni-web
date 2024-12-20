import React from 'react';
import { IconInterface } from '../../utils/utils';

export const UpArrowIcon = ({ size, color }: IconInterface) => {
  return (
    <svg
      width={size ?? '20'}
      height={size ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2333 12.2583L9.99998 9.025L6.76665 12.2583C6.44165 12.5833 5.91665 12.5833 5.59165 12.2583C5.26665 11.9333 5.26665 11.4083 5.59165 11.0833L9.41665 7.25833C9.74165 6.93333 10.2667 6.93333 10.5917 7.25833L14.4167 11.0833C14.7417 11.4083 14.7417 11.9333 14.4167 12.2583C14.0917 12.575 13.5583 12.5833 13.2333 12.2583Z"
        fill={color ?? '#CBD5E1'}
      />
    </svg>
  );
};
