import { useRef, useState } from 'react';
import { styled } from 'styled-components';

import useResizeObserver from '@react-hook/resize-observer';
import { SvgUse } from './SvgUse';
import useScroll from '../../hooks/use-scroll';

const Scroller = styled.div`
  position: relative;
  display: flex;
`;
const ScrollerArea = styled.div`
  flex: 1;
  overflow: hidden;
  overflow-x: auto;
`;
const ScrollerButton = styled.button`
  width: 48px;
  position: relative;
  fill: currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    opacity: 0.4;
  }
  svg {
    width: 12px;
    height: 12px;
  }
`;

type ScrollXWithButtonsProps = {
  leftAriaLabel?: string;
  rightAriaLabel?: string;
  children: React.ReactNode;
};

export function ScrollXWithButtons({
  leftAriaLabel = 'scroll left',
  rightAriaLabel = 'scroll right',
  children,
}: ScrollXWithButtonsProps) {
  const scrollerArea = useRef<HTMLDivElement>(null);
  const scrollValues = useScroll(scrollerArea);

  const [canScroll, setCanScroll] = useState(true);

  useResizeObserver(scrollerArea, () => {
    if (scrollerArea.current) {
      setCanScroll(scrollerArea.current.scrollWidth > scrollerArea.current.clientWidth);
    }
  });

  const scrollX = (dir: number) => {
    if (scrollerArea.current) {
      const width = scrollerArea.current.offsetWidth * dir;
      scrollerArea.current.scrollLeft += width;
    }
  };

  return (
    <Scroller>
      {canScroll && (
        <ScrollerButton onClick={() => scrollX(-1)} disabled={scrollValues.x === 0} aria-label={leftAriaLabel}>
          <SvgUse href="#gel-icon-previous" />
        </ScrollerButton>
      )}

      <ScrollerArea ref={scrollerArea}>{children}</ScrollerArea>
      {canScroll && (
        <ScrollerButton
          v-if="canScroll"
          onClick={() => scrollX(1)}
          disabled={scrollValues.x === 200000}
          aria-label={rightAriaLabel}
        >
          <SvgUse href="#gel-icon-next" />
        </ScrollerButton>
      )}
    </Scroller>
  );
}
