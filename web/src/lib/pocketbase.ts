"use client";

import PocketBase from "pocketbase";
import { env } from "~/env";
import { userSchema } from "./schema";

export const pb = new PocketBase(env.NEXT_PUBLIC_PB_URL);
pb.autoCancellation(false);

export const loggedUserAsync = async () => {
  return userSchema.parseAsync(pb.authStore.model);
}

export const loggedUser = () => {
  return userSchema.parse(pb.authStore.model);
}