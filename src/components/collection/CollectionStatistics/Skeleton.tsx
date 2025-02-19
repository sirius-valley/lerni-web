import Card from '../../Card';
import { StyledColumn, StyledRow } from '../../styled/styles';
import { Skeleton } from '@mui/material';
import React from 'react';

const CollectionStatisticsSkeleton = () => {
  return (
    <StyledRow style={{ justifyContent: 'space-between', width: '832px', gap: 12 }}>
      <MetricCardSkeleton />
      <MetricCardSkeleton />
      <MetricCardSkeleton />
    </StyledRow>
  );
};

const MetricCardSkeleton = () => {
  return (
    <Card
      headerComponent={
        <StyledRow
          style={{
            width: '100%',
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '6px',
            height: 35,
            alignItems: 'start',
          }}
        >
          <Skeleton variant="text" width={120} height={35} />
        </StyledRow>
      }
    >
      <StyledColumn style={{ gap: 10, alignItems: 'center' }}>
        <Skeleton variant="rounded" width={120} height={84} />
        <Skeleton variant="text" width={100} height={24} />
      </StyledColumn>
    </Card>
  );
};

export default CollectionStatisticsSkeleton;
