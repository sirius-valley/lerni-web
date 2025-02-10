import { useLSelector } from '../redux/hooks';
import { PermissionType, SpecificAction } from '../redux/service/types/auth.types';

export enum EntityType {
  COLLECTION = 'collection',
  PROGRAM = 'program',
}

const permissions = useLSelector((state) => state.auth.permissions);

const hasPermission = (permission: PermissionType, entity: EntityType): boolean => {
  switch (entity) {
    case EntityType.COLLECTION:
      return permissions.collections.general.includes(permission);
    case EntityType.PROGRAM:
      return permissions.programs.general.includes(permission);
    default:
      return false;
  }
};

const hasSpecificPermission = (specificPermission: SpecificAction, entity: EntityType): boolean => {
  switch (entity) {
    case EntityType.COLLECTION:
      return permissions.collections.specific?.includes(specificPermission) ?? false;
    case EntityType.PROGRAM:
      return permissions.programs.specific?.includes(specificPermission) ?? false;
    default:
      return false;
  }
};

export const canCreateCollection = () =>
  hasPermission(PermissionType.CREATE, EntityType.COLLECTION);
export const canReadCollection = () => hasPermission(PermissionType.READ, EntityType.COLLECTION);
export const canUpdateCollection = () =>
  hasPermission(PermissionType.UPDATE, EntityType.COLLECTION);
export const canDeleteCollection = () =>
  hasPermission(PermissionType.DELETE, EntityType.COLLECTION);

export const canAddStudentToCollection = () =>
  hasSpecificPermission(SpecificAction.ADD_STUDENT, EntityType.COLLECTION);
export const canRemoveStudentFromCollection = () =>
  hasSpecificPermission(SpecificAction.REMOVE_STUDENT, EntityType.COLLECTION);
export const canEditCollectionContent = () =>
  hasSpecificPermission(SpecificAction.EDIT_CONTENT, EntityType.COLLECTION);

export const canCreateProgram = () => hasPermission(PermissionType.CREATE, EntityType.PROGRAM);
export const canReadProgram = () => hasPermission(PermissionType.READ, EntityType.PROGRAM);
export const canUpdateProgram = () => hasPermission(PermissionType.UPDATE, EntityType.PROGRAM);
export const canDeleteProgram = () => hasPermission(PermissionType.DELETE, EntityType.PROGRAM);

export const canAddStudentToProgram = () =>
  hasSpecificPermission(SpecificAction.ADD_STUDENT, EntityType.PROGRAM);
export const canRemoveStudentFromProgram = () =>
  hasSpecificPermission(SpecificAction.REMOVE_STUDENT, EntityType.PROGRAM);
export const canEditProgramContent = () =>
  hasSpecificPermission(SpecificAction.EDIT_CONTENT, EntityType.PROGRAM);
