import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { getAuth } from "@/services/authStorage";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = getAuth();

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
