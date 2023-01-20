const graphql=require('graphql');
const {GraphQLObjectType } = graphql;

//create types
const UserType=new GraphQLObjectType({
    name:"User",
    description:"Documentation for user...",
    fields:()=>({
        id:{type:graphql.GraphQLID},
        name:{type:graphql.GraphQLString},
        age:{type:graphql.GraphQLInt}
    })
});