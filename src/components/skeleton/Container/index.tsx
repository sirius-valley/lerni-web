import React, { ReactNode } from 'react';
import { StyledColumn, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import { Skeleton } from '@mui/material';
import SkeletonList from '../../skeleton/List';

interface ContainerSkeletonProps {
  title: string;
  children: ReactNode;
}

const ContainerSkeleton = ({ title, children }: ContainerSkeletonProps) => {
  const theme = useTheme();
  return (
    <StyledColumn
      css={{
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
        backgroundColor: theme.white,
        borderRadius: '20px',
        padding: '24px 16px',
        gap: '16px',
      }}
    >
      <Skeleton variant={'text'} sx={{ height: '35px', width: '110px' }}>
        <StyledText variant={'h2'}>{title}</StyledText>
      </Skeleton>
      {children}
    </StyledColumn>
  );
};

export default ContainerSkeleton;
