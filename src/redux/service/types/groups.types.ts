export interface Group {
  id: string;
  name: string;
  institutionId: string | null;
}

export interface CreateGroup {
  name: string;
  institutionId: string | null;
}
