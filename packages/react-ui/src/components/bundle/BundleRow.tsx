import { styled } from 'styled-components';

import { useMedia } from 'react-use';
import { BundleEntity } from './BundleEntity';
import { BundleRowArrows } from './BundleRowArrows';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { breakpoint } from '@private/design-system/vars';

const BundleRowRoot = styled.div`
  overflow: hidden;
  padding: calc(var(--size-base-unit)) 0;
`;

const BundleWrapper = styled.div`
  position: relative;
  && {
    //https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
    padding-right: calc(var(--size-base-unit) * 12);
  }
`;

const BundleRowArrowsStyled = styled(BundleRowArrows)`
  position: absolute;
  right: calc(var(--size-base-unit) * 8);
  top: 50%;
  transform: translate(0, -50%);
  z-index: var(--zindex-boost);
`;
const BundleRowUl = styled.ul<{ page: number }>`
  position: relative;
  display: flex;
  overflow: visible;
  transition: transform 0.3s;
  transform: translate(${(props) => props.page * -100}%, 0);
`;

const BundleRowLi = styled.li<{ obscured: boolean }>`
  width: 50%;
  flex-basis: auto;
  flex-shrink: 0;
  flex-grow: 0;
  padding-right: calc(var(--size-base-unit) * 2);
  transition: opacity 0.3s 0.2s;
  ${(props) => (props.obscured ? 'opacity: 0.3;' : '')}

  @media (min-width: ${breakpoint.md}) {
    width: 33.333%;
  }
  @media (min-width: ${breakpoint.xlg}) {
    width: 25%;
  }
`;

type BundleSectionProps = {
  bundle: IPlayer.Bundle;
};
export function BundleRow({ bundle }: BundleSectionProps) {
  const isMqMedium = useMedia('(min-width: 37.5em)', false);
  const isMqLarge = useMedia('(min-width: 63em)', false);

  const maxEntitiesVisible = useMemo(() => {
    if (isMqLarge) return 4;
    if (isMqMedium) return 3;
    return 2;
  }, [isMqMedium, isMqLarge]);

  const [page, setPage] = useState(0);
  const pageCount = useMemo(
    () => Math.floor((bundle.entities.length - 1) / maxEntitiesVisible),
    [bundle, maxEntitiesVisible]
  );

  /* if maxEntitiesVisible changes (e.g. the screen resizes) reset scroll */
  const resetScroll = () => setPage(0);
  useEffect(resetScroll, [maxEntitiesVisible]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pageMinIndex = useMemo(() => page * maxEntitiesVisible, [page, maxEntitiesVisible]);
  const pageMaxIndex = useMemo(() => pageMinIndex + maxEntitiesVisible, [pageMinIndex, maxEntitiesVisible]);

  const scrollX = (dir: number) => {
    setPage(Math.max(0, Math.min(page + dir, pageCount)));
  };

  const scrollToPageByIndex = useCallback(
    (index: number) => {
      const targetPage = Math.floor(index / maxEntitiesVisible);
      setPage(targetPage);
    },
    [maxEntitiesVisible]
  );

  return (
    <BundleRowRoot>
      <BundleWrapper className="wrapper">
        {bundle.entities.length > maxEntitiesVisible && (
          <BundleRowArrowsStyled
            leftDisabled={page === 0}
            rightDisabled={page === pageCount}
            onClickLeft={() => scrollX(-1)}
            onClickRight={() => scrollX(1)}
          />
        )}

        <BundleRowUl page={page}>
          {bundle.entities.map((entity, index) => (
            <BundleRowLi key={entity.episode.id} obscured={mounted && (index >= pageMaxIndex || index < pageMinIndex)}>
              <BundleEntity entity={entity} type={bundle.type} onFocus={() => scrollToPageByIndex(index)} />
            </BundleRowLi>
          ))}
        </BundleRowUl>
      </BundleWrapper>
    </BundleRowRoot>
  );
}
