import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "src", "data");
const BASE = "https://aronixinfra.com";

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  return res.json();
}

async function fetchJsonSafe(url, fallback = []) {
  try {
    return await fetchJson(url);
  } catch (e) {
    console.warn(e.message);
    return fallback;
  }
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseSpecsTable(html) {
  const specs = [];
  const rowRegex = /<tr[^>]*>[\s\S]*?<\/tr>/gi;
  const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
  const rows = html.match(rowRegex) || [];
  for (const row of rows) {
    const cells = [];
    let m;
    while ((m = cellRegex.exec(row)) !== null) {
      cells.push(stripHtml(m[1]));
    }
    if (cells.length >= 2 && cells[0] && cells[1] && !cells[0].toLowerCase().includes("material") === false) {
      if (cells[0] !== "Material" && cells[0] !== "HSN Code" && cells[0] !== "HSN Description") {
        specs.push({ label: cells[0], value: cells[1] });
      } else if (cells[0] === "Material" || cells[0] === "Size") {
        specs.push({ label: cells[0], value: cells[1] });
      }
    }
    cellRegex.lastIndex = 0;
  }
  // Better parsing: find td pairs
  const simpleSpecs = [];
  const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
  const tds = [];
  let td;
  while ((td = tdRegex.exec(html)) !== null) {
    tds.push(stripHtml(td[1]));
  }
  for (let i = 0; i < tds.length - 1; i += 2) {
    if (tds[i] && tds[i + 1]) {
      simpleSpecs.push({ label: tds[i], value: tds[i + 1] });
    }
  }
  return simpleSpecs.length ? simpleSpecs : specs;
}

function parseDescription(html) {
  const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (pMatch) return stripHtml(pMatch[1]);
  const text = stripHtml(html);
  return text.slice(0, 500);
}

function extractImageFromYoast(yoastHeadJson) {
  if (yoastHeadJson?.og_image?.[0]?.url) return yoastHeadJson.og_image[0].url;
  return null;
}

function parsePricesFromProductsPage(html) {
  const prices = {};
  const blocks = html.split(/<h2[^>]*>/i);
  for (const block of blocks) {
    const titleMatch = block.match(/^([^<]+)/);
    if (!titleMatch) continue;
    const title = stripHtml(titleMatch[1]);
    const priceMatch = block.match(/₹[\s\S]*?([\d,]+\.?\d*)/);
    if (title && priceMatch) {
      prices[title.trim()] = priceMatch[1].replace(/,/g, "");
    }
  }
  return prices;
}

function extractImagesFromHtml(html) {
  const urls = new Set();
  const regex = /https:\/\/aronixinfra\.com\/wp-content\/uploads\/[^"'\s)]+/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    urls.add(m[0].replace(/\\u002F/g, "/").replace(/\\\//g, "/"));
  }
  return [...urls];
}

async function main() {
  fs.mkdirSync(DATA_DIR, { recursive: true });

  const productsRaw = await fetchJsonSafe(`${BASE}/wp-json/wp/v2/product?per_page=100`, []);
  const postsRaw = await fetchJsonSafe(`${BASE}/wp-json/wp/v2/posts?per_page=10`, []);
  const pagesHome = await fetchJsonSafe(`${BASE}/wp-json/wp/v2/pages?slug=home&_fields=content`, []);
  const pagesAbout = await fetchJsonSafe(`${BASE}/wp-json/wp/v2/pages?slug=about-us&_fields=content`, []);
  const pagesProducts = await fetchJsonSafe(`${BASE}/wp-json/wp/v2/pages?slug=products&_fields=content`, []);
  const pagesBlogs = await fetchJsonSafe(`${BASE}/wp-json/wp/v2/pages?slug=blogs&_fields=content`, []);
  const pagesContact = await fetchJsonSafe(`${BASE}/wp-json/wp/v2/pages?slug=contact-us&_fields=content`, []);

  const productsPageHtml = pagesProducts[0]?.content?.rendered || "";
  const priceMap = parsePricesFromProductsPage(productsPageHtml);

  const products = productsRaw.map((p) => {
    const title = p.title.rendered;
    const imageUrl = extractImageFromYoast(p.yoast_head_json);
    const excerptHtml = p.excerpt?.rendered || "";
    const specs = parseSpecsTable(excerptHtml);
    const description = parseDescription(excerptHtml);
    const price = priceMap[title] || null;
    return {
      id: p.id,
      slug: p.slug,
      title,
      price: price ? parseFloat(price) : null,
      image: imageUrl,
      specs,
      description,
      link: p.link,
    };
  });

  const blogs = postsRaw.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    date: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    excerpt: stripHtml(post.excerpt?.rendered || "").slice(0, 280),
    content: post.content?.rendered || "",
    image: extractImageFromYoast(post.yoast_head_json),
    link: post.link,
  }));

  const homeHtml = pagesHome[0]?.content?.rendered || "";
  const aboutHtml = pagesAbout[0]?.content?.rendered || "";

  const featuredSlugs = [
    "used-shipping-containers",
    "40-ft-used-shipping-container",
    "portable-workstation-cabin",
    "portable-office-cabin-2",
    "mild-steel-portable-guard-cabin-2",
  ];

  const homeProductsSlugs = [
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
  ];

  const site = {
    phone: "9999092934",
    email: "vijay.aronixinfra@gmail.com",
    gst: "09ACCFA4106B1Z3",
    whatsapp: "919999092934",
    addresses: [
      {
        label: "Our Warehouse & office",
        text: "Khata no - 276, Village makora gol chakar, Gautam Buddha nagar, Uttar Pradesh, 201306",
      },
      {
        label: "Another Branch",
        text: "Aronix InfraOffice No. 01, Kacchi Sadak, Suthyana, Crpf Camp, Greater Noida, Gautam Buddha Nagar-201306, Uttar Pradesh, India",
      },
    ],
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.0!2d77.5!3d28.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890",
    directionsUrl: "https://maps.google.com/?q=Greater+Noida+Uttar+Pradesh",
    logo: `${BASE}/wp-content/uploads/2025/10/Untitled-design-2025-10-22T190257.606.png`,
    social: {
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
    },
    certification: {
      title: "IndiaMART Certification",
      subtitle: "Trust Seal Verified",
    },
    footerMeta: {
      employees: "11 to 25 People",
      gstRegistrationDate: "23-08-2023",
    },
    tagline: "Manufacturer and traders of shipping containers and Porta cabins",
    aboutText:
      "Aronix Infra is a dynamic manufacturer and supplier dedicated to delivering high-quality, reliable portable infrastructure solutions that meet the evolving needs of today's industrial, construction, and commercial environments. Founded in 2023 and based in Greater Noida, Uttar Pradesh, we have built a reputation for excellence by combining engineering precision, efficient production processes, and customer-focused services. Our product range spans portable workstation cabins, security guard cabins, portable site offices, prefabricated structures, used shipping and storage containers, and FRP modular toilets—each designed for durability, mobility, and adaptability. At the heart of our operations lies a commitment to quality. We use premium materials, apply rigorous manufacturing standards, and maintain an operational setup that supports both large-scale orders and tailored solutions. With our skilled team and responsive logistics, we ensure timely delivery and dependable service across diverse project requirements.",
    ceo: {
      name: "Vijay Kumar",
      bio: "Vijay Kumar, Founder and Director of Aronix Infra, brings over 7 years of experience in the portable infrastructure and modular building industry. With a strong understanding of site needs, materials, and manufacturing, he has built the company on values of quality, reliability, and trust. His practical approach and focus on client satisfaction have helped Aronix Infra deliver smart, durable, and cost-effective solutions across India.",
      image: `${BASE}/wp-content/uploads/2025/10/Untitled-design-2025-10-08T161908.793.png`,
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featuredProductSlugs: featuredSlugs,
    homeProductSlugs: homeProductsSlugs,
    sliderProductSlugs: homeProductsSlugs,
  };

  const testimonials = [
    {
      quote:
        "Aronix Infra delivers top-notch quality and on-time supply. Their materials have truly strengthened our projects.",
      name: "Rajesh Verma",
      role: "CEO, BuildCore Constructions",
    },
    {
      quote:
        "Highly reliable and professional team. We trust Aronix Infra for all our infrastructure requirements.",
      name: "Priya Mehta",
      role: "Founder, UrbanEdge Developers",
    },
    {
      quote:
        "Great experience working with Aronix Infra. They understand project needs and deliver accordingly.",
      name: "Ankit Sharma",
      role: "Managing Director, Nexon Builders Pvt. Ltd",
    },
    {
      quote:
        "Aronix Infra has been a dependable partner for our large-scale projects. Strongly recommended.",
      name: "Neha Kapoor",
      role: "CEO, Metroline Projects",
    },
  ];

  const hsnCodes = [
    {
      code: "6910",
      description:
        "Ceramic sinks, wash basins, wash basin pedestals, baths, bidets, water closet pans, flushing cisterns, urinals and similar sanitary fixtures",
    },
    {
      code: "8302",
      description:
        "Base metal mountings, fittings and similar articles suitable for furniture, doors, staircases, windows, blinds, coachwork, saddlery, trunks, chests, caskets or the like; base metal hat-racks, hat-pegs, brackets and similar fixtures; castors with mountings of base metal; automatic door closures of base metal",
    },
    {
      code: "8304",
      description:
        "Filing, cabinets, card - index cabinets, paper trays, paper rests, pen trays, office-stamp stands and similar office or desk equipment, of base metal, other than office furniture of heading 9403",
    },
    {
      code: "6904",
      description:
        "Ceramic building bricks, flooring blocks, support or filler tiles and the like",
    },
  ];

  const whyChooseUs = {
    title: "Container Offices & Porta Cabins in India",
    intro:
      "Aronix Infra is India's trusted manufacturer of container offices and portable cabins. We deliver high-quality cabins and containers faster, combining durability, modern design, and cost efficiency. Every project is executed with precision, speed, and attention to detail.",
    advantages: [
      { title: "Delivery in 7–15 Days", desc: "Quick production and setup for rapid deployment." },
      { title: "Certified Quality", desc: "Built using premium materials meeting Indian standards." },
      { title: "End-to-End Support", desc: "Complete assistance From design to installation." },
      { title: "Pan-India Delivery", desc: "Reliable and on-time delivery across all regions." },
    ],
  };

  const trustedBy = {
    title: "Trusted by 50+ Businesses Across India",
    intro:
      "More than 50 businesses nationwide trust Aronix Infra for their container office and cabin requirements. We ensure transparency, timely execution, and dependable service from start to finish, making us a preferred choice for quality prefab solutions.",
    advantages: [
      { title: "Secure & Reliable", desc: "Safe transactions and professional project handling." },
      { title: "Track Record", desc: "Successfully delivered projects for leading companies." },
      { title: "Consistent Quality", desc: "Every cabins are tested for strength and finish." },
      { title: "On-Time Delivery", desc: "Projects completed within the committed timeline" },
    ],
  };

  const prefabComparison = {
    title: "Prefab Construction vs Traditional Construction",
    intro:
      "Prefab construction offers unmatched speed, quality, and flexibility compared to traditional methods.",
    benefits: [
      "Faster Completion: Ready in weeks, not months.",
      "Cost Savings: Up to 40 percent lower total cost.",
      "Weather Independence: Built indoors for zero weather delays.",
      "Superior Quality Control: Factory-tested precision and consistency.",
      "Minimal Waste: Reduced material wastage and cleaner process.",
      "Flexible and Portable: Easily relocatable and expandable.",
      "Eco-Friendly: Sustainable, energy-efficient, and modern.",
    ],
    traditional:
      "Traditional construction, on the other hand, is slower, weather-dependent, costlier, and generates higher waste.",
  };

  // Extract client logos from home page
  const clientImageNames = [
    "Untitled-design-2025-10-09T174359.888.png",
    "Untitled-design-2025-10-09T174337.951.png",
    "Untitled-design-2025-10-09T174257.865.png",
    "Untitled-design-2025-10-09T174236.361.png",
    "Untitled-design-2025-10-09T174216.396.png",
    "Untitled-design-2025-10-09T174157.449.png",
    "Untitled-design-2025-10-09T174139.419.png",
    "Untitled-design-2025-10-09T174119.665.png",
    "Untitled-design-2025-10-09T174055.467.png",
    "Untitled-design-2025-10-09T173925.588.png",
    "Untitled-design-2025-10-09T173820.053.png",
    "Untitled-design-2025-10-09T174315.764-Copy.png",
  ];

  const clients = clientImageNames.map((name, i) => ({
    id: i + 1,
    image: `${BASE}/wp-content/uploads/2025/10/${name}`,
    alt: `Client ${i + 1}`,
  }));

  const albumImages = [
    `${BASE}/wp-content/uploads/2025/10/Untitled-design-2025-10-08T161908.793.png`,
    `${BASE}/wp-content/uploads/2025/10/20-ft-dry-shipping-container-1000x1000-1.jpg`,
    `${BASE}/wp-content/uploads/2025/10/Puf-Cabin-1.jpg`,
    `${BASE}/wp-content/uploads/2025/10/Untitled-design-2025-10-08T155217.885.png`,
    `${BASE}/wp-content/uploads/2025/10/Untitled-design-2025-10-09T115749.089.png`,
    `${BASE}/wp-content/uploads/2025/10/Untitled-design-2025-10-09T113233.303.png`,
  ];

  const allImages = new Set([
    site.logo,
    site.ceo.image,
    ...products.map((p) => p.image).filter(Boolean),
    ...blogs.map((b) => b.image).filter(Boolean),
    ...clients.map((c) => c.image),
    ...albumImages,
    ...extractImagesFromHtml(homeHtml),
    ...extractImagesFromHtml(aboutHtml),
  ]);

  fs.writeFileSync(path.join(DATA_DIR, "products.json"), JSON.stringify(products, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, "blogs.json"), JSON.stringify(blogs, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, "testimonials.json"), JSON.stringify(testimonials, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, "clients.json"), JSON.stringify(clients, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, "site.json"), JSON.stringify({ ...site, albumImages, hsnCodes, whyChooseUs, trustedBy, prefabComparison }, null, 2));
  fs.writeFileSync(
    path.join(DATA_DIR, "asset-urls.json"),
    JSON.stringify([...allImages].filter(Boolean), null, 2)
  );

  console.log(`Fetched ${products.length} products, ${blogs.length} blogs, ${allImages.size} image URLs`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
