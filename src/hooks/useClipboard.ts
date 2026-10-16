'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type ClipboardStatus = 'idle' | 'copied' | 'error';

type ClipboardResult = {
  copy: (value: string) => Promise<boolean>;
  status: ClipboardStatus;
  copied: boolean;
  failed: boolean;
};

function legacyCopy(value: string): boolean {
  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.top = '0';
  field.style.left = '0';
  field.style.opacity = '0';
  field.style.pointerEvents = 'none';
  document.body.appendChild(field);
  try {
    field.select();
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(field);
  }
}

export function useClipboard(resetMs = 2000): ClipboardResult {
  const [status, setStatus] = useState<ClipboardStatus>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const copy = useCallback(
    async (value: string): Promise<boolean> => {
      let ok = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
          ok = true;
        } else {
          ok = legacyCopy(value);
        }
      } catch {
        ok = legacyCopy(value);
      }

      setStatus(ok ? 'copied' : 'error');
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => setStatus('idle'), resetMs);
      return ok;
    },
    [resetMs],
  );

  return {
    copy,
    status,
    copied: status === 'copied',
    failed: status === 'error',
  };
}
