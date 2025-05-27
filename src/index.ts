import { Config, readConfig, setUser } from "./config";

function main() {
  setUser("Dixi");
  const currConfig: Config = readConfig();
  console.log(currConfig);
}

main();
