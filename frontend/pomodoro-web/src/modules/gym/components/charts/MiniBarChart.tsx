import styles from "./MiniBarChart.module.scss";

type MiniBarChartProps = {
  data: Array<{ label: string; value: number }>;
};

export function MiniBarChart({ data }: MiniBarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className={styles.chart}>
      {data.map((item) => (
        <div key={item.label} className={styles.row}>
          <span>{item.label}</span>
          <div className={styles.barTrack}>
            <div
              className={styles.bar}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
