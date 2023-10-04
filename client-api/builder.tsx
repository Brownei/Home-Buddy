import { createBuilder } from "@ibnlanre/portal";
// import { USERAPI } from "./axios.config";
import axios from "axios";

export const builder = createBuilder({
  api: {
    auth: {
      sign_up: async (data: Record<"fullName" | "email" | "password", string>) =>
        await axios.post("/api/auth/client", data),
      login: async (data: Record<"email" | "password", string>) =>
        await axios.post("/api/auth/login", data),
    },
  },
});