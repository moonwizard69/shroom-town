import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';

// just using this to fake graphql tagged template literal formatting/highlighting
const graphql = String.raw;
// create our own custom mutation in keystone.ts in order to save items to cart the way we want to
export const extendGraphqlSchema = graphQLSchemaExtension({
    typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
    }
  `,
    resolvers: {
        Mutation: {
            addToCart,
        },
    },
});
