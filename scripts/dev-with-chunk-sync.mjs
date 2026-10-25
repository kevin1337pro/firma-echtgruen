import { spawn } from "node:child_process";
import { createRequire } from "node:module";

import { syncNextServerChunks } from "./next-server-chunk-sync.mjs";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const childArgs = [nextBin, "dev", ...process.argv.slice(2)];

const child = spawn(process.execPath, childArgs, {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
});

let active = true;

const timer = setInterval(() => {
  if (!active) {
    return;
  }

  void syncNextServerChunks().catch((error) => {
    console.error("Chunk sync failed:", error);
  });
}, 500);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    child.kill(signal);
  });
}

child.on("exit", (code, signal) => {
  active = false;
  clearInterval(timer);

  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
