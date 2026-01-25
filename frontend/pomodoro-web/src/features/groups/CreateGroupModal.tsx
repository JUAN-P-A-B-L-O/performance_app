import { useEffect, useRef, useState } from "react";
import styles from "./CreateGroupModal.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => Promise<void> | void;
};

export function CreateGroupModal({ isOpen, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setName("");
    // foco no input ao abrir
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      setIsSaving(true);
      await onCreate(trimmed);
      onClose();
    } finally {
      setIsSaving(false);
    }
  }

  function handleOverlayMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayMouseDown}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Criar grupo">
        <div className={styles.header}>
          <h3 className={styles.title}>Novo grupo</h3>
          <button className={styles.iconBtn} type="button" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Nome do grupo
            <input
              ref={inputRef}
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Estudos, Trabalho..."
              maxLength={40}
            />
          </label>

          <div className={styles.actions}>
            <button className={styles.secondary} type="button" onClick={onClose} disabled={isSaving}>
              Cancelar
            </button>
            <button className={styles.primary} type="submit" disabled={isSaving || !name.trim()}>
              {isSaving ? "Salvando..." : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
