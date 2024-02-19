import { IconInterface } from '../../utils/utils';
import React from 'react';

export const TriviaIcon = ({ size, color }: IconInterface) => {
  return (
    <svg
      width={size ? size : '24'}
      height={size ? size : '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 13.113C5 12.9025 5.10302 12.7182 5.28846 12.5252L14.9004 2.38232C15.6422 1.60143 16.8063 2.11032 16.3839 3.0667L13.2418 10.2615H19.217C19.6703 10.2615 20 10.5247 20 10.8932C20 11.095 19.9073 11.2793 19.7218 11.4811L10.0996 21.6239C9.35783 22.396 8.19368 21.8871 8.61607 20.9308L11.7582 13.7448H5.78297C5.32967 13.7448 5 13.4728 5 13.113Z"
        fill={color ? color : '#000C0F'}
      />
    </svg>
  );
};
