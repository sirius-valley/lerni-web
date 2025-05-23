import React, { FunctionComponent } from 'react';
import { useLDispatch, useLSelector } from '../redux/hooks';
import { closeModal } from '../redux/slices/utils.slice';
import CreatePillModal from './modals/CreatePillModal';
import { BlurView } from './modals/styles';
import CreateQuestionnaireModal from './modals/CreateQuestionnaireModal';
import CreateTriviaModal from './modals/CreateTriviaModal';
import CreateStudentsModal from './modals/CreateStudentsModal';
import CreateProfessorModal from './modals/CreateProfessorModal';
import ReadPillModal from './modals/ReadPillModal';
import AddStudentModal from './modals/AddStudentModal';
import StudentsStatusModal from './modals/StudentsStatusModal';
import StudentsGroupsModal from './modals/StudentsGroupsModal';
import { EntityType } from '../utils/permissions';
import LoaderModal from './modals/LoaderModal';
import ConfirmStudentsChangesModal from './modals/ConfirmStudentsChangesModal';

export const withModal = (Component: FunctionComponent) => (props: any) => {
  const type = useLSelector((state) => state.utils.modalType);
  const open = !!type;
  const closable = useLSelector((state) => state.utils.closable);
  const metadata = useLSelector((state) => state.utils.metadata);
  const dispatch = useLDispatch();

  const handleOnClose = () => {
    dispatch(closeModal());
  };

  const renderModal = () => {
    switch (type) {
      case 'PILL_CREATE':
        return <CreatePillModal handleOnClose={handleOnClose} />;
      case 'PILL_READ':
        return <ReadPillModal handleOnClose={handleOnClose} />;
      case 'QUESTIONNAIRE_CREATE':
        return <CreateQuestionnaireModal handleOnClose={handleOnClose} />;
      case 'TRIVIA_CREATE':
        return <CreateTriviaModal handleOnClose={handleOnClose} />;
      case 'PROGRAM_STUDENTS_CREATE':
        return (
          <CreateStudentsModal handleOnClose={handleOnClose} entityType={EntityType.PROGRAM} />
        );
      case 'COLLECTION_STUDENTS_CREATE':
        return (
          <CreateStudentsModal handleOnClose={handleOnClose} entityType={EntityType.COLLECTION} />
        );
      case 'PROFESSOR_CREATE':
        return <CreateProfessorModal handleOnClose={handleOnClose} />;
      case 'ADD_STUDENT':
        return <AddStudentModal handleOnClose={handleOnClose} />;
      case 'STUDENTS_STATUS':
        return <StudentsStatusModal handleOnClose={handleOnClose}></StudentsStatusModal>;
      case 'STUDENTS_GROUPS':
        return <StudentsGroupsModal handleOnClose={handleOnClose}></StudentsGroupsModal>;
      case 'LOADER':
        return <LoaderModal handleOnClose={handleOnClose} />;
      case 'CONFIRM_STUDENTS_CHANGES':
        return (
          <ConfirmStudentsChangesModal
            handleOnClose={handleOnClose}
            addedStudents={metadata?.addedStudents || []}
            deletedStudents={metadata?.deletedStudents || []}
            onConfirm={metadata?.onConfirm}
          />
        );
      default:
        return <></>;
    }
  };

  const ModalContainer = () => {
    return <BlurView onClick={() => closable && handleOnClose()}>{renderModal()}</BlurView>;
  };

  return (
    <>
      <Component {...props} />
      {open && ModalContainer()}
    </>
  );
};
