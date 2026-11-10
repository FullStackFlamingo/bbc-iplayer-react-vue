import { styled } from 'styled-components';

const BundleSectionRoot = styled.section`
  margin-top: calc(var(--size-base-unit) * 6);
  margin-bottom: calc(var(--size-base-unit) * 4);
`;

const BundleSectionHeader = styled.section`
  display: flex;
  position: relative;
`;
const BundleSectionHeading = styled.h2`
  margin-bottom: calc(var(--size-base-unit) * 4);
  flex: 1;
`;
const BundleSectionViewAll = styled.a`
  &:hover,
  &:focus {
    color: var(--color-accent-1);
  }
`;

type BundleSectionProps = {
  bundle: IPlayer.Bundle;
  children: React.ReactNode;
};
export function BundleSection({ bundle, children }: BundleSectionProps) {
  return (
    <BundleSectionRoot>
      <div className="wrapper">
        <BundleSectionHeader>
          <BundleSectionHeading className="font--bold font--size-3">{bundle.title.default}</BundleSectionHeading>
          <BundleSectionViewAll
            className=" font--bold font--size--1"
            href={`/iplayer/group/${bundle.id}`}
            aria-label={`View all programmes from the ${bundle.title.default} group`}
          >
            View all
          </BundleSectionViewAll>
        </BundleSectionHeader>
      </div>
      {children}
    </BundleSectionRoot>
  );
}
