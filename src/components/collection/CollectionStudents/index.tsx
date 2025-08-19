import { useTheme } from 'styled-components';
import Card from '../../Card';
import { StyledBox, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import React, { useEffect, useState } from 'react';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { ComponentVariantType } from '../../../utils/constants';
import { StudentsTable } from '../../program/ProgramStudents/Table';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';
import { useGetGroupsQuery } from '../../../redux/service/groups.service';
import { StudentDTO } from '../../../redux/service/types/students.response';
import { useCollectionStudentsListQuery } from '../../../redux/service/collection.service';
import { removeStudent, setStudents } from '../../../redux/slices/collection.slice';
import { useNavigate } from 'react-router-dom';
import { EntityType, usePermissions } from '../../../utils/permissions';
import CollectionStudentsSkeleton from './Skeleton';
import { useIsAdmin } from '../../../hooks/useIsAdmin';
import { generateUUID } from '../../../utils/uuid';

const mockedStudents: StudentDTO[] = [
  ...Array.from({ length: 3000 }, () => ({
    authId: generateUUID(),
    career: [
      'Ingeniería',
      'Medicina',
      'Arquitectura',
      'Derecho',
      'Psicología',
      'Administración',
      'Economía',
      'Informática',
    ][Math.floor(Math.random() * 8)],
    city: [
      'Buenos Aires',
      'Madrid',
      'Ciudad de México',
      'Lima',
      'Bogotá',
      'Santiago',
      'Quito',
      'Montevideo',
    ][Math.floor(Math.random() * 8)],
    email: `${Math.random().toString(36).substring(7)}@example.com`,
    id: generateUUID(),
    image: Math.random() > 0.5 ? `https://example.com/${generateUUID()}.jpg` : undefined,
    lastname: [
      'González',
      'Rodríguez',
      'Fernández',
      'López',
      'Martínez',
      'Pérez',
      'Gómez',
      'Díaz',
      'Torres',
      'Ramírez',
    ][Math.floor(Math.random() * 10)],
    name: ['Juan', 'María', 'Carlos', 'Laura', 'Pedro', 'Ana', 'Luis', 'Sofía', 'Diego', 'Martina'][
      Math.floor(Math.random() * 10)
    ],
    profession:
      Math.random() > 0.5
        ? [
            'Ingeniero',
            'Médico',
            'Arquitecto',
            'Abogado',
            'Psicólogo',
            'Administrador',
            'Economista',
            'Desarrollador',
          ][Math.floor(Math.random() * 8)]
        : undefined,
    group: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
      name: `Grupo ${i + 1}`,
    })),
    progress: Math.floor(Math.random() * 101),
  })),
];

interface CollectionStudents {
  collectionId?: string;
}

export const CollectionStudents = ({ collectionId }: CollectionStudents) => {
  const theme = useTheme();
  const dispatch = useLDispatch();
  const navigate = useNavigate();

  const collection = useLSelector((state) => state.collection);
  const { edit } = collection;

  const { isAdmin } = useIsAdmin();

  const { canAddStudentToCollection } = usePermissions();
  const canAdd = canAddStudentToCollection() && isAdmin;

  const groups = useGetGroupsQuery();

  const { data: fetchedStudents, isLoading } = collectionId
    ? useCollectionStudentsListQuery(collectionId)
    : { data: undefined, isLoading: false };

  const students = useLSelector((state) => state.collection.studentsState.current);

  useEffect(() => {
    if (fetchedStudents && students.length === 0) {
      dispatch(setStudents(fetchedStudents));
    }
  }, [fetchedStudents, dispatch]);

  const handleShowModal = () => {
    dispatch(setModalOpen({ modalType: 'COLLECTION_STUDENTS_CREATE' }));
  };

  const handleMenuClick = (action: 'view' | 'delete' | 'edit' | 'reset', student: StudentDTO) => {
    switch (action) {
      case 'view':
        if (!edit) navigate(`/profile/${student.id}`);
        break;

      case 'delete':
        dispatch(removeStudent({ email: student.email }));
        break;

      case 'edit':
        dispatch(
          setModalOpen({
            modalType: 'STUDENTS_GROUPS',
            metadata: { studentEmail: student.email, entityType: EntityType.COLLECTION },
          }),
        );
        break;

      case 'reset':
        // Reset action is not applicable for collections
        console.warn('Reset action is not applicable for collections');
        break;

      default:
        console.warn(`Unhandled action: ${action}`);
        break;
    }
  };

  if (isLoading) return <CollectionStudentsSkeleton />;

  return (
    <Card
      padding="18px"
      height="auto"
      headerComponent={
        <StyledRow
          style={{
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.gray200}`,
          }}
        >
          <StyledText variant="h2" style={{ marginBottom: '6px' }}>
            {'Estudiantes'}
          </StyledText>
          {canAdd && (
            <StyledBox style={{ marginBottom: '6px' }}>
              <Button
                variant={ComponentVariantType.PRIMARY}
                onClick={handleShowModal}
                labelSize={ButtonLabelSize.BODY3}
                css={{
                  width: 'auto',
                  height: '30px',
                  padding: '8px 16px 8px 16px',
                  fontFamily: 'Roboto-Bold',
                  cursor: 'pointer',
                }}
              >
                {'Cargar estudiantes'}
              </Button>
            </StyledBox>
          )}
        </StyledRow>
      }
    >
      {students?.length ? (
        <StudentsTable
          students={students}
          groups={groups.data ?? []}
          programVersionId={collectionId ?? ''}
          onMenuClick={handleMenuClick}
          entityType={EntityType.COLLECTION}
        />
      ) : (
        <StyledBox
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 0px 16px 0px',
          }}
        >
          <StyledText variant="body3" style={{ textAlign: 'center', color: theme.gray400 }}>
            {'No se agregaron estudiantes todavía'}
          </StyledText>
        </StyledBox>
      )}
    </Card>
  );
};
