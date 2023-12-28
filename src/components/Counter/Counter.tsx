import React from 'react';
import useCounter from '../../hooks/useCounter';
import styled, { useTheme, DefaultTheme } from 'styled-components';
import { Button } from '../../styledComponents';
import { MyTheme } from '../../utils/theme';

const Counter = () => {
  const { counter, increment } = useCounter();
  const Styles = CreateStyles();

  return (
    <div>
      <h3>Counter</h3>
      <Button
       onClick={increment} 
        style={Styles.button}>
        +
      </Button>
      <h5>{counter}</h5>
    </div>
  );
};

export default Counter;

const CreateStyles = () => {
  const theme = useTheme();
  return {
    button: {
      backgroundColor: theme.primary200,
    },
  };
};
