import React from 'react';
import { CircularProgress } from '@mui/material';
import { ComponentVariantType } from '../../utils/constants';
import { getStyleColorByVariant } from '../../utils/utils';
import { theme } from '../../utils/theme';

interface SpinnerInterface {
  variant?: ComponentVariantType;
  size?: number;
}

const Spinner = ({ variant = ComponentVariantType.PRIMARY, size = 40 }: SpinnerInterface) => {
  const getSpinnerColor = () => {
    switch (variant) {
      case ComponentVariantType.PRIMARY:
        return getStyleColorByVariant(ComponentVariantType.DARK);
      case ComponentVariantType.GHOST:
        return getStyleColorByVariant(ComponentVariantType.PRIMARY);
      default:
        return theme.white;
    }
  };

  return (
    <CircularProgress
      sx={{
        '& .MuiCircularProgress-circle': {
          stroke: getSpinnerColor(),
        },
      }}
      size={size}
    />
  );
};

export default Spinner;
