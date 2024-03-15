import { z } from "zod";
import { env } from "~/env";
import { authorizedRole, adminRole } from "./const";

export const paginationSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
});

export const userSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    collectionName: z.string(),
    verified: z.boolean(),
    role: z.string(),
    avatar: z.string().nullish(),
    created: z.coerce.date(),
    updated: z.coerce.date(),
  })
  .nullish()
  .transform((data) => {
    if (!data) return null;
    return {
      ...data,
      isAuthorized: authorizedRole.includes(data.role),
      isAdmin: adminRole.includes(data.role),
      avatar: data.avatar
        ? `${env.NEXT_PUBLIC_PB_URL}/api/files/${data.collectionName}/${data.id}/${data.avatar}`
        : null,
    };
  });