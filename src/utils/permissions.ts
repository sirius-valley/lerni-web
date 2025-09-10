import { useLSelector } from '../redux/hooks';

export enum EntityType {
  COLLECTION = 'collection',
  PROGRAM = 'program',
  PROFILE = 'profile',
  PROFESSOR = 'professor',
  STATS = 'stats',
}

export enum PermissionType {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  ADD_STUDENT = 'add_student',
  EDIT_STUDENTS_LIST = 'edit_students_list',
  EDIT_CONTENT = 'edit_content',
}

export const usePermissions = () => {
  const permissions = useLSelector((state) => state.auth.permissions);

  // Debug function to log current permissions
  const debugPermissions = () => {
    console.log('🔍 Current Permissions State:', {
      collections: permissions.collections,
      programs: permissions.programs,
      profile: permissions.profile,
      professors: permissions.professors,
      stats: permissions.stats,
    });
  };

  const hasPermission = (permission: string, entity: EntityType): boolean => {
    switch (entity) {
      case EntityType.COLLECTION:
        return permissions.collections?.includes(permission) ?? false;
      case EntityType.PROGRAM:
        return permissions.programs?.includes(permission) ?? false;
      case EntityType.PROFILE:
        return permissions.profile?.includes(permission) ?? false;
      case EntityType.PROFESSOR:
        return permissions.professors?.includes(permission) ?? false;
      case EntityType.STATS:
        return permissions.stats?.includes(permission) ?? false;
      default:
        return false;
    }
  };

  const canCreateCollection = () => hasPermission(PermissionType.CREATE, EntityType.COLLECTION);
  const canReadCollection = () => hasPermission(PermissionType.READ, EntityType.COLLECTION);
  const canUpdateCollection = () => hasPermission(PermissionType.UPDATE, EntityType.COLLECTION);
  const canDeleteCollection = () => hasPermission(PermissionType.DELETE, EntityType.COLLECTION);

  const canAddStudentToCollection = () =>
    hasPermission(PermissionType.ADD_STUDENT, EntityType.COLLECTION);
  const canEditStudentsListFromCollection = () =>
    hasPermission(PermissionType.EDIT_STUDENTS_LIST, EntityType.COLLECTION);
  const canEditCollectionContent = () =>
    hasPermission(PermissionType.EDIT_CONTENT, EntityType.COLLECTION);

  const canCreateProgram = () => hasPermission(PermissionType.CREATE, EntityType.PROGRAM);
  const canReadProgram = () => hasPermission(PermissionType.READ, EntityType.PROGRAM);
  const canUpdateProgram = () => hasPermission(PermissionType.UPDATE, EntityType.PROGRAM);
  const canDeleteProgram = () => hasPermission(PermissionType.DELETE, EntityType.PROGRAM);

  const canAddStudentToProgram = () =>
    hasPermission(PermissionType.ADD_STUDENT, EntityType.PROGRAM);
  const canEditStudentsListFromProgram = () =>
    hasPermission(PermissionType.EDIT_STUDENTS_LIST, EntityType.PROGRAM);
  const canEditProgramContent = () =>
    hasPermission(PermissionType.EDIT_CONTENT, EntityType.PROGRAM);

  const canOnlyReadProgram = () => {
    return (
      canReadProgram() &&
      !canUpdateProgram() &&
      !canDeleteProgram() &&
      !canAddStudentToProgram() &&
      !canEditStudentsListFromProgram() &&
      !canEditProgramContent()
    );
  };
  const canOnlyReadCollection = () => {
    return (
      canReadCollection() &&
      !canUpdateCollection() &&
      !canDeleteCollection() &&
      !canAddStudentToCollection() &&
      !canEditStudentsListFromCollection() &&
      !canEditCollectionContent()
    );
  };

  const canViewProfile = () => hasPermission(PermissionType.READ, EntityType.PROFILE);
  const canUpdateProfile = () => hasPermission(PermissionType.UPDATE, EntityType.PROFILE);

  const hasFullAccess = () => {
    const required = [
      PermissionType.CREATE,
      PermissionType.READ,
      PermissionType.UPDATE,
      PermissionType.DELETE,
    ];
    const collections = permissions.collections || [];
    const programs = permissions.programs || [];
    return (
      required.every((perm) => collections.includes(perm)) &&
      required.every((perm) => programs.includes(perm))
    );
  };

  const hasNoPermissions = () => {
    const isEmpty = (arr: any[] | undefined) => !arr || arr.length === 0;
    return (
      isEmpty(permissions.collections) &&
      isEmpty(permissions.programs) &&
      isEmpty(permissions.profile) &&
      isEmpty(permissions.professors) &&
      isEmpty(permissions.stats)
    );
  };

  return {
    canCreateCollection,
    canReadCollection,
    canUpdateCollection,
    canDeleteCollection,
    canAddStudentToCollection,
    canEditStudentsListFromCollection,
    canEditCollectionContent,
    canCreateProgram,
    canReadProgram,
    canUpdateProgram,
    canDeleteProgram,
    canAddStudentToProgram,
    canEditStudentsListFromProgram,
    canEditProgramContent,
    canOnlyReadProgram,
    canOnlyReadCollection,
    canViewProfile,
    canUpdateProfile,
    hasPermission,
    hasFullAccess,
    hasNoPermissions,
    debugPermissions, // Add debug function to return object
  };
};
