import React from 'react';
import { IconInterface } from '../../utils/utils';

const CheckIcon = ({ color = '#000000', size = 24 }: IconInterface) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill={color} />
      <path
        d="M10 20C4.53049 20 0 15.4792 0 10C0 4.53049 4.52081 0 9.99032 0C15.4695 0 20 4.53049 20 10C20 15.4792 15.4695 20 10 20ZM10 18.0348C14.453 18.0348 18.0348 14.453 18.0348 10C18.0348 5.54695 14.4434 1.97483 9.99032 1.97483C5.53727 1.97483 1.97483 5.54695 1.97483 10C1.97483 14.453 5.54695 18.0348 10 18.0348ZM8.9545 14.5983C8.59632 14.5983 8.31559 14.453 8.05421 14.1142L5.7696 11.3262C5.60503 11.1229 5.51791 10.91 5.51791 10.6776C5.51791 10.1936 5.89545 9.81607 6.3698 9.81607C6.65053 9.81607 6.88287 9.92255 7.1152 10.2227L8.91578 12.5169L12.7396 6.37948C12.9429 6.05034 13.2043 5.89545 13.4947 5.89545C13.9497 5.89545 14.3756 6.21491 14.3756 6.68925C14.3756 6.91191 14.2594 7.14424 14.1336 7.34753L9.80639 14.1142C9.6031 14.424 9.303 14.5983 8.9545 14.5983Z"
        fill="white"
      />
    </svg>
  );
};

export default CheckIcon;
