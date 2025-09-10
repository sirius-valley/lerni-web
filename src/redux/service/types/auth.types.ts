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
  EDIT_STUDENTS_LIST = 'edit_students_list',
  EDIT_CONTENT = 'edit_content',
}

interface EntityPermissions {
  general: PermissionType[];
  specific?: SpecificAction[];
}

export interface Permissions {
  collections: EntityPermissions;
  programs: EntityPermissions;
  profile: EntityPermissions;
}
