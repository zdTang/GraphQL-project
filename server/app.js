const express = require("express");
const app = express();
const expressQraphQL = require("express-graphql");
const { graphqlHTTP } = expressQraphQL;
const process = require("./nodemon.json");

const schema = require("./schema/schema");
const schema_test = require("./schema/types_schema");
const mongoose = require("mongoose");
//mongoose.set("strictQuery", false); // based on warning
const port = process.env.PORT || 4000;
const cors = require("cors");

mongoose
  .connect(
    `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0.y6term8.mongodb.net/${process.env.mongoDatabase}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen({ port: port }, () => {
      console.log(`Listening on port ${port}!`);
    });
  })
  .catch((error) => console.dir(error));

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    //schema: schema_test,
    schema: schema,
  })
);
