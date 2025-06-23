import Card from '../../Card';
import { StyledColumn, StyledRow } from '../../styled/styles';
import { Skeleton } from '@mui/material';
import React from 'react';

interface MetricChartSkeletonProps {
  height?: string;
}
const MetricChartSkeleton = ({ height }: MetricChartSkeletonProps) => {
  return (
    <Card
      headerComponent={
        <StyledRow
          style={{
            width: '100%',
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '6px',
            height: '35px', // Misma altura que el Skeleton
            display: 'flex',
            alignItems: 'center', // Alinea verticalmente con el Skeleton
          }}
        >
          <Skeleton variant="text" width={120} height={35} />
        </StyledRow>
      }
      height={height}
    >
      <StyledColumn
        style={{ gap: 10, alignItems: 'center', height: '100%', justifyContent: 'center' }}
      >
        <Skeleton variant="rounded" width={120} height={84} />
        <Skeleton variant="text" width={100} height={24} />
      </StyledColumn>
    </Card>
  );
};

export default MetricChartSkeleton;
