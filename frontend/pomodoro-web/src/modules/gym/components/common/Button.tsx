import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`${styles.button} ${styles[variant]} ${props.className ?? ""}`}
    />
  );
}
