import { Routes, Route } from "react-router-dom";
import { GymDashboardPage } from "./pages/GymDashboardPage/GymDashboardPage";
import { WorkoutPlayerPage } from "./pages/WorkoutPlayerPage/WorkoutPlayerPage";
import { WorkoutHistoryPage } from "./pages/WorkoutHistoryPage/WorkoutHistoryPage";
import { WorkoutDetailPage } from "./pages/WorkoutDetailPage/WorkoutDetailPage";
import { ExerciseLibraryPage } from "./pages/ExerciseLibraryPage/ExerciseLibraryPage";
import { ExerciseDetailPage } from "./pages/ExerciseDetailPage/ExerciseDetailPage";
import { ProgramBuilderPage } from "./pages/ProgramBuilderPage/ProgramBuilderPage";
import { NutritionPage } from "./pages/NutritionPage/NutritionPage";
import { BodyMetricsPage } from "./pages/BodyMetricsPage/BodyMetricsPage";
import { RecoveryPage } from "./pages/RecoveryPage/RecoveryPage";
import { SettingsPage } from "./pages/SettingsPage/SettingsPage";

export function GymRoutes() {
  return (
    <Routes>
      <Route index element={<GymDashboardPage />} />
      <Route path="workout/start/:programDayId" element={<WorkoutPlayerPage />} />
      <Route path="workouts" element={<WorkoutHistoryPage />} />
      <Route path="workouts/:workoutId" element={<WorkoutDetailPage />} />
      <Route path="exercises" element={<ExerciseLibraryPage />} />
      <Route path="exercises/:exerciseId" element={<ExerciseDetailPage />} />
      <Route path="programs" element={<ProgramBuilderPage />} />
      <Route path="nutrition" element={<NutritionPage />} />
      <Route path="body" element={<BodyMetricsPage />} />
      <Route path="recovery" element={<RecoveryPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  );
}
