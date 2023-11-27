import { ApolloQueryResult, FetchMoreOptions, FetchMoreQueryOptions } from '@apollo/client';
import React, { MouseEvent } from 'react';
import { OrderDirection } from '../../../shared/enums';
import { UIButton } from '../../../shared/styles';
import { TPokemons } from '../../../shared/types';

interface IPokemonsButton {
  data: TPokemons;
  setOffset: (state: number) => void;
  orderDirection: OrderDirection;
  children: React.ReactNode;
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<{}, TPokemons> & FetchMoreOptions<TPokemons>
  ) => Promise<ApolloQueryResult<TPokemons>>;
}
const PokemonsButton = ({ children, data, setOffset, orderDirection, fetchMore }: IPokemonsButton) => {
  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (data?.getAllPokemons) {
      const currentOffset = data.getAllPokemons.length

      setOffset(currentOffset);

      const variables = { limit: 15, offset: currentOffset, sortOrder: orderDirection };

      await fetchMore({
        variables,
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          let allPokemons = [...prev!.getAllPokemons, ...fetchMoreResult.getAllPokemons];

          if (orderDirection === OrderDirection.Desc) {
            allPokemons = [...fetchMoreResult.getAllPokemons, ...prev!.getAllPokemons]
          }

          return {
            ...prev,
            getAllPokemons: allPokemons,
          };
        },
        context: {
          headers: {
            'x-request-id': JSON.stringify(variables),
          }
        }
      });
    }
  };

  return (
    <UIButton onClick={handleClick}>
      {children}
    </UIButton>
  );
};

export default PokemonsButton;