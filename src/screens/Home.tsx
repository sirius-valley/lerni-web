import React from 'react';
import { RootContainer } from '../styledComponents';
import Button from '../components/styled/Button/Button';
import { ComponentVariantType } from '../utils/constants';
import { ButtonLabelSize } from '../components/styled/Button/styles';
import SendIcon from '../assets/icons/SendIcon';

const Home = () => {
  const handleButton = () => {
    alert('hello');
  };

  return (
    <RootContainer style={Styles.rootContainer}>
      <Button
        onClick={handleButton}
        label={'Button'}
        labelSize={ButtonLabelSize.BODY1}
        variant={ComponentVariantType.DARK}
        disabled={false}
        loading={false}
        icon={SendIcon}
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
