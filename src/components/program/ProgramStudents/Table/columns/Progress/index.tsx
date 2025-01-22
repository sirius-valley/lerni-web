import { useTheme } from 'styled-components';
import { CircularProgress } from '@mui/material';
import { StyledBox } from '../../../../../styled/styles';
import CheckIcon from '../../../../../../assets/icons/CheckIcon';
import { Tooltip } from 'react-tooltip';
import React from 'react';

interface ProgressProps {
  progress?: number;
}

const Progress = ({ progress = 0 }: ProgressProps) => {
  const theme = useTheme();
  return (
    <StyledBox style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {progress < 100 ? (
        <CircularProgress
          variant="determinate"
          value={progress}
          size={20}
          thickness={4}
          sx={{ color: progress < 100 ? theme.primary500 : theme.success }}
          data-tooltip-id={'progress-tooltip'}
          data-tooltip-content={`${progress}%`}
        />
      ) : (
        <StyledBox data-tooltip-id={'progress-tooltip'} data-tooltip-content={`${progress}%`}>
          <CheckIcon size={20} color={theme.success} />
        </StyledBox>
      )}
      <Tooltip
        id="progress-tooltip"
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          backgroundColor: theme.gray600,
          color: 'white',
          fontSize: 14,
          fontFamily: 'Roboto',
        }}
        place="top"
      />
    </StyledBox>
  );
};

export default Progress;
