const express = require("express");
const app=express();
const {graphqlHTTP}=require("express-graphql");
const schema=require("./schema/schema")

app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema
}))




app.listen(4000,()=>{console.log(`Listening on port 4000!`)});