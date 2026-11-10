<template>
  <div class="main-nav__header">
    <div class="main-nav__logo-wrapper">
      <a href="/" aria-label="BBC I Player Home"><Logo class="main-nav__logo" /> </a>
    </div>
    <button
      class="main-nav__mobile-button"
      :class="{ 'main-nav__mobile-button--active': menuOpenProxy }"
      aria-label="Toggle I Player Navigation"
      @click="menuOpenProxy = !menuOpen"
    >
      Menu
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Logo from '../../assets/logo.svg';

defineProps({
  menuOpen: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:menuOpen']);

const menuOpenProxy = computed({
  get() {
    return this.menuOpen;
  },
  set(val) {
    emit('update:menuOpen', val);
  },
});
</script>

<style lang="scss" scoped>
.main-nav__header {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 calc(var(--size-base-unit) * 4);
}

.main-nav__logo-wrapper {
  flex: 1;
}
.main-nav__logo {
  fill: var(--color-accent-1);
  width: 150px;
}

.main-nav__mobile-button {
  justify-self: flex-end;
  &--active,
  &:hover {
    color: var(--color-accent-1);
  }
}

@media (min-width: designSystemVars.$breakpoint-md) {
  .main-nav__header {
    padding: 0;
  }
  .main-nav__mobile-button {
    display: none;
  }
}
</style>
