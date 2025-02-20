import React from 'react';
import { useTheme } from 'styled-components';
import SkeletonList from '../../skeleton/List';
import ContainerSkeleton from '../../skeleton/Container';

const ProgramsListSkeleton = () => {
  const theme = useTheme();
  return (
    <ContainerSkeleton title={'Programas'}>
      <SkeletonList count={5} rowHeight={53} />
    </ContainerSkeleton>
  );
};

export default ProgramsListSkeleton;
