import { useEffect, useMemo, useState } from "react";
import styles from "./NutritionPage.module.scss";
import { gymRepository } from "../../services/gymRepository";
import { MealTemplate, NutritionDaySummary } from "../../domain/types";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function NutritionPage() {
  const [day, setDay] = useState<NutritionDaySummary | null>(null);
  const [templates, setTemplates] = useState<MealTemplate[]>([]);
  const [weekly, setWeekly] = useState<NutritionDaySummary[]>([]);

  useEffect(() => {
    const today = getTodayDate();
    Promise.all([
      gymRepository.getNutritionDay(today),
      gymRepository.listMealTemplates(),
      gymRepository.listNutritionRange(
        new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10),
        today
      ),
    ]).then(([nutritionDay, mealTemplates, weekRange]) => {
      setDay(
        nutritionDay ?? {
          id: `nutrition-${Date.now()}`,
          date: today,
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          waterL: 0,
          fiber: 0,
        }
      );
      setTemplates(mealTemplates);
      setWeekly(weekRange);
    });
  }, []);

  const weeklyAverage = useMemo(() => {
    if (weekly.length === 0) {
      return null;
    }
    const totals = weekly.reduce(
      (acc, item) => {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        acc.fat += item.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    return {
      calories: Math.round(totals.calories / weekly.length),
      protein: Math.round(totals.protein / weekly.length),
      carbs: Math.round(totals.carbs / weekly.length),
      fat: Math.round(totals.fat / weekly.length),
    };
  }, [weekly]);

  const handleSave = async () => {
    if (!day) {
      return;
    }
    await gymRepository.upsertNutritionDay(day);
  };

  const applyTemplate = (template: MealTemplate) => {
    if (!day) {
      return;
    }
    setDay({
      ...day,
      calories: day.calories + template.calories,
      protein: day.protein + template.protein,
      carbs: day.carbs + template.carbs,
      fat: day.fat + template.fat,
    });
  };

  if (!day) {
    return (
      <main className={styles.page}>
        <SectionHeader title="Nutrition" subtitle="Loading..." />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <SectionHeader title="Nutrition" subtitle="Track today and apply templates." />

      <section className={styles.grid}>
        <Card>
          <h3>Today</h3>
          <div className={styles.formGrid}>
            <label>
              Calories
              <Input
                type="number"
                value={day.calories}
                onChange={(event) =>
                  setDay({ ...day, calories: Number(event.target.value) })
                }
              />
            </label>
            <label>
              Protein (g)
              <Input
                type="number"
                value={day.protein}
                onChange={(event) =>
                  setDay({ ...day, protein: Number(event.target.value) })
                }
              />
            </label>
            <label>
              Carbs (g)
              <Input
                type="number"
                value={day.carbs}
                onChange={(event) =>
                  setDay({ ...day, carbs: Number(event.target.value) })
                }
              />
            </label>
            <label>
              Fat (g)
              <Input
                type="number"
                value={day.fat}
                onChange={(event) =>
                  setDay({ ...day, fat: Number(event.target.value) })
                }
              />
            </label>
            <label>
              Water (L)
              <Input
                type="number"
                value={day.waterL}
                onChange={(event) =>
                  setDay({ ...day, waterL: Number(event.target.value) })
                }
              />
            </label>
            <label>
              Fiber (g)
              <Input
                type="number"
                value={day.fiber ?? 0}
                onChange={(event) =>
                  setDay({ ...day, fiber: Number(event.target.value) })
                }
              />
            </label>
          </div>
          <Button onClick={handleSave}>Save day</Button>
        </Card>

        <Card>
          <h3>Quick meal templates</h3>
          <div className={styles.templateList}>
            {templates.map((template) => (
              <div key={template.id} className={styles.templateRow}>
                <div>
                  <strong>{template.name}</strong>
                  <p className={styles.muted}>
                    {template.calories} kcal · P{template.protein} C
                    {template.carbs} F{template.fat}
                  </p>
                </div>
                <Button variant="secondary" onClick={() => applyTemplate(template)}>
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3>Weekly averages</h3>
          {weeklyAverage ? (
            <div className={styles.averageGrid}>
              <div>
                <p className={styles.muted}>Calories</p>
                <strong>{weeklyAverage.calories}</strong>
              </div>
              <div>
                <p className={styles.muted}>Protein</p>
                <strong>{weeklyAverage.protein}g</strong>
              </div>
              <div>
                <p className={styles.muted}>Carbs</p>
                <strong>{weeklyAverage.carbs}g</strong>
              </div>
              <div>
                <p className={styles.muted}>Fat</p>
                <strong>{weeklyAverage.fat}g</strong>
              </div>
            </div>
          ) : (
            <p className={styles.muted}>No weekly data yet.</p>
          )}
        </Card>
      </section>
    </main>
  );
}
