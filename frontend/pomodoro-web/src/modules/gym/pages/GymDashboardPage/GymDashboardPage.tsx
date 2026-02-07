import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./GymDashboardPage.module.scss";
import { gymRepository } from "../../services/gymRepository";
import {
  BodyWeightEntry,
  NutritionDaySummary,
  ProgramDay,
  ProgramTemplate,
  UserProfile,
  WorkoutSession,
} from "../../domain/types";
import { calc7DayMovingAverage, calcWorkoutVolume } from "../../domain/calculations";
import { Card } from "../../components/common/Card";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { MiniBarChart } from "../../components/charts/MiniBarChart";

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function GymDashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [programs, setPrograms] = useState<ProgramTemplate[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [bodyWeight, setBodyWeight] = useState<BodyWeightEntry[]>([]);
  const [nutritionToday, setNutritionToday] =
    useState<NutritionDaySummary | null>(null);

  useEffect(() => {
    Promise.all([
      gymRepository.getUser(),
      gymRepository.listPrograms(),
      gymRepository.listWorkouts(),
      gymRepository.listBodyWeight(),
      gymRepository.getNutritionDay(getTodayDate()),
    ]).then(([userData, programData, workoutData, bodyData, nutritionData]) => {
      setUser(userData);
      setPrograms(programData);
      setWorkouts(workoutData);
      setBodyWeight(bodyData);
      setNutritionToday(nutritionData ?? null);
    });
  }, []);

  const nextProgramDays = useMemo<ProgramDay[]>(() => {
    if (!programs[0]) {
      return [];
    }
    return programs[0]?.weeks?.[0]?.days ?? [];
  }, [programs]);

  const weeklySummary = useMemo(() => {
    const lastSeven = [...workouts]
      .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
      .slice(0, 7);
    const totalVolume = lastSeven.reduce(
      (total, workout) => total + calcWorkoutVolume(workout),
      0
    );
    return {
      workouts: lastSeven.length,
      volume: Math.round(totalVolume),
    };
  }, [workouts]);

  const weightChart = useMemo(() => {
    const sorted = [...bodyWeight]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-14);
    const moving = calc7DayMovingAverage(sorted);
    return sorted.map((entry, index) => ({
      label: entry.date.slice(5),
      value: entry.weight,
      avg: moving[index]?.avg ?? entry.weight,
    }));
  }, [bodyWeight]);

  return (
    <main className={styles.page}>
      <SectionHeader
        title="Gym Dashboard"
        subtitle={`Welcome back${user ? `, ${user.nickname}` : ""}.`}
        actions={
          <Link to="/gym/workouts">
            <Button variant="secondary">View History</Button>
          </Link>
        }
      />

      <section className={styles.grid}>
        <Card>
          <SectionHeader title="Next workout" subtitle="Pick a day to start." />
          <div className={styles.listStack}>
            {nextProgramDays.map((day) => (
              <div key={day.id} className={styles.rowBetween}>
                <div>
                  <strong>{day.name}</strong>
                  <p className={styles.muted}>{day.exercises.length} exercises</p>
                </div>
                <Link to={`/gym/workout/start/${day.id}`}>
                  <Button>Start</Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Weekly summary" />
          <div className={styles.summaryGrid}>
            <div>
              <p className={styles.muted}>Workouts</p>
              <h3>{weeklySummary.workouts}</h3>
            </div>
            <div>
              <p className={styles.muted}>Total volume</p>
              <h3>{weeklySummary.volume}</h3>
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeader title="Weight trend" subtitle="Last 14 entries" />
          <MiniBarChart
            data={weightChart.map((entry) => ({
              label: entry.label,
              value: entry.value,
            }))}
          />
          <div className={styles.chartLegend}>
            <Badge variant="neutral">Avg 7d</Badge>
            <span className={styles.muted}>
              {weightChart[weightChart.length - 1]?.avg ?? "-"} kg
            </span>
          </div>
        </Card>

        <Card>
          <SectionHeader title="Nutrition today" />
          {nutritionToday ? (
            <div className={styles.nutritionGrid}>
              <div>
                <p className={styles.muted}>Calories</p>
                <h3>{nutritionToday.calories}</h3>
              </div>
              <div>
                <p className={styles.muted}>Protein</p>
                <h3>{nutritionToday.protein}g</h3>
              </div>
              <div>
                <p className={styles.muted}>Water</p>
                <h3>{nutritionToday.waterL}L</h3>
              </div>
              <p className={styles.mutedSmall}>
                Target: {user?.settings?.calorieTarget ?? "-"} kcal ·{" "}
                {user?.settings?.proteinTarget ?? "-"}g protein
              </p>
            </div>
          ) : (
            <p className={styles.muted}>No nutrition data for today yet.</p>
          )}
        </Card>
      </section>

      <section className={styles.grid}>
        {[
          { label: "Workouts", path: "/gym/workouts" },
          { label: "Exercises", path: "/gym/exercises" },
          { label: "Nutrition", path: "/gym/nutrition" },
          { label: "Body", path: "/gym/body" },
          { label: "Recovery", path: "/gym/recovery" },
          { label: "Programs", path: "/gym/programs" },
          { label: "Settings", path: "/gym/settings" },
        ].map((item) => (
          <Link key={item.label} to={item.path} className={styles.navCard}>
            <Card>
              <h3>{item.label}</h3>
              <p className={styles.muted}>Open {item.label} module</p>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
