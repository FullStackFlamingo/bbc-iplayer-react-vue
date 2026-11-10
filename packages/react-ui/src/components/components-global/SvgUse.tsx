type SvgUseProps = {
  href: string;
  className?: string;
};
export function SvgUse({ href, className }: SvgUseProps) {
  return (
    <svg className={className} role="presentation" focusable="false">
      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={href} href={href}></use>
    </svg>
  );
}
