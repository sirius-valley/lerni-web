import { TriviaStatus } from '../../../utils/constants';

export type ConvertPillBody = {
  thread: any;
};

export type ConvertTypeResponse = {
  pillBlock: any;
};

export type LikesResponse =
  | {
      likes?: number;
      dislikes?: number;
    }
  | undefined;

export type ProgramAttendanceResponse = {
  programVersionId: string;
  totalStudents: number;
  notStarted: number;
  inProgress: number;
  completed: number;
};

export type QuestionnaireAttemptsResponse = {
  attempts: number;
  studentQty: number;
}[];

export type AllProgramsChartResponse = {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
};

export type ProgramListItem = {
  icon: string;
  name: string;
  programVersionId: string;
};

export type ProgramListResponse = {
  results: ProgramListItem[];
  total: 3;
};

interface Student {
  id: string;
  name: string;
  lastname: string;
  image: string;
  pointCount: number;
  authId: string;
}

interface Program {
  id: string;
  name: string;
  icon: string;
  programVersionId: string;
}

interface Pill {
  id: string;
  pillName: string;
  completionTimeMinutes: number;
  pillProgress: number;
  isLocked: boolean;
}

interface Questionnaire {
  name: string;
  progress: number;
  attempts: number;
  questionCount: number;
  correctAnswers: number;
}

interface Trivia {
  status: TriviaStatus;
  correctAnswers: number;
  totalQuestions: number;
}
export type StudentsStatusResponse = {
  student: Student;
  program: Program;
  pills: Pill[];
  questionnaire: Questionnaire;
  trivia: Trivia;
};
