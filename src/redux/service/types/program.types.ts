export type ConvertPillBody = {
  thread: any;
};

export type ConvertTypeResponse = {
  pillBlock: any;
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
