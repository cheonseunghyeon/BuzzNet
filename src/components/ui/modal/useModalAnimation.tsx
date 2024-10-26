"use client";

import { useState, useEffect } from "react";

export const useModalAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleClose = (callback: () => void) => {
    setIsVisible(false);
    setTimeout(() => {
      callback();
    }, 200);
  };

  return { isVisible, handleClose };
};
