<template>
  <nav class="main-nav" aria-labelledby="main-nav-title">
    <h2 id="main-nav-title" class="hidden">BBC I Player Navigation</h2>

    <div class="main-nav__wrapper">
      <MainNavigationHeader class="main-nav__header" v-model:menu-open="menuOpen" />
      <ul class="main-nav__item-container" :class="{ 'main-nav__item-container--active': menuOpen }">
        <li v-for="item in items" :key="item.id">
          <template v-if="item.subItems">
            <button
              class="main-nav__item main-nav__item--sub font--size--1"
              :class="{ 'main-nav__item--active': activeSubNav === item.id }"
              :aria-label="item.ariaLabel"
              @click="toggleSubNavActive(item.id)"
            >
              {{ item.title }} <SvgUse class="main-nav__item-arrow" href="#tvip-down-triangle" />
            </button>
            <SubNavigation :active="activeSubNav === item.id" :aria-labelledby="`subnav-${item.id}`">
              <template #title>
                <h2 :id="`subnav-${item.id}`" class="hidden">Navigation for {{ item.title }}</h2>
              </template>
              <SubNavigationChannels v-if="item.subItems[0].icon" :sub-items="item.subItems" />
              <SubNavigationColumns v-else :sub-items="item.subItems" />
            </SubNavigation>
          </template>
          <a class="main-nav__item font--size--1" v-else :href="item.href" :aria-label="item.ariaLabel">{{
            item.title
          }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useQuery } from '@urql/vue';

import MainNavigationHeader from './MainNavigationHeader.vue';
import SubNavigation from './SubNavigation.vue';
import SubNavigationColumns from './SubNavigationColumns.vue';
import SubNavigationChannels from './SubNavigationChannels.vue';

const ITEM_ID_CHANNELS = 'channels';

const { data, error } = await useQuery({
  query: `
  {
    getNavigationItems {
        renderOpen
        accessibilityHelpHref
        useLiveHrefs
        items {
            id
            title
            active
            ariaLabel
            href
            subItems {
                ... on NavigationItemChannel {
                  id
                  title
                  active
                  ariaLabel
                  href
                  liveHref
                  icon
                }
                ... on NavigationItemCategory {
                  id
                  title
                  active
                  ariaLabel
                  href
                  kind
                }
            }
        }
    }
  }
  `,
});

const items = computed(() => data.value?.getNavigationItems?.items ?? []);

const activeSubNav = ref(null);
const toggleSubNavActive = (itemId) => {
  if (activeSubNav.value === itemId) {
    activeSubNav.value = null;
  } else {
    activeSubNav.value = itemId;
  }
};

const menuOpen = ref(false);
</script>

<style scoped lang="scss">
.main-nav {
  position: relative;
  z-index: var(--zindex-nav);
  border-bottom: 1px solid var(--color-bg-main-highlight);
}

.main-nav__item-container {
  position: absolute;
  background-color: var(--color-bg-main--active);
  transform: translateY(-10000px);
  width: 100%;
  margin-bottom: calc(var(--size-base-unit) * 2);
  &--active {
    position: static;
    transform: translateY(0);
  }
}
@media (min-width: designSystemVars.$breakpoint-md) {
  .main-nav__wrapper {
    display: flex;
    padding: 0 calc(var(--size-base-unit) * 4);
    margin: 0 auto;
    width: 100%;
    max-width: var(--size-main-wrapper);
  }
  .main-nav__header {
    flex: 1;
  }
  .main-nav__item-container {
    background-color: transparent;
    display: flex;
    position: static;
    transform: none;
    width: auto;
    margin-bottom: 0;
  }
}
@media (min-width: designSystemVars.$breakpoint-xxlg) {
  .main-nav__wrapper {
    max-width: var(--size-main-wrapper-lg);
  }
}
.main-nav__item {
  display: flex;
  align-items: center;
  height: calc(var(--size-base-unit) * 16);
  padding: 0 calc(var(--size-base-unit) * 2.5);
  &--active,
  &:focus,
  &:hover {
    color: var(--color-accent-1);
  }
}
.main-nav__item--sub {
  display: none;
}
@media (min-width: designSystemVars.$breakpoint-xlg) {
  .main-nav__item {
    padding: 0 calc(var(--size-base-unit) * 6);
  }
}
@media (min-width: designSystemVars.$breakpoint-md) {
  .main-nav__item--sub {
    display: flex;
    &.main-nav__item--active {
      background-color: var(--color-bg-main--active);
    }
  }
}

.main-nav__item-arrow {
  width: 6px;
  height: 6px;
  margin-left: var(--size-base-unit);
  fill: currentColor;
}
</style>
