<template>
  <div class="bundle-row-wrapper">
    <div class="wrapper">
      <BundleRowArrows
        v-if="bundle.entities.length > maxEntitiesVisible"
        class="bundle-row__arrows"
        :left-disabled="page === 0"
        :right-disabled="page === pageCount"
        @left="scrollX(-1)"
        @right="scrollX(1)"
      />

      <ul class="bundle-row" :style="bundleRowStyle">
        <li class="bundle-row__entity" v-for="(entity, index) in bundle.entities" :key="entity.episode.id">
          <BundleEntity
            class="bundle-entity"
            :class="{
              'bundle-entity--obscured': mounted && (index >= pageMaxIndex || index < pageMinIndex),
            }"
            :entity="entity"
            :type="bundle.type"
            @focus="scrollToPageByIndex(index)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useMediaQuery } from '@vueuse/core';
import { ref, computed, watch, onMounted } from 'vue';

import BundleEntity from './BundleEntity.vue';
import BundleRowArrows from './BundleRowArrows.vue';

const props = defineProps({
  bundle: {
    type: Object,
    required: true,
  },
});

const isMqMedium = useMediaQuery('(min-width: 37.5em)');
const isMqLarge = useMediaQuery('(min-width: 63em)');

const maxEntitiesVisible = computed(() => {
  if (isMqLarge.value) return 4;
  if (isMqMedium.value) return 3;
  return 2;
});
const page = ref(0);
const pageCount = computed(() => Math.floor((props.bundle.entities.length - 1) / maxEntitiesVisible.value));

const bundleRowStyle = computed(() => ({
  transform: `translate(${page.value * -100}%, 0)`,
}));

const scrollX = (dir) => {
  page.value = Math.max(0, Math.min(page.value + dir, pageCount.value));
};

/* if maxEntitiesVisible changes (e.g. the screen resizes) reset scroll */
const resetScroll = () => {
  page.value = 0;
};
watch(
  () => maxEntitiesVisible.value,
  () => {
    resetScroll();
  }
);

const mounted = ref(false);
onMounted(() => (mounted.value = true));

const pageMinIndex = computed(() => page.value * maxEntitiesVisible.value);
const pageMaxIndex = computed(() => pageMinIndex.value + maxEntitiesVisible.value);

const scrollToPageByIndex = (index) => {
  const targetPage = Math.floor(index / maxEntitiesVisible.value);
  page.value = targetPage;
};
</script>

<style lang="scss" scoped>
.bundle-row-wrapper {
  overflow: hidden;
  padding: calc(var(--size-base-unit)) 0;
}

.wrapper {
  position: relative;
  padding-right: calc(var(--size-base-unit) * 12);
}

.bundle-row {
  position: relative;
  display: flex;
  overflow: visible;
  transition: transform 0.3s;
}
.bundle-row__arrows {
  position: absolute;
  right: calc(var(--size-base-unit) * 8);
  top: 50%;
  transform: translate(0, -50%);
  z-index: var(--zindex-boost);
}
.bundle-row__entity {
  width: 50%;
  flex-basis: auto;
  flex-shrink: 0;
  flex-grow: 0;
  padding-right: calc(var(--size-base-unit) * 2);
}
.bundle-entity {
  transition: opacity 0.3s 0.2s;
}
.bundle-entity--obscured {
  opacity: 0.3;
}

@media (min-width: designSystemVars.$breakpoint-md) {
  .bundle-row__entity {
    width: 33.333%;
  }
}
@media (min-width: designSystemVars.$breakpoint-xlg) {
  .bundle-row__entity {
    width: 25%;
  }
}
</style>
