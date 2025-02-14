import React from 'react';
import { Skeleton } from '@mui/material';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Card from '../../Card';

const CollectionStudentsSkeleton = () => {
  return (
    <Card
      height="auto"
      css={{ gap: '12px' }}
      headerComponent={
        <StyledRow
          style={{
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '6px',
          }}
        >
          <Skeleton variant="text" width={120} height={37} />
        </StyledRow>
      }
    >
      {/* Header */}
      <StyledBox style={{ width: '100%', padding: '8px 0' }}>
        <Skeleton variant="rounded" width="100%" height={40} />
      </StyledBox>
      <StyledRow
        style={{
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          borderBottom: '2px solid #e0e0e0',
          padding: '8px 0',
          marginBottom: '6px',
        }}
      >
        <Skeleton variant="text" width={100} height={20} sx={{ mr: '20%' }} />
        <Skeleton variant="text" width={80} height={20} />
        <Skeleton variant="text" width={70} height={20} />
        <Skeleton variant="text" width={80} height={20} />
        <Skeleton variant="text" width={60} height={20} />
      </StyledRow>

      {/* Lista de Programas (modo edición o tabla) */}
      <StyledColumn style={{ gap: '12px' }}>
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" width="100%" height={50} />
        ))}
      </StyledColumn>
    </Card>
  );
};

export default CollectionStudentsSkeleton;
