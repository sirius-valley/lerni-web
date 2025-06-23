import React, { useEffect, useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import FileUpload from '../../../components/styled/FileUpload';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { useVerifyStudentsMutation } from '../../../redux/service/program.service';
import { errorToast, successToast } from '../../../components/Toasts';
import { useTheme } from 'styled-components';
import {
  addStudents as addStudentsCollection,
  updateStudents as updateStudentsCollection,
} from '../../../redux/slices/collection.slice';
import {
  addStudents as addStudentsProgram,
  updateStudents as updateStudentsProgram,
} from '../../../redux/slices/program.slice';

import { StudentDTO } from '../../../redux/service/types/students.response';
import { useVerifyCollectionStudentsMutation } from '../../../redux/service/collection.service';
import { EntityType } from '../../../utils/permissions';

interface CreateStudentsModal extends ModalProps {
  openModal?: boolean;
  entityType?: EntityType;
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

  const currentStudents =
    entityType === EntityType.COLLECTION
      ? useLSelector((state) => state.collection.studentsState.current)
      : useLSelector((state) => state.program.studentsState.current);

  const addStudents =
    entityType === EntityType.COLLECTION ? addStudentsCollection : addStudentsProgram;

  const updateStudents =
    entityType === EntityType.COLLECTION ? updateStudentsCollection : updateStudentsProgram;

  const [uploadedStudents, setUploadedStudents] = useState<EmailObject[]>([]);

  const dispatch = useLDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (errors || error) {
      setInputValues({ file: null });
      errorToast('Algo salió mal, revisa el formato del archivo');
    }
  }, [errors, error]);

  const handleInputFileChange = (file: any) => {
    if (!isValidFileType(file)) {
      setErrors(true);
      setInputValues({ file });
      return;
    }

    setErrors(false);
    setInputValues({ file });

    const reader = new FileReader();
    reader.onload = (event: any) => {
      const result = event.target.result;
      const emailsWithGroups = parseCSV(result);
      console.log(
        'aparisotto',
        emailsWithGroups.find((e) => e.email === 'aparisotto@cas.austral.edu.ar'),
      );

      setUploadedStudents(emailsWithGroups);
      verifyStudents(emailsWithGroups.map((entry) => entry.email));
    };

    reader.readAsText(file);
  };

  const isValidFileType = (file: any) => {
    return (
      file?.type === 'text/csv' ||
      file?.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
  };

  const parseCSV = (content: string): EmailObject[] => {
    const lines = content.split(/\r?\n/);

    return lines
      .map((line: string, index: number) => {
        if (index === 0 || !line.trim()) return null;

        const columns = line.split(/[;,]/);
        if (columns.length < 1) return null;

        const email = columns[0].trim().toLowerCase();

        if (email === '') return null;

        const groups = extractGroups(columns);

        return { email, groups };
      })
      .filter((entry): entry is EmailObject => entry !== null);
  };

  const extractGroups = (columns: string[]): string[] => {
    return Array.from(
      new Set(
        columns
          .slice(1)
          .map((col) => col.trim().toLowerCase())
          .filter((col) => col !== ''),
      ),
    );
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
    if (!studentsSuccess) return;
    if (!studentsData || !uploadedStudents) {
      errorToast('Los estudiantes no forman parte de LERNI');
      return;
    }

    const transformedStudents = transformStudentData(studentsData);
    const mergedStudents = mergeStudentsWithGroups(transformedStudents, uploadedStudents);
    console.log('mergedStudents', mergedStudents);

    const classifiedStudents = classifyStudents(mergedStudents, currentStudents);
    console.log('clasifiedStudents', classifiedStudents);

    dispatch(addStudents(classifiedStudents.news));
    dispatch(updateStudents(classifiedStudents.updated));
    successToast('Estudiantes cargados con exito!');
    handleOnClose();
  };

  const classifyStudents = (students: StudentDTO[], currentStudents: StudentDTO[]) => {
    const updated: StudentDTO[] = [];
    const news: StudentDTO[] = [];

    students.forEach((student) => {
      const existingStudent = currentStudents.find((s) => s.email === student.email);

      if (existingStudent) {
        const existingGroups = existingStudent.group?.map((g) => g.name) || [];
        const newGroups = student.group?.map((g) => g.name) || [];

        const mergedGroups = Array.from(new Set([...existingGroups, ...newGroups]));

        if (mergedGroups.length !== existingGroups.length) {
          updated.push({
            ...existingStudent,
            group: mergedGroups.map((name) => ({ name })),
          });
        }
      } else {
        news.push(student);
      }
    });

    return { news, updated };
  };

  const mergeStudentsWithGroups = (
    studentsData: StudentDTO[],
    uploadedStudents: EmailObject[],
  ): StudentDTO[] => {
    const uploadedMap = new Map(uploadedStudents.map((student) => [student.email, student.groups]));

    return studentsData.map((student) => {
      const existingGroups = student.group?.map((g) => g.name) || [];
      const newGroups = uploadedMap.get(student.email) || [];

      return {
        ...student,
        group: Array.from(new Set([...existingGroups, ...newGroups])).map((name) => ({ name })),
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
            loading={studentsLoading}
          >
            Agregar
          </Button>
        </StyledRow>
      </StyledColumn>
    </Card>
  );
};

export default CreateStudentsModal;
