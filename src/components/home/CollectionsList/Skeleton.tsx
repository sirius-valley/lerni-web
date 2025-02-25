import React from 'react';
import SkeletonList from '../../skeleton/List';
import ContainerSkeleton from '../../skeleton/Container';

const CollectionsListSkeleton = () => {
  return (
    <ContainerSkeleton title={'Colecciones'}>
      <SkeletonList count={10} rowHeight={53} />
    </ContainerSkeleton>
  );
};

export default CollectionsListSkeleton;
