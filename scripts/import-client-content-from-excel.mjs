import ExcelJS from "exceljs";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";

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

function cellText(row, column) {
  return String(row.getCell(column).text ?? "").trim();
}

const args = readArgs(process.argv.slice(2));
if (!args.input) {
  throw new Error("Usage: npm run import-excel -- --input <clients.xlsx> [--sheet Clients] [--output private/client-content.json] [--keys private/client-links.json] [--force]");
}

const output = resolve(args.output ?? "private/client-content.json");
const keyPath = resolve(args.keys ?? "private/client-links.json");
try {
  await access(output, constants.F_OK);
  if (!args.force) throw new Error(`${output} already exists. Use --force only to replace the current plaintext import.`);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const keys = JSON.parse(await readFile(keyPath, "utf8"));
if (!Array.isArray(keys.clients) || keys.clients.length === 0) {
  throw new Error("The key file does not contain generated clients");
}
const expectedIds = new Set(keys.clients.map(({ id }) => id));
if (expectedIds.size !== keys.clients.length) throw new Error("The key file has duplicate client IDs");

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(resolve(args.input));
const sheet = args.sheet ? workbook.getWorksheet(args.sheet) : workbook.worksheets[0];
if (!sheet) throw new Error(args.sheet ? `Worksheet not found: ${args.sheet}` : "The workbook has no worksheets");

const headers = new Map();
sheet.getRow(1).eachCell((cell, column) => {
  const header = String(cell.text ?? "").trim().toLowerCase();
  if (header) {
    if (headers.has(header)) throw new Error(`Duplicate column header: ${header}`);
    headers.set(header, column);
  }
});
for (const required of ["id", "title", "content"]) {
  if (!headers.has(required)) throw new Error(`Worksheet must have an '${required}' column`);
}

const clients = [];
const seen = new Set();
for (let rowNumber = 2; rowNumber <= sheet.rowCount; rowNumber += 1) {
  const row = sheet.getRow(rowNumber);
  const id = cellText(row, headers.get("id"));
  const title = cellText(row, headers.get("title"));
  const content = cellText(row, headers.get("content"));
  if (!id && !title && !content) continue;
  if (!id) throw new Error(`Row ${rowNumber} has content but no id`);
  if (!expectedIds.has(id)) throw new Error(`Row ${rowNumber} has an unknown client id: ${id}`);
  if (seen.has(id)) throw new Error(`Duplicate client id in worksheet: ${id}`);
  seen.add(id);
  clients.push({ id, title, content });
}

const missing = [...expectedIds].filter((id) => !seen.has(id));
if (missing.length > 0) throw new Error(`Worksheet is missing ${missing.length} client IDs, including: ${missing.slice(0, 5).join(", ")}`);

await mkdir(dirname(output), { recursive: true, mode: 0o700 });
await writeFile(output, `${JSON.stringify({ clients }, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
console.log(`Imported ${clients.length} client records from worksheet '${sheet.name}' into ${output}.`);
