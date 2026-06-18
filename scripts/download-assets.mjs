import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "src", "data");
const ASSETS_DIR = path.join(ROOT, "public", "assets");

function urlToLocalPath(url) {
  const u = new URL(url);
  const parts = u.pathname.split("/").filter(Boolean);
  const uploadsIdx = parts.indexOf("uploads");
  if (uploadsIdx >= 0) {
    return parts.slice(uploadsIdx + 1).join("/");
  }
  return parts.slice(-2).join("/");
}

function localPublicPath(relativePath) {
  return `/assets/${relativePath.replace(/\\/g, "/")}`;
}

async function downloadFile(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest)) return;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Skip ${url}: ${res.status}`);
      return;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`Downloaded: ${path.basename(dest)}`);
  } catch (e) {
    console.warn(`Failed ${url}:`, e.message);
  }
}

function rewritePaths(obj, urlMap) {
  if (typeof obj === "string") {
    if (urlMap[obj]) return urlMap[obj];
    for (const [remote, local] of Object.entries(urlMap)) {
      if (obj.includes(remote)) return obj.replace(remote, local);
    }
    return obj;
  }
  if (Array.isArray(obj)) return obj.map((v) => rewritePaths(v, urlMap));
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = rewritePaths(v, urlMap);
    }
    return out;
  }
  return obj;
}

async function main() {
  const urlsPath = path.join(DATA_DIR, "asset-urls.json");
  if (!fs.existsSync(urlsPath)) {
    console.error("Run fetch-data first");
    process.exit(1);
  }

  const urls = JSON.parse(fs.readFileSync(urlsPath, "utf8"));
  const urlMap = {};

  for (const url of urls) {
    if (!url || !url.startsWith("http")) continue;
    const rel = urlToLocalPath(url);
    const dest = path.join(ASSETS_DIR, rel);
    await downloadFile(url, dest);
    urlMap[url] = localPublicPath(rel);
  }

  for (const file of ["products.json", "blogs.json", "clients.json", "site.json"]) {
    const fp = path.join(DATA_DIR, file);
    if (!fs.existsSync(fp)) continue;
    const data = JSON.parse(fs.readFileSync(fp, "utf8"));
    const updated = rewritePaths(data, urlMap);
    fs.writeFileSync(fp, JSON.stringify(updated, null, 2));
  }

  console.log(`Mapped ${Object.keys(urlMap).length} assets to local paths`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
