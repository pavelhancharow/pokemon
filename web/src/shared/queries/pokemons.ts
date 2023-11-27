import { gql } from '@apollo/client';

export const GET_POKEMONS = gql(`
    query GetAllPokemons($offset: Int, $limit: Int, $searchField: String, $sortOrder: String){
      getAllPokemons(offset: $offset, limit: $limit, searchField: $searchField, sortOrder: $sortOrder) {
        title: name,
        url
      }
    }
`);

export const GET_POKEMON_BY_ID = gql(`
    query GetPokemonById($id: ID!) {
      getPokemonById(id: $id) {
        name
        weight
        height
        base_experience
        abilities {
          ability {
            name
          }
        }
        types {
          type {
            name
          }
        }
        sprites {
          front_default
        }
      }
    }
`);