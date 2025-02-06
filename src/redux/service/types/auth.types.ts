export type PermissionsResponseDTO = {
  permissions: Permissions;
};

export enum PermissionType {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum SpecificAction {
  ADD_STUDENT = 'add_student',
  REMOVE_STUDENT = 'remove_student',
  EDIT_CONTENT = 'edit_content',
}

interface EntityPermissions {
  general: PermissionType[];
  specific?: SpecificAction[];
}

export interface Permissions {
  collections: EntityPermissions;
  programs: EntityPermissions;
}
