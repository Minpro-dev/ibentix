import { useState, useEffect } from "react";

export const useCountdown = (createdAt: string, onExpire?: () => void) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const createdDate = new Date(createdAt).getTime();
      const expiryDate = createdDate + 2 * 60 * 60 * 1000; // +2 jam

      const now = new Date().getTime();
      const diff = expiryDate - now; // differencial

      if (diff <= 0) {
        if (onExpire) onExpire();
        return "EXPIRED";
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return `${hours}h ${minutes}m ${seconds}s`;
    };

    const timer = setInterval(() => {
      const time = calculateTime();
      setTimeLeft(time);
      if (time === "EXPIRED") clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [createdAt]); // FIXME

  return timeLeft;
};
