import { deleteAllUsers } from "../lib/db/queries/users";

export async function handlerReset(_: string) {
  await resetUsers();
}

async function resetUsers() {
  return await deleteAllUsers();
}
