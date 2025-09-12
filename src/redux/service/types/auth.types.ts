export type PermissionsResponseDTO = {
  permissions: Permissions;
  institutionIds: string[];
};

/**
 * Permissions interface - each property contains an array of permission strings
 * Example:
 * {
 *   collections: ["read", "add_student", "edit_students_list", "edit_content"],
 *   programs: ["read", "add_student", "edit_students_list", "edit_content"],
 *   profile: ["read"],
 *   professors: [],
 *   stats: [],
 *   institutions: ["read", "create", "update", "delete"]
 * }
 */
export interface Permissions {
  collections: string[];
  programs: string[];
  profile: string[];
  professors: string[];
  stats: string[];
  institutions: string[];
}
