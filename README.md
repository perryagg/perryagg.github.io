# Private links for GitHub Pages

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

or the table layout shown in the example image:

```text
序號 | 姓名       | Any column C | Any column D
1    | Client 001 | First value  | Second value
2    | Client 002 | First value  | Second value
```

In the table layout, column A maps `1` to `client-001`, `2` to `client-002`, and so on. `姓名` is used as the page title. Every non-empty cell from `姓名` onward is captured and displayed as an individual labeled line. Empty headers are shown as `欄位 C`, `欄位 D`, and so on.

```bash
npm run import-excel -- --input private/clients.xlsx
```

Use `--sheet <name>` to choose another worksheet. The importer rejects missing, duplicate, or unknown client IDs so it cannot silently encrypt the wrong data.

Then run:

```bash
npm run encrypt
```

Commit the root `index.html`, `app.js`, `style.css`, `data/`, and workflow. Do not commit `private/`, generated links, or plaintext input.

## Security boundary

This is encrypted public storage, not server-side authentication. Anyone can download every encrypted payload, but only a holder of the matching 256-bit link key can decrypt one. A recipient can forward their link or copy decrypted content. To revoke a client, generate a replacement key, re-encrypt their record, deploy, and send the new link.
