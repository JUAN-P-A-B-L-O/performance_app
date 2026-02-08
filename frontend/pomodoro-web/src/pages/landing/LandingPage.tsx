import { Link, useNavigate } from "react-router-dom";
import { clearAuth, getAuth } from "@/services/authStorage";
import styles from "./LandingPage.module.scss";

export function LandingPage() {
  const navigate = useNavigate();
  const auth = getAuth();

  function handleLogout() {
    clearAuth();
    navigate("/login", { replace: true });
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Escolha seu modulo</h1>
        <p className={styles.subtitle}>Selecione o que voce quer usar agora.</p>

        <div className={styles.actions}>
          <Link to="/pomodoro" className={styles.button}>
            Pomodoro
          </Link>

          <Link to="/gym" className={styles.button}>
            Gym Control
          </Link>
        </div>

        {auth?.token ? (
          <div className={styles.footer}>
            <p className={styles.loggedText}>Conectado como {auth.user.email}</p>
            <button type="button" className={styles.logoutButton} onClick={handleLogout}>
              Sair
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
