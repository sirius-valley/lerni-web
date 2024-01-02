import { CircularProgress } from '@mui/material';
import React from 'react';
import { ComponentVariantType } from '../../utils/constants';
import { theme } from '../../utils/theme';
import { getStyleColorByVariant } from '../../utils/utils';

interface SpinnerInterface {
  variant?: ComponentVariantType;
  size?: number;
}

const Spinner = ({ variant = ComponentVariantType.PRIMARY, size = 40 }: SpinnerInterface) => {
  return (
    <CircularProgress
      sx={{
        '& .MuiCircularProgress-circle': {
          stroke: getStyleColorByVariant(variant),
        },
      }}
      size={size}
    />
  );
};

export default Spinner;
