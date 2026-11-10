import { RefObject, useEffect, useState } from 'react';

export type State = {
  x: number;
  y: number;
};

const useScroll = (ref: RefObject<HTMLElement | null>): State => {
  const [state, setState] = useState<State>({ x: 0, y: 0 });

  useEffect(() => {
    if (ref.current == null) return;
    const controller = new AbortController();

    ref.current.addEventListener(
      'scroll',
      () => {
        if (ref.current) setState({ x: ref.current.scrollLeft, y: ref.current.scrollTop });
      },
      { capture: false, passive: true, signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  }, [ref]);

  return state;
};

export default useScroll;
