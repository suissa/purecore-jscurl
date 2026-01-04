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
  const args = process.argv.slice(2);
  const codeOrUrl = args[0];

  if (!codeOrUrl) {
    console.log(`${colors.bright}tscurl (r3q) CLI${colors.reset}`);
    console.log(`\nModo Inteligente:`);
    console.log(`  r3q <url>               => GET`);
    console.log(`  r3q <url> <json_body>   => POST (Create)`);
    console.log(`  r3q <url?q> <json_body> => PUT (Update)`);
    console.log(`\nModo Script:`);
    console.log(`  r3q "await r3q.post('url', { ... })"`);
    process.exit(0);
  }

  try {
    // SMART MODE: Se começar com http(s) e não for um bloco de código explícito
    if (
      codeOrUrl.match(/^https?:\/\//) &&
      !codeOrUrl.includes("await ") &&
      !codeOrUrl.includes(";")
    ) {
      const url = codeOrUrl;
      const bodyRaw = args[1];

      let result;

      // GET
      if (!bodyRaw) {
        console.log(`${colors.yellow}Running Smart GET: ${url}${colors.reset}`);
        result = await r3q.get(url);
      }
      // POST ou PUT
      else {
        let body: any;
        try {
          body = JSON.parse(bodyRaw);
        } catch {
          body = bodyRaw; // Fallback para string se não for JSON válido
        }

        const hasQuery = url.includes("?");

        if (hasQuery) {
          console.log(
            `${colors.yellow}Running Smart PUT (Update): ${url}${colors.reset}`
          );
          result = await r3q.put(url, body);
        } else {
          console.log(
            `${colors.yellow}Running Smart POST (Create): ${url}${colors.reset}`
          );
          result = await r3q.post(url, body);
        }
      }

      logResult(result);
      return;
    }

    // SCRIPT MODE (Compatibilidade total com versões anteriores)
    const code = codeOrUrl;
    const AsyncFunction = Object.getPrototypeOf(
      async function () {}
    ).constructor;
    const execute = new AsyncFunction(
      "r3q",
      "req",
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
    console.error(`${colors.red}Erro:${colors.reset}`, err.message);
  }
}

run();
