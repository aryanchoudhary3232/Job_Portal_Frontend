import type { ApiResponse } from "./types";
import { getToken } from "./session";
import { ApiError, humanizeApiMessage } from "./api-error";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

const buildHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

async function parseResponse<T>(response: Response): Promise<T> {
  let payload: ApiResponse<T> | null = null;
  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const raw = payload?.message || response.statusText || "Request failed";
    throw new ApiError(humanizeApiMessage(raw), response.status);
  }

  return payload!.data;
}

export const api = {
  get: async <T>(path: string) => {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: buildHeaders(),
      cache: "no-store",
    });
    return parseResponse<T>(response);
  },
  post: async <T>(path: string, body: unknown) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(body),
    });
    return parseResponse<T>(response);
  },
  patch: async <T>(path: string, body: unknown) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "PATCH",
      headers: buildHeaders(),
      body: JSON.stringify(body),
    });
    return parseResponse<T>(response);
  },
};
