import { TextInput } from '../../styled/TextInput';
import Card from '../../Card';
import React from 'react';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { updateCollectionInfo } from '../../../redux/slices/collectionSlice';

const CollectionDetails = () => {
  const collection = useLSelector((state) => state.collection);
  const dispatch = useLDispatch();

  const handleChange = (name: string, value: string) => {
    dispatch(updateCollectionInfo({ ...collection, [name]: value }));
  };

  return (
    <Card title={'Detalles de la colección'} height={'100%'}>
      <TextInput
        placeholder="Introducción a la Historia Argentina..."
        title="Nombre del programa"
        required
        value={collection.title}
        onChange={(value) => handleChange('title', value)}
        disabled={false}
      ></TextInput>
    </Card>
  );
};

export default CollectionDetails;
