import { spawn, spawnSync } from "node:child_process";

const BASE_URL = "http://localhost:3000";

async function waitForServer(timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(BASE_URL);
      if (res.status === 200) return true;
    } catch {
      // Wait for boot
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error("Timed out waiting for Next.js production server");
}

function runCommand(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  if (res.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed with exit code ${res.status}`);
  }
}

async function main() {
  console.log("[1/3] Running ESLint...");
  runCommand("npm", ["run", "lint"]);

  console.log("[2/3] Booting Next.js production server for live verification...");
  const server = spawn("npm", ["run", "start"], {
    stdio: "inherit",
    shell: true,
    detached: false,
  });

  try {
    await waitForServer();
    console.log("[2/3] Running regression, security & EXIF test suite...");
    runCommand("npm", ["test"]);

    console.log("[3/3] Running headless browser responsive & visual verification...");
    runCommand("npm", ["run", "verify:browser"]);
  } finally {
    if (process.platform === "win32" && server.pid) {
      spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], {
        stdio: "ignore",
      });
    } else {
      server.kill("SIGTERM");
    }
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
