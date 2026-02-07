import styles from "./GymPage.module.scss";

type Units = {
  weight: "kg" | "lb";
  height: "cm" | "ft";
  energy: "calories" | "kJ";
};

type GoalType = "gain muscle" | "lose fat" | "strength" | "maintenance";
type ExperienceLevel = "beginner" | "intermediate" | "advanced";
type Equipment = "barbell" | "dumbbell" | "machine" | "cable" | "bodyweight";
type ExerciseCategory = "compound" | "isolation";

type UserProfile = {
  name: string;
  nickname: string;
  age?: number;
  height: { value: number; unit: Units["height"] };
  goal: GoalType;
  experience: ExperienceLevel;
  units: Units;
  activityLevel: string;
  injuries?: string;
};

type Exercise = {
  id: string;
  name: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: Equipment;
  category: ExerciseCategory;
  difficulty: ExperienceLevel;
  cues: string;
  mediaUrl?: string;
  variations: string[];
};

type ProgramExercise = {
  exerciseId: Exercise["id"];
  sets: number;
  reps: string;
  rest: string;
  rpe?: string;
  tempo?: string;
  warmup?: string;
};

type ProgramDay = {
  id: string;
  name: string;
  exercises: ProgramExercise[];
};

type ProgramWeek = {
  weekNumber: number;
  days: ProgramDay[];
};

type ProgramTemplate = {
  id: string;
  name: string;
  weeks: ProgramWeek[];
};

type SetEntry = {
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number;
  restSec?: number;
  note?: string;
};

type WorkoutExercise = {
  exerciseId: Exercise["id"];
  target: string;
  topSet?: string;
  backoff?: string;
  hitTarget: boolean;
  sets: SetEntry[];
};

type WorkoutSession = {
  id: string;
  date: string;
  durationMin: number;
  notes?: string;
  exercises: WorkoutExercise[];
};

type BodyWeightEntry = { dateLabel: string; weight: number };

type NutritionDaySummary = {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  waterL: number;
  fiber?: number;
};

type Goal = {
  id: string;
  label: string;
  deadline: string;
  rule: string;
};

const mockUser: UserProfile = {
  name: "Jordan Lee",
  nickname: "J",
  age: 29,
  height: { value: 178, unit: "cm" },
  goal: "strength",
  experience: "intermediate",
  units: { weight: "kg", height: "cm", energy: "calories" },
  activityLevel: "Moderately active",
  injuries: "Mild right shoulder limitation",
};

const mockExercises: Exercise[] = [
  {
    id: "bench-press",
    name: "Bench Press",
    primaryMuscles: ["Chest"],
    secondaryMuscles: ["Triceps", "Front Delts"],
    equipment: "barbell",
    category: "compound",
    difficulty: "intermediate",
    cues: "Feet planted, upper-back tight, touch lower chest.",
    mediaUrl: "https://example.com/bench-press",
    variations: ["Dumbbell Bench Press", "Paused Bench Press"],
  },
  {
    id: "rdl",
    name: "Romanian Deadlift",
    primaryMuscles: ["Hamstrings", "Glutes"],
    secondaryMuscles: ["Lower Back"],
    equipment: "barbell",
    category: "compound",
    difficulty: "intermediate",
    cues: "Soft knees, hinge hips back, keep the bar close.",
    variations: ["Dumbbell RDL", "Single-Leg RDL"],
  },
  {
    id: "cable-row",
    name: "Cable Row",
    primaryMuscles: ["Back"],
    secondaryMuscles: ["Biceps", "Rear Delts"],
    equipment: "cable",
    category: "compound",
    difficulty: "beginner",
    cues: "Lead with elbows, keep ribs down, control the return.",
    variations: ["Single-Arm Cable Row", "Chest-Supported Row"],
  },
];

const exerciseById = new Map(mockExercises.map((e) => [e.id, e]));

const mockProgram: ProgramTemplate = {
  id: "ul-4day",
  name: "Upper / Lower 4-day",
  weeks: [
    {
      weekNumber: 1,
      days: [
        {
          id: "upper-a",
          name: "Upper A",
          exercises: [
            {
              exerciseId: "bench-press",
              sets: 4,
              reps: "5-8",
              rest: "2-3 min",
              rpe: "7-8",
              tempo: "2-0-1",
              warmup: "2 warm-up sets",
            },
            {
              exerciseId: "cable-row",
              sets: 3,
              reps: "8-12",
              rest: "90 sec",
              rpe: "8",
            },
          ],
        },
      ],
    },
  ],
};

const mockWorkout: WorkoutSession = {
  id: "ws-2026-02-06",
  date: "2026-02-06 18:30",
  durationMin: 67,
  notes: "Sleep 7h, stress low, mild quad soreness, mood good.",
  exercises: [
    {
      exerciseId: "bench-press",
      target: "4x6 @ RPE 8",
      topSet: "82.5kg x 6",
      backoff: "75kg x 3 x 6",
      hitTarget: true,
      sets: [
        { setNumber: 1, weight: 82.5, reps: 6, rpe: 8, restSec: 150 },
        { setNumber: 2, weight: 75, reps: 6, rpe: 7, restSec: 120 },
      ],
    },
  ],
};

const bodyWeight: BodyWeightEntry[] = [
  { dateLabel: "Mon", weight: 77.5 },
  { dateLabel: "Wed", weight: 77.2 },
  { dateLabel: "Fri", weight: 77.4 },
];

const nutritionToday: NutritionDaySummary = {
  date: "2026-02-06",
  calories: 2620,
  protein: 178,
  carbs: 291,
  fat: 72,
  waterL: 2.8,
  fiber: 29,
};

const goals: Goal[] = [
  {
    id: "g1",
    label: "Bench press 100kg x 5",
    deadline: "2026-07-01",
    rule: "If all sets hit reps, add +2.5kg next session.",
  },
  {
    id: "g2",
    label: "Hit protein target 6/7 days",
    deadline: "Ongoing",
    rule: "Keep quick-add meal templates for busy days.",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function KeyValueList({ items }: { items: Array<{ label: string; value?: string | number }> }) {
  return (
    <ul className={styles.list}>
      {items.map((it) => (
        <li key={it.label} className={styles.listItem}>
          <span className={styles.listLabel}>{it.label}</span>
          <span className={styles.listValue}>{it.value ?? "-"}</span>
        </li>
      ))}
    </ul>
  );
}

function Badge({
  text,
  variant = "neutral",
}: {
  text: string;
  variant?: "neutral" | "good" | "bad";
}) {
  return <span className={cx(styles.badge, styles[`badge_${variant}`])}>{text}</span>;
}

function SetRow({ entry, unit }: { entry: SetEntry; unit: Units["weight"] }) {
  return (
    <div className={styles.setRow}>
      <span className={styles.setCell}>S{entry.setNumber}</span>
      <span className={styles.setCell}>
        {entry.weight}
        {unit}
      </span>
      <span className={styles.setCell}>{entry.reps} reps</span>
      <span className={styles.setCell}>{entry.rpe != null ? `RPE ${entry.rpe}` : "RPE -"}</span>
      <span className={styles.setCell}>{entry.restSec != null ? `${entry.restSec}s rest` : "Rest -"}</span>
    </div>
  );
}

function WorkoutExerciseCard({ exercise, weightUnit }: { exercise: WorkoutExercise; weightUnit: Units["weight"] }) {
  const meta = exerciseById.get(exercise.exerciseId);

  return (
    <article className={styles.card}>
      <div className={styles.cardTitleRow}>
        <div>
          <h4 className={styles.cardTitle}>{meta?.name ?? exercise.exerciseId}</h4>
          <p className={styles.muted}>
            Target: {exercise.target}
            {meta ? ` · ${meta.category} · ${meta.equipment}` : ""}
          </p>
        </div>

        <Badge text={exercise.hitTarget ? "Target hit" : "Missed"} variant={exercise.hitTarget ? "good" : "bad"} />
      </div>

      {(exercise.topSet || exercise.backoff) && (
        <p className={styles.muted}>
          {exercise.topSet ? `Top set: ${exercise.topSet}` : "Top set: -"}
          {" · "}
          {exercise.backoff ? `Back-off: ${exercise.backoff}` : "Back-off: -"}
        </p>
      )}

      <div className={styles.setTable}>
        {exercise.sets.map((set) => (
          <SetRow key={set.setNumber} entry={set} unit={weightUnit} />
        ))}
      </div>
    </article>
  );
}

function RestTimer({ value = "01:20" }: { value?: string }) {
  return <div className={styles.timer}>Rest timer: {value}</div>;
}

function WeightTrendChart({ unit }: { unit: Units["weight"] }) {
  const min = Math.min(...bodyWeight.map((e) => e.weight));
  const max = Math.max(...bodyWeight.map((e) => e.weight));
  const range = Math.max(0.0001, max - min);

  return (
    <div className={styles.chart}>
      {bodyWeight.map((entry) => {
        const normalized = (entry.weight - min) / range; // 0..1
        const widthPct = 30 + normalized * 70; // keep bars visible

        return (
          <div key={entry.dateLabel} className={styles.chartRow}>
            <span className={styles.chartLabel}>{entry.dateLabel}</span>
            <div className={styles.barWrap}>
              <div className={styles.bar} style={{ width: `${widthPct}%` }} />
            </div>
            <span className={styles.chartValue}>
              {entry.weight} {unit}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function GymPage() {
  const weightUnit = mockUser.units.weight;

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.h1}>Gym Dashboard (mock MVP)</h1>
        <p className={styles.lead}>
          Mock-based page with components, data model, and the key UX blocks for a gym tracker.
        </p>
      </header>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <h3>1) User profile</h3>
          <KeyValueList
            items={[
              { label: "Name", value: `${mockUser.name} (${mockUser.nickname})` },
              { label: "Age", value: mockUser.age ?? "-" },
              { label: "Height", value: `${mockUser.height.value} ${mockUser.height.unit}` },
              { label: "Goal", value: mockUser.goal },
              { label: "Experience", value: mockUser.experience },
              {
                label: "Units",
                value: `${mockUser.units.weight}, ${mockUser.units.height}, ${mockUser.units.energy}`,
              },
              { label: "Activity level", value: mockUser.activityLevel },
              { label: "Injuries", value: mockUser.injuries ?? "-" },
            ]}
          />
        </article>

        <article className={styles.card}>
          <h3>2) Exercises database</h3>

          <div className={styles.stack}>
            {mockExercises.map((exercise) => (
              <div key={exercise.id} className={styles.subCard}>
                <div className={styles.subCardTitleRow}>
                  <strong>{exercise.name}</strong>
                  <span className={styles.pill}>
                    {exercise.category} · {exercise.equipment} · {exercise.difficulty}
                  </span>
                </div>

                <p className={styles.muted}>
                  Muscles: {exercise.primaryMuscles.join(", ")} (primary) · {exercise.secondaryMuscles.join(", ")} (secondary)
                </p>

                <p className={styles.muted}>Cues: {exercise.cues}</p>

                {exercise.variations.length > 0 && (
                  <p className={styles.muted}>Variations: {exercise.variations.join(" → ")}</p>
                )}

                {exercise.mediaUrl && (
                  <a className={styles.link} href={exercise.mediaUrl} target="_blank" rel="noopener noreferrer">
                    Media reference
                  </a>
                )}
              </div>
            ))}
          </div>

          <p className={styles.muted}>Supports user-created custom exercises.</p>
        </article>
      </section>

      <section className={styles.card}>
        <h3>3) Training planning (templates)</h3>
        <p className={styles.muted}>
          Templates: Push/Pull/Legs, Upper/Lower, Full Body, Bro Split, and custom builder.
        </p>

        <h4 className={styles.h4}>{mockProgram.name}</h4>

        <div className={styles.stack}>
          {mockProgram.weeks.map((week) => (
            <div key={week.weekNumber} className={styles.subCard}>
              <strong>Week {week.weekNumber}</strong>

              {week.days.map((day) => (
                <div key={day.id} className={styles.dayBlock}>
                  <p className={styles.dayTitle}>{day.name}</p>

                  <ul className={styles.bullets}>
                    {day.exercises.map((ex) => {
                      const meta = exerciseById.get(ex.exerciseId);
                      return (
                        <li key={`${day.id}-${ex.exerciseId}`}>
                          <strong>{meta?.name ?? ex.exerciseId}</strong>: {ex.sets} sets × {ex.reps} · Rest {ex.rest}
                          {" · "}RPE {ex.rpe ?? "-"} · Tempo {ex.tempo ?? "-"} · Warm-up {ex.warmup ?? "-"}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <h3>4) Workout logging</h3>

        <div className={styles.metaRow}>
          <span>{mockWorkout.date}</span>
          <span className={styles.dot}>•</span>
          <span>{mockWorkout.durationMin} min</span>
        </div>

        {mockWorkout.notes && <p className={styles.muted}>{mockWorkout.notes}</p>}

        <RestTimer />

        <div className={styles.quickActions}>
          <button className={styles.btn} type="button">
            Copy last workout
          </button>
          <button className={styles.btn} type="button">
            Auto-fill from last time
          </button>
          <button className={styles.btnPrimary} type="button">
            +2.5kg next time
          </button>
        </div>

        <div className={styles.badgeRow}>
          <Badge text="Rep PR" />
          <Badge text="Weight PR" />
          <Badge text="Estimated 1RM PR" />
        </div>

        <div className={styles.stack}>
          {mockWorkout.exercises.map((ex) => (
            <WorkoutExerciseCard key={ex.exerciseId} exercise={ex} weightUnit={weightUnit} />
          ))}
        </div>
      </section>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <h3>5) Progress</h3>
          <ul className={styles.bullets}>
            <li>Best set, estimated 1RM trend, and volume trend per exercise.</li>
            <li>Weekly hard sets and volume progression per muscle group.</li>
            <li>Consistency: workouts/week & month (optional streaks).</li>
            <li>Body metrics: weight, measurements, photos.</li>
          </ul>

          <WeightTrendChart unit={weightUnit} />
        </article>

        <article className={styles.card}>
          <h3>6) Nutrition</h3>
          <p>
            {nutritionToday.date}: <strong>{nutritionToday.calories}</strong> kcal · Protein{" "}
            <strong>{nutritionToday.protein}g</strong>
          </p>

          <p className={styles.muted}>
            Macros: C {nutritionToday.carbs}g / F {nutritionToday.fat}g · Water {nutritionToday.waterL}L · Fiber{" "}
            {nutritionToday.fiber ?? "-"}g
          </p>

          <ul className={styles.bullets}>
            <li>Minimum: calories target, protein target, adherence.</li>
            <li>Better: macros, water, fiber, meal templates.</li>
            <li>Future: database search or external imports.</li>
          </ul>
        </article>
      </section>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <h3>7) Recovery</h3>
          <ul className={styles.bullets}>
            <li>Sleep hours + quality (1–5)</li>
            <li>Steps and rest day/deload markers</li>
            <li>Soreness and injury notes</li>
          </ul>

          <h3 className={styles.h3Spacer}>8) Goals & rules</h3>
          <ul className={styles.bullets}>
            {goals.map((g) => (
              <li key={g.id}>
                <strong>{g.label}</strong> ({g.deadline}) — {g.rule}
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <h3>9) UX pages</h3>
          <ul className={styles.bullets}>
            <li>Dashboard (today)</li>
            <li>Workout player</li>
            <li>History</li>
            <li>Exercise detail</li>
            <li>Program builder</li>
            <li>Nutrition</li>
            <li>Body metrics</li>
            <li>Settings</li>
          </ul>
        </article>
      </section>

      <section className={styles.card}>
        <h3>10) Data model</h3>
        <p className={styles.muted}>
          User, Exercise, ProgramTemplate, WorkoutSession, WorkoutExercise, SetEntry, BodyWeightEntry,
          MeasurementEntry, NutritionDaySummary, MealEntry, Goal.
        </p>
        <p className={styles.muted}>
          Tip: keep WorkoutSession “immutable-ish” with updatedAt and optional revision for auditability.
        </p>
      </section>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <h3>11) Must-have calculations</h3>
          <ul className={styles.bullets}>
            <li>Total volume per session/week</li>
            <li>Weekly set count per muscle group</li>
            <li>Estimated 1RM (Epley/Brzycki)</li>
            <li>PR detection rules</li>
            <li>7-day bodyweight moving average</li>
            <li>Weekly calorie average + optional adherence score</li>
          </ul>
        </article>

        <article className={styles.card}>
          <h3>12) Nice-to-have</h3>
          <ul className={styles.bullets}>
            <li>Rest timer + plate calculator</li>
            <li>Auto-deload suggestions</li>
            <li>Equipment-based substitutions</li>
            <li>Offline-first mode</li>
            <li>CSV export, cloud sync, sharing</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
