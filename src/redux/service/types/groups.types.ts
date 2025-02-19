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

export interface GroupMetrics {
  group: string;
  finished: number;
  total: number;
}

export interface StatsDTO {
  total: number;
  finished: number;
}
