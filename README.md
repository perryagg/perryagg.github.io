# Private links for GitHub Pages

## Setup

Install the locked dependencies once after cloning the repository (or after removing `node_modules`):

```bash
npm ci
```

The Excel importer uses `exceljs`. It is already declared in `package.json` and locked in `package-lock.json`; `npm ci` installs it locally.

## Graphical publish (Windows)

After setup, double-click `Publish private data.cmd`. Select the workbook if needed, then choose one of these buttons:

- `Encrypt only` updates the local encrypted files without creating a Git commit.
- `Commit & Push` imports the workbook, encrypts the data, creates a commit, and pushes it to `origin`.

The window shows progress and refuses to continue when client IDs are missing or a private/dependency file would be committed. It includes the project's public source files and encrypted `data/` output in the commit so a first-time publish can include the publisher itself. Enable `Replace existing private content` only when the Excel workbook should replace `private/client-content.json`. The app asks for confirmation before committing and pushing.

For the standard workbook at `private/data.xlsx`, double-click `上傳.cmd` to import it, replace existing private content, commit, and push in one step. If any step fails, the command window shows the error and stays open.

Each generated URL has this form:

```text
https://perryagg.github.io/#c=client-001&k=<32-byte-base64url-key>
```

The `#...` fragment is not sent to GitHub Pages. The published site fetches an encrypted JSON payload and decrypts it in the client's browser. Every key file and all plaintext must remain in `private/`, which is ignored by Git.

## Create links

```bash
npm run generate-links
```

This generates 40 256-bit AES keys in `private/client-links.json`. Send each client only the `url` value assigned to them.

## Add private content and encrypt it

Create 40 editable content records from the generated links:

```bash
npm run prepare-content
```

Alternatively, create an `.xlsx` workbook in either supported layout and import its first worksheet with:

```text
id          | title      | content
client-001  | Client 001 | One multi-line text value
```

Or use a table layout:

```text
Number | title      | Any column C | Any column D
1      | Client 001 | First value  | Second value
2      | Client 002 | First value  | Second value
```

In the table layout, column A maps `1` to `client-001`, `2` to `client-002`, and so on. A `title` or `name` column is used as the page title. Every other non-empty cell is captured and displayed as an individual labeled line. If column A contains client IDs instead of numbers, label it `id` and use IDs such as `client-001`.

The repository includes sample column layouts in `examples/client-content-columns.csv` and `examples/client-table-columns.csv`. Excel can open these CSV files; save the edited workbook as `.xlsx` before importing.

```bash
npm run import-excel -- --input private/data.xlsx
```

Use `--sheet <name>` to choose another worksheet. The importer rejects missing, duplicate, or unknown client IDs so it cannot silently encrypt the wrong data. By default it refuses to replace an existing `private/client-content.json`; when intentionally re-importing, add `--force`:

```bash
npm run import-excel -- --input private/data.xlsx --force
```

Then run:

```bash
npm run encrypt
```

Commit the root `index.html`, `app.js`, `style.css`, `data/`, and workflow. Do not commit `private/`, generated links, or plaintext input.

## Security boundary

This is encrypted public storage, not server-side authentication. Anyone can download every encrypted payload, but only a holder of the matching 256-bit link key can decrypt one. A recipient can forward their link or copy decrypted content. To revoke a client, generate a replacement key, re-encrypt their record, deploy, and send the new link.
