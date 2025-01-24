export interface GroupDTO {
  id: string;
  name: string;
  institutionId: string | null;
  createdAt: string;
}

export interface CreateGroup {
  name: string;
  institutionId: string | null;
}
