import React from 'react';
import { SendIconInterface } from '../../utils/utils';

export const BoltIcon = ({ color, size }: SendIconInterface) => {
  return (
    <svg
      width={size ? size : '14'}
      height={size ? size : '18'}
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 9.92082C0.5 9.74661 0.589286 9.59418 0.75 9.43449L9.08036 1.04358C9.72321 0.397565 10.7321 0.818562 10.3661 1.60975L7.64286 7.56178H12.8214C13.2143 7.56178 13.5 7.77954 13.5 8.0844C13.5 8.25134 13.4196 8.40377 13.2589 8.57072L4.91964 16.9616C4.27679 17.6004 3.26786 17.1794 3.63393 16.3882L6.35714 10.4434H1.17857C0.785714 10.4434 0.5 10.2184 0.5 9.92082Z"
        fill={color ? color : '#94A3B8'}
      />
    </svg>
  );
};
