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
    <StyledColumn css={{ gap: '10px', height: '100%', overflowY: 'scroll', ...css }}>
      {[...Array(count)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" width="100%" height={rowHeight} />
      ))}
    </StyledColumn>
  );
};

export default SkeletonList;
