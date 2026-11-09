import homepageJson from '../state/homepage.json' with { type: 'json' };

export const typeDefs = {
  Query: ` getIdentity(userId: ID!): Identity`,
  root: `
  type Identity {
    userId: String!
    signedIn: Boolean!
    privacySettingsUrl: String
    personalisationEnabled: Boolean
    ageBracket: String
    findOutMoreUrl: String
  }
`,
};
export default typeDefs;

export const resolvers = {
  Query: {
    getIdentity(_parent: any, { userId }: { userId: string }) {
      return { userId, ...homepageJson.identity };
    },
  },
};
