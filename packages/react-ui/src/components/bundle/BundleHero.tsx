import { breakpoint } from '@private/design-system/vars';
import { styled } from 'styled-components';

import { ResponsiveImage } from '../components-global/ResponsiveImage';
import { BundleHeroHeader } from './BundleHeroHeader';
const cssValGradientBottom = `linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 35%)`;
const cssValGradientleft = `linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 35%)`;
const cssValGradientRight = `linear-gradient(-90deg, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 35%)`;
const cssValHeaderWidth = `33.3333%`;

const BundleHeroOverflow = styled.div`
  overflow: hidden;
`;

const BundleHeroRoot = styled.section`
  position: relative;
  margin: 0 auto;
  max-width: var(--size-main-wrapper);
  @media (min-width: ${breakpoint.sm}) {
    max-width: var(--size-main-wrapper-lg);
  }
`;
const BundleHeroAspect = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: calc(9vw / 16 * 100 + 80px);

  @media (min-width: ${breakpoint.lg}) {
    align-items: center;
    min-height: auto;
    height: 36vw;
    max-height: 440px;
  }
`;
const BundleHeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  @media (min-width: ${breakpoint.lg}) {
    left: calc(${cssValHeaderWidth} - 50px);
    width: 88%;
  }
  @media (min-width: ${breakpoint.xxlg}) {
    left: 50%;
    transform: translate(-50%, 0);
    width: 70%;
  }
`;

const BundleHeroImageOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  @media (min-width: ${breakpoint.lg}) {
    display: none;
  }
`;
const BundleHeroImageGradient = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: ${cssValGradientBottom};
  @media (min-width: ${breakpoint.lg}) {
    background: ${cssValGradientBottom}, ${cssValGradientleft};
  }
  @media (min-width: ${breakpoint.xxlg}) {
    background: ${cssValGradientBottom}, ${cssValGradientleft}, ${cssValGradientRight};
  }
`;

const BundleHeroHeaderStyled = styled(BundleHeroHeader)`
  @media (min-width: ${breakpoint.lg}) {
    && {
      max-width: ${cssValHeaderWidth};
      margin: 0;
    }
  }
`;

type BundleHeroProps = {
  bundle: IPlayer.Bundle;
};

export function BundleHero({ bundle }: BundleHeroProps) {
  const { episode } = bundle.entities[0];

  return (
    <BundleHeroOverflow>
      <BundleHeroRoot>
        <BundleHeroAspect>
          <BundleHeroImage>
            <ResponsiveImage type="hero" recipe={episode.image.promotional} />
            <BundleHeroImageOverlay />
            <BundleHeroImageGradient />
          </BundleHeroImage>
          <BundleHeroHeaderStyled bundle={bundle} />
        </BundleHeroAspect>
      </BundleHeroRoot>
    </BundleHeroOverflow>
  );
}
