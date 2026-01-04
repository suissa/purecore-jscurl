import { r3q } from "./index";
import { inspect } from "util";

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
};

function logResult(data: any) {
  console.log(`${colors.cyan}--- R3Q Result ---${colors.reset}`);
  console.log(
    inspect(data, {
      showHidden: false,
      depth: null,
      colors: true,
      compact: false,
    })
  );
}

async function run() {
  const code = process.argv[2];

  if (!code) {
    console.log(`${colors.bright}r3q CLI${colors.reset}`);
    console.log(`Uso: r3q "await r3q.post('url', { dado: 1 })"`);
    process.exit(0);
  }

  try {
    const AsyncFunction = Object.getPrototypeOf(
      async function () {}
    ).constructor;
    // Inject 'r3q' and implementation
    const execute = new AsyncFunction(
      "r3q",
      "req", // Alias for backward compatibility if desired, or just convenience
      `
      try {
        const result = ${code.startsWith("await") ? code : "await " + code};
        return result;
      } catch (e) {
        return { error: e.message };
      }
    `
    );

    const result = await execute(r3q, r3q);
    logResult(result);
  } catch (err: any) {
    console.error(`${colors.red}Erro de Sintaxe:${colors.reset}`, err.message);
  }
}

run();
