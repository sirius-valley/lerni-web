import React from 'react';
import { RootContainer } from '../styledComponents';
import Button from '../components/styled/Button/Button';
import { ComponentVariantType } from '../utils/constants';
import { ButtonLabelSize } from '../components/styled/Button/styles';
import SendIcon from '../assets/icons/SendIcon';
import { ProgramItem } from '../components/program/ProgramItem';
import { StyledColumn } from '../components/styled/styles';
import { useTheme } from 'styled-components';
import { theme } from '../utils/theme';

const Home = () => {
  const handleButton = () => {
    alert('hello');
  };

  return (
    <RootContainer style={Styles.rootContainer}>
      <StyledColumn
        style={{ gap: 8, width: '60%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Button
          onClick={handleButton}
          label={'Button'}
          labelSize={ButtonLabelSize.BODY1}
          variant={ComponentVariantType.DARK}
          disabled={false}
          loading={false}
          icon={SendIcon}
        />
        <ProgramItem />
      </StyledColumn>
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
