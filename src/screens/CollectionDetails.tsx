import React, { useEffect } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import Button from '../components/styled/Button';
import CollectionDetailsComponent from '../components/collection/CollectionDetails';
import { ComponentVariantType } from '../utils/constants';
import { useTheme } from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { useLDispatch } from '../redux/hooks';
import { api } from '../redux/service/api';
import { useCollectionDetailsQuery } from '../redux/service/collection.service';
import { resetCollectionSlice } from '../redux/slices/collectionSlice';
import CollectionPrograms from '../components/collection/CollectionPrograms';
import { CollectionStudents } from '../components/collection/CollectionStudents';

const CollectionDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useLDispatch();
  const location = useLocation();

  const { data } = useCollectionDetailsQuery(id as string);
  const handleSave = () => {
    null;
  };
  useEffect(() => {
    return () => {
      dispatch(api.util.invalidateTags(['CollectionDetails']));
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
        <StyledText variant="h2">Detalles de la colección</StyledText>
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
          <CollectionDetailsComponent />
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

export default CollectionDetails;
