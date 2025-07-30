export type PermissionsResponseDTO = {
  permissions: Permissions;
  institutionIds: string[];
};

interface EntityPermissions {
  permissions: string[];
}

export interface Permissions {
  collections: EntityPermissions;
  programs: EntityPermissions;
  profile: EntityPermissions;
  professors: EntityPermissions;
  stats: EntityPermissions;
}
