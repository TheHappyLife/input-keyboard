import { useEffect, useState } from "react";

export const useKeyboard = () => {
  const [isShowBrowserInput, setIsShowBrowserInput] = useState<boolean | null>(null);

  useEffect(() => {
    setIsShowBrowserInput(!navigator.userAgent?.toLowerCase().includes("mobile"));
  }, []);

  return {
    isShowBrowserInput,
  };
};
