import { Tooltip } from 'react-tooltip';
import { StyledText } from '../../../../../styled/styles';
import React from 'react';
import { useTheme } from 'styled-components';

interface FullnameProps {
  fullname: string;
}

const Fullname = ({ fullname }: FullnameProps) => {
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
      data-tooltip-id={fullname && fullname.length > 20 ? 'name-tooltip' : undefined}
    >
      {fullname}
      <Tooltip
        id="name-tooltip"
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
    </StyledText>
  );
};

export default Fullname;
