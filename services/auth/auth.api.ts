import { authApi } from "../axios";
import { LoginPayload, RegisterPayload } from "@/types/auth.types";

export const registerUser = async ({
  email,
  password,
  name,
}: RegisterPayload) => {
  const { data } = await authApi.post("/register", {
    email,
    password,
    name,
  });
  return data;
};
export const loginUser = async ({ email, password }: LoginPayload) => {
  const { data } = await authApi.post("/login", {
    email,
    password,
  });
  return data;
};
