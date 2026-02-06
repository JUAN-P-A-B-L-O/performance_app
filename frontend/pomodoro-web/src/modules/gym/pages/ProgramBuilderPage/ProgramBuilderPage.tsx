import { useEffect, useState } from "react";
import styles from "./ProgramBuilderPage.module.scss";
import { gymRepository } from "../../services/gymRepository";
import { ProgramTemplate } from "../../domain/types";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";

export function ProgramBuilderPage() {
  const [programs, setPrograms] = useState<ProgramTemplate[]>([]);

  const refresh = () => {
    gymRepository.listPrograms().then(setPrograms);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDuplicate = async (id: string) => {
    await gymRepository.duplicateProgram(id);
    refresh();
  };

  return (
    <main className={styles.page}>
      <SectionHeader title="Programs" subtitle="Browse templates and duplicate." />

      <section className={styles.grid}>
        {programs.map((program) => (
          <Card key={program.id}>
            <div className={styles.cardHeader}>
              <div>
                <h3>{program.name}</h3>
                <p className={styles.muted}>Weeks: {program.weeks.length}</p>
              </div>
              <Button variant="secondary" onClick={() => handleDuplicate(program.id)}>
                Duplicate
              </Button>
            </div>
            {program.weeks.map((week) => (
              <div key={week.weekNumber} className={styles.weekBlock}>
                <strong>Week {week.weekNumber}</strong>
                {week.days.map((day) => (
                  <div key={day.id} className={styles.dayRow}>
                    <span>{day.name}</span>
                    <span className={styles.muted}>
                      {day.exercises.length} exercises
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </Card>
        ))}
      </section>
    </main>
  );
}
