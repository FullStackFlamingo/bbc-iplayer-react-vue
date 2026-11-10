import { breakpoint } from '@private/design-system/vars';
import { styled } from 'styled-components';

import { ScrollXWithButtons } from '../components-global/ScrollXWithButtons';

const SubNavigationRoot = styled.nav<{ active: boolean }>`
  background-color: var(--color-bg-main--active);
  width: 100%;

  @media (min-width: ${breakpoint.md}) {
    display: ${(props) => (props.active ? 'block' : 'none')};
    position: absolute;
    left: 0;
    top: 100%;
    padding: 0 calc(var(--size-base-unit) * 6);
  }
`;

type SubNavigationProps = {
  active: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
};
export function SubNavigation({ active, title, children }: SubNavigationProps) {
  return (
    <SubNavigationRoot active={active}>
      <div className="wrapper">
        {import.meta.env.SSR ? null : (
          <ScrollXWithButtons>
            {title}
            {children}
          </ScrollXWithButtons>
        )}
      </div>
    </SubNavigationRoot>
  );
}
