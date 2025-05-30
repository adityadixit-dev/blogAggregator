import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { firstOrUndefined } from "./utils";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  const result = await db.select().from(users).where(eq(users.name, name));
  return firstOrUndefined(result);
}

export async function getUserByUUID(name: string) {
  const result = await db.select({ uuid: users.id }).from(users).where(eq(users.name, name));
  return result[0].uuid;
}

export async function deleteAllUsers() {
  await db.delete(users);
}

export async function getUsers(): Promise<string[]> {
  const namesOfUsers = await db.select({ name: users.name }).from(users);
  return namesOfUsers.map((user) => user.name);
}
