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

function columnLabel(column, label) {
  return label || `欄位 ${String.fromCharCode(64 + column)}`;
}

function validateClients(clients, expectedIds) {
  const seen = new Set();
  for (const client of clients) {
    if (seen.has(client.id)) throw new Error(`Duplicate client ID in worksheet: ${client.id}`);
    if (!expectedIds.has(client.id)) throw new Error(`Unknown client ID in worksheet: ${client.id}`);
    seen.add(client.id);
  }
  const missing = [...expectedIds].filter((id) => !seen.has(id));
  if (missing.length > 0) {
    throw new Error(`Worksheet is missing ${missing.length} client IDs, including: ${missing.slice(0, 5).join(", ")}`);
  }
}

function importClassicRows(sheet, headerColumns, expectedIds) {
  const clients = [];
  for (let rowNumber = 2; rowNumber <= sheet.rowCount; rowNumber += 1) {
    const row = sheet.getRow(rowNumber);
    const id = cellText(row, headerColumns.get("id"));
    const title = cellText(row, headerColumns.get("title"));
    const content = cellText(row, headerColumns.get("content"));
    if (!id && !title && !content) continue;
    if (!id) throw new Error(`Row ${rowNumber} has content but no id`);
    clients.push({ id, title, content });
  }
  validateClients(clients, expectedIds);
  return clients;
}

function importTableRows(sheet, columns, idColumn, nameColumn, expectedIds) {
  const clients = [];
  const identityColumn = idColumn ?? 1;
  for (let rowNumber = 2; rowNumber <= sheet.rowCount; rowNumber += 1) {
    const row = sheet.getRow(rowNumber);
    const identity = cellText(row, identityColumn);
    const rowHasValues = columns.some(({ column }) => cellText(row, column));
    if (!rowHasValues) continue;

    let id;
    if (idColumn) {
      id = identity;
    } else {
      if (!/^\d+$/.test(identity)) throw new Error(`Row ${rowNumber} column A must be a client number such as 1 or 40`);
      id = `client-${identity.padStart(3, "0")}`;
    }
    if (!id) throw new Error(`Row ${rowNumber} has no client identifier`);

    const fields = columns
      .filter(({ column }) => column !== identityColumn)
      .map(({ column, label }) => ({ label, value: cellText(row, column) }))
      .filter(({ value }) => value !== "");
    const name = nameColumn ? cellText(row, nameColumn) : "";
    clients.push({ id, title: name || id, fields });
  }
  validateClients(clients, expectedIds);
  return clients;
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
if (!Array.isArray(keys.clients) || keys.clients.length === 0) throw new Error("The key file does not contain generated clients");
const expectedIds = new Set(keys.clients.map(({ id }) => id));
if (expectedIds.size !== keys.clients.length) throw new Error("The key file has duplicate client IDs");

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(resolve(args.input));
const sheet = args.sheet ? workbook.getWorksheet(args.sheet) : workbook.worksheets[0];
if (!sheet) throw new Error(args.sheet ? `Worksheet not found: ${args.sheet}` : "The workbook has no worksheets");

const columns = Array.from({ length: sheet.columnCount }, (_, index) => {
  const column = index + 1;
  const header = cellText(sheet.getRow(1), column);
  return { column, normalized: header.toLowerCase(), label: columnLabel(column, header) };
});
const headerColumns = new Map();
for (const { column, normalized } of columns) {
  if (!normalized) continue;
  if (headerColumns.has(normalized)) throw new Error(`Duplicate column header: ${normalized}`);
  headerColumns.set(normalized, column);
}

const classicFormat = ["id", "title", "content"].every((header) => headerColumns.has(header));
const clients = classicFormat
  ? importClassicRows(sheet, headerColumns, expectedIds)
  : importTableRows(
    sheet,
    columns,
    headerColumns.get("id"),
    headerColumns.get("姓名") ?? headerColumns.get("name") ?? headerColumns.get("title"),
    expectedIds,
  );

await mkdir(dirname(output), { recursive: true, mode: 0o700 });
await writeFile(output, `${JSON.stringify({ clients }, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
console.log(`Imported ${clients.length} client records from worksheet '${sheet.name}' into ${output}.`);
