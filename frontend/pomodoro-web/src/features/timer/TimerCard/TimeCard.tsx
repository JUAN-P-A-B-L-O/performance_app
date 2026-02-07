import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TimerCard.module.scss";
import { MODE_MINUTES, MODE_TO_TYPE, formatMMSS } from "../../../domain/pomodoro/timer/timerMachine";
import type { Mode } from "../../../domain/pomodoro/timer/timerMachine";
import { finishPomodoro, startPomodoro } from "../../../api/pomodoros.api";

type Props = {
  groupId: string | null;
};

export function TimerCard({ groupId }: Props) {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(MODE_MINUTES.pomodoro * 60);
  const sessionIdRef = useRef<string | null>(null);

  const theme = useMemo(() => (mode === "pomodoro" ? "pomodoro" : mode), [mode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.title = running ? `${formatMMSS(secondsLeft)} - Pomodoro` : "Pomodoro";
  }, [secondsLeft, running]);

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          if (sessionIdRef.current) {
            finishPomodoro(sessionIdRef.current).catch(() => {});
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running]);

  async function handleToggle() {
    if (!groupId) {
      alert("Select a group before starting.");
      return;
    }

    if (!running) {
      setRunning(true);
      try {
        const session = await startPomodoro({
          pomodoroGroupId: groupId,
          type: MODE_TO_TYPE[mode],
          minutes: MODE_MINUTES[mode],
        });
        sessionIdRef.current = session.id;
      } catch {
        setRunning(false);
        alert("Error starting session on backend.");
      }
      return;
    }

    setRunning(false);
  }

  function selectMode(nextMode: Mode) {
    if (running) return;
    setMode(nextMode);
    setSecondsLeft(MODE_MINUTES[nextMode] * 60);
  }

  return (
    <div className={styles.card}>
      <div className={styles.tabs}>
        <button type="button" className={`${styles.tab} ${mode === "pomodoro" ? styles.active : ""}`} onClick={() => selectMode("pomodoro")}>
          Pomodoro
        </button>
        <button type="button" className={`${styles.tab} ${mode === "short" ? styles.active : ""}`} onClick={() => selectMode("short")}>
          Short Break
        </button>
        <button type="button" className={`${styles.tab} ${mode === "long" ? styles.active : ""}`} onClick={() => selectMode("long")}>
          Long Break
        </button>
      </div>

      <div className={styles.time}>{formatMMSS(secondsLeft)}</div>

      <button type="button" className={styles.startButton} onClick={handleToggle}>
        {running ? "PAUSE" : "START"}
      </button>

      <div className={styles.hint}>
        {groupId ? "Session linked to selected group" : "No group selected"}
      </div>
    </div>
  );
}
