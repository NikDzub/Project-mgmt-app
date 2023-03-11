//mongoose models
import Project from '../models/Project.js';
import Client from '../models/Client.js';

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';

//Client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//Project type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

//

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //projects
    projects: {
      type: new GraphQLList(ProjectType),

      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },

    //clients
    clients: {
      type: new GraphQLList(ClientType),

      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

//

//mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //add client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },

      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },

    //delete client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },

      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },

    //add project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: GraphQLNonNull(
            new GraphQLEnumType({
              name: 'ProjectStatus',
              values: {
                new: { value: 'Not started' },
                progress: { value: 'In progress' },
                completed: { value: 'Completed' },
              },
            })
          ),
          defaultValue: 'Not started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },

      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },

    //delete project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },

    //update project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: GraphQLNonNull(
            new GraphQLEnumType({
              name: 'ProjectStatusUpdate',
              values: {
                new: { value: 'Not started' },
                progress: { value: 'In progress' },
                completed: { value: 'Completed' },
              },
            })
          ),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export { schema };
