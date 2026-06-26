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

const BOILERPLATE =
  /We\s+["\u201c]?Aronix Infra,?\s+is the foremost Trader Retailer of Portable Cabins[\s\S]*$/i;

function decodeHtml(text) {
  return text
    .replace(/&#8220;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#215;/g, "×")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function parseSpecs(html) {
  const specs = [];
  const section =
    html.match(/<table[^>]*shop_attributes[^>]*>([\s\S]*?)<\/table>/) ||
    html.match(/woocommerce-product-details__short-description[\s\S]*?<table[^>]*>([\s\S]*?)<\/table>/);
  if (!section) return specs;
  for (const row of section[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const cells = [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((cell) =>
      cell[1].replace(/<[^>]+>/g, "").trim()
    );
    if (cells.length >= 2 && cells[0] && cells[1]) {
      specs.push({ label: cells[0], value: cells[1] });
    }
  }
  return specs;
}

function parsePrice(html) {
  const match = html.match(
    /woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">[\s\S]*?<\/span>([\d,]+(?:\.\d+)?)/
  );
  if (!match) return null;
  return Math.round(Number(match[1].replace(/,/g, "")));
}

function parseDescription(html, specs) {
  const block = html.match(
    /<div class="woocommerce-product-details__short-description"[^>]*>([\s\S]*?)<\/div>/
  );
  if (!block) {
    return specs.length
      ? `${specs[0].label}: ${specs[0].value}. Supplied by Aronix Infra, Greater Noida.`
      : "Manufactured and supplied by Aronix Infra, Greater Noida.";
  }

  const afterTable = decodeHtml(
    block[1]
      .replace(/<table[\s\S]*?<\/table>/i, "")
      .replace(/<h4>\s*<\/h4>/i, "")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(BOILERPLATE, "")
    .trim();

  if (afterTable.length > 25) return afterTable;

  const usage = specs.find((s) => s.label === "Usage/Application")?.value;
  const material = specs.find((s) => s.label === "Material")?.value;
  if (usage && material) {
    return `${material} ${usage.toLowerCase()} unit manufactured and delivered by Aronix Infra from Greater Noida.`;
  }
  if (specs.length) {
    return `${specs[0].label}: ${specs[0].value}. Supplied by Aronix Infra, Greater Noida.`;
  }
  return "Manufactured and supplied by Aronix Infra, Greater Noida.";
}

function inferCategory(title, specs) {
  const haystack = `${title} ${specs.map((s) => `${s.label} ${s.value}`).join(" ")}`.toLowerCase();
  if (haystack.includes("toilet") || haystack.includes("sanitation")) return "toilet";
  if (haystack.includes("bunk")) return "bunk";
  if (haystack.includes("guard") || haystack.includes("security")) return "guard";
  if (haystack.includes("container") || haystack.includes("shipping")) return "container";
  if (haystack.includes("office") || haystack.includes("workstation") || haystack.includes("shop") || haystack.includes("manager")) {
    return "office";
  }
  if (haystack.includes("glass") || haystack.includes("puf") || haystack.includes("modular")) return "custom";
  return "custom";
}

function toLocalImagePath(url) {
  if (!url) return null;
  const filename = url.split("/").pop();
  return `/assets/2025/10/${filename}`;
}

async function scrapeProduct(slug) {
  const link = `https://aronixinfra.com/product/${slug}/`;
  const res = await fetch(link);
  const html = await res.text();
  const image =
    html.match(/property="og:image" content="([^"]+)"/)?.[1] ??
    html.match(/data-large_image="([^"]+)"/)?.[1] ??
    null;
  const title = html.match(/<h1 class="product_title[^"]*"[^>]*>([^<]+)</)?.[1]?.trim() ?? slug;
  const specs = parseSpecs(html);
  return {
    slug,
    title,
    price: parsePrice(html),
    image: toLocalImagePath(image),
    specs,
    description: parseDescription(html, specs),
    link,
    category: inferCategory(title, specs),
  };
}

const existingPath = path.join(__dirname, "../src/data/products.json");
const existing = JSON.parse(fs.readFileSync(existingPath, "utf8"));
const existingBySlug = Object.fromEntries(existing.map((p) => [p.slug, p]));

const results = [];
for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  const prev = existingBySlug[slug];
  try {
    const scraped = await scrapeProduct(slug);
    results.push({
      id: prev?.id ?? 600 - i,
      slug: scraped.slug,
      title: scraped.title,
      price: scraped.price ?? prev?.price ?? null,
      image: scraped.image ?? prev?.image ?? null,
      specs: scraped.specs.length ? scraped.specs : prev?.specs ?? [],
      description: scraped.description || prev?.description || "",
      link: scraped.link,
      category: scraped.category || prev?.category || "custom",
    });
    console.error(`OK ${slug}`);
  } catch (error) {
    console.error(`FAIL ${slug}`, error.message);
    if (prev) results.push(prev);
  }
  await new Promise((r) => setTimeout(r, 250));
}

fs.writeFileSync(existingPath, JSON.stringify(results, null, 2) + "\n");
console.error(`Wrote ${results.length} products`);
