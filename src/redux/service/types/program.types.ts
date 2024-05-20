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
  id: string;
  name: string;
  programVersionId: string;
};

export type ProgramListResponse = {
  results: ProgramListItem[];
  total: 3;
};
