const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");
const schema_test = require("./schema/types_schema");

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    //schema
    schema_test,
  })
);

app.listen(4000, () => {
  console.log(`Listening on port 4000!`);
});
