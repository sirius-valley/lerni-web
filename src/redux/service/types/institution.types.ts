export interface InstitutionDetailsResponse {
  id: string;
  name: string;
  studentLimit: number;
  picture: string;
  collections: {
    id: string;
    name: string;
    createdAt: string;
  }[];
}

export interface UpdateInstitutionRequest {
  id: string;
  name: string;
  studentLimit: number;
  picture: string;
}

export interface CreateInstitutionRequest {
  name: string;
  studentLimit: number;
  picture: string;
}

export interface InstitutionListItem {
  id: string;
  name: string;
  studentLimit: number;
  picture: string;
}

// API Response types based on backend DTOs
export interface InstitutionResponseDto {
  id: string;
  name: string;
  studentLimit: number;
  picture: string;
  collections?: {
    id: string;
    name: string;
    createdAt: string;
  }[];
}

export interface InstitutionListResponseDto {
  institutions: InstitutionListItem[];
  total: number;
  limit: number;
  offset: number;
}

export interface InstitutionListQueryParams {
  limit?: number;
  offset?: number;
}
