import { styled } from 'styled-components';

import { SvgUse } from '../components-global/SvgUse';

const BundleRowArrowsRoot = styled.div`
  display: flex;
`;
const BundleRowArrowButton = styled.button`
  width: 42px;
  height: 42px;
  background: var(--color-bg-main-highlight);
  fill: var(--color-icon-button);
  cursor: pointer;
  line-height: 1;
  &:hover,
  &:focus {
    background: var(--color-bg-main-highlight--active);
    fill: var(--color-icon-button--active);
  }
  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;
const BundleRowArrowButtonIcon = styled(SvgUse)`
  width: 16px;
  height: 16px;
  display: inline-block;
`;

type BundleRowArrowsProps = {
  className?: string;
  onClickLeft: React.MouseEventHandler<HTMLButtonElement>;
  onClickRight: React.MouseEventHandler<HTMLButtonElement>;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
};

export function BundleRowArrows({
  className,
  onClickLeft,
  onClickRight,
  leftDisabled = false,
  rightDisabled = true,
}: BundleRowArrowsProps) {
  return (
    <BundleRowArrowsRoot className={className}>
      <BundleRowArrowButton disabled={leftDisabled} onClick={onClickLeft}>
        <span className="sr-only">Scroll carousel left</span>
        <BundleRowArrowButtonIcon href="#gel-icon-previous" />
      </BundleRowArrowButton>
      <BundleRowArrowButton disabled={rightDisabled} onClick={onClickRight}>
        <span className="sr-only">Scroll carousel right</span>
        <BundleRowArrowButtonIcon href="#gel-icon-next" />
      </BundleRowArrowButton>
    </BundleRowArrowsRoot>
  );
}
