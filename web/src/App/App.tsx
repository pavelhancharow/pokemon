import React from 'react';
import './styles';
import Pokemons  from '../Pokemons/Pokemons';
import { Header } from '../shared/components';
import { AppHeader, AppWrapper } from './styles';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppWrapper>
        <AppHeader>
          <Header>Pokémons</Header>
        </AppHeader>

        <Pokemons />
      </AppWrapper>
    </ApolloProvider>
  );
}

export default App;
