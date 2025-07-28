import { TextInput } from '../../styled/TextInput';
import Card from '../../Card';
import React from 'react';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { updateCollectionInfo } from '../../../redux/slices/collection.slice';
import { usePermissions } from '../../../utils/permissions';
import CollectionDetailsSkeleton from './Skeleton';
import { Dropdown } from '../../Dropdown';

const CollectionDetails = () => {
  const collection = useLSelector((state) => state.collection);
  const institutionIds = useLSelector((state: RootState) => state.auth.institutionIds);
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
      {/* Show dropdown only if creating a collection (edit mode) and there are institutionIds */}
      {edit && institutionIds && institutionIds.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <Dropdown
            label="Institución"
            required
            placeholder="Selecciona una institución"
            value={collection.institutionId || ''}
            onChange={(value) => handleChange('institutionId', value)}
            content={institutionIds.map((id) => ({ id, text: id }))}
            css={{ width: '100%' }}
          />
        </div>
      )}
    </Card>
  );
};

export default CollectionDetails;
