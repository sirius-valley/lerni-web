import React, { useEffect } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import { useTheme } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import InstitutionDetails from '../components/institution/InstitutionDetails';
import InstitutionCollections from '../components/institution/InstitutionCollections';
import {
  useGetInstitutionDetailsQuery,
  useUpdateInstitutionMutation,
} from '../redux/service/institution.service';
import { useLDispatch, useLSelector } from '../redux/hooks';
import { isLoading } from '../redux/slices/institution.slice';
import { usePermissions } from '../utils/permissions';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { successToast, errorToast } from '../components/Toasts';

const InstitutionDetailsScreen = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useLDispatch();
  const { canReadInstitution, canUpdateInstitution } = usePermissions();
  const institution = useLSelector((state) => state.institution);
  const [updateInstitution, { isLoading: isSaving }] = useUpdateInstitutionMutation();

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
          {canUpdateInstitution() && (
            <Button
              variant={ComponentVariantType.PRIMARY}
              onClick={async () => {
                try {
                  await updateInstitution({
                    id: institution.id,
                    name: institution.name,
                    studentLimit: Number(institution.studentLimit) || 0,
                    picture: institution.picture,
                  }).unwrap();
                  successToast('La institución se ha actualizado con éxito!');
                  navigate('/');
                } catch (e) {
                  errorToast('Algo salió mal, revisa los campos nuevamente');
                }
              }}
              disabled={isSaving}
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
              {isSaving ? 'Guardando...' : 'Guardar'}
            </Button>
          )}
        </StyledColumn>
      </StyledColumn>
    </StyledBox>
  );
};

export default InstitutionDetailsScreen;
