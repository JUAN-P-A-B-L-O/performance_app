import { useEffect, useState } from "react";
import styles from "./RestTimer.module.scss";
import { Button } from "../common/Button";

type RestTimerProps = {
  initialSeconds?: number;
  startSignal?: number;
};

export function RestTimer({ initialSeconds = 90, startSignal }: RestTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (startSignal === undefined) {
      return;
    }
    setSecondsLeft(initialSeconds);
    setIsRunning(true);
  }, [startSignal, initialSeconds]);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }
    if (secondsLeft <= 0) {
      setIsRunning(false);
      return undefined;
    }
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning, secondsLeft]);

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
