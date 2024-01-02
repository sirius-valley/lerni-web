import React from 'react';
import Counter from '../components/Counter/Counter';
import { RootContainer } from '../styledComponents';
import { useGetPokemonQuery } from '../redux/api/pokemon.service';
import Button from '../components/styled/Button/Button';
import { ButtonType } from '../components/styled/Button/styles';

const Home = () => {
  const pokemon = useGetPokemonQuery('');

  const handleButton = () => {
    alert('hello');
  };

  return (
    <RootContainer style={Styles.rootContainer}>
      <Button onClick={handleButton} title={'press me'} variant={ButtonType.RED} />
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
