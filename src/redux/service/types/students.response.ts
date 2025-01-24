import { GroupDTO } from './groups.types';

export type StudentsRegisteredResponse = {
  registeredStudents: number;
};

export type StudentsListResponse = {
  students: StudentDTO[];
};

export type StudentDTO = {
  authId: string;
  career: string;
  city: string;
  email: string;
  id: string;
  image?: string;
  lastname: string;
  name: string;
  profession?: string;
  group: { name: string }[];
  progress: number;
};
