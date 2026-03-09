import { nextServer } from "@/lib/api/api";
import { User } from "@/types/user";

export type RegisterRequest = {
  email: string;
  password: string;
};
    
export const register = async (data: RegisterRequest) => { 
    const response = await nextServer.post<User>("auth/register", data);
    return response.data;
}

export const getMe = async () => {
  const { data } = await nextServer.get<User>('users/me');
  return data;
};