import React, { useEffect, useState } from 'react';
import { StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import ProfessorItem from '../ProfessorItem';
import Spinner from '../../Spinner/Spinner';
import {
  useGetProfessorsQuery,
  useLazyGetProfessorsQuery,
} from '../../../redux/service/professor.service';
import { useLDispatch } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';
import { useTheme } from 'styled-components';
import ProfessorListSkeleton from './Skeleton';

interface Professor {
  name: string;
  lastname: string;
  profession: string;
  description: string;
  image: string;
}

const ProfessorList = () => {
  const [refetch, { data, isLoading }] = useLazyGetProfessorsQuery();
  const dispatch = useLDispatch();
  const theme = useTheme();
  const [professorsList, setProfessorsList] = useState<Professor[]>([]);

  const handleAddNewProfessor = () => {
    dispatch(setModalOpen({ modalType: 'PROFESSOR_CREATE' }));
  };

  const professors = data?.result;
  const noProfessors = professors?.length == 0;

  useEffect(() => {
    refetch({ page: 1 });
  }, []);

  useEffect(() => {
    if (data?.total) {
      [...Array(data.total - 1)].forEach((_, index) => {
        refetch({ page: index + 1 }).then((res) => {
          if (res.data?.result) {
            setProfessorsList((prev) => [...prev, ...res.data.result]);
          }
        });
      });
    }
  }, [data?.total]);

  if (isLoading) return <ProfessorListSkeleton />;
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
        <StyledText variant={'h2'}>Profesores</StyledText>
        <Button
          onClick={handleAddNewProfessor}
          variant={ComponentVariantType.PRIMARY}
          labelSize={'body3'}
          css={{ padding: '16px 8px', height: '30px' }}
        >
          Agregar
        </Button>
      </StyledRow>
      {isLoading ? (
        <StyledRow css={{ height: '242px', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner />
        </StyledRow>
      ) : noProfessors ? (
        <StyledRow css={{ height: '242px', justifyContent: 'center', alignItems: 'center' }}>
          <StyledText>No hay profesores</StyledText>
        </StyledRow>
      ) : (
        <StyledColumn css={{ gap: '0px', height: '100%', overflowY: 'scroll' }}>
          {professorsList?.map(({ name, lastname, image }: Professor, index: number) => (
            <ProfessorItem
              key={'professor-' + index}
              id={''}
              name={name}
              surname={lastname}
              imgURL={image}
            />
          ))}
        </StyledColumn>
      )}
    </StyledColumn>
  );
};

export default ProfessorList;
