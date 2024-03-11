import React, { FunctionComponent } from 'react';
import { useLDispatch, useLSelector } from '../redux/hooks';
import { closeModal } from '../redux/slices/utils.slice';
import CreatePillModal from './modals/CreatePillModal';
import { BlurView } from './modals/styles';

export const withModal = (Component: FunctionComponent) => (props: any) => {
  const type = useLSelector((state) => state.utils.modalType);
  const open = !!type;
  const dispatch = useLDispatch();

  const handleOnClose = () => {
    dispatch(closeModal());
  };

  const renderModal = () => {
    switch (type) {
      case 'PILL_CREATE':
        return <CreatePillModal handleOnClose={handleOnClose} />;
    }
  };

  const ModalContainer = () => {
    return (
      <BlurView
        onClick={(event) => {
          event.stopPropagation();
          handleOnClose();
        }}
      >
        {renderModal()}
      </BlurView>
    );
  };

  return (
    <>
      <Component {...props} />
      {open && ModalContainer()}
    </>
  );
};
