import React from 'react';
import SkeletonList from '../../skeleton/List';
import ContainerSkeleton from '../../skeleton/Container';

const ProfessorListSkeleton = () => {
  return (
    <ContainerSkeleton title={'Programas'}>
      <SkeletonList count={10} rowHeight={53} />
    </ContainerSkeleton>
  );
};

export default ProfessorListSkeleton;
