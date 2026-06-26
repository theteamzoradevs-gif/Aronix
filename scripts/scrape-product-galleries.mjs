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
  if (!url) return null;
  const clean = url.split("?")[0];
  const filename = clean.split("/").pop();
  return `/assets/2025/10/${filename}`;
}

function parseGalleryImages(html) {
  const urls = new Set();

  for (const match of html.matchAll(/data-large_image="([^"]+)"/g)) {
    urls.add(match[1]);
  }
  for (const match of html.matchAll(/data-thumb="([^"]+)"/g)) {
    urls.add(match[1].replace(/-\d+x\d+(?=\.[a-z]+$)/i, ""));
  }
  for (const match of html.matchAll(
    /https:\/\/aronixinfra\.com\/wp-content\/uploads\/2025\/10\/[^"'\s>]+\.(?:jpg|jpeg|png|webp)/gi
  )) {
    urls.add(match[0].split("?")[0]);
  }

  const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  if (og) urls.add(og);

  return [...urls]
    .filter((u) => !u.includes("logo") && !u.includes("trust-seal"))
    .map(toLocalImagePath)
    .filter(Boolean);
}

async function scrapeGallery(slug) {
  const res = await fetch(`https://aronixinfra.com/product/${slug}/`);
  const html = await res.text();
  const images = parseGalleryImages(html);
  return { slug, images };
}

const results = {};
for (const slug of slugs) {
  try {
    const data = await scrapeGallery(slug);
    results[slug] = data.images;
    console.error(`${slug}: ${data.images.length} images`);
  } catch (e) {
    console.error(`FAIL ${slug}`, e.message);
  }
  await new Promise((r) => setTimeout(r, 250));
}

console.log(JSON.stringify(results, null, 2));
