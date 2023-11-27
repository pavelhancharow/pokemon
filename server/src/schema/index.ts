const path = require('path');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const mergedResolvers = require('../resolvers')

const graphqlPath = path.join(__dirname, '../../../graphql/*.graphql');

const typesArray = loadFilesSync(graphqlPath);
const mergedTypes = mergeTypeDefs(typesArray);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers,
});

module.exports = schema;