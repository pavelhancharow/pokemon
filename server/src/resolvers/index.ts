const pokemonsResolvers = require('./pokemons')

module.exports = {
  Query: {
    ...pokemonsResolvers,
  }
};