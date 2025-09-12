import { useLSelector } from '../redux/hooks';

export enum EntityType {
  COLLECTION = 'collection',
  PROGRAM = 'program',
  PROFILE = 'profile',
  INSTITUTION = 'institution',
}

export enum AdminRole {
  FULL_ACCESS = 'FULL_ACCESS',
  READ_ONLY = 'READ_ONLY',
  READ_ONLY_COLLECTION = 'READ_ONLY_COLLECTION',
  ADMIN = 'ADMIN',
  INSTITUTION_ADMIN = 'INSTITUTION_ADMIN',
  UNKNOWN_ROLE = 'UNKNOWN_ROLE',
}

export const usePermissions = () => {
  const permissions = useLSelector((state) => state.auth.permissions);
  const role = useLSelector((state) => state.auth.role);
  // Debug function to log current permissions
  const debugPermissions = () => {
    console.log('🔍 Current Permissions State:', {
      collections: permissions.collections,
      programs: permissions.programs,
      profile: permissions.profile,
      institutions: permissions.institutions,
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
      case EntityType.INSTITUTION:
        return permissions.institutions?.includes(permission) ?? false;
      default:
        return false;
    }
  };

  const canCreateCollection = () => hasPermission('create', EntityType.COLLECTION);
  const canReadCollection = () => hasPermission('read', EntityType.COLLECTION);
  const canUpdateCollection = () => hasPermission('update', EntityType.COLLECTION);
  const canDeleteCollection = () => hasPermission('delete', EntityType.COLLECTION);

  const canAddStudentToCollection = () => hasPermission('add_student', EntityType.COLLECTION);
  const canEditStudentsListFromCollection = () =>
    hasPermission('edit_students_list', EntityType.COLLECTION);
  const canEditCollectionContent = () => hasPermission('edit_content', EntityType.COLLECTION);

  const canCreateProgram = () => hasPermission('create', EntityType.PROGRAM);
  const canReadProgram = () => hasPermission('read', EntityType.PROGRAM);
  const canUpdateProgram = () => hasPermission('update', EntityType.PROGRAM);
  const canDeleteProgram = () => hasPermission('delete', EntityType.PROGRAM);

  const canAddStudentToProgram = () => hasPermission('add_student', EntityType.PROGRAM);
  const canEditStudentsListFromProgram = () =>
    hasPermission('edit_students_list', EntityType.PROGRAM);
  const canEditProgramContent = () => hasPermission('edit_content', EntityType.PROGRAM);

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

  const canViewProfile = () => hasPermission('read', EntityType.PROFILE);
  const canUpdateProfile = () => hasPermission('update', EntityType.PROFILE);

  // Institution permissions
  const canCreateInstitution = () => hasPermission('create', EntityType.INSTITUTION);
  const canReadInstitution = () => hasPermission('read', EntityType.INSTITUTION);
  const canUpdateInstitution = () => hasPermission('update', EntityType.INSTITUTION);
  const canDeleteInstitution = () => hasPermission('delete', EntityType.INSTITUTION);
  const canViewInstitutions = () => hasPermission('read', EntityType.INSTITUTION);

  const canOnlyReadInstitution = () => {
    return canReadInstitution() && !canUpdateInstitution() && !canDeleteInstitution();
  };

  const hasFullAccess = () => {
    return role === AdminRole.FULL_ACCESS;
  };

  const hasNoPermissions = () => {
    const isEmpty = (arr: any[] | undefined) => !arr || arr.length === 0;
    return (
      isEmpty(permissions.collections) &&
      isEmpty(permissions.programs) &&
      isEmpty(permissions.profile) &&
      isEmpty(permissions.institutions)
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
    // Institution permissions
    canCreateInstitution,
    canReadInstitution,
    canUpdateInstitution,
    canDeleteInstitution,
    canViewInstitutions,
    canOnlyReadInstitution,
    hasPermission,
    hasFullAccess,
    hasNoPermissions,
    debugPermissions, // Add debug function to return object
  };
};
