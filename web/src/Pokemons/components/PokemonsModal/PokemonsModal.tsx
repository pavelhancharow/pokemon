import { useQuery } from '@apollo/client';
import { Loader } from '../../../shared/components';
import { GET_POKEMON_BY_ID } from '../../../shared/queries';
import { TPokemon } from '../../../shared/types';
import {
  PokemonsModalContainer,
  PokemonsModalDescription,
  PokemonsModalImage,
  PokemonsModalInfo,
  PokemonsModalInfoField,
  PokemonsModalInfoFieldExperience,
  PokemonsModalType,
} from './styles';

interface IPokemonsModal {
  pokemonId: string;
}

const PokemonsModal = ({ pokemonId }: IPokemonsModal) => {
  const {data, loading} = useQuery<TPokemon>(GET_POKEMON_BY_ID,{
    variables: { id: pokemonId },
    context: {
      headers: {
        'x-request-id': JSON.stringify({ id: pokemonId }),
      }
    }
  });

  if (loading) {
    return (
      <PokemonsModalContainer>
        <Loader />
      </PokemonsModalContainer>
    );
  }

  const pokemon = data?.getPokemonById;

  return (
    <PokemonsModalContainer>
      <PokemonsModalImage>
        <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
      </PokemonsModalImage>

      <PokemonsModalDescription>
        <PokemonsModalInfo>
          <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
            <PokemonsModalInfoField>
              Height
              <span>{pokemon?.height}'</span>
            </PokemonsModalInfoField>

            <PokemonsModalInfoField>
              Weight
              <span>{pokemon?.weight} lbs</span>
            </PokemonsModalInfoField>
          </div>

          <PokemonsModalInfoField>
            Abilities
            <span>
              {pokemon?.abilities.map(({ ability }) => ability.name).join(' ')}
            </span>
          </PokemonsModalInfoField>

          <PokemonsModalInfoFieldExperience>
            <b>Base experience: </b>
            <b>{pokemon?.base_experience}</b>
          </PokemonsModalInfoFieldExperience>
        </PokemonsModalInfo>

        <PokemonsModalType>
          Type
          <div>
            {pokemon?.types.map(({ type }) => (
              <span key={type.name}>{type.name}</span>
            ))}
          </div>
        </PokemonsModalType>
      </PokemonsModalDescription>
    </PokemonsModalContainer>
  )
};

export default PokemonsModal;