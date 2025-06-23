import React, { useEffect } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import CollectionDetailsComponent from '../components/collection/CollectionDetails';
import { useTheme } from 'styled-components';
import CollectionPrograms from '../components/collection/CollectionPrograms';
import CollectionStatistics from '../components/collection/CollectionStatistics';
import { CollectionStudents } from '../components/collection/CollectionStudents';
import { useLDispatch } from '../redux/hooks';
import { updateCollectionInfo, isLoading } from '../redux/slices/collection.slice';
import { useCollectionDetailsQuery } from '../redux/service/collection.service';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '../components/Toasts';

const LimitedView = () => {
  const theme = useTheme();
  const dispatch = useLDispatch();
  const navigate = useNavigate();

  // ID específico de la colección a mostrar
  const collectionId = 'ddc57256-2587-495e-8deb-e14fed7d6e1e';

  const {
    data,
    isError: collectionError,
    isLoading: collectionLoading,
  } = useCollectionDetailsQuery(collectionId);

  useEffect(() => {
    dispatch(isLoading(collectionLoading));
  }, [collectionLoading, dispatch]);

  useEffect(() => {
    if (collectionError) {
      errorToast('La colección no existe o no tienes permisos para verla');
      navigate('/login');
    }
  }, [collectionError, navigate]);

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
        <StyledText variant="h2">
          {data?.name ? `${data.name} - Vista Limitada` : 'Vista de Colección - Acceso Limitado'}
        </StyledText>
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
          <CollectionStatistics collectionId={collectionId} />
          <CollectionPrograms collectionId={collectionId} />
          <CollectionStudents collectionId={collectionId} />

          {/* Mensaje informativo sobre limitaciones */}
          <StyledBox
            css={{
              background: theme.white,
              borderRadius: '20px',
              padding: '24px',
              width: '832px',
              textAlign: 'center',
            }}
          >
            <StyledText variant="h3" style={{ color: theme.gray600, marginBottom: '8px' }}>
              Acceso Limitado
            </StyledText>
            <StyledText variant="body2" style={{ color: theme.gray500 }}>
              Esta es una vista de solo lectura. Para acceder a todas las funcionalidades, necesita
              permisos de administrador.
            </StyledText>
          </StyledBox>
        </StyledColumn>
      </StyledColumn>
    </StyledBox>
  );
};

export default LimitedView;
