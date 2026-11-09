import homepageJson from '../state/homepage.json' with { type: 'json' };

export const typeDefs = {
  Query: `    getBundlesForPath(path: String): [Bundle]`,
  root: `
  enum BundleType {
    default
    hero
    portrait
    event
  }
  type BundleTitle {
    default: String!
    small: String
  }
  type BundleImage {
    default: String!
  }
  type BundleJourney {
    id: ID!
    sliceId: ID
    type: String
  }
  enum BundlePreference {
    live
    promotionalWithLogo
    default
    editorial
    programmeSmall
    small
  }
  type BundlePreferences {
    episodeImage: [BundlePreference]
    episodeTitle: [BundlePreference]
    episodeSubtitle: [BundlePreference]
    episodeSynopsis: [BundlePreference]
  }

  type EpisodeTitle {
    default: String
    editorial: String
    live: String
  }
  type EpisodeSynopsis {
    small: String
    editorial: String
    programmeSmall: String
    live: String
  }

  type EpisodeImage {
    default: String
    promotional: String
    promotionalWithLogo: String
    live: String
    character: String
    portrait: String
  }
  type EpisodeDuration {
    text: String
  }
  type EpisodeAvailability {
    remaining: String
  }
  type EpisodeVersion {
    kind: String
    duration: EpisodeDuration
    availability: EpisodeAvailability
  }
  type EpisodeLabels {
    category: String
    editorial: String
    time: String
  }
  type Episode {
    id: ID!
    title: EpisodeTitle!
    subtitle: EpisodeTitle
    live: Boolean
    previewId: ID
    synopsis: EpisodeSynopsis
    image: EpisodeImage
    versions: [EpisodeVersion]
    labels: EpisodeLabels
    promoted: Boolean
  }

  type BundleEntity {
    episode: Episode
    journey: BundleJourney
  }

  type Bundle {
    id: ID!
    type: BundleType
    title: BundleTitle!
    image: BundleImage
    journey: BundleJourney
    message: String
    preferences: BundlePreferences
    entities: [BundleEntity]
  }
`,
};

export const resolvers = {
  Query: {
    getBundlesForPath(_parent: any, { path }: { path: string }) {
      if (path === '/') {
        return homepageJson.bundles;
      }
      return homepageJson.bundles;
    },
  },
};
