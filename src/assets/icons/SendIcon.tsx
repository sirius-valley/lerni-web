import React from 'react';

interface SendIconInterface {
  color?: string;
  size?: number;
}

const SendIcon = ({ color = '#000C0F', size = 14 }: SendIconInterface) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.00857142 14L18 7L0.00857142 0L0 5.44444L12.8571 7L0 8.55556L0.00857142 14Z"
        fill={color}
      />
    </svg>
  );
};

export default SendIcon;
