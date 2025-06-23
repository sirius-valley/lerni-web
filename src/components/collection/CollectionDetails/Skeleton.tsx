import React from 'react';
import { Skeleton } from '@mui/material';
import Card from '../../Card';
import { StyledRow } from '../../styled/styles';

const CollectionDetailsSkeleton = () => {
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
      <Skeleton variant="rounded" width="100%" height={40} />
    </Card>
  );
};

export default CollectionDetailsSkeleton;
