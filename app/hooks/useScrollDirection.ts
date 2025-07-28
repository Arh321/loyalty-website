// hooks/useScrollDirection.ts
import { useEffect, useState } from "react";

export const useScrolled = (offset = 20) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll(); // چک اولیه

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  return scrolled;
};
