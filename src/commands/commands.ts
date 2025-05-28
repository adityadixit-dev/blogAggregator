export type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandRegistry = Record<string, CommandHandler>;

export function registerCommand(
  registry: CommandRegistry,
  cmdName: string,
  handler: CommandHandler,
): void {
  registry[cmdName] = handler;
}

export function runCommand(
  registry: CommandRegistry,
  cmdName: string,
  ...args: string[]
): void {
  const handler = registry[cmdName];
  if (!handler) {
    throw new Error(`Command ${cmdName} has not been registered`);
  }
  handler(cmdName, ...args);
}
