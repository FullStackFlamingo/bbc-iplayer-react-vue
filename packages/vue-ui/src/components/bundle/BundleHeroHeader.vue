<template>
  <div class="wrapper bundle-hero__header">
    <h2 class="font--bold font--size-4">{{ episode.title.default }}</h2>
    <a class="bundle-hero__cta" :href="href" :aria-label="ariaLabel">
      <span class="bundle-hero__cta__play">
        <SvgUse href="#gel-icon-play" />
      </span>
      <span class="bundle-hero__cta__text">
        <span class="bundle-hero__cta__heading font--bold font--size--1">Start Watching</span>
        <span class="font--bold">{{ subtitle }}</span>
        <span class="bundle-hero__cta__blip" />
      </span>
    </a>
    <p v-if="synopsis" class="bundle-hero__cta__synposis">{{ synopsis }}</p>
  </div>
</template>

<script setup>
import slugify from 'slugify';
import { computed } from 'vue';
const props = defineProps({
  bundle: {
    type: Object,
    required: true,
  },
});
const episode = computed(() => props.bundle.entities[0].episode);
const slug = slugify(episode.value.title.default);
const href = computed(() => `/iplayer/episode/${episode.value.previewId}/${slug}`);
const subtitle = computed(() => episode.value.subtitle.editorial);
const synopsis = computed(() => episode.value.synopsis.editorial);
const ariaLabel = computed(() => episode.value.title.default + 'Description: ' + synopsis.value);
</script>

<style scoped lang="scss">
.bundle-hero__header {
  position: relative;
}
.bundle-hero__cta {
  display: flex;
  padding-top: 14px;
  padding-bottom: 20px;
  &:hover,
  &:focus {
    .bundle-hero__cta__play {
      background-color: var(--color-accent-1);
      fill: #fff;
    }
  }
}
.bundle-hero__cta__synposis {
  color: var(--color-subtle-text);
}

.bundle-hero__cta__text {
  display: block;
  padding-left: calc(var(--size-base-unit) * 2);
  margin-bottom: calc(var(--size-base-unit) * 1);
}
.bundle-hero__cta__blip {
  display: block;
  width: calc(var(--size-base-unit) * 4);
  height: 1px;
  background-color: var(--color-accent-1);
  margin-top: calc(var(--size-base-unit) * 2);
}
.bundle-hero__cta__heading {
  color: var(--color-accent-1);
  display: block;
}
.bundle-hero__cta__play {
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  fill: var(--color-accent-1);
  flex: none;
  svg {
    width: 20px;
    height: 20px;
  }
}

@media (min-width: designSystemVars.$breakpoint-md) {
  .bundle-hero__cta__play {
    height: 72px;
    width: 72px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
