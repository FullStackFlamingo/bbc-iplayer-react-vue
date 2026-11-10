import homepageJson from '../state/homepage.json' with { type: 'json' };

export const typeDefs = {
  Query: `getNavigationItems: NavigationItemsResult`,
  root: `
  interface NavigationItem {
    id: ID!
    title: String!
    active: Boolean!
    ariaLabel: String
  }

  type NavigationItemChannel implements NavigationItem {
    id: ID!
    title: String!
    active: Boolean!
    ariaLabel: String
    href: String!
    liveHref: String
    icon: String
  }
  type NavigationItemCategory implements NavigationItem {
    id: ID!
    title: String!
    active: Boolean!
    ariaLabel: String
    href: String!
    kind: String
  }

  union NavigationSubItem = NavigationItemChannel | NavigationItemCategory

  type NavigationItemRoot implements NavigationItem {
    id: ID!
    title: String!
    active: Boolean!
    ariaLabel: String
    href: String
    subItems: [NavigationSubItem]
  }

  type NavigationItemsResult {
    items: [NavigationItemRoot]
    renderOpen: Boolean
    accessibilityHelpHref: String
    useLiveHrefs: Boolean
  }
`,
};
export default typeDefs;

export const resolvers = {
  NavigationSubItem: {
    resolveType: (parameter: { liveHref: string; kind: string } /* , context, info */) => {
      if (parameter.liveHref) {
        return 'NavigationItemChannel';
      }
      if (parameter.kind) {
        return 'NavigationItemCategory';
      }
      return null;
    },
  },
  Query: {
    getNavigationItems(/* parent, args, context */) {
      return homepageJson.navigation;
      // return users.find(user => user.id === args.id);
    },
  },
};
