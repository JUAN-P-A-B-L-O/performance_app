import { useEffect, useMemo, useState } from "react";
import styles from "./BodyMetricsPage.module.scss";
import { gymRepository } from "../../services/gymRepository";
import { BodyWeightEntry } from "../../domain/types";
import { calc7DayMovingAverage } from "../../domain/calculations";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { MiniBarChart } from "../../components/charts/MiniBarChart";

export function BodyMetricsPage() {
  const [entries, setEntries] = useState<BodyWeightEntry[]>([]);
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState(0);

  const refresh = () => {
    gymRepository.listBodyWeight().then((data) => {
      setEntries([...data].sort((a, b) => a.date.localeCompare(b.date)));
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  const movingAverage = useMemo(() => {
    return calc7DayMovingAverage(entries);
  }, [entries]);

  const handleAdd = async () => {
    if (!date || !weight) {
      return;
    }
    await gymRepository.addBodyWeight({
      id: `bw-${Date.now()}`,
      date,
      weight,
    });
    setDate("");
    setWeight(0);
    refresh();
  };

  return (
    <main className={styles.page}>
      <SectionHeader title="Body Metrics" subtitle="Track weight and trends." />

      <section className={styles.grid}>
        <Card>
          <h3>Add entry</h3>
          <div className={styles.formRow}>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              placeholder="Weight"
            />
            <Button onClick={handleAdd}>Add</Button>
          </div>
        </Card>

        <Card>
          <h3>Moving average</h3>
          <MiniBarChart
            data={movingAverage.map((item) => ({
              label: item.date.slice(5),
              value: item.avg,
            }))}
          />
        </Card>
      </section>

      <Card>
        <h3>Entries</h3>
        <div className={styles.list}>
          {entries.map((entry) => (
            <div key={entry.id} className={styles.row}>
              <span>{entry.date}</span>
              <strong>{entry.weight} kg</strong>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
