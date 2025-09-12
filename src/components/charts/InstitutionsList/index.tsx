import React from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { useTheme } from 'styled-components';
import { CollectionIcon } from '../../../assets/icons/CollectionIcon';

import { useLDispatch } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';
import { useNavigate } from 'react-router-dom';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { useGetInstitutionsListQuery } from '../../../redux/service/institution.service';
import { InstitutionListItem } from '../../../redux/service/types/institution.types';
import { usePermissions } from '../../../utils/permissions';

export const InstitutionsList = () => {
  const theme = useTheme();
  const dispatch = useLDispatch();
  const navigate = useNavigate();
  const { canViewInstitutions, canCreateInstitution } = usePermissions();
  const { data: institutionsResponse, isLoading, error } = useGetInstitutionsListQuery();

  const institutionsList: InstitutionListItem[] = institutionsResponse?.institutions || [];

  const handleInstitutionClick = (institutionId: string) => {
    navigate(`/details/institution/${institutionId}`);
  };

  // Don't render if user doesn't have permission to view institutions
  if (!canViewInstitutions()) {
    return null;
  }

  return (
    <StyledColumn
      css={{
        overflow: 'hidden',
        height: '100%',
        backgroundColor: theme.white,
        borderRadius: '20px',
        padding: '24px 16px',
        gap: '16px',
        flex: 1,
        minHeight: 0,
      }}
    >
      <StyledRow css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <StyledText variant={'h2'}>Instituciones</StyledText>
        {canCreateInstitution() && (
          <Button
            onClick={() => dispatch(setModalOpen({ modalType: 'INSTITUTION_CREATE' }))}
            variant={ComponentVariantType.PRIMARY}
            labelSize={'body3'}
            css={{ padding: '16px 8px', height: '30px' }}
          >
            Agregar
          </Button>
        )}
      </StyledRow>
      {isLoading ? (
        <StyledRow css={{ height: '242px', justifyContent: 'center', alignItems: 'center' }}>
          <StyledText>Cargando instituciones...</StyledText>
        </StyledRow>
      ) : error ? (
        <StyledRow css={{ height: '242px', justifyContent: 'center', alignItems: 'center' }}>
          <StyledText>Error al cargar las instituciones</StyledText>
        </StyledRow>
      ) : institutionsList.length === 0 ? (
        <StyledRow css={{ height: '242px', justifyContent: 'center', alignItems: 'center' }}>
          <StyledText>No hay instituciones</StyledText>
        </StyledRow>
      ) : (
        <StyledColumn css={{ gap: '0px', height: '100%', overflowY: 'scroll' }}>
          {institutionsList.map((inst) => (
            <StyledRow
              key={inst.id}
              style={{
                padding: '10px 8px',
                borderBottom: '1px solid',
                borderBottomColor: theme.gray200,
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                cursor: 'pointer',
              }}
              onClick={() => handleInstitutionClick(inst.id)}
            >
              <StyledRow style={{ gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                <StyledBox
                  style={{
                    display: 'flex',
                    borderRadius: 4,
                    width: 40,
                    height: 40,
                    background: theme.gray200,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CollectionIcon />
                </StyledBox>
                <StyledColumn style={{ gap: 2 }}>
                  <StyledText variant="body1" style={{ color: theme.primary950 }}>
                    {inst.name}
                  </StyledText>
                  <StyledText variant="body3" style={{ color: theme.gray400 }}>
                    {inst.id}
                  </StyledText>
                </StyledColumn>
              </StyledRow>
              <StyledBox style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => handleInstitutionClick(inst.id)}
                  disabled={false}
                  labelSize={ButtonLabelSize.BODY3}
                  variant={ComponentVariantType.GHOST}
                  css={{ color: theme.primary400 }}
                >
                  Ver detalles
                </Button>
              </StyledBox>
            </StyledRow>
          ))}
        </StyledColumn>
      )}
    </StyledColumn>
  );
};
