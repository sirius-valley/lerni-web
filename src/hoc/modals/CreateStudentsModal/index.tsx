import React, { useEffect, useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import FileUpload from '../../../components/styled/FileUpload';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { updatePillInfo } from '../../../redux/slices/program.slice';
import { useVerifyStudentsMutation } from '../../../redux/service/program.service';
import { errorToast, successToast } from '../../../components/Toasts';
import { useTheme } from 'styled-components';
import { updateCollectionInfo } from '../../../redux/slices/collection.slice';
import { StudentDTO } from '../../../redux/service/types/students.response';
import { useVerifyCollectionStudentsMutation } from '../../../redux/service/collection.service';

interface CreateStudentsModal extends ModalProps {
  openModal?: boolean;
  entityType?: 'PROGRAM' | 'COLLECTION';
}
interface EmailObject {
  email: string;
  groups: string[];
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

const CreateStudentsModal = ({ entityType, handleOnClose }: CreateStudentsModal) => {
  const [
    verifyStudents,
    { isLoading: studentsLoading, error, data: studentsData, isSuccess: studentsSuccess },
  ] = useVerifyCollectionStudentsMutation();

  const [inputValues, setInputValues] = useState<{
    file: any;
  }>({
    file: null,
  });
  const [errors, setErrors] = useState(false);

  const students = useLSelector((state) => state.collection.students);
  const [uploadedStudents, setUploadedStudents] = useState<EmailObject[]>([]);

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
        console.log('result', result);
        const lines = result.split(/\r?\n/);

        const mails: EmailObject[] = lines
          .map((line: string, index: number) => {
            if (index === 0 || !line.trim()) return null;

            const columns = line.split(/[;,]/);
            if (columns.length < 1) return null;
            console.log('columns', columns);

            const email = columns[0].trim();
            const groups = Array.from(
              new Set(
                columns
                  .slice(1)
                  .map((col) => col.trim().toLowerCase())
                  .filter((col) => col !== ''),
              ),
            );
            console.log(groups);

            return { email, groups };
          })
          .filter((email: any) => email);

        setInputValues({
          file: value,
        });
        setUploadedStudents(
          mails.map((mail: EmailObject) => ({
            email: mail.email,
            groups: mail.groups.map((group) => group.toLowerCase()),
          })),
        );
        verifyStudents(mails.map((mail: EmailObject) => mail.email.toLowerCase()));
      };

      reader.readAsText(value);
    } else {
      setErrors(true);
    }
    setInputValues({
      file: value,
    });
  };

  const transformStudentData = (students: StudentDTO[]): StudentDTO[] => {
    return students.map((student) => {
      return {
        id: student.id ?? '',
        name: student.name ?? null,
        lastname: student.lastname ?? null,
        city: student.city ?? null,
        profession: student.profession ?? undefined,
        career: student.career ?? null,
        image: student.image ?? undefined,
        authId: student.authId ?? '',
        group: student.group ?? [],
        progress: student.progress ?? 0,
        email: student.email ?? '',
      };
    });
  };

  const handleSavePill = () => {
    if (studentsSuccess) {
      if (studentsData && uploadedStudents) {
        if (entityType === 'COLLECTION') {
          const studentDataLowercase = studentsData.map((student) => ({
            ...student,
            email: student.email.toLowerCase(),
          }));
          const existingEmails = new Set(students.map((student) => student.email));
          const newStudents = transformStudentData(studentDataLowercase).filter(
            (student) => !existingEmails.has(student.email),
          );
          const mergedStudents = mergeStudentsWithGroups(newStudents, uploadedStudents);
          console.log('merged', mergedStudents);

          dispatch(
            updateCollectionInfo({
              students: [...students, ...mergedStudents],
            }),
          );
        } else {
          dispatch(updatePillInfo({ students: studentsData }));
        }
        successToast('Estudiantes cargados con exito!');
        handleOnClose();
      } else {
        errorToast('Los estudiantes no forman parte de LERNI');
      }
    }
  };

  const mergeStudentsWithGroups = (
    studentsData: StudentDTO[],
    uploadedStudents: EmailObject[],
  ): StudentDTO[] => {
    console.log('uploaded', uploadedStudents);
    const uploadedMap = new Map(
      uploadedStudents.map((student) => [student.email.toLowerCase(), student.groups]),
    );
    console.log('uploadedMap', uploadedMap);
    return studentsData.map((student) => {
      console.log(uploadedMap.get(student.email)?.map((groupName) => ({ name: groupName })));
      return {
        ...student,
        group: [
          ...(student.group || []),
          ...(uploadedMap.get(student.email)?.map((groupName) => ({ name: groupName })) || []),
        ],
      };
    });
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
