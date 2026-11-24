<template>
  <div class="search-section">
    <div class="wrapper">
      <form action="/iplayer/search" method="get">
        <span class="search-section__input-wrapper">
          <label for="search-input" class="sr-only">Search I Player</label>
          <input
            type="text"
            class="search-section__input typo font--size-0"
            placeholder="Search iPlayer"
            id="search-input"
            name="q"
            autocomplete="off"
            maxlength="100"
          />
          <button aria-label="Find" type="submit" class="search-section__button">
            <SvgUse href="#gel-icon-search" />
          </button>
        </span>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-section {
  background-color: var(--color-bg-main--active);
  padding: calc(var(--size-base-unit) * 4) 0;
}

.search-section__input-wrapper {
  position: relative;
}
.search-section__input {
  width: 100%;
  height: calc(var(--size-base-unit) * 8);
  padding: calc(var(--size-base-unit) * 2);
  padding-right: calc(var(--size-base-unit) * 10);
  color: #000;
}

.search-section__button {
  position: absolute;
  right: calc(var(--size-base-unit) * -2);
  top: calc(var(--size-base-unit) * -4);
  width: calc(var(--size-base-unit) * 12); /* min mobile hit area 48px */
  height: calc(var(--size-base-unit) * 12); /* min mobile hit area 48px */
  fill: #000;

  &:focus,
  &:hover {
    fill: var(--color-accent-1);
  }
  svg {
    display: inline-block;
    width: calc(var(--size-base-unit) * 4);
    height: calc(var(--size-base-unit) * 4);
  }
}
</style>
