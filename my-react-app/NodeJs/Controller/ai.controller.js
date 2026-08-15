import Product from "../Model/products.model.js";
import axios from "axios";

export async function chatWithAssistant(req, res) {
  try {
    const { message } = req.body;
    if (!message || !String(message).trim()) {
      return.status(400).json({ success: false, message: "Please ask a question." });
    }

    const query = String(message).trim().toLowerCase();

    // Extract potential budget or category constraints from query
    let budget = null;
    const budgetMatch = query.match(/(?:under|below|less than|upto|budget)\s*(?:rs\.?|inr|₹)?\s*(\d+)/i);
    if (budgetMatch) {
      budget = Number(budgetMatch[1]);
    }

    let categoryFilter = null;
    if (query.includes("phone") || query.includes("smartphone") || query.includes("mobile") || query.includes("electronic")) {
      categoryFilter = "electronics";
    } else if (query.includes("shoe") || query.includes("sneaker") || query.includes("boot") || query.includes("footwear")) {
      categoryFilter = "shoes";
    } else if (query.includes("sport") || query.includes("fitness") || query.includes("gym") || query.includes("bat") || query.includes("ball")) {
      categoryFilter = "sports";
    } else if (query.includes("cloth") || query.includes("shirt") || query.includes("dress") || query.includes("jacket") || query.includes("jean") || query.includes("hoodie") || query.includes("wear")) {
      categoryFilter = "clothes";
    }

    // Build MongoDB query
    const dbQuery = { stock: { $gt: 0 } };
    if (categoryFilter) {
      dbQuery.category = categoryFilter;
    }
    if (budget) {
      dbQuery.price = { $lte: budget };
    }

    // Fetch relevant products from MongoDB (limit to 15)
    let candidateProducts = [];
    try {
      candidateProducts = await Product.find(dbQuery).limit(15).lean();
    } catch (e) {
      console.error("DB query error in AI chat:", e);
    }

    // If query didn't match specific filters or returned few results, fetch general popular items
    if (candidateProducts.length === 0) {
      candidateProducts = await Product.find({ stock: { $gt: 0 } }).limit(12).lean();
    }

    const catalogSummary = candidateProducts.map((p) => ({
      id: p._id,
      title: p.title,
      price: p.price,
      category: p.category,
      stock: p.stock,
      rating: p.rating,
    }));

    const apiKey = process.env.OPENAI_API_KEY;
    let assistantReply = "";
    let recommendedIds = [];

    if (!apiKey || apiKey.includes("dummykey")) {
      // Smart Fallback Assistant mode when API key is not configured
      assistantReply = `Here are the best matching items from our store based on your request "${message}":`;
      recommendedIds = candidateProducts.slice(0, 4).map((p) => p._id);
    } else {
      // Use OpenAI API
      const systemPrompt = `You are ShoppyGlobe AI Shopping Assistant. 
You must ONLY recommend products from the provided JSON product catalog. Never invent products or IDs.
User Query: "${message}"

Available Products Catalog:
${JSON.stringify(catalogSummary, null, 2)}

Instructions:
1. Recommend 1 to 4 best matching products from the catalog above.
2. Provide a helpful, friendly, and concise conversational reply.
3. Output your response strictly in the following JSON format without markdown code blocks:
{
  "reply": "Your conversational response here...",
  "recommendedIds": ["id1", "id2"]
}`;

      try {
        const aiRes = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: systemPrompt }],
            temperature: 0.3,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        const content = aiRes.data?.choices?.[0]?.message?.content || "";
        const parsed = JSON.parse(content.replace(/```json/g, "").replace(/```/g, "").trim());
        assistantReply = parsed.reply || "Here are our top recommendations for you:";
        recommendedIds = Array.isArray(parsed.recommendedIds) ? parsed.recommendedIds : [];
      } catch (aiErr) {
        console.error("OpenAI API error:", aiErr?.response?.data || aiErr.message);
        assistantReply = `Here are some great items that match what you're looking for:`;
        recommendedIds = candidateProducts.slice(0, 4).map((p) => p._id);
      }
    }

    // Map recommended IDs back to full product objects from MongoDB candidate set
    const recommendedProducts = candidateProducts.filter((p) =>
      recommendedIds.map(String).includes(String(p._id))
    );

    // If AI returned empty or invalid IDs, fallback to top candidates
    const finalRecommendations = recommendedProducts.length > 0 ? recommendedProducts : candidateProducts.slice(0, 4);

    return res.status(200).json({
      success: true,
      reply: assistantReply,
      products: finalRecommendations,
    });
  } catch (error) {
    console.error("AI Chat Controller Error:", error);
    return res.status(500).json({ success: false, message: "AI Assistant is currently unavailable." });
  }
}
