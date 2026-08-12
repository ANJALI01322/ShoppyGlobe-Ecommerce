import fs from "fs";
import { electronicsProducts } from "../src/data/electronicsData.js";
import { clothesProducts } from "../src/data/clothesData.js";
import { shoesProducts } from "../src/data/shoesData.js";
import { sportsProducts } from "../src/data/sportsData.js";

const shoesFixes = {
  "shoe-029": ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop"],
  "shoe-040": ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop"],
  "shoe-049": ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop"],
  "shoe-052": ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop"],
  "shoe-031": ["https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop"],
  "shoe-046": ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop"],
  "shoe-035": ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop"],
  "shoe-020": ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop"],
  "shoe-034": ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop"],
  "shoe-026": ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop"],
  "shoe-037": ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop"],
  "shoe-032": ["https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop"],
  "shoe-041": ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop"],
  "shoe-047": ["https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop"],
  "shoe-030": ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop"],
  "shoe-044": ["https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop"],
  "shoe-023": ["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop"],
  "shoe-043": ["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop"],
  "shoe-025": ["https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop"]
};

const sportsFixes = {
  "sport-025": ["https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop"],
  "sport-044": ["https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop"],
  "sport-031": ["https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop"],
  "sport-046": ["https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=600&auto=format&fit=crop"],
  "sport-048": ["https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop"],
  "sport-026": ["https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&auto=format&fit=crop"],
  "sport-042": ["https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&auto=format&fit=crop"],
  "sport-052": ["https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop"],
  "sport-031": ["https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop"]
};

const updatedShoes = shoesProducts.map((p) => shoesFixes[p._id] ? { ...p, images: shoesFixes[p._id] } : p);
const updatedSports = sportsProducts.map((p) => sportsFixes[p._id] ? { ...p, images: sportsFixes[p._id] } : p);

fs.writeFileSync("../src/data/shoesData.js", `export const shoesProducts = ${JSON.stringify(updatedShoes, null, 2)};\n`);
fs.writeFileSync("../src/data/sportsData.js", `export const sportsProducts = ${JSON.stringify(updatedSports, null, 2)};\n`);

console.log("✅ shoesData.js & sportsData.js updated!");

// Aggregate all 208 products
const allProducts = [
  ...electronicsProducts,
  ...clothesProducts,
  ...updatedShoes,
  ...updatedSports,
];

const seedContent = `import Product from "./Model/products.model.js";

const initialProducts = ${JSON.stringify(allProducts, null, 2)};

export async function seedProducts() {
  try {
    console.log("🌱 Re-seeding all ${allProducts.length} products into MongoDB collection...");
    await Product.deleteMany({});
    await Product.insertMany(initialProducts);
    console.log("✅ All ${allProducts.length} products successfully seeded into MongoDB!");
  } catch (err) {
    console.error("❌ Error seeding products to MongoDB:", err.message);
  }
}
`;

fs.writeFileSync("./seedData.js", seedContent);
console.log("✅ seedData.js written with all 208 products!");
