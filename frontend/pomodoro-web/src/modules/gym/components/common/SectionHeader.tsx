import { PropsWithChildren } from "react";
import styles from "./SectionHeader.module.scss";

type SectionHeaderProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}>;

export function SectionHeader({ title, subtitle, actions }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <div>
        <h2>{title}</h2>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}
