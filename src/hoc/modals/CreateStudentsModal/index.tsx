import React, { useEffect, useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import FileUpload from '../../../components/styled/FileUpload';
import { useVerifyStudentsMutation } from '../../../redux/api/program.service';
import { useLDispatch } from '../../../redux/hooks';
import { updatePillInfo } from '../../../redux/slices/program.slice';

import { errorToast, successToast } from '../../../components/Toasts';
import { useTheme } from 'styled-components';

interface CreateStudentsModal extends ModalProps {
  openModal?: boolean;
}
interface EmailObject {
  email: string;
}

interface Student {
  id: string;
  name: string;
  lastname: string;
  city: string;
  profession: string;
  career: string;
  image: string;
  hasCompletedIntroduction: boolean;
  points: number;
}

const CreateStudentsModal = ({ handleOnClose }: CreateStudentsModal) => {
  const [
    verifyStudents,
    { isLoading: studentsLoading, error, data: studentsData, isSuccess: studentsSuccess },
  ] = useVerifyStudentsMutation();

  const [inputValues, setInputValues] = useState<{
    file: any;
  }>({
    file: null,
  });
  const [errors, setErrors] = useState(false);

  const dispatch = useLDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (errors || error) {
      setInputValues({ file: null });
      errorToast('Algo salió mal, revisa el formato del archivo');
    }
  }, [errors, error]);

  const handleInputFileChange = (value: any) => {
    if (
      value?.type === 'text/csv' ||
      value?.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      setErrors(false);
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const result = event.target.result;
        const lines = result.split(/\r?\n/);

        const mails = lines
          .map((line: any, index: number) => {
            if (index === 0) return null;
            return line.trim();
          })
          .filter((email: any) => email);

        setInputValues({
          file: value,
        });
        verifyStudents({ emails: mails });
      };

      reader.readAsText(value);
    } else {
      setErrors(true);
    }
    setInputValues({
      file: value,
    });
  };

  const handleSavePill = () => {
    if (studentsSuccess) {
      if (studentsData) {
        dispatch(updatePillInfo({ students: studentsData }));
        successToast('Estudiantes cargados con exito!');
        handleOnClose();
      } else {
        errorToast('Los estudiantes no forman parte de LERNI');
      }
    }
  };

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
          Cargar Estudiantes
        </StyledText>
        <StyledText variant="body2">
          En esta sección se deberá cargar los estudiantes del programa
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
      }}
    >
      <StyledColumn css={{ width: '100%' }}>
        <StyledText
          variant="body2"
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            color: theme.gray600,
            fontFamily: 'Roboto-Bold',
          }}
        >
          Subir CSV o XLSX
        </StyledText>
        <FileUpload
          value={inputValues.file}
          onChange={(value) => handleInputFileChange(value)}
          error={errors}
          fileExtensionAllowed=".csv, .xlsx"
        />
        <StyledRow
          css={{
            marginTop: '24px',
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
            onClick={handleSavePill}
            disabled={errors || studentsLoading || !inputValues.file}
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

export default CreateStudentsModal;
