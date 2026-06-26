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

function parseSpecs(html) {
  const specs = [];
  const tableMatch = html.match(/<table[^>]*class="[^"]*woocommerce-product-attributes[^"]*"[^>]*>([\s\S]*?)<\/table>/);
  if (!tableMatch) return specs;
  const rows = [...tableMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)];
  for (const row of rows) {
    const label = row[1].match(/<th[^>]*>([\s\S]*?)<\/th>/)?.[1]?.replace(/<[^>]+>/g, "").trim();
    const value = row[1].match(/<td[^>]*>([\s\S]*?)<\/td>/)?.[1]?.replace(/<[^>]+>/g, "").trim();
    if (label && value) specs.push({ label, value });
  }
  return specs;
}

function parseDescription(html) {
  const match = html.match(
    /<div class="woocommerce-product-details__short-description"[^>]*>([\s\S]*?)<\/div>/
  );
  if (!match) return "";
  return match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function parsePrice(html) {
  const match = html.match(/<span class="woocommerce-Price-amount amount">[\s\S]*?([0-9][0-9,]*)/);
  if (!match) return null;
  return Number(match[1].replace(/,/g, ""));
}

async function scrapeProduct(slug) {
  const url = `https://aronixinfra.com/product/${slug}/`;
  const res = await fetch(url);
  const html = await res.text();
  const og = html.match(/property="og:image" content="([^"]+)"/)?.[1] ?? null;
  const title = html.match(/<h1 class="product_title[^"]*"[^>]*>([^<]+)</)?.[1]?.trim() ?? slug;
  return {
    slug,
    title,
    price: parsePrice(html),
    image: og,
    specs: parseSpecs(html),
    description: parseDescription(html),
    link: url,
  };
}

const results = [];
for (const slug of slugs) {
  try {
    const data = await scrapeProduct(slug);
    results.push(data);
    console.error(`OK ${slug}`);
  } catch (e) {
    console.error(`FAIL ${slug}`, e.message);
  }
  await new Promise((r) => setTimeout(r, 250));
}

console.log(JSON.stringify(results, null, 2));
