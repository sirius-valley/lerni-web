import { Tooltip } from 'react-tooltip';
import { StyledText } from '../../../../../styled/styles';
import React from 'react';
import { useTheme } from 'styled-components';

interface FullnameProps {
  fullname: string;
}

const Fullname = React.memo(({ fullname }: FullnameProps) => {
  const theme = useTheme();
  return (
    <StyledText
      variant="body1"
      style={{
        maxWidth: '150px',
        textAlign: 'left',
        fontSize: 14,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
      data-tooltip-content={fullname}
      data-tooltip-id={fullname && fullname.length > 20 ? 'table-tooltip' : undefined}
    >
      {fullname}
    </StyledText>
  );
});

export default Fullname;
