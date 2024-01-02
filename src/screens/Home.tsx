import React from 'react';
import { RootContainer } from '../styledComponents';
import Button from '../components/styled/Button/Button';
import { ComponentVariantType } from '../utils/constants';

const Home = () => {
  const handleButton = () => {
    alert('hello');
  };

  return (
    <RootContainer style={Styles.rootContainer}>
      <Button
        onClick={handleButton}
        title={'Button'}
        variant={ComponentVariantType.PRIMARY}
        disabled={false}
      />
    </RootContainer>
  );
};

export default Home;

const Styles = {
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
};
