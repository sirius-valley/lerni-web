export type StudentsRegisteredResponse = {
  registeredStudents: number;
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
