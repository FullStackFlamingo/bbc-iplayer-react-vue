import { breakpoint } from '@private/design-system/vars';
import { styled } from 'styled-components';

const SubNavigationColumnsRoot = styled.ul`
  display: flex;
  @media (min-width: ${breakpoint.md}) {
    white-space: normal;
    display: block;
    columns: 3;
    padding: calc(var(--size-base-unit) * 2) 0;
  }
  @media (min-width: ${breakpoint.xlg}) {
    columns: 5;
  }
`;
const SubNavItemAnchor = styled.a`
  display: block;
  position: relative;
  padding: 8px 16px;
  margin: 16px 6px;
  overflow: hidden;
  white-space: nowrap;
  &:focus,
  &:hover {
    color: var(--color-accent-1);
  }

  @media (min-width: ${breakpoint.md}) {
    white-space: normal;
    margin: 0;
    &:focus,
    &:hover {
      background: white;
      color: black;
    }
  }
`;

type SubNavigationColumnsProps = {
  subItems: Array<IPlayer.MainNav.SubNavItem>;
};
export function SubNavigationColumns({ subItems }: SubNavigationColumnsProps) {
  return (
    <SubNavigationColumnsRoot>
      {subItems.map((subItem) => (
        <li key={subItem.id}>
          <SubNavItemAnchor href={subItem.href} aria-label={subItem.ariaLabel}>
            <span>{subItem.title}</span>
          </SubNavItemAnchor>
        </li>
      ))}
    </SubNavigationColumnsRoot>
  );
}
