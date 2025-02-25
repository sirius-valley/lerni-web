import React, { ReactNode } from 'react';
import { StyledBox, StyledColumn, StyledText } from '../../styled/styles';
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
    <StyledBox
      css={{
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
        backgroundColor: theme.white,
        borderRadius: '20px',
        padding: '24px 16px',
      }}
    >
      <StyledColumn
        css={{
          display: 'flex',
          overflow: 'hidden',
          height: '100%',
          width: '100%',
          gap: '16px',
        }}
      >
        <Skeleton variant={'text'} sx={{ height: '35px', width: '110px' }}>
          <StyledText variant={'h2'}>{title}</StyledText>
        </Skeleton>
        {children}
      </StyledColumn>
    </StyledBox>
  );
};

export default ContainerSkeleton;
