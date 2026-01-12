import { useEffect, useRef } from "react";

export function usePolling(
  fn: () => Promise<void> | void,
  ms = 5000,
  enabled = true
) {
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    let handle: number | null = null;

    const run = async () => {
      try {
        await fn();
      } catch (e) {
        console.error("polling error", e);
      }
      if (mounted.current) {
        handle = window.setTimeout(run, ms);
      }
    };

    if (enabled) run();

    return () => {
      mounted.current = false;
      if (handle) clearTimeout(handle);
    };
  }, [fn, ms, enabled]);
}
