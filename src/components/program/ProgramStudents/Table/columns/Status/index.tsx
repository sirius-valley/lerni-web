import { StyledBox } from '../../../../../styled/styles';
import { Tooltip } from 'react-tooltip';
import React from 'react';
import { useTheme } from 'styled-components';

interface StatusProps {
  status?: boolean;
}

const Status = ({ status }: StatusProps) => {
  const theme = useTheme();
  return (
    <StyledBox style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <StyledBox
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '100%',
          backgroundColor: status ? theme.success : theme.error,
        }}
        data-tooltip-id={'status-tooltip'}
        data-tooltip-content={status ? 'Registrado' : 'No registrado'}
      />
      <Tooltip
        id="status-tooltip"
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

export default Status;
