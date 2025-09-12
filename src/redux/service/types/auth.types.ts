export type PermissionsResponseDTO = {
  permissions: Permissions;
  role: string;
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
 *   institutions: ["read", "create", "update", "delete"],
 *   role: "FULL_ACCESS"
 * }
 */
export interface Permissions {
  collections: string[];
  programs: string[];
  profile: string[];
  institutions: string[];
  role: string;
}
