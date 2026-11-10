import { styled } from 'styled-components';

import { SvgUse } from '../components-global/SvgUse';

const SubNavigationChannelsRoot = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const SubNavItemAnchor = styled.a`
  display: block;
  position: relative;
  margin: 16px 6px;
  overflow: hidden;
  height: 32px;
`;
const SubNavItemIconSvgUse = styled(SvgUse)`
  width: 76px;
  height: 32px;
  ${SubNavItemAnchor}:hover & {
    display: none;
  }
`;
const SubNavItemIconSvgUseFocused = styled(SubNavItemIconSvgUse)`
  display: none;
  ${SubNavItemAnchor}:hover & {
    display: block;
  }
`;

type SubNavigationChannelsProps = {
  subItems: Array<IPlayer.MainNav.SubNavItem>;
};
export function SubNavigationChannels({ subItems }: SubNavigationChannelsProps) {
  return (
    <SubNavigationChannelsRoot>
      {subItems.map((subItem) => (
        <li key={subItem.id}>
          <SubNavItemAnchor href={subItem.href} aria-label={subItem.ariaLabel || subItem.title}>
            <SubNavItemIconSvgUse href={`#iplayer-nav-icon-${subItem.icon}`} />
            <SubNavItemIconSvgUseFocused href={`#iplayer-nav-icon-${subItem.icon}-active`} />
          </SubNavItemAnchor>
        </li>
      ))}
    </SubNavigationChannelsRoot>
  );
}
