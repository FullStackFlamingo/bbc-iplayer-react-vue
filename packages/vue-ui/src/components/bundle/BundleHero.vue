<template>
  <div class="bundle-hero-overflow">
    <section class="bundle-hero">
      <div class="bundle-hero__aspect">
        <div class="bundle-hero__image">
          <ResponsiveImage type="hero" :recipe="episode.image.promotional" />
          <div class="bundle-hero__image__overlay" />
          <div class="bundle-hero__image__gradient" />
        </div>
        <BundleHeroHeader class="bundle-hero__header" :bundle="bundle" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import BundleHeroHeader from './BundleHeroHeader.vue';

const props = defineProps({
  bundle: {
    type: Object,
    required: true,
  },
});
const episode = computed(() => props.bundle.entities[0].episode);
</script>

<style scoped lang="scss">
$--gradientBottom: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 35%);
$--gradientleft: linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 35%);
$--gradientRight: linear-gradient(-90deg, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 35%);
.bundle-hero-overflow {
  overflow: hidden;
}
.bundle-hero {
  position: relative;
  margin: 0 auto;
  max-width: var(--size-main-wrapper);
}
.bundle-hero__aspect {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: calc(9vw / 16 * 100 + 80px);
}

.bundle-hero__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.bundle-hero__image__overlay {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.bundle-hero__image__gradient {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: $--gradientBottom;
}

@media (min-width: designSystemVars.$breakpoint-lg) {
  $--headerWidth: 33.3333%;
  .bundle-hero__aspect {
    align-items: center;
    min-height: auto;
    height: 36vw;
    max-height: 440px;
  }
  .wrapper.bundle-hero__header {
    max-width: $--headerWidth;
    margin: 0;
  }
  .bundle-hero__image {
    left: calc($--headerWidth - 50px);
    width: 88%;
  }
  .bundle-hero__image__overlay {
    display: none;
  }
  .bundle-hero__image__gradient {
    background: $--gradientBottom, $--gradientleft;
  }
}
@media (min-width: designSystemVars.$breakpoint-xxlg) {
  .bundle-hero {
    max-width: var(--size-main-wrapper-lg);
  }
  .bundle-hero__image {
    left: 50%;
    transform: translate(-50%, 0);
    width: 70%;
  }
  .bundle-hero__image__gradient {
    background: $--gradientBottom, $--gradientleft, $--gradientRight;
  }
}
</style>
