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

export interface StudentDetailsResponse {
  id: string;
  name?: string;
  lastname?: string;
  city?: string;
  profession?: string;
  career?: string;
  image?: string;
  hasCompletedIntroduction: boolean;
  points?: number;
  ranking?: number;
}
