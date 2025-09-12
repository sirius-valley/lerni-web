import React, { useEffect } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import { useTheme } from 'styled-components';
import { useParams } from 'react-router-dom';
import InstitutionDetails from '../components/institution/InstitutionDetails';
import InstitutionCollections from '../components/institution/InstitutionCollections';
import { useGetInstitutionDetailsQuery } from '../redux/service/institution.service';
import { useLDispatch } from '../redux/hooks';
import { isLoading } from '../redux/slices/institution.slice';
import { usePermissions } from '../utils/permissions';

const InstitutionDetailsScreen = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useLDispatch();
  const { canReadInstitution } = usePermissions();

  const {
    data,
    isError: institutionError,
    isLoading: institutionLoading,
  } = useGetInstitutionDetailsQuery(id as string);

  useEffect(() => {
    dispatch(isLoading(institutionLoading));
  }, [institutionLoading]);

  // Don't render if user doesn't have permission to read institutions
  if (!canReadInstitution()) {
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
          <StyledText variant="h2">No tienes permisos para ver esta institución</StyledText>
        </StyledRow>
      </StyledBox>
    );
  }

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
        <StyledText variant="h2">Detalles de la institución</StyledText>
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
          <InstitutionDetails />
          <InstitutionCollections />
        </StyledColumn>
      </StyledColumn>
    </StyledBox>
  );
};

export default InstitutionDetailsScreen;
