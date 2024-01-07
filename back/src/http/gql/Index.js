
import { createSchema, createYoga } from 'graphql-yoga'
import context from './context.js';
import { typeDefs } from './operators/typeDefs/typeDefs.js'
import { resolvers } from './operators/resolvers/resolvers.js'


export const schema = createSchema({
  typeDefs,
  resolvers
})


const yoga = createYoga({
  schema,
  context
});



export default yoga
