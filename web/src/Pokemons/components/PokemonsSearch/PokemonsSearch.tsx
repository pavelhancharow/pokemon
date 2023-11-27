import { ApolloQueryResult, FetchMoreOptions, FetchMoreQueryOptions, OperationVariables } from '@apollo/client';
import { MouseEvent, useRef } from 'react';
import { OrderDirection } from '../../../shared/enums';
import { TPokemons } from '../../../shared/types';
import { PokemonsSearchForm, PokemonsSearchWrapper } from './styles';

interface IPokemonsSearch {
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<{}, TPokemons> & FetchMoreOptions<TPokemons>
  ) => Promise<ApolloQueryResult<TPokemons>>;
  setOrderDirection: (state: OrderDirection) => void;
  refetch: (variables?: (Partial<OperationVariables> | undefined)) => Promise<ApolloQueryResult<TPokemons>>;
}

const PokemonsSearch = ({ fetchMore, setOrderDirection, refetch }: IPokemonsSearch) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleClick = async (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!searchInputRef.current) return;

    const value = searchInputRef.current.value;

    const variables = { searchField: value };

    await fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...prev,
          getAllPokemons: fetchMoreResult.getAllPokemons || [],
        };
      },
      context: {
        headers: {
          'x-request-id': JSON.stringify(variables),
        },
      },
    });
  };

  const handleReset = async (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!searchInputRef.current) return;

    searchInputRef.current!.value = '';

    setOrderDirection(OrderDirection.Asc);

    await refetch({ limit: 15, offset: 0, sortOrder: OrderDirection.Asc });
  }

  return (
    <PokemonsSearchForm>
      <PokemonsSearchWrapper>
        <legend>Search pokemon by id or name</legend>
        <input type="text" id="search" name="search" placeholder="Type something..." ref={searchInputRef} />
        <input type="submit" value="Search" onClick={handleClick} />
        <input type="reset" value="Reset" onClick={handleReset} />
      </PokemonsSearchWrapper>
    </PokemonsSearchForm>
  );
};

export default PokemonsSearch;