import React from 'react';
import { StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useCollectionListQuery } from '../../../redux/service/collection.service';
import { CollectionItem } from '../../collection/CollectionItem';
import { usePermissions } from '../../../utils/permissions';
import CollectionsListSkeleton from './Skeleton';

const CollectionsList = () => {
  const navigation = useNavigate();
  const theme = useTheme();
  const { data, isLoading } = useCollectionListQuery();

  const { canCreateCollection } = usePermissions();
  const canCreate = canCreateCollection();

  const handleAddNewCollection = () => {
    navigation('/create/collection');
  };

  if (isLoading) return <CollectionsListSkeleton />;
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
      <StyledRow css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <StyledText variant={'h2'}>Colecciones</StyledText>
        {canCreate && (
          <Button
            onClick={handleAddNewCollection}
            variant={ComponentVariantType.PRIMARY}
            labelSize={'body3'}
            css={{ padding: '16px 8px', height: '30px' }}
          >
            Agregar
          </Button>
        )}
      </StyledRow>
      <StyledColumn css={{ gap: '0px', height: '100%', overflowY: 'scroll' }}>
        {data?.map((item, key) => <CollectionItem key={key} {...item} />)}
        {data?.length === 0 && (
          <StyledText
            variant="body2"
            css={{ textAlign: 'center', marginTop: '24px', color: theme.gray500 }}
          >
            No hay colecciones disponibles por el momento.
          </StyledText>
        )}
      </StyledColumn>
    </StyledColumn>
  );
};

export default CollectionsList;
