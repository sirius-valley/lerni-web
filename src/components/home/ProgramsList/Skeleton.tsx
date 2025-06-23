import React from 'react';
import SkeletonList from '../../skeleton/List';
import ContainerSkeleton from '../../skeleton/Container';

const ProgramsListSkeleton = () => {
  return (
    <ContainerSkeleton title={'Programas'}>
      <SkeletonList count={10} rowHeight={53} />
    </ContainerSkeleton>
  );
};

export default ProgramsListSkeleton;
