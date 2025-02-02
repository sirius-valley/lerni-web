import { useTheme } from 'styled-components';
import Card from '../../Card';
import { StyledBox, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import React, { useEffect } from 'react';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { ComponentVariantType } from '../../../utils/constants';
import { StudentsTable } from './Table';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';
import { useGetGroupsQuery } from '../../../redux/service/groups.service';
import { StudentDTO } from '../../../redux/service/types/students.response';
import { removeStudent, updatePillInfo } from '../../../redux/slices/program.slice';
import { useStudentsListQuery } from '../../../redux/service/program.service';
import { EntityType } from '../../../hoc/modals/StudentsGroupsModal';

interface ProgramStudents {
  programVersionId?: string;
}

export const ProgramStudents = ({ programVersionId }: ProgramStudents) => {
  const theme = useTheme();
  const dispatch = useLDispatch();

  const groups = useGetGroupsQuery();

  const { data: fetchedStudents, isLoading } = programVersionId
    ? useStudentsListQuery(programVersionId)
    : { data: undefined, isLoading: false };

  const students = useLSelector((state) => state.program.students);

  useEffect(() => {
    if (fetchedStudents) {
      dispatch(updatePillInfo({ students: fetchedStudents }));
    }
  }, [fetchedStudents, dispatch]);

  const handleShowModal = () => {
    dispatch(setModalOpen({ modalType: 'PROGRAM_STUDENTS_CREATE' }));
  };

  const handleMenuClick = (action: 'view' | 'delete' | 'edit', student: StudentDTO) => {
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

      default:
        console.warn(`Unhandled action: ${action}`);
        break;
    }
  };

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
        </StyledRow>
      }
    >
      {students?.length ? (
        <StudentsTable
          students={students}
          groups={groups.data ?? []}
          programVersionId={programVersionId ?? ''}
          onMenuClick={handleMenuClick}
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
