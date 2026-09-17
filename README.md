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

Edit `private/client-content.json`, then run:

```bash
npm run encrypt
```

Only commit `site/` and the workflow. Do not commit `private/`, generated links, or plaintext input.

## Security boundary

This is encrypted public storage, not server-side authentication. Anyone can download every encrypted payload, but only a holder of the matching 256-bit link key can decrypt one. A recipient can forward their link or copy decrypted content. To revoke a client, generate a replacement key, re-encrypt their record, deploy, and send the new link.
