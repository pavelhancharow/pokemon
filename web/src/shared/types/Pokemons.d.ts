export type TPokemons = {
  getAllPokemons: {
    title: string;
    url: string;
  }[]
} | null;

export type TPokemon = {
  getPokemonById: {
    name: string;
    weight: number;
    height: string;
    base_experience: number;
    abilities: {
      ability: {
        name: string;
      };
    }[];
    types: {
      type: {
        name: string
      };
    }[];
    sprites: {
      front_default: string;
    };
  }
} | null;