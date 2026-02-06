import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ExerciseDetailPage.module.scss";
import { gymRepository } from "../../services/gymRepository";
import { Exercise, WorkoutSession } from "../../domain/types";
import { detectPRsForExercise, epley1RM } from "../../domain/calculations";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { MiniBarChart } from "../../components/charts/MiniBarChart";

export function ExerciseDetailPage() {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);

  useEffect(() => {
    if (!exerciseId) {
      return;
    }
    Promise.all([
      gymRepository.getExercise(exerciseId),
      gymRepository.listWorkouts(),
    ]).then(([exerciseData, workoutData]) => {
      setExercise(exerciseData ?? null);
      setWorkouts(workoutData);
    });
  }, [exerciseId]);

  const relatedWorkouts = useMemo(() => {
    if (!exerciseId) {
      return [];
    }
    return workouts.filter((workout) =>
      workout.exercises.some((item) => item.exerciseId === exerciseId)
    );
  }, [workouts, exerciseId]);

  const prSummary = useMemo(() => {
    if (!exerciseId) {
      return { weightPR: 0, repPR: 0, e1RMPR: 0 };
    }
    return detectPRsForExercise(workouts, exerciseId);
  }, [workouts, exerciseId]);

  const lastSets = useMemo(() => {
    return relatedWorkouts
      .flatMap((workout) =>
        workout.exercises
          .filter((item) => item.exerciseId === exerciseId)
          .flatMap((item) => item.sets)
      )
      .slice(-6)
      .reverse();
  }, [relatedWorkouts, exerciseId]);

  const e1rmTrend = useMemo(() => {
    return relatedWorkouts.map((workout) => {
      const sets = workout.exercises
        .filter((item) => item.exerciseId === exerciseId)
        .flatMap((item) => item.sets);
      const topE1rm = Math.max(
        ...sets.map((set) => epley1RM(set.weight, set.reps)),
        0
      );
      return {
        label: new Date(workout.startedAt).toLocaleDateString().slice(0, 5),
        value: Number(topE1rm.toFixed(1)),
      };
    });
  }, [relatedWorkouts, exerciseId]);

  if (!exercise) {
    return (
      <main className={styles.page}>
        <SectionHeader title="Exercise" subtitle="Loading details..." />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <SectionHeader
        title={exercise.name}
        subtitle={exercise.category}
        actions={
          <Link to="/gym/exercises">Back to library</Link>
        }
      />

      <section className={styles.grid}>
        <Card>
          <h3>Exercise info</h3>
          <p className={styles.muted}>Equipment: {exercise.equipment}</p>
          <p className={styles.muted}>
            Primary: {exercise.primaryMuscles.join(", ")}
          </p>
          <p className={styles.muted}>
            Secondary: {exercise.secondaryMuscles.join(", ")}
          </p>
          <ul>
            {exercise.cues.map((cue) => (
              <li key={cue}>{cue}</li>
            ))}
          </ul>
          {exercise.mediaUrl ? (
            <a href={exercise.mediaUrl} target="_blank" rel="noreferrer">
              Watch demo
            </a>
          ) : null}
        </Card>

        <Card>
          <h3>PR summary</h3>
          <div className={styles.prGrid}>
            <div>
              <p className={styles.muted}>Weight PR</p>
              <h4>{prSummary.weightPR} kg</h4>
            </div>
            <div>
              <p className={styles.muted}>Rep PR</p>
              <h4>{prSummary.repPR}</h4>
            </div>
            <div>
              <p className={styles.muted}>e1RM PR</p>
              <h4>{prSummary.e1RMPR} kg</h4>
            </div>
          </div>
          <MiniBarChart data={e1rmTrend} />
        </Card>
      </section>

      <section className={styles.grid}>
        <Card>
          <h3>Last sets</h3>
          <div className={styles.setList}>
            {lastSets.map((set) => (
              <div key={`${set.setNumber}-${set.weight}-${set.reps}`}>
                <Badge>{set.weight}kg</Badge> · {set.reps} reps (RPE {set.rpe ?? "-"})
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3>Recent sessions</h3>
          <div className={styles.sessionList}>
            {relatedWorkouts.slice(-3).map((workout) => (
              <div key={workout.id} className={styles.sessionRow}>
                <strong>{new Date(workout.startedAt).toLocaleDateString()}</strong>
                <span className={styles.muted}>
                  {workout.exercises.find((item) => item.exerciseId === exerciseId)
                    ?.sets.length ?? 0}
                  {" "}sets
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}
