import { typeDefs as navigationTypes, resolvers as navigationResolvers } from './types/types.navigation.js';
import { typeDefs as bundlesTypes, resolvers as bundlesResolvers } from './types/types.bundles.js';
import { typeDefs as translationsTypes, resolvers as translationsResolvers } from './types/types.translations.js';
import { typeDefs as identityTypes, resolvers as identityResolvers } from './types/types.identity.js';
import { IResolvers } from 'mercurius';

export const schema: string = `
${navigationTypes.root}
${bundlesTypes.root}
${translationsTypes.root}
${identityTypes.root}
type Query {
  ${navigationTypes.Query}
  ${bundlesTypes.Query}
  ${translationsTypes.Query}
  ${identityTypes.Query}
}`;

export const resolvers: IResolvers = {
  NavigationSubItem: navigationResolvers.NavigationSubItem,
  Query: {
    ...navigationResolvers.Query,
    ...bundlesResolvers.Query,
    ...translationsResolvers.Query,
    ...identityResolvers.Query,
  },
};
