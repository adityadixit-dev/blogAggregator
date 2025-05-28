import { setUser } from "../config";

export function handlerLogin(cmdName: string, ...args: string[]): void {
  if (args.length !== 1) {
    console.log(`${cmdName} handler error`);
    const errorMessage = "Login Requires a username";

    console.log(errorMessage);
    throw new Error(errorMessage);
  }

  const userName = args[0];
  setUser(userName);
  console.log(`Username has been set to ${userName}`);
}
