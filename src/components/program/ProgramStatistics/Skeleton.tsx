import Card from '../../Card';
import { StyledRow } from '../../styled/styles';
import { Skeleton } from '@mui/material';
import React from 'react';

const ProgramStatisticsSkeleton = () => {
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
      <StyledRow style={{ gap: 10 }}>
        <Skeleton variant="rounded" width={255} height={274} />
        <Skeleton variant="rounded" width={255} height={274} />
        <Skeleton variant="rounded" width={255} height={274} />
      </StyledRow>
    </Card>
  );
};

export default ProgramStatisticsSkeleton;
