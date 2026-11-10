import slugify from 'slugify';
import { styled } from 'styled-components';

import { ResponsiveImage } from '../components-global/ResponsiveImage';

const BundleEntityRoot = styled.a`
  &:focus,
  &:hover {
    outline: none;
    .bundle-entity__image {
      outline: 2px solid #fff;
    }
  }
`;
const BundleEntityResponsiveImage = styled(ResponsiveImage)`
  ${BundleEntityRoot}:focus &,
  ${BundleEntityRoot}:hover & {
    outline: 2px solid #fff;
  }
`;
const BundleEntityTitle = styled.h3`
  margin-top: calc(var(--size-base-unit) * 2);
`;
type BundleEntityProps = {
  type: string;
  entity: IPlayer.BundleEntity;
  onFocus: React.FocusEventHandler<HTMLAnchorElement>;
};
export function BundleEntity({ entity, type, onFocus }: BundleEntityProps) {
  const slug = slugify(entity.episode.title.default);
  const id = entity.episode.previewId || entity.episode.id;
  const href = `/iplayer/episode/${id}/${slug}`;

  const synopsis = entity.episode.synopsis.small || entity.episode.synopsis.editorial;
  const ariaLabel = `${entity.episode.title.default} Description: ${synopsis}`;

  const { image } = entity.episode;

  let imageRecipe;

  switch (type) {
    case 'portrait':
      imageRecipe = image.portrait || image.default;
      break;
    default:
      imageRecipe = image.promotional || image.default;
  }

  return (
    <BundleEntityRoot href={href} aria-label={ariaLabel} onFocus={onFocus}>
      <BundleEntityResponsiveImage type={type} recipe={imageRecipe} />
      <BundleEntityTitle className="font--bold font--size-1">{entity.episode.title.default}</BundleEntityTitle>
    </BundleEntityRoot>
  );
}
