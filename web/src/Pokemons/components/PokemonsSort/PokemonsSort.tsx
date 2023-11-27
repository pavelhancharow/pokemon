import { ApolloQueryResult, FetchMoreOptions, FetchMoreQueryOptions } from '@apollo/client';
import { ChangeEvent } from 'react';
import { OrderDirection } from '../../../shared/enums';
import { TPokemons } from '../../../shared/types';
import { getIdFromUrl } from './utility';
import { pokemonSortOptions } from './constants';

interface IPokemonsSort {
  orderDirection: OrderDirection;
  offset: number;
  setOrderDirection: (state: OrderDirection) => void;
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<{}, TPokemons> & FetchMoreOptions<TPokemons>
  ) => Promise<ApolloQueryResult<TPokemons>>;
}

const PokemonsSort = ({ orderDirection, offset, setOrderDirection, fetchMore }: IPokemonsSort) => {
  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const sortOrder = event.target.value as OrderDirection

    setOrderDirection(sortOrder);

    const variables = { offset, sortOrder };

    await fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const allPokemons = [...prev!.getAllPokemons].sort((a, b) => {
          const idA = getIdFromUrl(a.url);
          const idB = getIdFromUrl(b.url);

          return sortOrder === OrderDirection.Asc ? idA - idB : idB - idA;
        });

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

  return (
    <div>
      <label htmlFor="pet-select">Sort pokemons: </label>

      <select id="pet-select" value={orderDirection} onChange={handleChange}>
        {pokemonSortOptions.map((item) => (
          <option key={item.value} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
}

export default PokemonsSort;