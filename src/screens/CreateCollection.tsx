import React, { useEffect } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { useTheme } from 'styled-components';
import { useLDispatch, useLSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import CollectionDetails from '../components/collection/CollectionDetails';
import CollectionPrograms from '../components/collection/CollectionPrograms';
import { transformCreateCollectionRequest } from '../utils/transformBody';
import { errorToast, successToast } from '../components/Toasts';
import { CollectionStudents } from '../components/collection/CollectionStudents';
import { useCreateCollectionMutation } from '../redux/service/collection.service';
import { resetCollectionSlice } from '../redux/slices/collection.slice';
import { api } from '../redux/service/api';

const CreateCollection = () => {
  const theme = useTheme();
  const collection = useLSelector((state) => state.collection);
  const navigate = useNavigate();
  const dispatch = useLDispatch();

  const [createCollection, { isError, error, data, isSuccess }] = useCreateCollectionMutation();

  const handleSave = () => {
    const allFieldsFilled = Object.values(collection).every((value) => value !== '');
    if (allFieldsFilled) {
      createCollection(transformCreateCollectionRequest(collection)).then((res: any) => {
        navigate('/');
        dispatch(resetCollectionSlice());
        dispatch(api.util.invalidateTags(['CollectionList', 'Groups']));

        successToast('Colección creada exitosamente!');
      });
    }
  };

  useEffect(() => {
    if (isError) {
      errorToast('Algo ha salido mal! ');
    }
  }, [isError]);

  useEffect(() => {
    return () => {
      dispatch(resetCollectionSlice());
    };
  }, []);

  return (
    <StyledBox css={{ height: '100%' }}>
      <StyledRow
        css={{
          width: '100%',
          height: '66px',
          background: theme.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledText variant="h2">Crear nueva colección</StyledText>
      </StyledRow>

      <StyledColumn
        css={{
          background: theme.gray200,
          minHeight: '90vh',
          width: '100vw',
        }}
      >
        <StyledColumn
          css={{
            marginTop: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '32px',
          }}
        >
          <CollectionDetails />
          <CollectionPrograms />
          <CollectionStudents />
          <Button
            variant={ComponentVariantType.PRIMARY}
            onClick={handleSave}
            labelSize={'body3'}
            css={{
              marginTop: '8px',
              width: 'auto',
              height: '30px',
              padding: '8px 16px 8px 16px',
              fontFamily: 'Roboto-Bold',
              cursor: 'pointer',
            }}
          >
            Guardar
          </Button>
        </StyledColumn>
      </StyledColumn>
    </StyledBox>
  );
};

export default CreateCollection;
