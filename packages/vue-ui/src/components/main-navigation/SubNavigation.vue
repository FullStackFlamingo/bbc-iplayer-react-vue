<template>
  <nav class="sub-nav" :class="{ 'sub-nav--active': active }">
    <div class="wrapper">
      <ScrollXWithButtons class="scroller">
        <slot name="title" />
        <slot />
      </ScrollXWithButtons>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped lang="scss">
.sub-nav {
  background-color: var(--color-bg-main--active);
  width: 100%;
}

@media (min-width: designSystemVars.$breakpoint-md) {
  .sub-nav {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    padding: 0 calc(var(--size-base-unit) * 6);
  }

  .sub-nav--active {
    display: block;
  }
}
</style>
