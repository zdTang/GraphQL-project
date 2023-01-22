const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema,GraphQLID,GraphQLBoolean,GraphQLFloat,GraphQLString } = graphql;

//Scalar Type
/*
String
int
float
boolean
id
*/


const Person = new GraphQLObjectType({
    name: "person",
    description: "represent a person type",
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type:GraphQLID },
        isMarried: { type: GraphQLBoolean },
        gpa:{type:GraphQLFloat}
    })
});



const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "description",
  fields: {},
});




module.exports = new GraphQLSchema({
  query: RootQuery,
});
