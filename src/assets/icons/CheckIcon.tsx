import React from 'react';
import { IconInterface } from '../../utils/utils';

const CircleCheckIcon = ({ color = '#0EB51F', size = 20 }: IconInterface) => {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.32787 6C2.08525 6 1.89508 5.89989 1.71803 5.6663L0.170492 3.74416C0.0590165 3.604 0 3.45717 0 3.297C0 2.96329 0.255738 2.703 0.577049 2.703C0.767213 2.703 0.92459 2.77642 1.08197 2.98332L2.30164 4.56507L4.8918 0.333704C5.02951 0.106785 5.20656 0 5.40328 0C5.71148 0 6 0.220245 6 0.547275C6 0.700779 5.92131 0.860957 5.83607 1.00111L2.90492 5.6663C2.76721 5.87987 2.56393 6 2.32787 6Z"
        fill="white"
      />
    </svg>
  );
};

export default CircleCheckIcon;
