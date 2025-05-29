import { getCurrentUser, setUser } from "../config";
import { createUser, getUserByName, getUsers } from "../lib/db/queries/users";

export async function handlerLogin(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  checkArgsLenOrThrowError(cmdName, 1, ...args);

  const userName = args[0];

  const result = await getUserByName(userName);

  if (!result) {
    throw new Error(`Username ${userName} not in Database`);
  }

  setUser(userName);
  console.log(`Username has been set to ${userName}`);
}

export async function handlerRegister(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  checkArgsLenOrThrowError(cmdName, 1, ...args);
  const userName = args[0];
  const result = await createUser(userName);
  if (result) {
    setUser(userName);
    console.log(`User ${userName} Created`);
    // console.log(result);
  }
}

function checkArgsLenOrThrowError(
  cmdName: string,
  expArgsLen: number,
  ...args: string[]
) {
  if (args.length !== expArgsLen) {
    const errMsg = `${cmdName} is expected to have ${expArgsLen} arguements`;
    console.log(errMsg);
    throw new Error(errMsg);
  }
}

export async function handlerUsers(_: string): Promise<void> {
  const allUsers: string[] = await getUsers();

  const currentUser = getCurrentUser();

  for (const user of allUsers) {
    if (user === currentUser) {
      console.log(`* ${user} (current)`);
    } else {
      console.log(`* ${user}`);
    }
  }
}
