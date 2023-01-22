const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
} = graphql;

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
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) }, // no null value
    age: { type: new GraphQLNonNull(GraphQLID) },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: GraphQLFloat },
    justAType: {
      type: Person,
      resolve(parent, args) {
        return parent;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "description",
  fields: {
    person: {
      type: Person,
      resolve(parent, args) {
        let personObj = {
          name: null,
          age: null,
          isMarried: true,
          gpa: 4.0,
        };
        return personObj;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
