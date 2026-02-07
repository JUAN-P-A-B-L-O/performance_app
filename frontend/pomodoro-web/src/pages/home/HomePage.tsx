import { useMemo, useState } from "react";
import styles from "./HomePage.module.scss";
import { TimerCard } from "../../features/timer/TimerCard/TimeCard";
import { CreateGroupModal } from "../../features/groups/CreateGroupModal";

type PomodoroGroup = { id: string; name: string };

// Fallback local (pra funcionar agora)
const LS_KEY = "pomodoro_groups_v1";

function loadGroups(): PomodoroGroup[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PomodoroGroup[];
  } catch {
    return [];
  }
}

function saveGroups(groups: PomodoroGroup[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(groups));
}

export function HomePage() {
  const [groupId, setGroupId] = useState<string | null>(null);

  const [groups, setGroups] = useState<PomodoroGroup[]>(() => loadGroups());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const selectedGroup = useMemo(
    () => groups.find((g) => g.id === groupId) ?? null,
    [groups, groupId]
  );

  async function handleCreateGroup(name: string) {
    const newGroup: PomodoroGroup = {
      id: crypto.randomUUID(),
      name,
    };

    const next = [newGroup, ...groups];
    setGroups(next);
    saveGroups(next);
    setGroupId(newGroup.id);
  }

  return (
    <div className={styles.container}>
      <header className={styles.topbar}>
        <div className={styles.brand}>✅ Pomodoro</div>

        <div className={styles.actions}>
          <button className={styles.pill} type="button">
            Report
          </button>
          <button className={styles.pill} type="button">
            Setting
          </button>
          <button className={styles.pill} type="button">
            Sign In
          </button>
          <button className={styles.pill} type="button" aria-label="More">
            ⋮
          </button>
        </div>
      </header>

      <TimerCard groupId={groupId} />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Group</div>

          <button
            className={styles.smallBtn}
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
          >
            + Novo
          </button>
        </div>

        <div className={styles.groupRow}>
          <select
            className={styles.select}
            value={groupId ?? ""}
            onChange={(e) => setGroupId(e.target.value || null)}
          >
            <option value="">Nenhum grupo selecionado</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          {selectedGroup && (
            <div className={styles.selectedHint}>
              Selecionado: <b>{selectedGroup.name}</b>
            </div>
          )}
        </div>
      </section>

      {/* Suas outras sections (Tasks etc.) continuam abaixo, sem mudar */}
      {/* ... */}

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
}
