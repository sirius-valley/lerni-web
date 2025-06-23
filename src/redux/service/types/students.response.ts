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

export interface CollectionStudentProgram {
  programId: string;
  programName: string;
  progress: number;
  status: 'completed' | 'in_progress' | 'not_started' | 'not_assigned';
  grade: number;
  passed: boolean;
  teacherName: string;
}

export interface CollectionStudent {
  id: string;
  name: string;
  lastname: string;
  email: string;
  pointCount: number;
  overallProgress: number;
  overallGrade: number;
  overallStatus: 'completed' | 'in_progress' | 'not_started';
  groups: string[];
  programs: CollectionStudentProgram[];
  certificateId: string;
}

export interface CollectionStudentsResponse {
  students: CollectionStudent[];
  total: number;
  maxPage: number;
}
