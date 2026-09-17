import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createCipheriv, randomBytes } from "node:crypto";

function readArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) throw new Error(`Unexpected argument: ${arg}`);
    const name = arg.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for --${name}`);
    values[name] = value;
    index += 1;
  }
  return values;
}

const args = readArgs(process.argv.slice(2));
if (!args.input || !args.keys || !args.output) {
  throw new Error("Usage: node scripts/encrypt-client-data.mjs --input <content.json> --keys <client-links.json> --output <site/data>");
}

const input = JSON.parse(await readFile(resolve(args.input), "utf8"));
const keyFile = JSON.parse(await readFile(resolve(args.keys), "utf8"));
const output = resolve(args.output);
const clients = input.clients;

if (!Array.isArray(clients)) throw new Error("Input must be an object with a clients array");
if (!Array.isArray(keyFile.clients)) throw new Error("Key file does not contain clients");

const keys = new Map(keyFile.clients.map((client) => [client.id, client.key]));
const suppliedIds = new Set();

for (const client of clients) {
  if (!client || typeof client.id !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(client.id)) {
    throw new Error("Each client needs a safe id containing only letters, numbers, _ or -");
  }
  if (suppliedIds.has(client.id)) throw new Error(`Duplicate client id: ${client.id}`);
  if (!keys.has(client.id)) throw new Error(`No generated key exists for ${client.id}`);
  if (client.fields !== undefined && (!Array.isArray(client.fields) || client.fields.some((field) => !field || typeof field.label !== "string" || typeof field.value !== "string"))) {
    throw new Error(`Fields for ${client.id} must be an array of { label, value } strings`);
  }
  suppliedIds.add(client.id);
}

if (suppliedIds.size !== keys.size) {
  throw new Error(`Expected content for all ${keys.size} generated clients, but received ${suppliedIds.size}. Add every client before encrypting.`);
}

await mkdir(output, { recursive: true });
for (const entry of await readdir(output, { withFileTypes: true })) {
  if (entry.isFile() && /^client-[A-Za-z0-9_-]+\.json$/.test(entry.name)) {
    await rm(resolve(output, entry.name));
  }
}

for (const client of clients) {
  const key = Buffer.from(keys.get(client.id), "base64url");
  if (key.length !== 32) throw new Error(`Invalid AES-256 key for ${client.id}`);

  const iv = randomBytes(12);
  const aad = Buffer.from(`perryagg.github.io/client-data/v1/${client.id}`, "utf8");
  const plaintext = Buffer.from(JSON.stringify({
    title: client.title ?? "Private client data",
    content: client.content ?? "",
    fields: client.fields ?? [],
  }), "utf8");
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  cipher.setAAD(aad);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);
  const payload = {
    version: 1,
    algorithm: "AES-256-GCM",
    clientId: client.id,
    iv: iv.toString("base64url"),
    ciphertext: ciphertext.toString("base64url"),
  };
  await writeFile(resolve(output, `${client.id}.json`), `${JSON.stringify(payload)}\n`, "utf8");
}

console.log(`Encrypted ${clients.length} client records into ${output}. Commit only these encrypted JSON files, never the input or key file.`);
