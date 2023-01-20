const graphql=require('graphql');
const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt } = graphql;

//create types
const UserType=new GraphQLObjectType({
    name:"User",
    description:"Documentation for user...",
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        age:{type:GraphQLInt}
    })
});


//RootQuery
const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    description:"Description",
    fields:{
        user:{
            type:UserType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parent,args){
                //
                //
            }
        }
    }
});

module.exports=new graphql.GraphQLSchema({
    query:RootQuery
})