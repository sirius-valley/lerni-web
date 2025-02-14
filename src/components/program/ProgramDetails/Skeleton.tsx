import React from 'react';
import { Skeleton } from '@mui/material';
import { StyledBox, StyledColumn, StyledRow } from '../../styled/styles';
import Card from '../../Card';

const ProgramDetailsSkeleton = () => {
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
      <StyledRow style={{ gap: '24px', marginTop: '12px' }}>
        {/* Imagen del programa */}
        <StyledBox style={{ width: '180px', height: '180px' }}>
          <Skeleton
            variant="rectangular"
            width={180}
            height={180}
            style={{ borderRadius: '6px' }}
          />
        </StyledBox>
        <StyledColumn style={{ width: '100%', gap: 16 }}>
          {/* Campos de texto */}
          <Skeleton variant="rectangular" width="100%" height={48} />
          <Skeleton variant="rectangular" width="100%" height={48} />

          {/* Autocomplete Profesor */}
          <Skeleton variant="rectangular" width="100%" height={48} />

          {/* Descripción */}
          <Skeleton variant="rectangular" width="100%" height={120} />

          {/* Fecha de inicio y finalización */}
          <StyledRow css={{ gap: '16px' }}>
            <Skeleton variant="rectangular" width="50%" height={40} />
            <Skeleton variant="rectangular" width="50%" height={40} />
          </StyledRow>
        </StyledColumn>
      </StyledRow>
    </Card>
  );
};

export default ProgramDetailsSkeleton;
