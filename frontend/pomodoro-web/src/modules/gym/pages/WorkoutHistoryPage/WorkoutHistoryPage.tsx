import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./WorkoutHistoryPage.module.scss";
import { gymRepository } from "../../services/gymRepository";
import { WorkoutSession } from "../../domain/types";
import { calcWorkoutVolume, getWorkoutPRBadges } from "../../domain/calculations";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

const rangeOptions = [
  { label: "7d", value: 7 },
  { label: "30d", value: 30 },
  { label: "90d", value: 90 },
];

export function WorkoutHistoryPage() {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [range, setRange] = useState(30);

  useEffect(() => {
    gymRepository.listWorkouts().then((data) => {
      const sorted = [...data].sort((a, b) => b.startedAt.localeCompare(a.startedAt));
      setWorkouts(sorted);
    });
  }, []);

  const filtered = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - range);
    return workouts.filter((workout) => new Date(workout.startedAt) >= cutoff);
  }, [workouts, range]);

  return (
    <main className={styles.page}>
      <SectionHeader
        title="Workout History"
        subtitle="Track your last sessions and PRs."
        actions={
          <Link to="/gym">
            <Button variant="ghost">Back</Button>
          </Link>
        }
      />

      <Card>
        <div className={styles.filters}>
          {rangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={range === option.value ? "primary" : "secondary"}
              onClick={() => setRange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className={styles.table}>
      {filtered.map((workout, index) => {
            const previous = filtered.slice(index + 1);
            const badges = getWorkoutPRBadges(workout, previous);
            return (
              <Link
                key={workout.id}
                to={`/gym/workouts/${workout.id}`}
                className={styles.row}
              >
                <div>
                  <strong>{new Date(workout.startedAt).toLocaleDateString()}</strong>
                  <p className={styles.muted}>
                    Duration {workout.durationMin ?? "-"} min · Volume{" "}
                    {Math.round(calcWorkoutVolume(workout))}
                  </p>
                </div>
                <div className={styles.badges}>
                  {badges.length === 0
                    ? ""
                    : badges.map((badge) => (
                        <Badge key={badge} variant="good">
                          {badge}
                        </Badge>
                      ))}
                </div>
              </Link>
            );
          })}
        </div>
      </Card>
    </main>
  );
}
