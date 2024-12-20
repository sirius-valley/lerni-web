import { CreateProgramState } from '../redux/slices/program.slice';

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
    students: values.students.map((student) => student.email),
    hoursToComplete: minutosTotales,
    pointsReward: amountOfQuestions * 5,
  };
};
