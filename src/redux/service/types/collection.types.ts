export type CreateCollectionRequestDto = {
  title: string;
  programs: string[];
  students: Student[];
};

export type StudentCollectionRequestDto = {
  programs: string[];
  students: Student[];
};

type Student = {
  email: string;
  group: string[];
};

export type Program = {
  id: string;
  name: string;
  description: string;
  icon: string;
  hoursToComplete: number;
  pointsReward: number;
  teacherId: string;
  createdAt: string;
};

type ProgramCollection = {
  id: string;
  collectionId: string;
  programId: string;
  version: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  program: Program;
};

export type CollectionDetailsResponseDto = {
  id: string;
  name: string;
  createdAt: string;
  programs: ProgramCollection[];
  studentProgram: Student[];
};

export type CollectionListItem = {
  id: string;
  name: string;
  createdAt: string;
};

export type CollectionListResponse = CollectionListItem[];
