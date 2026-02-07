import { Link } from "react-router-dom";
import styles from "./LandingPage.module.scss";

export function LandingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Choose your module</h1>
        <p className={styles.subtitle}>Select what you want to use right now.</p>

        <div className={styles.actions}>
          <Link to="/pomodoro" className={styles.button}>
            Pomodoro
          </Link>

          <Link to="/gym" className={styles.button}>
            Gym Control
          </Link>
        </div>
      </section>
    </main>
  );
}
