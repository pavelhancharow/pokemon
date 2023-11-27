import React from 'react';
import { PokemonsCardsFieldContainer } from './styles';

interface IPokemonsCards {
  children: React.ReactNode;
}

const PokemonsCards = ({ children }: IPokemonsCards) => {
  return (
    <PokemonsCardsFieldContainer>
      {children}
    </PokemonsCardsFieldContainer>
  );
}

export default PokemonsCards;