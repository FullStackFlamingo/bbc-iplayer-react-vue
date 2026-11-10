import { breakpoint } from '@private/design-system/vars';
import { styled } from 'styled-components';

import Logo from '../../assets/logo.svg?raw';

const MainNavigationHeaderRoot = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 calc(var(--size-base-unit) * 4);
  @media (min-width: ${breakpoint.md}) {
    padding: 0;
  }
`;
const LogoWrapper = styled.div`
  flex: 1;
  svg {
    fill: var(--color-accent-1);
    width: 150px;
  }
`;
const MobileButton = styled.button<{ menuOpen: boolean }>`
  justify-self: flex-end;
  color: ${(props) => (props.menuOpen ? 'var(--color-accent-1)' : 'inherit')};
  &:hover {
    color: var(--color-accent-1);
  }
  @media (min-width: ${breakpoint.md}) {
    display: none;
  }
`;

type MainNavigationHeaderProps = {
  menuOpen: boolean;
  onMenuOpenToggle: (menuOpen: boolean) => void;
  className?: string;
};
export function MainNavigationHeader({ menuOpen, onMenuOpenToggle, className }: MainNavigationHeaderProps) {
  return (
    <MainNavigationHeaderRoot className={className}>
      <LogoWrapper>
        <a href="/" aria-label="BBC I Player Home" dangerouslySetInnerHTML={{ __html: Logo }} />
      </LogoWrapper>
      <MobileButton
        menuOpen={menuOpen}
        aria-label="Toggle I Player Navigation"
        onClick={() => onMenuOpenToggle(!menuOpen)}
      >
        Menu
      </MobileButton>
    </MainNavigationHeaderRoot>
  );
}
