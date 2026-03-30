import { useEffect, useState } from "react";
import SwipeCarousel from "./SwipeCarousel";
import DesktopCarousel from "./DesktopCarousel";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const listener = () => setIsDesktop(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return isDesktop;
}

export default function ResponsiveCarousel({ slides }) {
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <DesktopCarousel slides={slides} />
  ) : (
    <SwipeCarousel slides={slides} />
  );
}
