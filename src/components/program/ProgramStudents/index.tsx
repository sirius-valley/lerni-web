import { useTheme } from 'styled-components';
import Card from '../../Card';
import { StyledBox, StyledRow, StyledText } from '../../styled/styles';
import React, { useEffect } from 'react';
import { StudentsTable } from './Table';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';
import { useGetGroupsQuery } from '../../../redux/service/groups.service';
import { StudentDTO } from '../../../redux/service/types/students.response';
import { removeStudent, setStudents } from '../../../redux/slices/program.slice';
import {
  useStudentsListQuery,
  useResetProgressMutation,
} from '../../../redux/service/program.service';
import { EntityType } from '../../../utils/permissions';
import ProgramStudentsSkeleton from './Skeleton';
import { successToast, errorToast } from '../../Toasts';

interface ProgramStudents {
  programVersionId?: string;
}

export const ProgramStudents = ({ programVersionId }: ProgramStudents) => {
  const theme = useTheme();
  const dispatch = useLDispatch();

  const groups = useGetGroupsQuery();
  const [resetProgress] = useResetProgressMutation();

  const { data: fetchedStudents, isLoading } = programVersionId
    ? useStudentsListQuery(programVersionId)
    : { data: undefined, isLoading: false };

  const students = useLSelector((state) => state.program.studentsState.current);

  useEffect(() => {
    if (fetchedStudents) {
      dispatch(setStudents(fetchedStudents));
    }
  }, [fetchedStudents, dispatch]);

  const handleMenuClick = (action: 'view' | 'delete' | 'edit' | 'reset', student: StudentDTO) => {
    switch (action) {
      case 'view':
        dispatch(
          setModalOpen({
            modalType: 'STUDENTS_STATUS',
            metadata: { studentId: student.id, programVersionId },
          }),
        );
        break;

      case 'delete':
        dispatch(removeStudent({ email: student.email }));
        break;

      case 'edit':
        console.log('editing');
        dispatch(
          setModalOpen({
            modalType: 'STUDENTS_GROUPS',
            metadata: { studentEmail: student.email, entityType: EntityType.PROGRAM },
          }),
        );
        break;

      case 'reset':
        if (programVersionId) {
          resetProgress({ programVersionId, studentId: student.id })
            .unwrap()
            .then(() => {
              successToast('Progreso del estudiante reseteado exitosamente');
            })
            .catch((error) => {
              console.error('Failed to reset student progress:', error);
              errorToast('Error al resetear el progreso del estudiante');
            });
        }
        break;

      default:
        console.warn(`Unhandled action: ${action}`);
        break;
    }
  };

  if (isLoading) return <ProgramStudentsSkeleton />;

  return (
    <Card
      padding="24px"
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
        </StyledRow>
      }
    >
      {students?.length ? (
        <StudentsTable
          students={students}
          groups={groups.data ?? []}
          programVersionId={programVersionId ?? ''}
          onMenuClick={handleMenuClick}
          entityType={EntityType.PROGRAM}
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
