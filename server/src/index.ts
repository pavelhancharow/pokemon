const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/index');

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP((req: any) => ({
  schema,
  graphiql: true,
  context: { requestId: req.headers['x-request-id'] },
})));

const PORT = 4000;

app.listen(PORT);
console.log(`🚀 Server started on: http://localhost:${PORT}/graphql`)