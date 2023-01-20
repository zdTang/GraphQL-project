const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;
const _ = require("lodash");

const usersData = [
  { id: "1", name: "Bond", age: 36, profession: "tutor" },
  { id: "13", name: "Anna", age: 26, profession: "baker" },
  { id: "15", name: "Mike", age: 96, profession: "hr" },
  { id: "19", name: "Janny", age: 99, profession: "teacher" },
  { id: "160", name: "Peter", age: 36, profession: "actor" },
];

const hobbiesData = [
  { id: "1", title: "reading", description: "just reading" },
  { id: "2", title: "writing", description: "just writing" },
  { id: "3", title: "gaming", description: "just gaming" },
  { id: "4", title: "fishing", description: "just fishing" },
  { id: "5", title: "coding", description: "just coding" },
];

const postsData = [
  { id: "1", comment: "nice post 1" },
  { id: "2", comment: "nice post 2" },
  { id: "3", comment: "nice post 3" },
  { id: "4", comment: "nice post 4" },
  { id: "5", comment: "nice post 5" },
];

//create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    profession: {
      type: GraphQLString,
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby...",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post...",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    comment: {
      type: GraphQLString,
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
    hobby: {
      type: HobbyType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return _.find(hobbiesData, { id: args.id });
      },
    },
    post: {
      type: PostType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return _.find(postsData, { id: args.id });
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
