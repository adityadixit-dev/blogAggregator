import { deleteAllUsers } from "../lib/db/queries/users";

export async function handlerReset(_: string) {
  await resetUsers();
  console.log("Database has been reset");
}

async function resetUsers() {
  return await deleteAllUsers();
}
