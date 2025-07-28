import { CreateProgramState } from '../redux/slices/program.slice';
import { CreateCollectionState } from '../redux/slices/collection.slice';
import {
  CreateCollectionRequestDto,
  StudentCollectionRequestDto,
} from '../redux/service/types/collection.types';
import { StudentDTO } from '../redux/service/types/students.response';

export const transformedValues = (values: CreateProgramState) => {
  const amountOfQuestions = values?.questionnaire?.questionnaire.elements.reduce(
    (acc, block) =>
      ['SINGLECHOICE', 'MULTIPLECHOICE'].includes(block.question_type) ? acc + 1 : acc,
    0,
  );
  const minutosTotales =
    values.pills.reduce((acc, pill) => acc + pill.completionTimeMinutes, 0) +
    (Number(values?.questionnaire?.completionTimeMinutes) ?? 0);
  return {
    ...values,
    pill: values.pills.map((pill) => ({
      /*
         "name": "string",
      "description": "string",
      "teacherComment": "string",
      "version": 0,
      "completionTimeMinutes": 0,
      "block": "string"
       */
      name: pill.title,
      description: pill.description,
      teacherComment: '',
      version: 0,
      completionTimeMinutes: pill.completionTimeMinutes,
      block: JSON.stringify(pill.lerniPill),
      teacherId: pill.teacherId,
      group: pill.groups.map((group) => ({
        name: group.name,
        institutionId: group.institutionId,
      })),
    })),
    /*
        "name": "string",
    "description": "string",
    "passsingScore": 0,
    "cooldownInMinutes": 0,
    "block": "string",
    "questionCount": 0,
    "completionTimeMinutes": 0,
    "order": 0
     */
    questionnaire: {
      name: 'Cuestionario',
      description: '',
      passsingScore: Number(values.questionnaire?.passsingScore),
      cooldownInMinutes: Number(values.questionnaire?.cooldownInMinutes),
      block: JSON.stringify(values.questionnaire?.questionnaire),
      questionCount: amountOfQuestions,
      completionTimeMinutes: Number(values.questionnaire?.completionTimeMinutes),
      order: 0,
    },
    trivia: {
      block: JSON.stringify(values.trivia),
      questionsCount: 12,
      order: 0,
    },
    students: values.studentsState.current.map((student) => student.email),
    hoursToComplete: minutosTotales,
    pointsReward: amountOfQuestions * 5,
  };
};

export const transformCreateCollectionRequest = (
  values: CreateCollectionState,
): CreateCollectionRequestDto => {
  return {
    title: values.title,
    programs: values.programs.map((program) => program.programVersionId),
    students: values.studentsState.current.map((student) => ({
      email: student.email,
      group: student.group.map((group) => group.name),
    })),
    institutionId: values.institutionId || undefined,
  };
};

export const transformAddStudentsRequest = (
  values: CreateCollectionState,
  students: StudentDTO[],
): StudentCollectionRequestDto => {
  return {
    programs: values.programs.map((program) => program.programVersionId),
    students: students.map((student) => ({
      email: student.email,
      group: student.group.map((group) => group.name),
    })),
  };
};

export const transformDeleteStudentsRequest = (students: StudentDTO[]) => {
  return students.map((student) => student.email);
};

export const getUpdatedAndDeletedStudents = (initial: StudentDTO[], current: StudentDTO[]) => {
  // Encontrar eliminados (estaban en initial pero no en current)
  const deleted = initial.filter(
    (original) => !current.some((currentStudent) => currentStudent.email === original.email),
  );

  // Encontrar actualizados (SOLO si cambia `group`)
  const updated = current.filter((currentStudent) => {
    const originalStudent = initial.find((original) => original.email === currentStudent.email);
    return originalStudent
      ? JSON.stringify(originalStudent.group) !== JSON.stringify(currentStudent.group)
      : true;
  });

  return { updated, deleted };
};
