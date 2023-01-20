const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;
const _ = require("lodash");

const usersData = [
  {
    id: "1",
    name: "Bond",
    age: 36,
  },
  {
    id: "13",
    name: "Anna",
    age: 26,
  },
  {
    id: "15",
    name: "Mike",
    age: 96,
  },
  {
    id: "19",
    name: "Janny",
    age: 99,
  },
  {
    id: "160",
    name: "Peter",
    age: 36,
  },
];

//create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return _.find(usersData, { id: args.id });
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
