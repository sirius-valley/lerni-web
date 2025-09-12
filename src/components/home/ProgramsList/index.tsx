import React from 'react';
import { StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { ProgramItem } from '../../program/ProgramItem';
import { useNavigate } from 'react-router-dom';
import { useProgramListQuery } from '../../../redux/service/program.service';
import { useTheme } from 'styled-components';
import { usePermissions } from '../../../utils/permissions';
import ProgramsListSkeleton from './Skeleton';
import EmptyState from '../../EmptyState';
import { CollectionIcon } from '../../../assets/icons/CollectionIcon';

const ProgramsList = () => {
  const navigation = useNavigate();
  const theme = useTheme();
  const { data, isLoading } = useProgramListQuery();

  const { canCreateProgram } = usePermissions();
  const canCreate = canCreateProgram();

  const handleAddNewProgram = () => {
    navigation('/create/program');
  };

  if (isLoading) return <ProgramsListSkeleton />;
  return (
    <StyledColumn
      css={{
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
        backgroundColor: theme.white,
        borderRadius: '20px',
        padding: '24px 16px',
        gap: '16px',
      }}
    >
      <StyledRow css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <StyledText variant={'h2'}>Programas</StyledText>
        {canCreate && (
          <Button
            onClick={handleAddNewProgram}
            variant={ComponentVariantType.PRIMARY}
            labelSize={'body3'}
            css={{ padding: '16px 8px', height: '30px' }}
          >
            Agregar
          </Button>
        )}
      </StyledRow>
      <StyledColumn css={{ gap: '0px', height: '100%', overflowY: 'scroll' }}>
        {data?.results && data.results.length > 0 ? (
          data.results.map((item, key) => <ProgramItem key={key} {...item} />)
        ) : (
          <EmptyState
            title="No hay programas"
            description={
              canCreateProgram()
                ? 'Crea tu primer programa para comenzar'
                : 'No tienes ningún programa asignado'
            }
            icon={<CollectionIcon />}
          />
        )}
      </StyledColumn>
    </StyledColumn>
  );
};

export default ProgramsList;
