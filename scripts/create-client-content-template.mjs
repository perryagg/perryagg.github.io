import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";

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
if (!args.keys || !args.output) {
  throw new Error("Usage: node scripts/create-client-content-template.mjs --keys <client-links.json> --output <client-content.json>");
}

const output = resolve(args.output);
try {
  await access(output, constants.F_OK);
  throw new Error(`${output} already exists. Refusing to overwrite plaintext client content.`);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const keyFile = JSON.parse(await readFile(resolve(args.keys), "utf8"));
if (!Array.isArray(keyFile.clients) || keyFile.clients.length === 0) {
  throw new Error("The key file does not contain generated clients");
}

const clients = keyFile.clients.map(({ id }) => ({
  id,
  title: id,
  content: "Replace this text with the private content for this client.",
}));

await mkdir(dirname(output), { recursive: true, mode: 0o700 });
await writeFile(output, `${JSON.stringify({ clients }, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
console.log(`Created ${clients.length} editable client records in ${output}. Add private content, then run the encryption command.`);
