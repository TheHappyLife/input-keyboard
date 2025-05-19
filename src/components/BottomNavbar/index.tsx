import { useCallback, useEffect, useRef, useState } from "react";
import SVGBackground from "./components/Background";
import clsx from "clsx";

export const BottomNavbar = () => {
  const prevClientY = useRef(0);
  const prevTime = useRef(new Date().getTime());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.querySelector("body");
    if (containerRef.current) {
      body?.appendChild(containerRef.current);
    }
  }, []);

  const handleSmartNavbarOnTouch = useCallback((e: any) => {
    const currentClientY = e.touches && e.touches[0]?.clientY;
    const currentTime = new Date().getTime();
    const speed = (currentClientY - prevClientY.current) / (currentTime - prevTime.current);
    prevClientY.current = currentClientY;
    prevTime.current = currentTime;
    if (speed > 0.05 && !!containerRef.current) {
      setIsOpen(false);

      return;
    }
    if (speed < -0.05 && !!containerRef.current) {
      setIsOpen(true);

      return;
    }
  }, []);
  useEffect(() => {
    const body = document.querySelector("body");

    body?.addEventListener("touchmove", handleSmartNavbarOnTouch);

    return () => {
      if (containerRef.current) {
        body?.removeEventListener("touchmove", handleSmartNavbarOnTouch);
        body?.removeChild(containerRef.current);
      }
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      ref={containerRef}
      className={clsx("bottom-navbar-container", {
        bottom_navbar_hidden: !isOpen,
        bottom_navbar_visible: isOpen,
      })}
    >
      <SVGBackground />
      <div className="bottom-navbar-content"></div>
    </div>
  );
};
