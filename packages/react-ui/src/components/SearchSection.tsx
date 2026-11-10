import { styled } from 'styled-components';
import { SvgUse } from './components-global/SvgUse';

const SearchSectionRoot = styled.div`
  background-color: var(--color-bg-main--active);
  padding: calc(var(--size-base-unit) * 4) 0;
`;
const SearchSectionWrapper = styled.span`
  position: relative;
`;
const SearchSectionInput = styled.input`
  width: 100%;
  height: calc(var(--size-base-unit) * 8);
  padding: calc(var(--size-base-unit) * 2);
  padding-right: calc(var(--size-base-unit) * 10);
  color: #000;
`;

const SearchSectionButton = styled.button`
  position: absolute;
  right: calc(var(--size-base-unit) * -2);
  top: calc(var(--size-base-unit) * -4);
  width: calc(var(--size-base-unit) * 12); /* min mobile hit area 48px */
  height: calc(var(--size-base-unit) * 12); /* min mobile hit area 48px */
  fill: #000;

  &:focus,
  &:hover {
    outline: none;
    fill: var(--color-accent-1);
  }
  svg {
    display: inline-block;
    width: calc(var(--size-base-unit) * 4);
    height: calc(var(--size-base-unit) * 4);
  }
`;
export function SearchSection(props: { className: string }) {
  return (
    <SearchSectionRoot {...props}>
      <div className="wrapper">
        <form action="/iplayer/search" method="get">
          <SearchSectionWrapper>
            <label htmlFor="search-input" className="sr-only">
              Search I Player
            </label>
            <SearchSectionInput
              type="text"
              className="typo font--size-0"
              placeholder="Search iPlayer"
              id="search-input"
              name="q"
              autoComplete="off"
              maxLength={100}
            />
            <SearchSectionButton aria-label="Find" type="submit">
              <SvgUse href="#gel-icon-search" />
            </SearchSectionButton>
          </SearchSectionWrapper>
        </form>
      </div>
    </SearchSectionRoot>
  );
}
