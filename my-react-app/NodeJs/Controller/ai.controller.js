import Product from "../Model/products.model.js";
import axios from "axios";

export async function chatWithAssistant(req, res) {
  try {
    const { message } = req.body;

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        success: false,
        message: "Please ask a question.",
      });
    }

    const originalQuery = String(message).trim();
    const query = originalQuery.toLowerCase();

    // =========================================================
    // 1. EXTRACT BUDGET
    // =========================================================

    let budget = null;

    const budgetPatterns = [
      /(?:under|below|less than|upto|up to|max|maximum|within)\s*(?:rs\.?|inr|₹)?\s*([\d,]+)/i,
      /(?:rs\.?|inr|₹)\s*([\d,]+)/i,
      /([\d,]+)\s*(?:rs|rupees)/i,
    ];

    for (const pattern of budgetPatterns) {
      const match = query.match(pattern);

      if (match) {
        budget = Number(match[1].replace(/,/g, ""));
        break;
      }
    }

    // =========================================================
    // 2. DETECT CATEGORY
    // =========================================================

    let categoryFilter = null;

    const categoryKeywords = {
      electronics: [
        "phone",
        "smartphone",
        "mobile",
        "iphone",
        "android",
        "samsung",
        "laptop",
        "notebook",
        "computer",
        "tablet",
        "ipad",
        "macbook",
        "headphone",
        "headphones",
        "earphone",
        "earbuds",
        "airpods",
        "watch",
        "smartwatch",
        "camera",
        "television",
        "tv",
        "monitor",
        "keyboard",
        "mouse",
        "electronic",
        "electronics",
      ],

      shoes: [
        "shoe",
        "shoes",
        "sneaker",
        "sneakers",
        "boot",
        "boots",
        "footwear",
        "sandals",
        "slipper",
        "slippers",
      ],

      sports: [
        "sport",
        "sports",
        "fitness",
        "gym",
        "cricket",
        "bat",
        "ball",
        "football",
        "basketball",
        "tennis",
        "badminton",
        "racket",
        "rackets",
        "exercise",
        "workout",
        "yoga",
      ],

      clothes: [
        "cloth",
        "clothes",
        "clothing",
        "shirt",
        "shirts",
        "tshirt",
        "t-shirt",
        "dress",
        "dresses",
        "jacket",
        "jackets",
        "jean",
        "jeans",
        "hoodie",
        "hoodies",
        "saree",
        "sari",
        "kurti",
        "kurta",
        "top",
        "tops",
        "pant",
        "pants",
        "trouser",
        "trousers",
        "shorts",
        "skirt",
        "wear",
        "fashion",
      ],
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some((keyword) => query.includes(keyword))) {
        categoryFilter = category;
        break;
      }
    }

    // =========================================================
    // 3. DETECT PRODUCT KEYWORDS
    // =========================================================

    const productKeywords = [];

    const keywordGroups = [
      [
        "smartphone",
        "phone",
        "mobile",
        "iphone",
        "android",
        "samsung",
      ],
      [
        "laptop",
        "notebook",
        "macbook",
        "computer",
      ],
      [
        "tablet",
        "ipad",
      ],
      [
        "headphone",
        "headphones",
        "earphone",
        "earphones",
        "earbuds",
        "airpods",
      ],
      [
        "camera",
      ],
      [
        "watch",
        "smartwatch",
      ],
      [
        "shoe",
        "shoes",
        "sneaker",
        "sneakers",
        "boots",
        "footwear",
        "sandals",
        "slippers",
      ],
      [
        "shirt",
        "shirts",
        "tshirt",
        "t-shirt",
      ],
      [
        "dress",
        "dresses",
        "saree",
        "sari",
        "kurti",
        "kurta",
        "jacket",
        "jeans",
        "hoodie",
      ],
      [
        "cricket",
        "football",
        "basketball",
        "badminton",
        "tennis",
        "gym",
        "fitness",
        "sports",
      ],
    ];

    for (const group of keywordGroups) {
      if (group.some((keyword) => query.includes(keyword))) {
        productKeywords.push(...group);
      }
    }

    // =========================================================
    // 4. BUILD MONGODB QUERY
    // =========================================================

    const dbQuery = {
      stock: { $gt: 0 },
    };

    if (categoryFilter) {
      dbQuery.category = categoryFilter;
    }

    if (budget !== null && budget > 0) {
      dbQuery.price = {
        $lte: budget,
      };
    }

    // =========================================================
    // 5. FETCH PRODUCTS
    // =========================================================

    let candidateProducts = [];

    try {
      /*
       * First try exact product/category matching.
       */

      if (productKeywords.length > 0) {
        const keywordRegex = productKeywords
          .map((keyword) =>
            keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          )
          .join("|");

        const keywordQuery = {
          ...dbQuery,
          $or: [
            {
              title: {
                $regex: keywordRegex,
                $options: "i",
              },
            },
            {
              description: {
                $regex: keywordRegex,
                $options: "i",
              },
            },
          ],
        };

        candidateProducts = await Product.find(keywordQuery)
          .sort({
            rating: -1,
            reviewCount: -1,
          })
          .limit(20)
          .lean();
      }

      /*
       * If product keyword search found nothing,
       * fall back to category products.
       */

      if (candidateProducts.length === 0 && categoryFilter) {
        candidateProducts = await Product.find(dbQuery)
          .sort({
            rating: -1,
            reviewCount: -1,
          })
          .limit(20)
          .lean();
      }

      /*
       * If no category/product filter exists,
       * show highly rated products.
       */

      if (candidateProducts.length === 0 && !categoryFilter) {
        candidateProducts = await Product.find({
          stock: { $gt: 0 },
        })
          .sort({
            rating: -1,
            reviewCount: -1,
          })
          .limit(20)
          .lean();
      }
    } catch (dbError) {
      console.error("DB query error in AI chat:", dbError);
    }

    // =========================================================
    // 6. PREVENT RANDOM RECOMMENDATIONS
    // =========================================================

    if (candidateProducts.length === 0) {
      return res.status(200).json({
        success: true,
        reply: `Sorry, I couldn't find an in-stock product matching "${originalQuery}". Try a different category or budget.`,
        products: [],
      });
    }

    // =========================================================
    // 7. CREATE CATALOG FOR AI
    // =========================================================

    const catalogSummary = candidateProducts.map((product) => ({
      id: String(product._id),
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      rating: product.rating,
      reviewCount: product.reviewCount,
    }));

    // =========================================================
    // 8. OPENAI
    // =========================================================

    const apiKey = process.env.OPENAI_API_KEY;

    let assistantReply = "";
    let recommendedIds = [];

    // =========================================================
    // 9. FALLBACK MODE
    // =========================================================

    if (!apiKey || apiKey.includes("dummykey")) {
      assistantReply = `Here are some of the best matching products for "${originalQuery}":`;

      recommendedIds = candidateProducts
        .slice(0, 4)
        .map((product) => String(product._id));
    } else {
      // =======================================================
      // 10. OPENAI MODE
      // =======================================================

      const systemPrompt = `
You are ShoppsyMart AI Shopping Assistant.

You help customers find products from the ShoppsyMart ecommerce store.

IMPORTANT RULES:

1. Recommend ONLY products from the provided catalog.
2. NEVER invent product names.
3. NEVER invent product IDs.
4. NEVER recommend products that are not in the catalog.
5. Recommend between 1 and 4 products.
6. Prefer products with higher ratings when the user asks for "good", "best", "top", or similar words.
7. Respect the user's budget.
8. Respect the user's requested category.
9. Keep the response short, friendly and useful.
10. If the catalog does not contain a suitable product, return an empty recommendedIds array.

User Query:
"${originalQuery}"

Detected Category:
${categoryFilter || "none"}

Detected Budget:
${budget || "none"}

Available Product Catalog:
${JSON.stringify(catalogSummary, null, 2)}

Return ONLY valid JSON:

{
  "reply": "short helpful response",
  "recommendedIds": ["productId1", "productId2"]
}
`;

      try {
        const aiRes = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
            ],
            temperature: 0.2,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        const content =
          aiRes.data?.choices?.[0]?.message?.content || "";

        const cleanedContent = content
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const parsed = JSON.parse(cleanedContent);

        assistantReply =
          parsed.reply ||
          "Here are some products I think you may like.";

        recommendedIds = Array.isArray(parsed.recommendedIds)
          ? parsed.recommendedIds.map(String)
          : [];
      } catch (aiError) {
        console.error(
          "OpenAI API error:",
          aiError?.response?.data || aiError.message
        );

        // Safe fallback to MongoDB results
        assistantReply =
          `Here are some good matching products for "${originalQuery}":`;

        recommendedIds = candidateProducts
          .slice(0, 4)
          .map((product) => String(product._id));
      }
    }

    // =========================================================
    // 11. MAP AI IDs TO REAL MONGODB PRODUCTS
    // =========================================================

    const recommendedProducts = candidateProducts.filter((product) =>
      recommendedIds.includes(String(product._id))
    );

    // =========================================================
    // 12. SAFE FALLBACK
    // =========================================================

    const finalRecommendations =
      recommendedProducts.length > 0
        ? recommendedProducts
        : candidateProducts.slice(0, 4);

    // =========================================================
    // 13. RESPONSE
    // =========================================================

    return res.status(200).json({
      success: true,
      reply: assistantReply,
      products: finalRecommendations,
    });
  } catch (error) {
    console.error("AI Chat Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI Assistant is currently unavailable.",
    });
  }
}