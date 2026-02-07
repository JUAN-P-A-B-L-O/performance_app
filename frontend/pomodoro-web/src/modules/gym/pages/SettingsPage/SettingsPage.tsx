import { useEffect, useState } from "react";
import styles from "./SettingsPage.module.scss";
import { gymRepository } from "../../services/gymRepository";
import { UserProfile } from "../../domain/types";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";

export function SettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    gymRepository.getUser().then(setUser);
  }, []);

  const handleSave = async () => {
    if (!user) {
      return;
    }
    await gymRepository.saveUser(user);
  };

  if (!user) {
    return (
      <main className={styles.page}>
        <SectionHeader title="Settings" subtitle="Loading..." />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <SectionHeader title="Settings" subtitle="Units, targets, and preferences." />

      <section className={styles.grid}>
        <Card>
          <h3>Units</h3>
          <div className={styles.formGrid}>
            <label>
              Weight unit
              <select
                value={user.units.weight}
                onChange={(event) =>
                  setUser({
                    ...user,
                    units: { ...user.units, weight: event.target.value as UserProfile["units"]["weight"] },
                  })
                }
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </label>
            <label>
              Height unit
              <select
                value={user.units.height}
                onChange={(event) =>
                  setUser({
                    ...user,
                    units: { ...user.units, height: event.target.value as UserProfile["units"]["height"] },
                  })
                }
              >
                <option value="cm">cm</option>
                <option value="ft">ft</option>
              </select>
            </label>
            <label>
              Energy unit
              <select
                value={user.units.energy}
                onChange={(event) =>
                  setUser({
                    ...user,
                    units: { ...user.units, energy: event.target.value as UserProfile["units"]["energy"] },
                  })
                }
              >
                <option value="calories">calories</option>
                <option value="kJ">kJ</option>
              </select>
            </label>
          </div>
        </Card>

        <Card>
          <h3>Targets</h3>
          <div className={styles.formGrid}>
            <label>
              Calories target
              <Input
                type="number"
                value={user.settings?.calorieTarget ?? 0}
                onChange={(event) =>
                  setUser({
                    ...user,
                    settings: {
                      ...user.settings,
                      calorieTarget: Number(event.target.value),
                    },
                  })
                }
              />
            </label>
            <label>
              Protein target (g)
              <Input
                type="number"
                value={user.settings?.proteinTarget ?? 0}
                onChange={(event) =>
                  setUser({
                    ...user,
                    settings: {
                      ...user.settings,
                      proteinTarget: Number(event.target.value),
                    },
                  })
                }
              />
            </label>
          </div>
        </Card>

        <Card>
          <h3>Preferences</h3>
          <div className={styles.formGrid}>
            <label>
              Show streaks
              <select
                value={user.settings?.showStreaks ? "yes" : "no"}
                onChange={(event) =>
                  setUser({
                    ...user,
                    settings: {
                      ...user.settings,
                      showStreaks: event.target.value === "yes",
                    },
                  })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            <label>
              Default increment
              <Input
                type="number"
                value={user.settings?.defaultWeightIncrement ?? 2.5}
                onChange={(event) =>
                  setUser({
                    ...user,
                    settings: {
                      ...user.settings,
                      defaultWeightIncrement: Number(event.target.value),
                    },
                  })
                }
              />
            </label>
          </div>
        </Card>
      </section>

      <Button onClick={handleSave}>Save settings</Button>
    </main>
  );
}
