// hooks/useInView.ts
import { useEffect, useRef, useState } from "react";

export const useInView = (
  options: IntersectionObserverInit = { threshold: 0.7 } // 👈 اینجا جادوشه!
) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, options]);

  return { ref, isInView };
};
