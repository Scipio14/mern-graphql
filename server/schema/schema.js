// const { projects, clients } = require("../sampleData");

//mongoose models
const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

//Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//ProjectType
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client:{
      type:ClientType,
      resolve(parent,args){
        // return clients.find(client=>client.id === parent.clientId)
        return Client.findById(parent.clientId);
      }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: GraphQLList(ClientType),
      resolve(parent, args) {
        // return clients;
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return clients.find((client) => client.id === args.id);
        return Client.findById(args.id);
      },
    },
    projects: {
      type: GraphQLList(ProjectType),
      resolve() {
        /* En caso de que queramos recuperar los datos de un objeto js*/ 
        // return projects;
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args:{id:{type:GraphQLID}},
      resolve(_, args) {
        /*Caso de que queramos recuperar los datos de un objeto js*/
        // return projects.find((project) => project.id === args.id);
        return Project.findById(args.id);
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //Add a Client
    addClient: {
      type: ClientType,
      args: {
        name:{type:GraphQLNonNull(GraphQLString)},
        email:{type:GraphQLNonNull(GraphQLString)},
        phone:{type:GraphQLNonNull(GraphQLString)}

      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        })
        return client.save();
        // Client.create({name,email,phone});
      }
    },
    //Delete a Client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      }

    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
