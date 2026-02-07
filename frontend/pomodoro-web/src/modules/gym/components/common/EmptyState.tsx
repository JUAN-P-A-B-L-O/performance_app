import { PropsWithChildren } from "react";
import styles from "./EmptyState.module.scss";

type EmptyStateProps = PropsWithChildren<{ title: string; body?: string }>;

export function EmptyState({ title, body, children }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <h3>{title}</h3>
      {body ? <p>{body}</p> : null}
      {children}
    </div>
  );
}
