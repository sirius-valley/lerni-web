export type ProgramCardItem = {
  id: string;
  name: string;
  image: string;
  progress: number;
  teacher: Teacher;
  points: number;
  maxPoints: number;
  collectionName?: string;
  collection?: string;
  collectionId?: string;
};

export type Teacher = {
  id: string;
  name: string;
  lastname: string;
  profession: string;
  image: string;
};
