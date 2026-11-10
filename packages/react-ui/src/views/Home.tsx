import { styled } from 'styled-components';

import { useQuery } from 'urql';
import { breakpoint } from '@private/design-system/vars';
import { useTranslation } from 'react-i18next';
import { SearchSection } from '../components/SearchSection';
import { BundleHero } from '../components/bundle/BundleHero';
import { BundleSection } from '../components/bundle/BundleSection';
import { BundleRow } from '../components/bundle/BundleRow';

const query = `
{
  getTranslations(path:"/", language:"en")
  getBundlesForPath(path:"/") {
    id
    type
    title {
      default
      small
    }
    entities {
      episode {
        id
        title {
          default
          editorial
          live
        }
        subtitle {
          default
          editorial
          live
        }
        image {
          default
          portrait
          promotional
        }
        synopsis {
          small
          editorial
          programmeSmall
          live
        }
        live
        previewId

      }
    }
  }
  }`;

const HomeRoot = styled.div`
  .mobile-only {
    @media (min-width: ${breakpoint.md}) {
      display: none;
    }
  }
`;

function Home() {
  const { i18n, t } = useTranslation();
  const [result] = useQuery({ query });
  const { data /* , fetching, error */ } = result;

  i18n.addResourceBundle('en', 'translation', { home: data.getTranslations }, true, true); // awkward i18n merge on render?

  const bundleHero = data.getBundlesForPath?.find((item: IPlayer.Bundle) => item.type === 'hero');
  const bundleRows = data.getBundlesForPath?.filter((item: IPlayer.Bundle) => item.type !== 'hero');

  return (
    <HomeRoot>
      <h1 className="sr-only">{t('home.homepage_title')}</h1>
      <SearchSection className="mobile-only" />
      {bundleHero && <BundleHero bundle={bundleHero} />}
      {bundleRows.map((bundle: IPlayer.Bundle) => (
        <BundleSection key={bundle.id} bundle={bundle}>
          <BundleRow bundle={bundle} />
        </BundleSection>
      ))}
    </HomeRoot>
  );
}

export default Home;
