import { nextServer } from "@/lib/api/api";

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('auth/session');
  return res.data.success;
};