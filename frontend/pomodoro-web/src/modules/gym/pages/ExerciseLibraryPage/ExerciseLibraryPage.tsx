import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ExerciseLibraryPage.module.scss";
import { gymRepository } from "../../services/gymRepository";
import { Exercise } from "../../domain/types";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Badge } from "../../components/common/Badge";

export function ExerciseLibraryPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState("");
  const [equipment, setEquipment] = useState("");
  const [category, setCategory] = useState("");
  const [muscle, setMuscle] = useState("");

  useEffect(() => {
    gymRepository.listExercises().then(setExercises);
  }, []);

  const filterOptions = useMemo(() => {
    return {
      equipment: Array.from(new Set(exercises.map((item) => item.equipment))),
      category: Array.from(new Set(exercises.map((item) => item.category))),
      muscle: Array.from(
        new Set(exercises.flatMap((item) => item.primaryMuscles))
      ),
    };
  }, [exercises]);

  const filtered = exercises.filter((exercise) => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesEquipment = equipment ? exercise.equipment === equipment : true;
    const matchesCategory = category ? exercise.category === category : true;
    const matchesMuscle = muscle
      ? exercise.primaryMuscles.includes(muscle)
      : true;
    return matchesSearch && matchesEquipment && matchesCategory && matchesMuscle;
  });

  return (
    <main className={styles.page}>
      <SectionHeader
        title="Exercise Library"
        subtitle="Browse and filter the exercise database."
      />

      <Card>
        <div className={styles.filters}>
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            value={equipment}
            onChange={(event) => setEquipment(event.target.value)}
          >
            <option value="">All equipment</option>
            {filterOptions.equipment.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">All categories</option>
            {filterOptions.category.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select value={muscle} onChange={(event) => setMuscle(event.target.value)}>
            <option value="">All primary muscles</option>
            {filterOptions.muscle.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </Card>

      <section className={styles.list}>
        {filtered.map((exercise) => (
          <Link
            key={exercise.id}
            to={`/gym/exercises/${exercise.id}`}
            className={styles.exerciseCard}
          >
            <Card>
              <h3>{exercise.name}</h3>
              <p className={styles.muted}>
                {exercise.category} · {exercise.equipment}
              </p>
              <div className={styles.pills}>
                {exercise.primaryMuscles.map((muscleItem) => (
                  <Badge key={muscleItem}>{muscleItem}</Badge>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
