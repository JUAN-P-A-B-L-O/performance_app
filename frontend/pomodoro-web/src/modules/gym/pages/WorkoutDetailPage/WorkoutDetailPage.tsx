import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./WorkoutDetailPage.module.scss";
import { gymRepository } from "../../services/gymRepository";
import { Exercise, WorkoutSession } from "../../domain/types";
import { calcWorkoutVolume, getWorkoutPRBadges } from "../../domain/calculations";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export function WorkoutDetailPage() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<WorkoutSession | null>(null);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (!workoutId) {
      return;
    }
    Promise.all([
      gymRepository.getWorkout(workoutId),
      gymRepository.listWorkouts(),
      gymRepository.listExercises(),
    ]).then(([workoutData, workoutList, exerciseList]) => {
      setWorkout(workoutData ?? null);
      setWorkouts(workoutList);
      setExercises(exerciseList);
    });
  }, [workoutId]);

  const exerciseLookup = useMemo(() => {
    return new Map(exercises.map((exercise) => [exercise.id, exercise]));
  }, [exercises]);

  const prBadges = useMemo(() => {
    if (!workout) {
      return [];
    }
    const previous = workouts.filter((item) => item.startedAt < workout.startedAt);
    return getWorkoutPRBadges(workout, previous);
  }, [workout, workouts]);

  const handleRepeat = async () => {
    if (!workout) {
      return;
    }
    const now = new Date().toISOString();
    const newSession: WorkoutSession = {
      ...workout,
      id: `workout-${Date.now()}`,
      startedAt: now,
      endedAt: undefined,
      durationMin: undefined,
    };
    await gymRepository.saveWorkout(newSession);
    navigate(`/gym/workouts/${newSession.id}`);
  };

  if (!workout) {
    return (
      <main className={styles.page}>
        <SectionHeader title="Workout" subtitle="Loading workout..." />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <SectionHeader
        title="Workout Details"
        subtitle={new Date(workout.startedAt).toLocaleString()}
        actions={
          <Link to="/gym/workouts">
            <Button variant="ghost">Back to history</Button>
          </Link>
        }
      />

      <Card>
        <div className={styles.metaGrid}>
          <div>
            <p className={styles.muted}>Duration</p>
            <h3>{workout.durationMin ?? "-"} min</h3>
          </div>
          <div>
            <p className={styles.muted}>Total volume</p>
            <h3>{Math.round(calcWorkoutVolume(workout))}</h3>
          </div>
          <div>
            <p className={styles.muted}>Program Day</p>
            <h3>{workout.programDayId ?? "Custom"}</h3>
          </div>
        </div>
        <p className={styles.muted}>{workout.notes ?? "No notes yet."}</p>
        <div className={styles.badges}>
          {prBadges.map((badge) => (
            <Badge key={badge} variant="good">
              {badge}
            </Badge>
          ))}
        </div>
        <Button variant="secondary" onClick={handleRepeat}>
          Repeat this workout
        </Button>
      </Card>

      <section className={styles.exerciseList}>
        {workout.exercises.map((exercise) => (
          <Card key={exercise.exerciseId}>
            <h4>{exerciseLookup.get(exercise.exerciseId)?.name ?? "Exercise"}</h4>
            <p className={styles.muted}>Target: {exercise.target}</p>
            <div className={styles.setTable}>
              {exercise.sets.map((set) => (
                <div key={set.setNumber} className={styles.setRow}>
                  <span>Set {set.setNumber}</span>
                  <span>{set.weight}kg</span>
                  <span>{set.reps} reps</span>
                  <span>RPE {set.rpe ?? "-"}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
