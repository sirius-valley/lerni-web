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
