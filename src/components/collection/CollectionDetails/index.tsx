import { TextInput } from '../../styled/TextInput';
import Card from '../../Card';
import React from 'react';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { updateCollectionInfo } from '../../../redux/slices/collection.slice';
import { usePermissions } from '../../../utils/permissions';
import CollectionDetailsSkeleton from './Skeleton';

const CollectionDetails = () => {
  const collection = useLSelector((state) => state.collection);
  const { edit, isLoading } = collection;
  const dispatch = useLDispatch();

  const { canUpdateCollection } = usePermissions();
  const canUpdate = canUpdateCollection() || edit;

  const handleChange = (name: string, value: string) => {
    dispatch(updateCollectionInfo({ ...collection, [name]: value }));
  };

  if (isLoading) return <CollectionDetailsSkeleton />;

  return (
    <Card title={'Detalles de la colección'} height={'100%'}>
      <TextInput
        placeholder="Introducción a la Historia Argentina..."
        title="Nombre de la colección"
        required
        value={collection.title}
        onChange={(value) => handleChange('title', value)}
        disabled={!canUpdate}
      ></TextInput>
    </Card>
  );
};

export default CollectionDetails;
