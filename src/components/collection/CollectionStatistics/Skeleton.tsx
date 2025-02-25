import { StyledColumn, StyledRow } from '../../styled/styles';
import React from 'react';
import MetricChartSkeleton from '../../charts/MetricChart/Skeleton';

const CollectionStatisticsSkeleton = () => {
  return (
    <StyledRow style={{ justifyContent: 'space-between', width: '832px', gap: 12 }}>
      <MetricChartSkeleton />
      <MetricChartSkeleton />
      <MetricChartSkeleton />
    </StyledRow>
  );
};

export default CollectionStatisticsSkeleton;
