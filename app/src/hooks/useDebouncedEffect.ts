import { useEffect, useRef } from "react";

export const useDebouncedEffect = (
  effect: () => void | (() => void),
  deps: React.DependencyList,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const cleanup = effect();

      if (typeof cleanup === "function") {
        return cleanup;
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};
