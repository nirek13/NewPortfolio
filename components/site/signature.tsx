import type { SVGProps } from 'react';
import { SIGNATURE_PATH, SIGNATURE_VIEWBOX } from '@/lib/signature-path';

/** Static signature mark. Inherits `currentColor`, so it follows the theme. */
export function Signature({
  className = '',
  title = 'Nirek Shetty',
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox={SIGNATURE_VIEWBOX}
      className={className}
      role="img"
      aria-label={title}
      focusable="false"
      {...rest}
    >
      <path d={SIGNATURE_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
