'use client';

import { useEffect, useRef, useState } from 'react';

type Options = {
  speed?: number;
  enabled?: boolean;
  onDone?: () => void;
};

type TypingState = {
  displayed: string;
  done: boolean;
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useTypingEffect(
  text: string,
  { speed = 50, enabled = true, onDone }: Options = {},
): TypingState {
  const [count, setCount] = useState(0);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!enabled) {
      setCount(0);
      return;
    }

    if (text.length === 0 || prefersReducedMotion()) {
      setCount(text.length);
      onDoneRef.current?.();
      return;
    }

    setCount(0);
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      index += 1;
      setCount(index);
      if (index >= text.length) {
        onDoneRef.current?.();
        return;
      }
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, speed);

    return () => clearTimeout(timer);
  }, [text, speed, enabled]);

  return {
    displayed: enabled ? text.slice(0, count) : '',
    done: enabled && count >= text.length,
  };
}
