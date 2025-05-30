import {
  CommandRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import { handlerLogin, handlerRegister, handlerUsers } from "./commands/users";
import { handlerReset } from "./commands/reset_users";
import { handlerAgg } from "./commands/aggregator";

async function main() {
  const registry: CommandRegistry = {};
  // Register Commands here
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);

  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Please provide atleast One arguement");
    process.exit(1);
  }

  const cmdName = args[0];
  const otherArgs = args.slice(1);

  try {
    await runCommand(registry, cmdName, ...otherArgs);
  } catch (err) {
    console.log(`Error running command ${cmdName}`);
    console.log(`Error: ${(err as Error).message}`);
    process.exit(1);
  }

  process.exit(0);
}

await main();
