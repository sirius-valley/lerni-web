import { StyledBox, StyledColumn, StyledRow } from '../../styled/styles';
import { Skeleton } from '@mui/material';
import Card from '../../Card';
import React from 'react';

const ProgramContentSkeleton = () => {
  return (
    <Card
      headerComponent={
        <StyledRow
          style={{
            width: '100%',
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '6px',
          }}
        >
          <Skeleton variant="text" width={200} height={40} />
        </StyledRow>
      }
    >
      <Skeleton variant="rectangular" width="100%" height={40} />
    </Card>
  );
};

export default ProgramContentSkeleton;
