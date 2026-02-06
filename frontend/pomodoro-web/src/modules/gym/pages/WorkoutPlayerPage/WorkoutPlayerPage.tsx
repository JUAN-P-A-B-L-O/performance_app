import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./WorkoutPlayerPage.module.scss";
import { gymRepository } from "../../services/gymRepository";
import {
  Exercise,
  ProgramDay,
  ProgramExercise,
  WorkoutExercise,
  WorkoutSession,
} from "../../domain/types";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { SetRowEditor } from "../../components/workout/SetRowEditor";
import { WorkoutExerciseCard } from "../../components/workout/WorkoutExerciseCard";
import { RestTimer } from "../../components/workout/RestTimer";

function buildExerciseSets(programExercise: ProgramExercise) {
  return Array.from({ length: programExercise.sets }, (_, index) => ({
    setNumber: index + 1,
    weight: 0,
    reps: 0,
    rpe: 0,
  }));
}

export function WorkoutPlayerPage() {
  const { programDayId } = useParams();
  const navigate = useNavigate();
  const [programDay, setProgramDay] = useState<ProgramDay | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [restSignal, setRestSignal] = useState(0);

  useEffect(() => {
    if (!programDayId) {
      return;
    }
    Promise.all([
      gymRepository.listPrograms(),
      gymRepository.listExercises(),
      gymRepository.listWorkouts(),
    ]).then(([programs, exerciseList, workoutList]) => {
      const day = programs
        .flatMap((program) => program.weeks.flatMap((week) => week.days))
        .find((item) => item.id === programDayId);
      setProgramDay(day ?? null);
      setExercises(exerciseList);
      setWorkouts(workoutList);
      if (day) {
        const now = new Date().toISOString();
        const built: WorkoutSession = {
          id: `workout-${Date.now()}`,
          startedAt: now,
          programDayId: day.id,
          exercises: day.exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            target: `${exercise.sets}x${exercise.reps}`,
            hitTarget: false,
            sets: buildExerciseSets(exercise),
          })),
        };
        setSession(built);
      }
    });
  }, [programDayId]);

  const exerciseLookup = useMemo(() => {
    return new Map(exercises.map((exercise) => [exercise.id, exercise]));
  }, [exercises]);

  const lastSession = useMemo(() => {
    if (!programDayId) {
      return undefined;
    }
    return [...workouts]
      .filter((workout) => workout.programDayId === programDayId)
      .sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0];
  }, [programDayId, workouts]);

  const handleSetChange = (
    exerciseId: string,
    updatedSetIndex: number,
    newSet: WorkoutExercise["sets"][number]
  ) => {
    if (!session) {
      return;
    }
    const updatedExercises = session.exercises.map((exercise) => {
      if (exercise.exerciseId !== exerciseId) {
        return exercise;
      }
      const updatedSets = [...exercise.sets];
      updatedSets[updatedSetIndex] = newSet;
      const hitTarget = updatedSets.every((set) => set.reps > 0);
      return { ...exercise, sets: updatedSets, hitTarget };
    });
    setSession({ ...session, exercises: updatedExercises });
  };

  const handleAddSet = (exerciseId: string) => {
    if (!session) {
      return;
    }
    const updatedExercises = session.exercises.map((exercise) => {
      if (exercise.exerciseId !== exerciseId) {
        return exercise;
      }
      const nextSetNumber = exercise.sets.length + 1;
      return {
        ...exercise,
        sets: [
          ...exercise.sets,
          { setNumber: nextSetNumber, weight: 0, reps: 0, rpe: 0 },
        ],
      };
    });
    setSession({ ...session, exercises: updatedExercises });
  };

  const handleAutoFill = () => {
    if (!session || !lastSession) {
      return;
    }
    const updated = session.exercises.map((exercise) => {
      const previous = lastSession.exercises.find(
        (item) => item.exerciseId === exercise.exerciseId
      );
      if (!previous) {
        return exercise;
      }
      return {
        ...exercise,
        sets: exercise.sets.map((set, index) => ({
          ...set,
          weight: previous.sets[index]?.weight ?? set.weight,
          reps: previous.sets[index]?.reps ?? set.reps,
          rpe: previous.sets[index]?.rpe ?? set.rpe,
        })),
      };
    });
    setSession({ ...session, exercises: updated });
  };

  const handleCopyLastSession = () => {
    if (!session || !lastSession) {
      return;
    }
    setSession({
      ...lastSession,
      id: session.id,
      startedAt: session.startedAt,
      endedAt: undefined,
      durationMin: undefined,
    });
  };

  const handleFinish = async () => {
    if (!session) {
      return;
    }
    const end = new Date();
    const start = new Date(session.startedAt);
    const durationMin = Math.max(
      1,
      Math.round((end.getTime() - start.getTime()) / 60000)
    );
    const completed = {
      ...session,
      endedAt: end.toISOString(),
      durationMin,
    };
    await gymRepository.saveWorkout(completed);
    navigate(`/gym/workouts/${completed.id}`);
  };

  if (!programDay || !session) {
    return (
      <main className={styles.page}>
        <SectionHeader title="Workout" subtitle="Loading session..." />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <SectionHeader
        title={`Workout: ${programDay.name}`}
        subtitle="Log your sets and track progress."
        actions={
          <Link to="/gym">
            <Button variant="ghost">Back to dashboard</Button>
          </Link>
        }
      />

      <Card>
        <div className={styles.actionsRow}>
          <Button variant="secondary" onClick={handleAutoFill}>
            Auto-fill last session
          </Button>
          <Button variant="secondary" onClick={handleCopyLastSession}>
            Copy last session
          </Button>
          <Button onClick={handleFinish}>Finish workout</Button>
        </div>
      </Card>

      <RestTimer startSignal={restSignal} />

      <section className={styles.exerciseGrid}>
        {session.exercises.map((exercise) => {
          const info = exerciseLookup.get(exercise.exerciseId);
          return (
            <WorkoutExerciseCard
              key={exercise.exerciseId}
              name={info?.name ?? "Exercise"}
              exercise={exercise}
            >
              <div className={styles.setList}>
                {exercise.sets.map((set, index) => (
                  <SetRowEditor
                    key={`${exercise.exerciseId}-${set.setNumber}`}
                    entry={set}
                    onChange={(updated) =>
                      handleSetChange(exercise.exerciseId, index, updated)
                    }
                    onSave={() => setRestSignal((prev) => prev + 1)}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                className={styles.addSet}
                onClick={() => handleAddSet(exercise.exerciseId)}
              >
                + Add set
              </Button>
            </WorkoutExerciseCard>
          );
        })}
      </section>
    </main>
  );
}
