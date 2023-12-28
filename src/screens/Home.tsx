import React from 'react';
import Counter from '../components/Counter/Counter';
import { RootContainer } from '../styledComponents';
import { useGetPokemonQuery } from '../redux/api/pokemon.service';

const Home = () => {
  const pokemon = useGetPokemonQuery('');

  return (
    <RootContainer style={Styles.rootContainer}>
      <h1>Hello world</h1>
      <Counter />
    </RootContainer>
  );
};

export default Home;

const Styles = {
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
