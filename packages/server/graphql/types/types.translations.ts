import homepageJson from '../state/homepage.json' with { type: 'json' };
const scrapedData: { [language: string]: Object } = {
  en: homepageJson.translations,
};

export const typeDefs = {
  Query: `getTranslations(path: String, language: String!): JSON`,
  root: `scalar JSON`,
};
export default typeDefs;

export const resolvers = {
  Query: {
    getTranslations(_parent: any, { path, language }: { path: string; language: string }) {
      if (path === '/') {
        return scrapedData[language] ?? {};
      }
      return scrapedData[language] ?? {};
    },
  },
};
