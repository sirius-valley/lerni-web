import React from 'react';
import { IconInterface } from '../../utils/utils';

export const CollectionIcon = ({ size = 22, color = '#A4B3C7' }: IconInterface) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.4375 4.125H2.0625C1.6828 4.125 1.375 4.4328 1.375 4.8125V19.25C1.375 19.6297 1.6828 19.9375 2.0625 19.9375H3.4375C3.8172 19.9375 4.125 19.6297 4.125 19.25V4.8125C4.125 4.4328 3.8172 4.125 3.4375 4.125Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4.8125 9.625H10.3125M4.8125 17.1875H10.3125"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.625 6.875H5.5C5.1203 6.875 4.8125 7.1828 4.8125 7.5625V19.25C4.8125 19.6297 5.1203 19.9375 5.5 19.9375H9.625C10.0047 19.9375 10.3125 19.6297 10.3125 19.25V7.5625C10.3125 7.1828 10.0047 6.875 9.625 6.875Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14.4375 2.0625H11.6875C11.3078 2.0625 11 2.3703 11 2.75V19.25C11 19.6297 11.3078 19.9375 11.6875 19.9375H14.4375C14.8172 19.9375 15.125 19.6297 15.125 19.25V2.75C15.125 2.3703 14.8172 2.0625 14.4375 2.0625Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M18.1525 4.12964L16.4165 4.31225C15.9387 4.36253 15.5924 4.8094 15.6461 5.30483L17.1466 19.1232C17.2007 19.6186 17.6351 19.9825 18.113 19.9327L19.8489 19.7501C20.3267 19.6998 20.673 19.2529 20.6193 18.7575L19.121 4.94132C19.0647 4.44374 18.6303 4.07936 18.1525 4.12964Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
