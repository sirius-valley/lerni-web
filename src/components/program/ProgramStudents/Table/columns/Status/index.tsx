import { StyledBox } from '../../../../../styled/styles';
import { Tooltip } from 'react-tooltip';
import React from 'react';
import { useTheme } from 'styled-components';

interface StatusProps {
  status?: boolean;
}

const Status = React.memo(({ status }: StatusProps) => {
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
        data-tooltip-id={'table-tooltip'}
        data-tooltip-content={status ? 'Registrado' : 'No registrado'}
      />
    </StyledBox>
  );
});

export default Status;
