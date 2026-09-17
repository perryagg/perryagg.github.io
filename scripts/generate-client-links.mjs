import { mkdir, writeFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { randomBytes } from "node:crypto";

function readArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) throw new Error(`Unexpected argument: ${arg}`);
    const name = arg.slice(2);
    if (name === "force") {
      values.force = true;
      continue;
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for --${name}`);
    values[name] = value;
    index += 1;
  }
  return values;
}

const args = readArgs(process.argv.slice(2));
const count = Number.parseInt(args.count ?? "40", 10);
const output = resolve(args.output ?? "private/client-links.json");
const baseUrl = args["base-url"] ?? "https://perryagg.github.io/";

if (!Number.isInteger(count) || count < 1 || count > 10_000) {
  throw new Error("--count must be an integer from 1 to 10000");
}

let siteUrl;
try {
  siteUrl = new URL(baseUrl);
  if (siteUrl.protocol !== "https:") throw new Error("not HTTPS");
} catch {
  throw new Error("--base-url must be a valid HTTPS URL");
}

try {
  await access(output, constants.F_OK);
  if (!args.force) {
    throw new Error(`${output} already exists. Refusing to replace active client keys; use --force only when all data will be re-encrypted.`);
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const clients = Array.from({ length: count }, (_, index) => {
  const id = `client-${String(index + 1).padStart(3, "0")}`;
  const key = randomBytes(32).toString("base64url");
  const link = new URL(siteUrl);
  link.hash = new URLSearchParams({ c: id, k: key }).toString();
  return { id, key, url: link.toString() };
});

await mkdir(dirname(output), { recursive: true, mode: 0o700 });
await writeFile(
  output,
  `${JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), baseUrl: siteUrl.toString(), clients }, null, 2)}\n`,
  { encoding: "utf8", mode: 0o600 },
);

console.log(`Created ${count} client links in ${output}. This file contains every decryption key: keep it private and never commit it.`);
