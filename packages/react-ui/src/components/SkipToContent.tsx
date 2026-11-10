import { styled } from 'styled-components';

const SkipToContentRoot = styled.a`
  background: #fff;
  color: #000;
  top: 40px;
  left: 40px;
  padding: 20px;
  position: fixed;
  transform: translateY(-1000px);
  z-index: var(--zindex-skip-content);
  &:focus {
    transform: translateY(0);
  }
`;

export function SkipToContent() {
  return <SkipToContentRoot href="#main-content">Skip to content</SkipToContentRoot>;
}
