export declare global {
  // merge Window interface with extra properties
  interface Window {
    __REACTUI_STATE__: string;
    __REACTUI_URQL_STATE__: string;
  }
  namespace IPlayer {
    type BundleTitle = {
      default: string;
      small: string;
    };
    type EpisodeTitle = {
      default: string;
      editorial: string;
      live: string;
    };
    type EpisodeImage = {
      default: string;
      portrait: string;
      promotional: string;
    };
    type EpisodeSynopsis = {
      small: string;
      editorial: string;
      programmeSmall: string;
      live: string;
    };
    type Episode = {
      id: string;
      title: EpisodeTitle;
      subtitle: EpisodeTitle;
      image: EpisodeImage;
      synopsis: EpisodeSynopsis;
      live: string;
      previewId: string;
    };
    type BundleEntity = {
      episode: Episode;
    };
    type Bundle = {
      id: string;
      type: string;
      title: BundleTitle;
      entities: [BundleEntity];
    };
    namespace MainNav {
      type SubNavItem = {
        id: string;
        title: string;
        active: boolean;
        ariaLabel: string;
        href: string;
        liveHref: string;
        icon: string;
        kind: string;
      };

      type TopNavItem = {
        id: string;
        title: string;
        active: boolean;
        ariaLabel: string;
        href: string;
        subItems: Array<SubNavItem>;
      };
    }
  }
}
