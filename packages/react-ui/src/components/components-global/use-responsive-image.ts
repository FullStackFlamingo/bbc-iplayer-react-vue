import { useMemo } from 'react';

type ResponsiveSize = {
  media: string;
  srcset: {
    [index: string]: string;
  };
  itemWidth: string;
};
type ResponsiveSizeGroup = {
  [index: string]: ResponsiveSize;
};
const SIZES_DEFAULT: ResponsiveSizeGroup = {
  xxl: {
    media: '(min-width: 1280px)',
    srcset: {
      '1x': '304x171',
      '1.5x': '464x261',
    },
    itemWidth: '296px',
  },
  xl: {
    media: '(min-width: 1008px)',
    srcset: {
      '1x': '240x135',
      '1.5x': '352x198',
    },
    itemWidth: '228px',
  },
  l: {
    media: '(min-width: 900px)',
    srcset: {
      '1x': '304x171',
      '1.5x': '464x261',
    },
    itemWidth: '33.33vw',
  },
  m: {
    media: '(min-width: 600px)',
    srcset: {
      '1x': '192x108',
      '1.5x': '288x162',
    },
    itemWidth: '33.33vw',
  },
  s: {
    media: '(min-width: 400px)',
    srcset: {
      '1x': '288x162',
      '1.5x': '432x243',
    },
    itemWidth: '33.33vw',
  },
  xs: {
    media: '(min-width: 0px)',
    srcset: {
      '1x': '288x162',
      '1.5x': '432x243',
    },
    itemWidth: '50vw',
  },
};

const SIZES_PORTRAIT: ResponsiveSizeGroup = {
  xxl: {
    media: '(min-width: 1280px)',
    srcset: {
      '1x': '304x456',
      '1.5x': '464x696',
    },
    itemWidth: '296px',
  },
  xl: {
    media: '(min-width: 1008px)',
    srcset: {
      '1x': '240x360',
      '1.5x': '352x528',
    },
    itemWidth: '228px',
  },
  l: {
    media: '(min-width: 900px)',
    srcset: {
      '1x': '304x456',
      '1.5x': '464x696',
    },
    itemWidth: '33.33vw',
  },
  m: {
    media: '(min-width: 600px)',
    srcset: {
      '1x': '288x432',
      '1.5x': '432x648',
    },
    itemWidth: '33.33vw',
  },
  s: {
    media: '(min-width: 400px)',
    srcset: {
      '1x': '256x384',
      '1.5x': '384x576',
    },
    itemWidth: '33.33vw',
  },
  xs: {
    media: '(min-width: 0px)',
    srcset: {
      '1x': '192x288',
      '1.5x': '288x432',
    },
    itemWidth: '50vw',
  },
};

const SIZES_HERO: ResponsiveSizeGroup = {
  xxl: {
    media: '(min-width: 1280px)',
    itemWidth: '1248px',
    srcset: {
      '1248w': '1248x702',
      '1872w': '1872x1053',
    },
  },
  xl: {
    media: '(min-width: 1008px) and (max-width: 1279px)',
    itemWidth: '976px',
    srcset: {
      '976w': '976x549',
      '1472w': '1472x828',
    },
  },
  l: {
    media: '(min-width: 600px) and (max-width: 1007px)',
    itemWidth: 'calc(100vw - 32px)',
    srcset: {
      '976w': '976x549',
      '1472w': '1472x828',
    },
  },
  m: {
    media: '(min-width: 400px) and (max-width: 599px)',
    itemWidth: 'calc(100vw - 32px)',
    srcset: {
      '576w': '576x324',
      '864w': '864x486',
    },
  },
  s: {
    media: '(max-width: 399px)',
    itemWidth: 'calc(100vw - 16px)',
    srcset: {
      '368w': '368x207',
      '560w': '560x315',
    },
  },
};

export const useResponsiveImage = (props: { recipe: string; type: string }) => ({
  recipeToSrcSet(srcset: { [x: string]: string }) {
    return Object.keys(srcset)
      .map((mul) => {
        const size = srcset[mul];
        const url = props.recipe.replace('{recipe}', size);
        return `${url} ${mul}`;
      })
      .join(', ');
  },
  sizes: useMemo(() => {
    switch (props.type) {
      case 'portrait':
        return SIZES_PORTRAIT;
      case 'hero':
        return SIZES_HERO;
      default:
        return SIZES_DEFAULT;
    }
  }, [props.type]),
  aspectRatioType: useMemo(() => {
    switch (props.type) {
      case 'portrait':
        return 'portrait';
      case 'hero':
        return 'hero';
      default:
        return 'default';
    }
  }, [props.type]),
});
