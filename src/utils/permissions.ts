import { useLSelector } from '../redux/hooks';
import { PermissionType, SpecificAction } from '../redux/service/types/auth.types';

export enum EntityType {
  COLLECTION = 'collection',
  PROGRAM = 'program',
  PROFILE = 'profile',
}

export const usePermissions = () => {
  const permissions = useLSelector((state) => state.auth.permissions);

  const hasPermission = (permission: PermissionType, entity: EntityType): boolean => {
    switch (entity) {
      case EntityType.COLLECTION:
        return permissions.collections?.general?.includes(permission);
      case EntityType.PROGRAM:
        return permissions.programs?.general?.includes(permission);
      case EntityType.PROFILE:
        return permissions.profile?.general?.includes(permission);
      default:
        return false;
    }
  };

  const hasSpecificPermission = (
    specificPermission: SpecificAction,
    entity: EntityType,
  ): boolean => {
    switch (entity) {
      case EntityType.COLLECTION:
        return permissions.collections?.specific?.includes(specificPermission) ?? false;
      case EntityType.PROGRAM:
        return permissions.programs?.specific?.includes(specificPermission) ?? false;
      default:
        return false;
    }
  };

  const canCreateCollection = () => hasPermission(PermissionType.CREATE, EntityType.COLLECTION);
  const canReadCollection = () => hasPermission(PermissionType.READ, EntityType.COLLECTION);
  const canUpdateCollection = () => hasPermission(PermissionType.UPDATE, EntityType.COLLECTION);
  const canDeleteCollection = () => hasPermission(PermissionType.DELETE, EntityType.COLLECTION);

  const canAddStudentToCollection = () =>
    hasSpecificPermission(SpecificAction.ADD_STUDENT, EntityType.COLLECTION);
  const canEditStudentsListFromCollection = () =>
    hasSpecificPermission(SpecificAction.EDIT_STUDENTS_LIST, EntityType.COLLECTION);
  const canEditCollectionContent = () =>
    hasSpecificPermission(SpecificAction.EDIT_CONTENT, EntityType.COLLECTION);

  const canCreateProgram = () => hasPermission(PermissionType.CREATE, EntityType.PROGRAM);
  const canReadProgram = () => hasPermission(PermissionType.READ, EntityType.PROGRAM);
  const canUpdateProgram = () => hasPermission(PermissionType.UPDATE, EntityType.PROGRAM);
  const canDeleteProgram = () => hasPermission(PermissionType.DELETE, EntityType.PROGRAM);

  const canAddStudentToProgram = () =>
    hasSpecificPermission(SpecificAction.ADD_STUDENT, EntityType.PROGRAM);
  const canEditStudentsListFromProgram = () =>
    hasSpecificPermission(SpecificAction.EDIT_STUDENTS_LIST, EntityType.PROGRAM);
  const canEditProgramContent = () =>
    hasSpecificPermission(SpecificAction.EDIT_CONTENT, EntityType.PROGRAM);

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
    const collections = permissions.collections?.general || [];
    const programs = permissions.programs?.general || [];
    return (
      required.every((perm) => collections.includes(perm)) &&
      required.every((perm) => programs.includes(perm))
    );
  };

  const hasNoPermissions = () => {
    const isEmpty = (arr: any[] | undefined) => !arr || arr.length === 0;
    return (
      isEmpty(permissions.collections?.general) &&
      isEmpty(permissions.collections?.specific) &&
      isEmpty(permissions.programs?.general) &&
      isEmpty(permissions.programs?.specific) &&
      isEmpty(permissions.profile?.general) &&
      isEmpty(permissions.profile?.specific)
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
  };
};
