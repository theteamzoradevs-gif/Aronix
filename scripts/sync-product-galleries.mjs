import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const slugs = [
  "portable-glass-cabin",
  "modular-portable-cabin",
  "mild-steel-portable-toilet-container",
  "second-hand-container",
  "used-shipping-containers",
  "cement-fiber-guard-cabin8x6x8-6",
  "mild-steel-guard-cabin",
  "brown-portable-security-cabin",
  "portable-security-cabins",
  "ms-portable-security-guard-cabin",
  "40-ft-used-shipping-container",
  "puf-cabin",
  "portable-workstation-cabin",
  "white-steel-portable-cabin",
  "portable-office-cabin-2",
  "prefabricated-manager-cabin",
  "ms-portable-bunk-house-cabin-2",
  "mild-steel-portable-guard-cabin-2",
  "ms-portable-shop-cabin",
  "ms-bunk-house-cabin-2",
  "shipping-container-office",
  "steel-portable-cabin",
  "portable-plain-office-cabin",
  "portable-office-cabin",
  "used-shipping-containers-copy",
];

function toLocalImagePath(url) {
  const filename = url.split("?")[0].split("/").pop();
  return `/assets/2025/10/${filename}`;
}

function parseGalleryImages(html) {
  const urls = [];
  const seen = new Set();
  for (const match of html.matchAll(/data-large_image="([^"]+)"/g)) {
    const local = toLocalImagePath(match[1]);
    if (!seen.has(local)) {
      seen.add(local);
      urls.push(local);
    }
  }
  return urls;
}

const productsPath = path.join(__dirname, "../src/data/products.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

for (const slug of slugs) {
  const res = await fetch(`https://aronixinfra.com/product/${slug}/`);
  const html = await res.text();
  const images = parseGalleryImages(html);
  const product = bySlug[slug];
  if (!product) continue;
  product.images = images.length ? images : product.image ? [product.image] : [];
  product.image = product.images[0] ?? product.image;
  console.error(`${slug}: ${product.images.length} gallery images`);
  await new Promise((r) => setTimeout(r, 250));
}

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2) + "\n");
console.error("Updated products.json with gallery images");
