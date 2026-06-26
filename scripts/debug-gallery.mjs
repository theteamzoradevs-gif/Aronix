const slug = "portable-glass-cabin";
const res = await fetch(`https://aronixinfra.com/product/${slug}/`);
const html = await res.text();

const gallerySection = html.match(/woocommerce-product-gallery[\s\S]*?woocommerce-product-gallery__wrapper[\s\S]*?<\/figure>/g);
console.log("gallery sections:", gallerySection?.length);

for (const match of html.matchAll(/data-large_image="([^"]+)"/g)) {
  console.log("large:", match[1]);
}
for (const match of html.matchAll(/woocommerce-product-gallery__image[\s\S]*?href="([^"]+)"/g)) {
  console.log("href:", match[1]);
}
