import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Loader } from '../shared/components';
import { OrderDirection } from '../shared/enums';
import { GET_POKEMONS } from '../shared/queries';
import { TPokemons } from '../shared/types';
import { PokemonsButton, PokemonsCard, PokemonsCards, PokemonsSearch, PokemonsSort } from './components';
import { PokemonsLoadArea, PokemonsPanel } from './styles';

const initialQuery = { limit: 15, offset: 0, sortOrder: OrderDirection.Asc };

const Pokemons = () => {
  const [offset, setOffset] = useState(0)
  const [orderDirection, setOrderDirection] = useState(OrderDirection.Asc);
  const { data, loading, error, fetchMore, refetch } = useQuery<TPokemons>(GET_POKEMONS, {
    variables: initialQuery,
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
    context: {
      headers: {
        'x-request-id': JSON.stringify(initialQuery),
      }
    }
  });

  console.log('loading', loading);

  const isDataSuccessful = data?.getAllPokemons?.length;

  return (
    <>
      <PokemonsPanel>
        <PokemonsSearch fetchMore={fetchMore} setOrderDirection={setOrderDirection} refetch={refetch} />
        <PokemonsSort
          offset={offset}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
          fetchMore={fetchMore}
        />
      </PokemonsPanel>

      {!isDataSuccessful ? (
          <div style={{margin: '0 auto'}}>Pokemons not found</div>
        ) : (
          <>
            {!error && (
              <PokemonsCards>
                {data.getAllPokemons.map((item) => (
                  <PokemonsCard key={item.url} {...item} />
                ))}
              </PokemonsCards>
            )}

            <PokemonsLoadArea>
              {loading && <Loader />}
              {!loading && isDataSuccessful > 1 && (
                <PokemonsButton
                  data={data}
                  setOffset={setOffset}
                  orderDirection={orderDirection}
                  fetchMore={fetchMore}
                >
                  Load More
                </PokemonsButton>
              )}
            </PokemonsLoadArea>
          </>
        )
      }
    </>
  );
};

export default Pokemons;