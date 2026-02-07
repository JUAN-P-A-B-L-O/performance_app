import styles from "./SetRowEditor.module.scss";
import { SetEntry } from "../../domain/types";
import { Input } from "../common/Input";

type SetRowEditorProps = {
  entry: SetEntry;
  onChange: (entry: SetEntry) => void;
  onSave?: () => void;
};

export function SetRowEditor({ entry, onChange, onSave }: SetRowEditorProps) {
  return (
    <div className={styles.row}>
      <span className={styles.index}>Set {entry.setNumber}</span>
      <Input
        type="number"
        value={entry.weight}
        onChange={(event) =>
          onChange({ ...entry, weight: Number(event.target.value) })
        }
        placeholder="Weight"
      />
      <Input
        type="number"
        value={entry.reps}
        onChange={(event) =>
          onChange({ ...entry, reps: Number(event.target.value) })
        }
        placeholder="Reps"
      />
      <Input
        type="number"
        value={entry.rpe ?? 0}
        onChange={(event) =>
          onChange({ ...entry, rpe: Number(event.target.value) })
        }
        placeholder="RPE"
      />
      <button type="button" className={styles.save} onClick={onSave}>
        Save set
      </button>
    </div>
  );
}
