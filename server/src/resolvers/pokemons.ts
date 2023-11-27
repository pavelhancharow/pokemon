const fs = require('fs');
const util = require('util');
const path = require('path');
const axios = require('axios');

const { getIdFromUrl } = require('../helpers');

const readFile = util.promisify(fs.readFile);

const PokemonUrl = 'https://pokeapi.co/api/v2/pokemon';

type GetAllPokemonsArgs = {
  offset?: number;
  limit?: number;
  searchField?: string;
  sortOrder: string;
}

type Pokemon = {
  name: string;
  url: string;
};

const cacheFilePath = path.join(__dirname, '../cache/cache.json');

const getAllPokemons = async (parent: unknown, args: GetAllPokemonsArgs, context: any, info: unknown) => {
  try {
    await fs.promises.access(cacheFilePath, fs.promises.constants.R_OK | fs.promises.constants.W_OK);

    const file = await readFile(cacheFilePath, 'UTF-8');

    if (file) {
      const fileData = JSON.parse(file);

      if (context.requestId === fileData.requestId) {
        console.log('Send from cache');
        return fileData.data;
      }
    }
  } catch {
    console.error('Can not access');

    try {
      await fs.promises.writeFile(cacheFilePath, '');
      console.log('File created successful');
    } catch (writeErr) {
      console.error('Error creating file', writeErr);
    }
  }

  const { offset, limit, searchField, sortOrder } = args;

  if (searchField) {
    const response = await axios.get(PokemonUrl + `/${searchField}`);

    const cacheData = {
      requestId: context.requestId,
      data: [response.data.species]
    };

    await fs.promises.writeFile(cacheFilePath, JSON.stringify(cacheData));

    return cacheData.data;
  }

  const response = await axios.get(PokemonUrl + `?offset=${offset}&limit=${limit}`);

  const pokemons = response.data.results as Pokemon[];

  const result = pokemons.sort((a, b) => {
    const idA = getIdFromUrl(a.url);
    const idB = getIdFromUrl(b.url);

    return sortOrder === 'ASC' ? idA - idB : idB - idA;
  });

  const cacheData = {
    requestId: context.requestId,
    data: result,
  };

  await fs.promises.writeFile(cacheFilePath, JSON.stringify(cacheData));

  return result;
};

type GetPokemonByIdArgs = {
  id: string;
}

const getPokemonById = async (parent: unknown, args: GetPokemonByIdArgs, context: any, info: unknown) => {
  try {
    await fs.promises.access(cacheFilePath, fs.promises.constants.R_OK | fs.promises.constants.W_OK);

    const file = await readFile(cacheFilePath, 'UTF-8');

    if (file) {
      const fileData = JSON.parse(file);

      if (context.requestId === fileData.requestId) {
        console.log('Send from cache');
        return fileData.data;
      }
    }
  } catch {
    console.error('Can not access');

    try {
      await fs.promises.writeFile(cacheFilePath, '');
      console.log('File created successful');
    } catch (writeErr) {
      console.error('Error creating file', writeErr);
    }
  }

  const { id } = args;

  const response = await axios.get(`${PokemonUrl}/${id}`);

  const cacheData = {
    requestId: context.requestId,
    data: response.data,
  };

  await fs.promises.writeFile(cacheFilePath, JSON.stringify(cacheData));

  return response.data;
};

module.exports = {
  getAllPokemons,
  getPokemonById,
};