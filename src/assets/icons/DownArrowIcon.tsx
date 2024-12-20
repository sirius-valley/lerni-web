import React from 'react';
import { IconInterface } from '../../utils/utils';

export const DownArrowIcon = ({ size, color }: IconInterface) => {
  return (
    <svg
      width={size ?? '20'}
      height={size ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.76668 7.74167L10 10.975L13.2333 7.74167C13.5583 7.41667 14.0834 7.41667 14.4083 7.74167C14.7333 8.06667 14.7333 8.59167 14.4083 8.91667L10.5833 12.7417C10.2583 13.0667 9.73335 13.0667 9.40835 12.7417L5.58335 8.91667C5.25835 8.59167 5.25835 8.06667 5.58335 7.74167C5.90835 7.42501 6.44168 7.41667 6.76668 7.74167Z"
        fill={color ?? '#CBD5E1'}
      />
    </svg>
  );
};
