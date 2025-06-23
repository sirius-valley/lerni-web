import React, { useEffect, useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { useVerifyStudentsMutation } from '../../../redux/service/program.service';
import { errorToast, successToast } from '../../../components/Toasts';
import { TextInput } from '../../../components/styled/TextInput';
import { updatePillInfo } from '../../../redux/slices/program.slice';

interface AddStudentModal extends ModalProps {
  openModal?: boolean;
}

const AddStudentModal = ({ handleOnClose }: AddStudentModal) => {
  const [
    verifyStudent,
    { isLoading: studentLoading, error, data: studentData, isSuccess: studentSuccess },
  ] = useVerifyStudentsMutation();

  const [studentEmail, setStudentEmail] = useState<string>('');

  const dispatch = useLDispatch();
  const students = useLSelector((state) => state.program.studentsState.current);

  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleAddStudent = () => {
    verifyStudent({ emails: [studentEmail] });
  };

  useEffect(() => {
    if (studentSuccess) {
      if (studentData) {
        if (students.some((student) => student.email === studentEmail)) {
          errorToast('El usuario ya se encuentra en la lista de Estudiantes');
        } else {
          dispatch(updatePillInfo({ students: [...students, { email: studentEmail }] }));
          successToast('Estudiante cargado con exito!');
          handleOnClose();
        }
      } else {
        errorToast('El estudiante no forma parte de LERNI');
      }
    }
  }, [studentSuccess]);
  useEffect(() => {
    if (error) {
      errorToast('El estudiante no forma parte de LERNI');
    }
  }, [error]);

  const cardHeader = () => (
    <StyledRow
      css={{
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '12px',
      }}
    >
      <StyledColumn css={{ marginTop: '8px', gap: '12px' }}>
        <StyledText variant="h1" css={{ fontFamily: 'Roboto-Bold' }}>
          Agregar estudiante
        </StyledText>
      </StyledColumn>
      <StyledBox onClick={() => handleOnClose()} css={{ padding: 8, cursor: 'pointer' }}>
        <CloseIcon />
      </StyledBox>
    </StyledRow>
  );

  return (
    <Card
      headerComponent={cardHeader()}
      onClick={(event) => {
        event.stopPropagation();
      }}
      css={{
        height: 'fit-content',
        width: '568px',
        zIndex: 30,
        borderRadius: '20px',
      }}
    >
      <StyledColumn css={{ width: '100%' }}>
        <TextInput
          placeholder="example@mail.com"
          title="Email"
          value={studentEmail}
          onChange={(value) => setStudentEmail(value)}
          maxLength={50}
          required
        />
        <StyledRow
          css={{
            marginTop: '12px',
            width: '100%',
            gap: '16px',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant={ComponentVariantType.GHOST}
            onClick={handleOnClose}
            css={{
              paddingLeft: '50px',
              paddingRight: '50px',
            }}
          >
            Cancelar
          </Button>

          <Button
            variant={ComponentVariantType.PRIMARY}
            onClick={handleAddStudent}
            disabled={studentLoading || !isValidEmail(studentEmail)}
            css={{
              paddingLeft: '50px',
              paddingRight: '50px',
            }}
          >
            Agregar
          </Button>
        </StyledRow>
      </StyledColumn>
    </Card>
  );
};

export default AddStudentModal;
