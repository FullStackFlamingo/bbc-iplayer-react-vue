import { breakpoint } from '@private/design-system/vars';
import { styled } from 'styled-components';

import { SvgUse } from '../components-global/SvgUse';
import slugify from 'slugify';

const BundleHeroHeaderRoot = styled.div`
  position: relative;
`;
const BundleHeroCta = styled.a`
  display: flex;
  padding-top: 14px;
  padding-bottom: 20px;
`;
const BundleHeroCtaPlay = styled.span`
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  fill: var(--color-accent-1);
  flex: none;
  svg {
    width: 20px;
    height: 20px;
  }
  @media (min-width: ${breakpoint.md}) {
    height: 72px;
    width: 72px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
  ${BundleHeroCta}:focus &,
  ${BundleHeroCta}:hover & {
    background-color: var(--color-accent-1);
    fill: #fff;
  }
`;
const BundleHeroCtaText = styled.span`
  display: block;
  padding-left: calc(var(--size-base-unit) * 2);
  margin-bottom: calc(var(--size-base-unit) * 1);
`;
const BundleHeroCtaHeading = styled.span`
  color: var(--color-accent-1);
  display: block;
`;
const BundleHeroCtaBlip = styled.span`
  display: block;
  width: calc(var(--size-base-unit) * 4);
  height: 1px;
  background-color: var(--color-accent-1);
  margin-top: calc(var(--size-base-unit) * 2);
`;
const BundleHeroSynopsis = styled.p`
  color: var(--color-subtle-text);
`;

type BundleHeroHeaderProps = {
  className?: string;
  bundle: IPlayer.Bundle;
};
export function BundleHeroHeader({ bundle, className }: BundleHeroHeaderProps) {
  const { episode } = bundle.entities[0];
  const slug = slugify(episode.title.default);
  const href = `/iplayer/episode/${episode.previewId}/${slug}`;

  const subtitle = episode.subtitle.editorial;
  const synopsis = episode.synopsis.editorial;
  const ariaLabel = `${episode.title.default} Description: ${synopsis}`;

  return (
    <BundleHeroHeaderRoot className={`wrapper ${className}`}>
      <h2 className="font--bold font--size-4">{episode.title.default}</h2>
      <BundleHeroCta href={href} aria-label={ariaLabel}>
        <BundleHeroCtaPlay>
          <SvgUse href="#gel-icon-play" />
        </BundleHeroCtaPlay>
        <BundleHeroCtaText>
          <BundleHeroCtaHeading className=" font--bold font--size--1">Start Watching</BundleHeroCtaHeading>
          <span className="font--bold">{subtitle}</span>
          <BundleHeroCtaBlip />
        </BundleHeroCtaText>
      </BundleHeroCta>
      {synopsis && <BundleHeroSynopsis>{synopsis}</BundleHeroSynopsis>}
    </BundleHeroHeaderRoot>
  );
}
