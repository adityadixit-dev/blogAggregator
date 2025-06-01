import { getCurrUserObj } from "../lib/db/queries/users";
import { User } from "../lib/db/schema";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type UserCommandHandler = (cmdName: string, user: User, ...args: string[]) => Promise<void>;

// export type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export type CommandRegistry = Record<string, CommandHandler>;

export function registerCommand(
  registry: CommandRegistry,
  cmdName: string,
  handler: CommandHandler,
): void {
  registry[cmdName] = handler;
}

export async function runCommand(
  registry: CommandRegistry,
  cmdName: string,
  ...args: string[]
): Promise<void> {
  const handler = registry[cmdName];
  if (!handler) {
    throw new Error(`Command ${cmdName} has not been registered`);
  }
  await handler(cmdName, ...args);
}

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
  async function modifiedHandler(cmdName: string, ...args: string[]): Promise<void> {
    const user = await getCurrUserObj();
    if (!user) {
      throw new Error("User is undefined");
    }
    await handler(cmdName, user, ...args);
  }

  return modifiedHandler;
}
