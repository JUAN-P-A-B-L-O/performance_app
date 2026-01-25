import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TimerCard.module.scss";

import {
  MODE_MINUTES,
  MODE_TO_TYPE,
  formatMMSS,
} from "../../../domain/pomodoro/timer/timerMachine";


import type { Mode } from "../../../domain/pomodoro/timer/timerMachine";

import {
  finishPomodoro,
  startPomodoro,
} from "../../../api/pomodoros.api";

type Props = {
  /** ID do PomodoroGroup selecionado */
  groupId: string | null;
};

export function TimerCard({ groupId }: Props) {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(
    MODE_MINUTES.pomodoro * 60
  );

  /** Guarda a sessão atual retornada pelo backend */
  const sessionIdRef = useRef<string | null>(null);

  /**
   * Tema global (controlado por CSS variables)
   * pomodoro | short | long
   */
  const theme = useMemo(
    () => (mode === "pomodoro" ? "pomodoro" : mode),
    [mode]
  );

  /* Aplica o tema no <html> */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* Reseta o tempo ao trocar de modo (se não estiver rodando) */
  useEffect(() => {
    if (!running) {
      setSecondsLeft(MODE_MINUTES[mode] * 60);
    }
  }, [mode, running]);

  /* Atualiza o título da aba */
  useEffect(() => {
    document.title = running
      ? `${formatMMSS(secondsLeft)} - Pomodoro`
      : "Pomodoro";
  }, [secondsLeft, running]);

  /* Loop do timer */
  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running]);

  /* Finaliza automaticamente ao chegar em 0 */
  useEffect(() => {
    if (!running || secondsLeft !== 0) return;

    setRunning(false);

    if (sessionIdRef.current) {
      finishPomodoro(sessionIdRef.current).catch(() => {
        // aqui depois você pode colocar toast/log
      });
    }
  }, [running, secondsLeft]);

  async function handleToggle() {
    if (!groupId) {
      alert("Selecione um grupo antes de iniciar.");
      return;
    }

    // START
    if (!running) {
      setRunning(true);

      try {

        

        const session = await startPomodoro({
          pomodoroGroupId: groupId,
          type: MODE_TO_TYPE[mode],
          minutes: MODE_MINUTES[mode],
        });


        console.log("Iniciando sessão no backend...", session);

        sessionIdRef.current = session.id;
      } catch (err) {
        setRunning(false);
        alert("Erro ao iniciar sessão no backend.");
      }

      return;
    }

    // PAUSE (local)
    setRunning(false);
  }

  return (
    <div className={styles.card}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${
            mode === "pomodoro" ? styles.active : ""
          }`}
          onClick={() => !running && setMode("pomodoro")}
        >
          Pomodoro
        </button>

        <button
          type="button"
          className={`${styles.tab} ${
            mode === "short" ? styles.active : ""
          }`}
          onClick={() => !running && setMode("short")}
        >
          Short Break
        </button>

        <button
          type="button"
          className={`${styles.tab} ${
            mode === "long" ? styles.active : ""
          }`}
          onClick={() => !running && setMode("long")}
        >
          Long Break
        </button>
      </div>

      <div className={styles.time}>
        {formatMMSS(secondsLeft)}
      </div>

      <button
        type="button"
        className={styles.startButton}
        onClick={handleToggle}
      >
        {running ? "PAUSE" : "START"}
      </button>

      <div className={styles.hint}>
        {groupId
          ? "Sessão vinculada ao grupo selecionado"
          : "Nenhum grupo selecionado"}
      </div>
    </div>
  );
}
