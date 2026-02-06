import { PropsWithChildren } from "react";
import styles from "./Card.module.scss";

export function Card({ children }: PropsWithChildren) {
  return <div className={styles.card}>{children}</div>;
}
