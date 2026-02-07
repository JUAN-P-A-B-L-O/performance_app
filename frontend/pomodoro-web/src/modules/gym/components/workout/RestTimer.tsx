import { useEffect, useState } from "react";
import styles from "./RestTimer.module.scss";
import { Button } from "../common/Button";

type RestTimerProps = {
  initialSeconds?: number;
  autoStart?: boolean;
};

export function RestTimer({ initialSeconds = 90, autoStart = false }: RestTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className={styles.timer}>
      <div>
        <span className={styles.label}>Rest Timer</span>
        <strong>
          {minutes}:{seconds}
        </strong>
      </div>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => setIsRunning(true)}>
          Start
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setSecondsLeft(initialSeconds);
            setIsRunning(false);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
