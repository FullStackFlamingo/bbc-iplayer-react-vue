<template>
  <div>
    <h1 class="sr-only">{{ t('home.homepage_title') }}</h1>
    <SearchSection class="mobile-only" />
    <BundleHero :bundle="bundleHero" />
    <BundleSection v-for="bundle in bundleRows" :key="bundle.id" :bundle="bundle">
      <BundleRow :bundle="bundle" />
    </BundleSection>
  </div>
</template>

<script setup>
import { useQuery } from '@urql/vue';
import { useTranslation } from 'i18next-vue';
import SearchSection from '../components/SearchSection.vue';
import BundleHero from '../components/bundle/BundleHero.vue';
import BundleSection from '../components/bundle/BundleSection.vue';
import BundleRow from '../components/bundle/BundleRow.vue';

const { i18next, t } = useTranslation();

const { data, error } = await useQuery({
  query: `
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
    }
  `,
});

const bundleHero = data.value.getBundlesForPath.find((item) => item.type === 'hero');
const bundleRows = data.value.getBundlesForPath.filter((item) => item.type !== 'hero');

const { getTranslations } = data.value;
i18next.addResourceBundle('en', 'translation', { home: getTranslations }, true, true);
</script>

<style lang="scss" scoped>
@media (min-width: designSystemVars.$breakpoint-md) {
  .mobile-only {
    display: none;
  }
}
</style>
