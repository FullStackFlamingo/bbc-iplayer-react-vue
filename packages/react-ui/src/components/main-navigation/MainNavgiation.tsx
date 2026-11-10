import { breakpoint } from '@private/design-system/vars';
import { useState } from 'react';
import { styled } from 'styled-components';

import { useQuery } from 'urql';
import { SvgUse } from '../components-global/SvgUse';
import { MainNavigationHeader as MainNavigationHeaderComponent } from './MainNavigationHeader';
import { SubNavigation } from './SubNavigation';
import { SubNavigationChannels } from './SubNavigationChannels';
import { SubNavigationColumns } from './SubNavigationColumns';

const query = `
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
`;

const MainNavigationRoot = styled.nav`
  position: relative;
  z-index: var(--zindex-nav);
  border-bottom: 1px solid var(--color-bg-main-highlight);
`;

const MainNavigationWrapper = styled.div`
  @media (min-width: ${breakpoint.md}) {
    display: flex;
    padding: 0 calc(var(--size-base-unit) * 4);
    margin: 0 auto;
    width: 100%;
    max-width: var(--size-main-wrapper);
  }
  @media (min-width: ${breakpoint.xxlg}) {
    max-width: var(--size-main-wrapper-lg);
  }
`;

const MainNavigationItemContainer = styled.ul`
  position: absolute;
  background-color: var(--color-bg-main--active);
  transform: translateY(-10000px);
  width: 100%;
  margin-bottom: calc(var(--size-base-unit) * 2);
  &.active {
    position: static;
    transform: translateY(0);
  }
  @media (min-width: ${breakpoint.md}) {
    background-color: transparent;
    display: flex;
    position: static;
    transform: none;
    width: auto;
    margin-bottom: 0;
  }
`;

const MainNavigationHeader = styled(MainNavigationHeaderComponent)`
  @media (min-width: ${breakpoint.md}) {
    flex: 1;
  }
`;
const MainNavItem = styled.a`
  display: flex;
  align-items: center;
  height: calc(var(--size-base-unit) * 16);
  padding: 0 calc(var(--size-base-unit) * 2.5);
  &:focus,
  &:hover {
    color: var(--color-accent-1);
  }
  @media (min-width: ${breakpoint.xlg}) {
    padding: 0 calc(var(--size-base-unit) * 6);
  }
`;
const MainNavItemWithSubNav = styled(MainNavItem)<{ active: boolean }>`
  display: none;

  @media (min-width: ${breakpoint.md}) {
    display: flex;
   
    ${(props) => props.active && 'background-color: var(--color-bg-main--active); color: var(--color-accent-1);'}

    }
  }
`;

const SvgUseArrow = styled(SvgUse)`
  width: 6px;
  height: 6px;
  margin-left: var(--size-base-unit);
  fill: currentColor;
`;

export function MainNavigation() {
  const [result] = useQuery({ query });
  const { data /* , fetching, error */ } = result;

  const items: [IPlayer.MainNav.TopNavItem] = data.getNavigationItems?.items;

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeSubNav, setActiveSubNav] = useState<string | null>(null);

  return (
    <MainNavigationRoot aria-labelledby="main-nav-title">
      <h2 id="main-nav-title" className="hidden">
        BBC I Player Navigation
      </h2>

      <MainNavigationWrapper>
        <MainNavigationHeader menuOpen={menuOpen} onMenuOpenToggle={setMenuOpen} />
        <MainNavigationItemContainer className={menuOpen ? 'active' : ''}>
          {items.map((item) => {
            if (item.subItems) {
              return (
                <li key={item.id}>
                  <MainNavItemWithSubNav
                    as="button"
                    active={activeSubNav === item.id}
                    className="font--size--1"
                    aria-label={item.ariaLabel}
                    onClick={() => (activeSubNav === item.id ? setActiveSubNav(null) : setActiveSubNav(item.id))}
                  >
                    {item.title} <SvgUseArrow href="#tvip-down-triangle" />
                  </MainNavItemWithSubNav>
                  <SubNavigation
                    active={activeSubNav === item.id}
                    aria-labelledby={`subnav-${item.id}`}
                    title={
                      <h2 id={`subnav-${item.id}`} className="hidden">
                        Navigation for {item.title}
                      </h2>
                    }
                  >
                    {item.subItems[0].icon && <SubNavigationChannels subItems={item.subItems} />}
                    {!item.subItems[0].icon && <SubNavigationColumns subItems={item.subItems} />}
                  </SubNavigation>
                </li>
              );
            }
            return (
              <li key={item.id}>
                {' '}
                <MainNavItem className="font--size--1" href={item.href} aria-label={item.ariaLabel}>
                  {item.title}
                </MainNavItem>
              </li>
            );
          })}
        </MainNavigationItemContainer>
      </MainNavigationWrapper>
    </MainNavigationRoot>
  );
}
