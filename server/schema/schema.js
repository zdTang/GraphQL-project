const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
const User = require("../Model/user");
const Hobby = require("../Model/hobby");
const Post = require("../Model/post");
const _ = require("lodash");

// const usersData = [
//   { id: "1", name: "Bond", age: 36, profession: "tutor" },
//   { id: "13", name: "Anna", age: 26, profession: "baker" },
//   { id: "15", name: "Mike", age: 96, profession: "hr" },
//   { id: "19", name: "Janny", age: 99, profession: "teacher" },
//   { id: "160", name: "Peter", age: 36, profession: "actor" },
// ];

// const hobbiesData = [
//   { id: "1", title: "reading", description: "just reading", userId: "1" },
//   { id: "2", title: "writing", description: "just writing", userId: "13" },
//   { id: "3", title: "gaming", description: "just gaming", userId: "15" },
//   { id: "4", title: "fishing", description: "just fishing", userId: "19" },
//   { id: "5", title: "coding", description: "just coding", userId: "160" },
// ];

// const postsData = [
//   { id: "1", comment: "nice post 1", userId: "1" },
//   { id: "2", comment: "nice post 2", userId: "1" },
//   { id: "3", comment: "nice post 3", userId: "15" },
//   { id: "4", comment: "nice post 4", userId: "19" },
//   { id: "5", comment: "nice post 5", userId: "160" },
// ];

//create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        //return _.filter(postsData, { userId: parent.id });
        return Post.find({ userId: parent.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        //return _.filter(hobbiesData, { userId: parent.id });
        return Hobby.find({ userId: parent.id }); // will return a array
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby...",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        //return _.find(usersData, { id: parent.userId });
        return User.findById(parent.userId); // will return only one
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post...",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        //return _.find(usersData, { id: parent.userId });
        return User.findById(parent.userId);
      },
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
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(hobbiesData, { id: args.id });
        return Hobby.findById(args.id);
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        //return hobbiesData;
        return Hobby.find({ id: args.userId });
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(postsData, { id: args.id });
        return Post.findById(args.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        //return postsData;
        return Post.find({});
      },
    },
  },
});

// Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Create user
    CreateUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        profession: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let user = User({
          name: args.name,
          age: args.age,
          profession: args.profession,
        });
        return user.save();
      },
    },
    UpdateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        profession: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return (updateUser = User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              age: args.age,
              profession: args.profession,
            },
          },
          {
            new: true, //send back the updated objectType
          }
        ));
      },
    },
    // Create Post
    CreatePost: {
      type: PostType,
      args: {
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let post = Post({
          comment: args.comment,
          userId: args.userId,
        });
        return post.save();
      },
    },
    UpdatePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return (updatePost = Post.findByIdAndUpdate(
          args.id,
          {
            $set: {
              comment: args.comment,
              userId: args.userId,
            },
          },
          {
            new: true, //send back the updated objectType
          }
        ));
      },
    },
    // Create Hobby
    CreateHobby: {
      type: HobbyType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let hobby = Hobby({
          title: args.title,
          description: args.description,
          userId: args.userId,
        });
        return hobby.save();
      },
    },
    UpdateHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return (updateHobby = Hobby.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              userId: args.userId,
            },
          },
          {
            new: true, //send back the updated objectType
          }
        ));
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
