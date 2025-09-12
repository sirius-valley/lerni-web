import React from 'react';
import { StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { useTheme } from 'styled-components';
import { CollectionIcon } from '../../../assets/icons/CollectionIcon';

import { useLDispatch } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';
import { useGetInstitutionsListQuery } from '../../../redux/service/institution.service';
import { InstitutionListItem } from '../../../redux/service/types/institution.types';
import { usePermissions } from '../../../utils/permissions';
import EmptyState from '../../EmptyState';
import { InstitutionItem } from '../../institution/InstitutionItem';

export const InstitutionsList = () => {
  const theme = useTheme();
  const dispatch = useLDispatch();
  const { canCreateInstitution } = usePermissions();
  const { data: institutionsResponse, isLoading, error } = useGetInstitutionsListQuery();

  const institutionsList: InstitutionListItem[] = institutionsResponse?.institutions || [];

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
        <EmptyState title="Cargando instituciones..." icon={<CollectionIcon />} />
      ) : error ? (
        <EmptyState
          title="Error al cargar las instituciones"
          description="Intenta recargar la página"
          icon={<CollectionIcon />}
        />
      ) : institutionsList.length === 0 ? (
        <EmptyState
          title="No hay instituciones"
          description={
            canCreateInstitution()
              ? 'Crea tu primera institución para comenzar'
              : 'No perteneces a ninguna institución'
          }
          icon={<CollectionIcon />}
        />
      ) : (
        <StyledColumn css={{ gap: '0px', height: '100%', overflowY: 'scroll' }}>
          {institutionsList.map((inst) => (
            <InstitutionItem
              key={inst.id}
              id={inst.id}
              name={inst.name}
              studentLimit={inst.studentLimit || 0}
              image={inst.picture}
            />
          ))}
        </StyledColumn>
      )}
    </StyledColumn>
  );
};
