import { FormEvent, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthServiceError, login } from "@/services/authService";
import { getAuth, setAuth } from "@/services/authStorage";
import styles from "./LoginPage.module.scss";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getEmailError(email: string) {
  const value = email.trim();

  if (!value) {
    return "Informe o e-mail.";
  }

  if (!emailRegex.test(value)) {
    return "Informe um e-mail valido.";
  }

  return "";
}

function getPasswordError(password: string) {
  if (!password) {
    return "Informe a senha.";
  }

  if (password.length < 6) {
    return "A senha precisa ter no minimo 6 caracteres.";
  }

  return "";
}

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const auth = getAuth();

  const emailError = useMemo(() => getEmailError(email), [email]);
  const passwordError = useMemo(() => getPasswordError(password), [password]);

  const isFormValid = !emailError && !passwordError;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormValid || isSubmitting) {
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const payload = await login(email, password);
      setAuth(payload);
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof AuthServiceError && error.code === "INVALID_CREDENTIALS") {
        setSubmitError("Credenciais invalidas. Verifique e tente novamente.");
      } else {
        setSubmitError("Erro de rede. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (auth?.token) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Entrar</h1>
        <p className={styles.subtitle}>Acesse sua conta para continuar.</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span className={styles.label}>E-mail</span>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="voce@exemplo.com"
              aria-invalid={Boolean(emailError)}
              required
            />
            {emailError ? <p className={styles.errorText}>{emailError}</p> : null}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Senha</span>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              placeholder="********"
              aria-invalid={Boolean(passwordError)}
              required
            />
            {passwordError ? <p className={styles.errorText}>{passwordError}</p> : null}
          </label>

          {submitError ? <p className={styles.errorText}>{submitError}</p> : null}

          <button className={styles.submit} type="submit" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
