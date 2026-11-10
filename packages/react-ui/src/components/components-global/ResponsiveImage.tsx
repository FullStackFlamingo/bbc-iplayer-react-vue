import { useResponsiveImage } from './use-responsive-image';
import { styled } from 'styled-components';

const ResponsiveImageRoot = styled.div<{ type: string }>`
  position: relative;
  padding-bottom: 56.25%;
  padding-bottom: ${(props) => (props.type === 'portrait' ? 'calc(696% / 464 * 100)' : 'calc(9% / 16 * 100)')};
  width: 100%;
`;
const ResponsiveImageInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const ResponsiveImageImg = styled.img`
  object-fit: fill;
  width: 100%;
`;

type ResponsiveImageProps = {
  className?: string;
  recipe: string;
  type?: string;
};
export function ResponsiveImage({ className, recipe, type = 'default' }: ResponsiveImageProps) {
  const { recipeToSrcSet, sizes, aspectRatioType } = useResponsiveImage({ recipe, type });

  return (
    <ResponsiveImageRoot type={aspectRatioType} className={className}>
      <ResponsiveImageInner>
        <picture>
          {Object.values(sizes).map((size) => (
            <source media={size.media} sizes={size.itemWidth} key={size.media} srcSet={recipeToSrcSet(size.srcset)} />
          ))}

          <ResponsiveImageImg alt="" fetch-priority="auto" />
        </picture>
      </ResponsiveImageInner>
    </ResponsiveImageRoot>
  );
}
