import { IconInterface } from '../../utils/utils';
import React from 'react';

export const RemoveIcon = ({ size, color }: IconInterface) => {
  return (
    <svg
      width={size ?? '18'}
      height={size ?? '18'}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 15.0586C4.5 15.8836 5.175 16.5586 6 16.5586H12C12.825 16.5586 13.5 15.8836 13.5 15.0586V7.55859C13.5 6.73359 12.825 6.05859 12 6.05859H6C5.175 6.05859 4.5 6.73359 4.5 7.55859V15.0586ZM6.75 7.55859H11.25C11.6625 7.55859 12 7.89609 12 8.30859V14.3086C12 14.7211 11.6625 15.0586 11.25 15.0586H6.75C6.3375 15.0586 6 14.7211 6 14.3086V8.30859C6 7.89609 6.3375 7.55859 6.75 7.55859ZM11.625 3.80859L11.0925 3.27609C10.9575 3.14109 10.7625 3.05859 10.5675 3.05859H7.4325C7.2375 3.05859 7.0425 3.14109 6.9075 3.27609L6.375 3.80859H4.5C4.0875 3.80859 3.75 4.14609 3.75 4.55859C3.75 4.97109 4.0875 5.30859 4.5 5.30859H13.5C13.9125 5.30859 14.25 4.97109 14.25 4.55859C14.25 4.14609 13.9125 3.80859 13.5 3.80859H11.625Z"
        fill={color ?? '#94A3B8'}
      />
    </svg>
  );
};
