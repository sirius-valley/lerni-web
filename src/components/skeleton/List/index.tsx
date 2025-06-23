import React from 'react';
import { CSSObject } from 'styled-components';
import { Skeleton } from '@mui/material';
import { StyledColumn } from '../../styled/styles';
import { CSSProperties } from '../../../utils/utils';

interface SkeletonListProps {
  count: number;
  rowHeight?: number;
  css?: CSSProperties;
}

const SkeletonList = ({ count = 5, rowHeight = 50, css }: SkeletonListProps) => {
  return (
    <StyledColumn
      css={{ gap: '10px', maxHeight: '100%', overflow: 'hidden', flexShrink: 0, ...css }}
    >
      {[...Array(count)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width="100%"
          sx={{ height: rowHeight, minHeight: rowHeight }}
        />
      ))}
    </StyledColumn>
  );
};

export default SkeletonList;
