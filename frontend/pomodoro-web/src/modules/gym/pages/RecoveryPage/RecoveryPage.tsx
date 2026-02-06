import { useEffect, useMemo, useState } from "react";
import styles from "./RecoveryPage.module.scss";
import { gymRepository } from "../../services/gymRepository";
import { RecoveryEntry } from "../../domain/types";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function RecoveryPage() {
  const [entry, setEntry] = useState<RecoveryEntry | null>(null);
  const [weekly, setWeekly] = useState<RecoveryEntry[]>([]);

  const load = () => {
    const today = getTodayDate();
    Promise.all([
      gymRepository.getRecoveryDay(today),
      gymRepository.listRecoveryRange(
        new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10),
        today
      ),
    ]).then(([todayEntry, weekRange]) => {
      setEntry(
        todayEntry ?? {
          id: `rec-${Date.now()}`,
          date: today,
        }
      );
      setWeekly(weekRange);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const weeklySummary = useMemo(() => {
    if (weekly.length === 0) {
      return null;
    }
    const totals = weekly.reduce(
      (acc, item) => {
        acc.sleep += item.sleepHours ?? 0;
        acc.steps += item.steps ?? 0;
        acc.soreness += item.soreness ?? 0;
        return acc;
      },
      { sleep: 0, steps: 0, soreness: 0 }
    );
    return {
      sleep: (totals.sleep / weekly.length).toFixed(1),
      steps: Math.round(totals.steps / weekly.length),
      soreness: (totals.soreness / weekly.length).toFixed(1),
    };
  }, [weekly]);

  const handleSave = async () => {
    if (!entry) {
      return;
    }
    await gymRepository.upsertRecoveryDay(entry);
    load();
  };

  if (!entry) {
    return (
      <main className={styles.page}>
        <SectionHeader title="Recovery" subtitle="Loading..." />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <SectionHeader title="Recovery" subtitle="Log sleep, steps, and soreness." />

      <section className={styles.grid}>
        <Card>
          <h3>Today</h3>
          <div className={styles.formGrid}>
            <label>
              Sleep hours
              <Input
                type="number"
                value={entry.sleepHours ?? 0}
                onChange={(event) =>
                  setEntry({ ...entry, sleepHours: Number(event.target.value) })
                }
              />
            </label>
            <label>
              Sleep quality (1-5)
              <Input
                type="number"
                value={entry.sleepQuality ?? 0}
                onChange={(event) =>
                  setEntry({
                    ...entry,
                    sleepQuality: Number(event.target.value) as RecoveryEntry["sleepQuality"],
                  })
                }
              />
            </label>
            <label>
              Steps
              <Input
                type="number"
                value={entry.steps ?? 0}
                onChange={(event) =>
                  setEntry({ ...entry, steps: Number(event.target.value) })
                }
              />
            </label>
            <label>
              Soreness (1-5)
              <Input
                type="number"
                value={entry.soreness ?? 0}
                onChange={(event) =>
                  setEntry({ ...entry, soreness: Number(event.target.value) })
                }
              />
            </label>
            <label>
              Injury note
              <Input
                value={entry.injuryNote ?? ""}
                onChange={(event) =>
                  setEntry({ ...entry, injuryNote: event.target.value })
                }
              />
            </label>
          </div>
          <Button onClick={handleSave}>Save recovery</Button>
        </Card>

        <Card>
          <h3>Weekly averages</h3>
          {weeklySummary ? (
            <div className={styles.summaryGrid}>
              <div>
                <p className={styles.muted}>Sleep</p>
                <strong>{weeklySummary.sleep}h</strong>
              </div>
              <div>
                <p className={styles.muted}>Steps</p>
                <strong>{weeklySummary.steps}</strong>
              </div>
              <div>
                <p className={styles.muted}>Soreness</p>
                <strong>{weeklySummary.soreness}</strong>
              </div>
            </div>
          ) : (
            <p className={styles.muted}>No weekly data yet.</p>
          )}
        </Card>
      </section>
    </main>
  );
}
