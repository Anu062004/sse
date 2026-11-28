const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

// Load the existing TypeScript helpers without adding a test dependency.
const root = path.resolve(__dirname, "..");
const cache = new Map();
function load(relative) {
  if (relative.endsWith(".json")) return require(path.join(root, relative));
  const filename = path.join(root, `${relative}.ts`);
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} };
  cache.set(filename, module);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  });
  vm.runInNewContext(outputText, {
    module, exports: module.exports, process, URL, URLSearchParams,
    require: (id) => id.startsWith("@/") ? load(id.slice(2)) : require(id),
  }, { filename });
  return module.exports;
}

const { products, getProductBySlug } = load("lib/products");
const { categories } = load("data/categories");
const { filterProducts } = load("lib/filters");
const { getPartType, getSpecRows, getDescriptionSections } = load("lib/product-content");
const { productWhatsappHref } = load("lib/links");
const { productSchema } = load("lib/schema");

assert.equal(new Set(products.map(p => p.id)).size, products.length);
assert.equal(new Set(products.map(p => p.slug)).size, products.length);
for (const product of products) {
  assert.ok(categories.some(c => c.slug === product.category), product.slug);
  for (const image of product.images) assert.ok(fs.existsSync(path.join(root, "public", image)), image);
  if (product.image_labels) assert.equal(product.image_labels.length, product.images.length, product.slug);
}
for (const category of categories) assert.ok(fs.existsSync(path.join(root, "public", category.image)), category.slug);

for (const [slug, query, type] of [
  ["slew-and-hydraulic-cylinders", "slew cylinder", "Slew and hydraulic cylinders"],
  ["ram-cylinder-seals", "ram seals", "Ram cylinder seals"],
]) {
  const product = getProductBySlug(slug);
  assert.ok(product);
  assert.ok(filterProducts({ q: query }).some(p => p.slug === slug));
  assert.ok(filterProducts({ category: product.category }).some(p => p.slug === slug));
  assert.equal(getPartType(product), type);
  assert.equal(product.part_number, "");
  assert.equal(product.images.length, 4);
  assert.equal(product.image_labels[0], "Original supplied photo");
  assert.ok(product.image_labels.slice(1).every(label => label.startsWith("AI-generated")));
  assert.ok(!("sku" in productSchema(product)));
  assert.equal(getSpecRows(product).find(row => row.label === "Part no.").value, "Confirmed on enquiry");
  const description = JSON.stringify(getDescriptionSections(product));
  assert.ok(!description.includes("valve block"), "Cylinder listings must not inherit valve-block instructions");
  assert.ok(!description.includes("Spools are sleeved"));
  const message = new URL(productWhatsappHref(product.part_number, product.name)).searchParams.get("text");
  assert.ok(message.includes(product.name));
  assert.ok(!message.includes("()"));
}
const existing = products.find(p => p.part_number);
assert.equal(productSchema(existing).sku, existing.part_number);
assert.ok(new URL(productWhatsappHref(existing.part_number, existing.name)).searchParams.get("text").includes(existing.part_number));
console.log(`Catalogue checks passed for ${products.length} products and ${categories.length} categories.`);
