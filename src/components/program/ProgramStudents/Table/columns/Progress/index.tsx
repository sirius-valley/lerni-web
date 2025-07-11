import { useTheme } from 'styled-components';
import { CircularProgress } from '@mui/material';
import { StyledBox } from '../../../../../styled/styles';
import CircleCheckIcon from '../../../../../../assets/icons/CircleCheckIcon';
import { Tooltip } from 'react-tooltip';
import React from 'react';

interface ProgressProps {
  progress?: number;
}

const Progress = React.memo(({ progress = 0 }: ProgressProps) => {
  const theme = useTheme();
  return (
    <StyledBox style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {progress === 0 ? (
        <CircularProgress
          variant="determinate"
          value={100} // Completo
          size={20}
          thickness={4}
          sx={{ color: theme.gray200 }} // Color gris
          data-tooltip-id={'table-tooltip'}
          data-tooltip-content={`${progress}%`}
        />
      ) : progress < 100 ? (
        <CircularProgress
          variant="determinate"
          value={progress}
          size={20}
          thickness={4}
          sx={{ color: progress < 100 ? theme.primary500 : theme.success }}
          data-tooltip-id={'table-tooltip'}
          data-tooltip-content={`${progress}%`}
        />
      ) : (
        <StyledBox>
          <CircleCheckIcon size={20} color={theme.success} />
        </StyledBox>
      )}
    </StyledBox>
  );
});

export default Progress;
