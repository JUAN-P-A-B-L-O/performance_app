import styles from "./GymPage.module.scss";

type UserProfile = {
  name: string;
  nickname: string;
  age?: number;
  height: string;
  goal: "gain muscle" | "lose fat" | "strength" | "maintenance";
  experience: "beginner" | "intermediate" | "advanced";
  units: { weight: "kg" | "lb"; height: "cm" | "ft"; energy: "calories" | "kJ" };
  activityLevel: string;
  injuries?: string;
};

type Exercise = {
  name: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: "barbell" | "dumbbell" | "machine" | "cable" | "bodyweight";
  category: "compound" | "isolation";
  difficulty: "beginner" | "intermediate" | "advanced";
  cues: string;
  media?: string;
  variations: string[];
};

type ProgramTemplate = {
  name: string;
  weeks: Array<{
    week: number;
    days: Array<{
      day: string;
      exercises: Array<{
        name: string;
        sets: string;
        reps: string;
        rest: string;
        rpe?: string;
        tempo?: string;
        warmup?: string;
      }>;
    }>;
  }>;
};

type SetEntry = {
  set: number;
  weight: number;
  reps: number;
  rpe: number;
  restSec: number;
  note?: string;
};

type WorkoutExercise = {
  name: string;
  target: string;
  topSet?: string;
  backoff?: string;
  hitTarget: boolean;
  sets: SetEntry[];
};

type WorkoutSession = {
  date: string;
  durationMin: number;
  notes: string;
  exercises: WorkoutExercise[];
};

type BodyWeightEntry = { date: string; weight: number };

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
  label: string;
  deadline: string;
  rule: string;
};

const mockUser: UserProfile = {
  name: "Jordan Lee",
  nickname: "J",
  age: 29,
  height: "178 cm",
  goal: "strength",
  experience: "intermediate",
  units: { weight: "kg", height: "cm", energy: "calories" },
  activityLevel: "Moderately active",
  injuries: "Mild right shoulder limitation",
};

const mockExercises: Exercise[] = [
  {
    name: "Bench Press",
    primaryMuscles: ["Chest"],
    secondaryMuscles: ["Triceps", "Front Delts"],
    equipment: "barbell",
    category: "compound",
    difficulty: "intermediate",
    cues: "Feet planted, upper-back tight, touch lower chest.",
    media: "https://example.com/bench-press",
    variations: ["Dumbbell Bench Press", "Paused Bench Press"],
  },
  {
    name: "Romanian Deadlift",
    primaryMuscles: ["Hamstrings", "Glutes"],
    secondaryMuscles: ["Lower Back"],
    equipment: "barbell",
    category: "compound",
    difficulty: "intermediate",
    cues: "Soft knees, hinge hips back, keep bar close.",
    variations: ["Dumbbell RDL", "Single-Leg RDL"],
  },
];

const mockProgram: ProgramTemplate = {
  name: "Upper / Lower 4-day",
  weeks: [
    {
      week: 1,
      days: [
        {
          day: "Upper A",
          exercises: [
            {
              name: "Bench Press",
              sets: "4",
              reps: "5-8",
              rest: "2-3 min",
              rpe: "7-8",
              tempo: "2-0-1",
              warmup: "2 warm-up sets",
            },
            {
              name: "Cable Row",
              sets: "3",
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
  date: "2026-02-06 18:30",
  durationMin: 67,
  notes: "Sleep 7h, stress low, mild quad soreness, mood good.",
  exercises: [
    {
      name: "Bench Press",
      target: "4x6 @ RPE 8",
      topSet: "82.5kg x 6",
      backoff: "75kg x 3 x 6",
      hitTarget: true,
      sets: [
        { set: 1, weight: 82.5, reps: 6, rpe: 8, restSec: 150 },
        { set: 2, weight: 75, reps: 6, rpe: 7, restSec: 120 },
      ],
    },
  ],
};

const bodyWeight: BodyWeightEntry[] = [
  { date: "Mon", weight: 77.5 },
  { date: "Wed", weight: 77.2 },
  { date: "Fri", weight: 77.4 },
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
    label: "Bench press 100kg x 5",
    deadline: "2026-07-01",
    rule: "If all sets hit reps, add +2.5kg next session",
  },
  {
    label: "Hit protein target 6/7 days",
    deadline: "Ongoing",
    rule: "Keep quick-add meal templates for busy days",
  },
];

function PRBadge({ text }: { text: string }) {
  return <span className={styles.prBadge}>{text}</span>;
}

function SetRowEditor({ entry }: { entry: SetEntry }) {
  return (
    <div className={styles.setRow}>
      <span>S{entry.set}</span>
      <span>{entry.weight}kg</span>
      <span>{entry.reps} reps</span>
      <span>RPE {entry.rpe}</span>
      <span>{entry.restSec}s rest</span>
    </div>
  );
}

function WorkoutExerciseCard({ exercise }: { exercise: WorkoutExercise }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTitleRow}>
        <h4>{exercise.name}</h4>
        {exercise.hitTarget ? <PRBadge text="Target hit" /> : <PRBadge text="Missed" />}
      </div>
      <p className={styles.muted}>Target: {exercise.target}</p>
      <p className={styles.muted}>Top set: {exercise.topSet} · Back-off: {exercise.backoff}</p>
      <div className={styles.setTable}>
        {exercise.sets.map((set) => (
          <SetRowEditor key={set.set} entry={set} />
        ))}
      </div>
    </article>
  );
}

function RestTimer() {
  return <div className={styles.timer}>Rest timer: 01:20</div>;
}

function WeightTrendChart() {
  return (
    <div className={styles.chart}>
      {bodyWeight.map((entry) => (
        <div key={entry.date} className={styles.chartRow}>
          <span>{entry.date}</span>
          <div className={styles.bar} style={{ width: `${entry.weight * 3}px` }} />
          <span>{entry.weight} kg</span>
        </div>
      ))}
    </div>
  );
}

export function GymPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1>Gym Dashboard Build Spec (MVP + roadmap)</h1>
        <p>Structured frontend page with pages, components, mock data, and core logic targets.</p>
      </header>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <h3>1) User profile (basics)</h3>
          <ul>
            <li>Name / nickname: {mockUser.name} ({mockUser.nickname})</li>
            <li>Age / height: {mockUser.age} / {mockUser.height}</li>
            <li>Goal / experience: {mockUser.goal} / {mockUser.experience}</li>
            <li>Units: {mockUser.units.weight}, {mockUser.units.height}, {mockUser.units.energy}</li>
            <li>Activity level: {mockUser.activityLevel}</li>
            <li>Injuries: {mockUser.injuries}</li>
          </ul>
        </article>

        <article className={styles.card}>
          <h3>2) Exercises database</h3>
          {mockExercises.map((exercise) => (
            <div key={exercise.name} className={styles.subCard}>
              <strong>{exercise.name}</strong>
              <p className={styles.muted}>
                {exercise.category} · {exercise.equipment} · {exercise.difficulty}
              </p>
              <p>Muscles: {exercise.primaryMuscles.join(", ")} (primary), {exercise.secondaryMuscles.join(", ")} (secondary)</p>
              <p>Cues: {exercise.cues}</p>
              <p>Variations: {exercise.variations.join(" → ")}</p>
            </div>
          ))}
          <p className={styles.muted}>Supports custom exercises by user creation.</p>
        </article>
      </section>

      <section className={styles.card}>
        <h3>3) Training planning (workout templates)</h3>
        <p className={styles.muted}>Templates: Push/Pull/Legs, Upper/Lower, Full Body, Bro Split, and custom drag & drop builder.</p>
        <h4>{mockProgram.name}</h4>
        {mockProgram.weeks.map((week) => (
          <div key={week.week} className={styles.subCard}>
            <strong>Week {week.week}</strong>
            {week.days.map((day) => (
              <div key={day.day}>
                <p>{day.day}</p>
                <ul>
                  {day.exercises.map((exercise) => (
                    <li key={exercise.name}>
                      {exercise.name}: {exercise.sets} sets × {exercise.reps} reps · Rest {exercise.rest} · RPE {exercise.rpe ?? "-"} · Tempo {exercise.tempo ?? "-"} · Warm-up {exercise.warmup ?? "-"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className={styles.card}>
        <h3>4) Workout logging (core)</h3>
        <p>{mockWorkout.date} · {mockWorkout.durationMin} min</p>
        <p className={styles.muted}>{mockWorkout.notes}</p>
        <RestTimer />
        <div className={styles.quickActions}>
          <button type="button">Copy last workout</button>
          <button type="button">Auto-fill from last time</button>
          <button type="button">+2.5kg next time</button>
        </div>
        <PRBadge text="Rep PR" /> <PRBadge text="Weight PR" /> <PRBadge text="Estimated 1RM PR" />
        {mockWorkout.exercises.map((exercise) => (
          <WorkoutExerciseCard key={exercise.name} exercise={exercise} />
        ))}
      </section>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <h3>5) Progress tracking</h3>
          <ul>
            <li>Best set, estimated 1RM trend, and volume trend per exercise.</li>
            <li>Weekly hard sets and volume progression per muscle group.</li>
            <li>Consistency metrics: workouts/week, workouts/month, and optional streaks.</li>
            <li>Body metrics: weight, measurements, progress photos.</li>
          </ul>
          <WeightTrendChart />
        </article>

        <article className={styles.card}>
          <h3>6) Nutrition tracking</h3>
          <p>{nutritionToday.date}: {nutritionToday.calories} kcal · Protein {nutritionToday.protein}g</p>
          <p className={styles.muted}>Macros: C {nutritionToday.carbs}g / F {nutritionToday.fat}g · Water {nutritionToday.waterL}L · Fiber {nutritionToday.fiber}g</p>
          <ul>
            <li>Minimum: calories target, protein target, and adherence to target.</li>
            <li>Better: macros, meal frequency, water, fiber, meal templates.</li>
            <li>Future: app imports + food database search.</li>
          </ul>
        </article>
      </section>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <h3>7) Recovery tracking</h3>
          <ul>
            <li>Sleep hours + quality 1-5</li>
            <li>Steps and rest day/deload marker</li>
            <li>Soreness and injury notes</li>
          </ul>

          <h3>8) Goals & rules engine</h3>
          <ul>
            {goals.map((goal) => (
              <li key={goal.label}>{goal.label} ({goal.deadline}) — {goal.rule}</li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <h3>9) UX pages</h3>
          <ul>
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
        <p>User, Exercise, ProgramTemplate, WorkoutSession, WorkoutExercise, SetEntry, BodyWeightEntry, MeasurementEntry, NutritionDaySummary, MealEntry, Goal.</p>
        <p className={styles.muted}>Keep WorkoutSession immutable-ish with updatedAt and optional revision for auditability.</p>
      </section>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <h3>11) Must-have calculations</h3>
          <ul>
            <li>Total volume per session/week</li>
            <li>Weekly set count per muscle group</li>
            <li>Estimated 1RM (Epley/Brzycki)</li>
            <li>PR detection rules</li>
            <li>7-day bodyweight moving average</li>
            <li>Calorie weekly average + optional adherence score</li>
          </ul>
        </article>

        <article className={styles.card}>
          <h3>12) Nice-to-have</h3>
          <ul>
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
