import { clearPendingRegistration } from "@/utils/pending-registration";
import { useEffect, useState } from "react";

function getRemainingSeconds(expiresAt) {
  if (!expiresAt) return 0;

  const expireTime = new Date(expiresAt).getTime();

  if (Number.isNaN(expireTime)) {
    return 0;
  }

  const remaining = expireTime - Date.now();

  return Math.max(Math.ceil(remaining / 1000), 0);
}

export function OtpCountdown({ expiresAt, onExpired }) {
  const [seconds, setSeconds] = useState(() => getRemainingSeconds(expiresAt));

  useEffect(() => {
    function updateCountdown() {
      const remaining = getRemainingSeconds(expiresAt);

      setSeconds(remaining);

      if (remaining === 0) {
        onExpired?.();
        clearPendingRegistration();
      }

      return remaining;
    }

    // Reset immediately when expiresAt changes
    const remaining = updateCountdown();

    if (remaining === 0) {
      return;
    }

    const timer = setInterval(() => {
      const current = updateCountdown();

      if (current === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  return (
    <p className="text-sm text-muted-foreground">
      Code expires in {minutes}:{String(remainingSeconds).padStart(2, "0")}
    </p>
  );
}
