import { IconInterface } from '../../utils/utils';
import React from 'react';

export const PeopleIcon = ({ size, color }: IconInterface) => {
  return (
    <svg
      width={size ? size : '24'}
      height={size ? size : '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.339 18C10.7087 18 10.2706 17.9118 10.0246 17.7353C9.77863 17.5589 9.65565 17.3082 9.65565 16.9832C9.65565 16.5653 9.79913 16.1242 10.0861 15.6599C10.373 15.1909 10.7855 14.7568 11.3236 14.3575C11.8668 13.9536 12.5176 13.6239 13.2759 13.3685C14.0343 13.1132 14.885 12.9855 15.8278 12.9855C16.7707 12.9855 17.6213 13.1132 18.3797 13.3685C19.1381 13.6239 19.7863 13.9536 20.3244 14.3575C20.8624 14.7568 21.2749 15.1909 21.5619 15.6599C21.854 16.1242 22 16.5653 22 16.9832C22 17.3082 21.877 17.5589 21.6311 17.7353C21.3851 17.9118 20.947 18 20.3167 18H11.339ZM15.8278 11.8363C15.2898 11.8363 14.7953 11.7063 14.3444 11.4463C13.8934 11.1817 13.5347 10.8265 13.2683 10.3807C13.0018 9.935 12.866 9.43819 12.8609 8.89031C12.8609 8.361 12.9967 7.87812 13.2683 7.44167C13.5398 7.00058 13.8985 6.65003 14.3444 6.39002C14.7953 6.13001 15.2898 6 15.8278 6C16.3659 6 16.8578 6.13001 17.3036 6.39002C17.7545 6.64539 18.1132 6.99129 18.3797 7.42774C18.6513 7.85955 18.7871 8.34475 18.7871 8.88334C18.7871 9.43587 18.6539 9.935 18.3874 10.3807C18.1209 10.8265 17.7622 11.1817 17.3113 11.4463C16.8655 11.7063 16.371 11.8363 15.8278 11.8363ZM3.42967 18C2.90187 18 2.53036 17.9002 2.31514 17.7005C2.10505 17.5009 2 17.22 2 16.8578C2 16.4214 2.12811 15.9756 2.38432 15.5206C2.64053 15.0656 3.00692 14.6454 3.48347 14.26C3.96003 13.8746 4.52626 13.5636 5.18217 13.3268C5.8432 13.09 6.57341 12.9716 7.37279 12.9716C8.0082 12.9716 8.58468 13.0459 9.10223 13.1944C9.61978 13.3384 10.0733 13.5218 10.4627 13.7446C10.0323 14.0557 9.6659 14.4039 9.36357 14.7893C9.06123 15.1701 8.83064 15.5601 8.67179 15.9594C8.51806 16.354 8.44632 16.7278 8.45657 17.0807C8.47194 17.4382 8.57955 17.7446 8.7794 18H3.42967ZM7.38048 11.9756C6.90904 11.9756 6.47861 11.8619 6.08916 11.6344C5.69972 11.4068 5.38714 11.1004 5.15142 10.715C4.91571 10.3297 4.79785 9.89785 4.79785 9.41962C4.79785 8.95531 4.91571 8.53279 5.15142 8.15206C5.38714 7.77133 5.69972 7.46721 6.08916 7.2397C6.48373 7.01219 6.91417 6.89843 7.38048 6.89843C7.84678 6.89843 8.27466 7.00987 8.6641 7.23273C9.05867 7.4556 9.37382 7.7574 9.60953 8.13813C9.84525 8.51886 9.96311 8.9437 9.96311 9.41265C9.96311 9.89089 9.84525 10.325 9.60953 10.715C9.37382 11.1004 9.06123 11.4068 8.67179 11.6344C8.28235 11.8619 7.85191 11.9756 7.38048 11.9756Z"
        fill={color ? color : '#000C0F'}
      />
    </svg>
  );
};