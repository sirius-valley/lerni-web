import React from 'react';
import { IconInterface } from '../../utils/utils';

const MultiplyIcon = ({ color = '#B50E0E', size = 20 }: IconInterface) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill={color} />
      <path
        d="M9.99517 19.9903C15.4761 19.9903 20 15.4664 20 9.99517C20 4.52392 15.4664 0 9.9855 0C4.51426 0 0 4.52392 0 9.99517C0 15.4664 4.52392 19.9903 9.99517 19.9903ZM9.99517 17.999C5.55824 17.999 2.01063 14.4321 2.01063 9.99517C2.01063 5.55824 5.55824 2.00097 9.9855 2.00097C14.4224 2.00097 17.9894 5.55824 17.999 9.99517C18.0087 14.4321 14.4321 17.999 9.99517 17.999ZM6.82455 14.0551C7.07588 14.0551 7.29821 13.9681 7.46254 13.7941L9.99517 11.2615L12.5278 13.7941C12.6921 13.9584 12.9048 14.0551 13.1658 14.0551C13.6588 14.0551 14.0454 13.6684 14.0454 13.1754C14.0454 12.9338 13.9488 12.7211 13.7844 12.5568L11.2421 10.0145L13.7844 7.46254C13.9681 7.27888 14.0551 7.08555 14.0551 6.85355C14.0551 6.36056 13.6684 5.9739 13.1754 5.9739C12.9338 5.9739 12.7308 6.05123 12.5471 6.2349L9.99517 8.77719L7.44321 6.24456C7.27888 6.07057 7.07588 5.98357 6.82455 5.98357C6.33156 5.98357 5.9449 6.36056 5.9449 6.85355C5.9449 7.09521 6.04157 7.30788 6.21556 7.47221L8.74819 10.0145L6.21556 12.5665C6.04157 12.7211 5.9449 12.9435 5.9449 13.1754C5.9449 13.6684 6.33156 14.0551 6.82455 14.0551Z"
        fill="white"
      />
    </svg>
  );
};

export default MultiplyIcon;