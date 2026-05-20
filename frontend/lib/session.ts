import type { Role, User } from "./types";

const tokenKey = "jobportal_token";
const userKey = "jobportal_user";

export const getToken = () => (typeof window === "undefined" ? "" : localStorage.getItem(tokenKey) || "");

export const getUser = (): User | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const raw = localStorage.getItem(userKey);
  return raw ? (JSON.parse(raw) as User) : null;
};

export const setSession = (token: string, user: User) => {
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userKey, JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
};

export const roleRouteMap = {
  STUDENT: "/student",
  RECRUITER: "/recruiter/dashboard",
  STAFF: "/staff",
};

export const roleLoginRouteMap: Record<Role, string> = {
  STUDENT: "/login",
  RECRUITER: "/recruiter/login",
  STAFF: "/staff/login",
};
