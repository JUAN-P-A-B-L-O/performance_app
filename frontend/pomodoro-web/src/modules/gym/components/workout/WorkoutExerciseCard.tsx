import styles from "./WorkoutExerciseCard.module.scss";
import { WorkoutExercise } from "../../domain/types";
import { Badge } from "../common/Badge";

type WorkoutExerciseCardProps = {
  name: string;
  exercise: WorkoutExercise;
  children?: React.ReactNode;
};

export function WorkoutExerciseCard({
  name,
  exercise,
  children,
}: WorkoutExerciseCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h4>{name}</h4>
          <p className={styles.muted}>Target: {exercise.target}</p>
        </div>
        <Badge variant={exercise.hitTarget ? "good" : "bad"}>
          {exercise.hitTarget ? "Target hit" : "Missed"}
        </Badge>
      </div>
      {children}
    </div>
  );
}
