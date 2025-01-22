import { Group } from './groups.types';

export type StudentsRegisteredResponse = {
  registeredStudents: number;
};

export type StudentsListResponse = {
  students: StudentDto[];
};

export type StudentDto = {
  authId: string;
  career: string;
  city: string;
  email: string;
  id: string;
  image?: string;
  lastname: string;
  name: string;
  profession?: string;
  group: string[];
};
