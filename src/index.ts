import {
  CommandRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import { handlerLogin } from "./commands/users";

function main() {
  const registry: CommandRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Please provide atleast One arguement");
    process.exit(1);
  }

  const cmdName = args[0];
  const otherArgs = args.slice(1);

  try {
    runCommand(registry, cmdName, ...otherArgs);
  } catch (err) {
    console.log(`Error running command ${cmdName}`);
    console.log(`Error: ${(err as Error).message}`);
    process.exit(1);
  }
}

main();
