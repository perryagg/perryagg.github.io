const SESSION_KEY = "perryagg-private-link-v1";
const status = document.querySelector("#status");
const content = document.querySelector("#content");
const title = document.querySelector("#title");
const message = document.querySelector("#message");
const fields = document.querySelector("#fields");

function bytesFromBase64Url(value) {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error("Invalid private-link encoding.");
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (value.length % 4)) % 4);
  return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
}

function credentials() {
  const fragment = new URLSearchParams(location.hash.slice(1));
  const clientId = fragment.get("c");
  const key = fragment.get("k");
  if (clientId && key) {
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(clientId)) throw new Error("Invalid client identifier.");
    const value = { clientId, key };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
    history.replaceState(null, "", `${location.pathname}${location.search}`);
    return value;
  }
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (!stored) throw new Error("This private link is incomplete or has expired. Please open the original link again.");
  return JSON.parse(stored);
}

async function decryptClientData({ clientId, key: encodedKey }) {
  const keyBytes = bytesFromBase64Url(encodedKey);
  if (keyBytes.length !== 32) throw new Error("This private link has an invalid key.");
  const response = await fetch(`data/${encodeURIComponent(clientId)}.json`, { cache: "no-store" });
  if (!response.ok) throw new Error("No encrypted data is available for this link.");
  const payload = await response.json();
  if (payload.version !== 1 || payload.algorithm !== "AES-256-GCM" || payload.clientId !== clientId) {
    throw new Error("Encrypted data has an unexpected format.");
  }
  const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["decrypt"]);
  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: bytesFromBase64Url(payload.iv),
      additionalData: new TextEncoder().encode(`perryagg.github.io/client-data/v1/${clientId}`),
    },
    cryptoKey,
    bytesFromBase64Url(payload.ciphertext),
  );
  return JSON.parse(new TextDecoder().decode(plaintext));
}

try {
  const data = await decryptClientData(credentials());
  title.textContent = data.title;
  const visibleFields = Array.isArray(data.fields)
    ? data.fields.filter((field) => field && typeof field.label === "string" && typeof field.value === "string")
    : [];
  fields.replaceChildren();
  for (const field of visibleFields) {
    const label = document.createElement("dt");
    label.textContent = field.label;
    const value = document.createElement("dd");
    value.textContent = field.value;
    fields.append(label, value);
  }
  fields.hidden = visibleFields.length === 0;
  message.textContent = typeof data.content === "string" ? data.content : "";
  message.hidden = !message.textContent;
  content.hidden = false;
  status.hidden = true;
} catch (error) {
  sessionStorage.removeItem(SESSION_KEY);
  status.textContent = error instanceof Error ? error.message : "The private page could not be opened.";
}
