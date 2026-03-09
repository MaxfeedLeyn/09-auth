import { nextServer } from "@/app/api/api";
import { User } from "@/types/user";

export type RegisterRequest = {
  email: string;
  password: string;
};
    
export const register = async (data: RegisterRequest) => { 
    const response = await nextServer.post<User>("/api/auth/register", data);
    return response.data;
}