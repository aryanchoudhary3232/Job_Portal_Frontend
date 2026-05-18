import type { ApiResponse } from "./types";
import { getToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

const buildHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  get: async <T>(path: string) => {
    const response = await fetch(`${baseUrl}${path}`, { headers: buildHeaders(), cache: "no-store" });
    const payload = (await response.json()) as ApiResponse<T>;
    if (!response.ok) {
      throw new Error(payload.message || "Request failed");
    }
    return payload.data;
  },
  post: async <T>(path: string, body: unknown) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(body),
    });
    const payload = (await response.json()) as ApiResponse<T>;
    if (!response.ok) {
      throw new Error(payload.message || "Request failed");
    }
    return payload.data;
  },
  patch: async <T>(path: string, body: unknown) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "PATCH",
      headers: buildHeaders(),
      body: JSON.stringify(body),
    });
    const payload = (await response.json()) as ApiResponse<T>;
    if (!response.ok) {
      throw new Error(payload.message || "Request failed");
    }
    return payload.data;
  },
};
