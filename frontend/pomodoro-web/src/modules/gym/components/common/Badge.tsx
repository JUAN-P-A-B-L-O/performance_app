import { PropsWithChildren } from "react";
import styles from "./Badge.module.scss";

type BadgeProps = PropsWithChildren<{ variant?: "neutral" | "good" | "bad" }>;

export function Badge({ variant = "neutral", children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
}
