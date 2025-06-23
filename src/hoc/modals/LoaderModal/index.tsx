import React from 'react';
import { ModalProps } from '../interfaces';
import { StyledBox } from '../../../components/styled/styles';
import Loader from '../../../components/styled/Loader';

type LoaderModalProps = ModalProps;

const LoaderModal = ({ handleOnClose }: LoaderModalProps) => {
  return (
    <StyledBox
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Loader />
    </StyledBox>
  );
};

export default LoaderModal;
