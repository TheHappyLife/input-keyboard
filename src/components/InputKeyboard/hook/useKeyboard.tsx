import { useMemo } from "react";

export const useKeyboard = () => {
  const isShowBrowserInput = useMemo(() => {
    const touchPoints = navigator.maxTouchPoints;

    if (!touchPoints) return true;

    return !navigator.userAgent?.toLowerCase().includes("mobile");
  }, []);

  return {
    isShowBrowserInput,
  };
};
