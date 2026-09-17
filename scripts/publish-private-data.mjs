import { access, copyFile, mkdir, mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { constants } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const importScript = resolve(repoRoot, "scripts/import-client-content-from-excel.mjs");
const encryptScript = resolve(repoRoot, "scripts/encrypt-client-data.mjs");
const allowedPaths = new Set(["index.html", "app.js", "style.css"]);

function readArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) throw new Error(`Unexpected argument: ${arg}`);
    const name = arg.slice(2);
    if (["force", "no-commit", "no-push", "allow-dirty", "dry-run"].includes(name)) {
      values[name] = true;
      continue;
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for --${name}`);
    values[name] = value;
    index += 1;
  }
  return values;
}

function run(command, commandArgs, { quiet = false } = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, commandArgs, { cwd: repoRoot, shell: false });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
      if (!quiet) process.stdout.write(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
      if (!quiet) process.stderr.write(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        const detail = (stderr || stdout).trim();
        reject(new Error(`${command} failed with exit code ${code}${detail ? `: ${detail}` : ""}`));
        return;
      }
      resolvePromise({ stdout, stderr });
    });
  });
}

function isAllowedPath(path) {
  return allowedPaths.has(path) || path === "data" || path.startsWith("data/") || path === ".github/workflows" || path.startsWith(".github/workflows/");
}

async function existing(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function gitNames(cached = false) {
  const args = cached ? ["diff", "--cached", "--name-only"] : ["status", "--porcelain", "--untracked-files=all"];
  return (await run("git", args, { quiet: true })).stdout.trim().split(/\r?\n/).filter(Boolean);
}

function statusPaths(statusLines) {
  return statusLines.map((line) => line.slice(3).trim()).filter(Boolean);
}

async function replaceGeneratedData(stagingDir, dataDir) {
  await mkdir(dataDir, { recursive: true });
  const stagedFiles = (await readdir(stagingDir)).filter((name) => /^client-[A-Za-z0-9_-]+\.json$/.test(name));
  const stagedNames = new Set(stagedFiles);
  for (const name of stagedFiles) await copyFile(join(stagingDir, name), join(dataDir, name));
  for (const entry of await readdir(dataDir, { withFileTypes: true })) {
    if (entry.isFile() && /^client-[A-Za-z0-9_-]+\.json$/.test(entry.name) && !stagedNames.has(entry.name)) {
      await rm(join(dataDir, entry.name));
    }
  }
  return stagedFiles;
}

async function main() {
const args = readArgs(process.argv.slice(2));
if (!args.input) {
  throw new Error("Usage: npm run publish-private -- --input <clients.xlsx> [--sheet Clients] [--force] [--message \"Update client data\"] [--no-commit] [--no-push] [--allow-dirty] [--dry-run]");
}

const inputPath = resolve(args.input);
const keysPath = resolve(args.keys ?? "private/client-links.json");
const contentPath = resolve(args.content ?? "private/client-content.json");
if (!(await existing(inputPath))) throw new Error(`Excel file not found: ${inputPath}`);
if (!(await existing(keysPath))) throw new Error(`Client key file not found: ${keysPath}`);
if (await existing(contentPath) && !args.force) {
  throw new Error(`${contentPath} already exists. Check 'Replace existing private content' or pass --force.`);
}
if (!args["dry-run"] && !args["no-commit"]) {
  const beforeStatus = statusPaths(await gitNames());
  if (beforeStatus.length > 0 && !args["allow-dirty"]) {
    throw new Error(`The working tree has existing changes (${beforeStatus.slice(0, 5).join(", ")}). Commit or stash them first, or pass --allow-dirty.`);
  }
  const existingStaged = await gitNames(true);
  const unsafeStaged = existingStaged.filter((path) => !isAllowedPath(path));
  if (unsafeStaged.length > 0) {
    throw new Error(`Unsafe files are already staged: ${unsafeStaged.join(", ")}. Unstage them before publishing.`);
  }
}

const workDir = await mkdtemp(join(tmpdir(), "perryagg-private-publish-"));
const importedContent = join(workDir, "client-content.json");
const encryptedData = join(workDir, "data");

try {
  console.log("[1/4] Importing and validating Excel content...");
  const importArgs = [importScript, "--input", inputPath, "--keys", keysPath, "--output", importedContent];
  if (args.sheet) importArgs.push("--sheet", args.sheet);
  await run(process.execPath, importArgs);

  console.log("[2/4] Encrypting client data...");
  await run(process.execPath, [encryptScript, "--input", importedContent, "--keys", keysPath, "--output", encryptedData]);
  const imported = JSON.parse(await readFile(importedContent, "utf8"));
  const stagedFiles = await readdir(encryptedData);
  console.log(`Prepared ${imported.clients.length} records and ${stagedFiles.length} encrypted files.`);

  if (args["dry-run"]) {
    console.log("Dry run complete. No repository files, commit, or push were changed.");
    return;
  }

  console.log("[3/4] Updating local public data...");
  const dataFiles = await replaceGeneratedData(encryptedData, resolve(repoRoot, "data"));
  await mkdir(dirname(contentPath), { recursive: true });
  await copyFile(importedContent, contentPath);
  console.log(`Updated ${dataFiles.length} encrypted files.`);

  if (args["no-commit"]) {
    console.log("Encryption complete. Commit and push were skipped.");
    return;
  }

  await run("git", ["add", "--", "index.html", "app.js", "style.css", "data", ".github/workflows"]);
  const staged = await gitNames(true);
  const unsafeAfterAdd = staged.filter((path) => !isAllowedPath(path));
  if (unsafeAfterAdd.length > 0) throw new Error(`Refusing to commit unsafe files: ${unsafeAfterAdd.join(", ")}`);
  if (staged.length === 0) {
    console.log("No public changes to commit.");
    return;
  }

  console.log(`[4/4] Committing ${staged.length} public path(s)...`);
  const message = args.message ?? `Update encrypted client data (${new Date().toISOString().slice(0, 10)})`;
  await run("git", ["commit", "-m", message]);
  if (args["no-push"]) {
    console.log("Commit complete. Push was skipped.");
    return;
  }

  console.log("Pushing to origin...");
  await run("git", ["push", "origin", "HEAD"]);
  console.log("Push complete. GitHub Pages deployment should start shortly.");
} finally {
  await rm(workDir, { recursive: true, force: true });
}
}

main().catch((error) => {
  console.error(`ERROR: ${error instanceof Error ? error.message : error}`);
  process.exitCode = 1;
});
