import React from 'react';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { ButtonLabelSize } from '../components/styled/Button/styles';
import SendIcon from '../assets/icons/SendIcon';
import { ProgramItem } from '../components/program/ProgramItem';
import { RootContainer, StyledColumn } from '../components/styled/styles';

const Home = () => {
  const handleButton = () => {
    alert('hello');
  };

  return (
    <RootContainer
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <StyledColumn
        style={{ gap: 8, width: '60%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Button
          onClick={handleButton}
          labelSize={ButtonLabelSize.BODY1}
          variant={ComponentVariantType.DARK}
          disabled={false}
          loading={false}
          icon={SendIcon}
        >
          Button
        </Button>
        <ProgramItem />
      </StyledColumn>
    </RootContainer>
  );
};

export default Home;
