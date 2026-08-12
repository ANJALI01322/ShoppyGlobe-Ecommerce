const REVIEW_POOL = {
  "elec-001": { rating: 4.8, reviewCount: 2341, reviews: [
    { id: 1, name: "Aryan Sharma", avatar: "AS", date: "Aug 2, 2026", rating: 5, text: "Absolutely stunning phone. The titanium build feels premium and camera quality is unreal. Worth every rupee!" },
    { id: 2, name: "Priya Verma",  avatar: "PV", date: "Jul 28, 2026", rating: 5, text: "Switched from Android and blown away. A17 Pro handles everything effortlessly. Battery life is great too." },
    { id: 3, name: "Rohit Nair",   avatar: "RN", date: "Jul 20, 2026", rating: 4, text: "Excellent phone overall. 5x telephoto is a game-changer. Slightly pricey but quality is top-notch." },
    { id: 4, name: "Sneha Gupta",  avatar: "SG", date: "Jul 15, 2026", rating: 5, text: "Best iPhone ever. Action button is super useful and FaceID is blazingly fast." },
  ]},
  "elec-002": { rating: 2.7, reviewCount: 1876, reviews: [
    { id: 1, name: "Karan Mehta",  avatar: "KM", date: "Aug 5, 2026",  rating: 3, text: "Phone gets warm very quickly during charging and battery backup is average for the price." },
    { id: 2, name: "Divya Singh",  avatar: "DS", date: "Jul 30, 2026", rating: 2, text: "Camera is decent but low-light performance disappointed me. Expected better." },
    { id: 3, name: "Amit Patel",   avatar: "AP", date: "Jul 22, 2026", rating: 3, text: "S Pen is good but overall phone feels very heavy in hand." },
    { id: 4, name: "Neha Kapoor",  avatar: "NK", date: "Jul 10, 2026", rating: 3, text: "Overpriced considering the heating issues during gaming." },
  ]},
  "elec-003": { rating: 4.9, reviewCount: 987, reviews: [
    { id: 1, name: "Vikram Rao",   avatar: "VR", date: "Aug 1, 2026",  rating: 5, text: "M3 Max is an absolute powerhouse. Video editing and 3D rendering - handles everything effortlessly." },
    { id: 2, name: "Ananya Joshi", avatar: "AJ", date: "Jul 25, 2026", rating: 5, text: "Display is breathtaking. Colors are accurate and battery lasts all day." },
    { id: 3, name: "Siddharth K", avatar: "SK", date: "Jul 18, 2026", rating: 5, text: "Best laptop for developers. Xcode builds run in seconds with zero fan noise." },
    { id: 4, name: "Meera Pillai", avatar: "MP", date: "Jul 9, 2026",  rating: 4, text: "Keyboard and trackpad are class apart. Premium build throughout." },
  ]},
  "elec-004": { rating: 3.2, reviewCount: 3120, reviews: [
    { id: 1, name: "Rahul Tiwari", avatar: "RT", date: "Aug 3, 2026",  rating: 3, text: "Noise cancellation is okay, but ear cushions get sweaty after 1 hour." },
    { id: 2, name: "Pooja Yadav",  avatar: "PY", date: "Jul 29, 2026", rating: 3, text: "Sound quality is average. Bluetooth disconnects occasionally." },
    { id: 3, name: "Nikhil Bose",  avatar: "NB", date: "Jul 21, 2026", rating: 4, text: "Decent battery life but build quality could be more sturdy." },
    { id: 4, name: "Tanvi Saxena", avatar: "TS", date: "Jul 14, 2026", rating: 3, text: "Okay headphones, but overpriced for what they offer." },
  ]},
  "elec-005": { rating: 4.8, reviewCount: 5432, reviews: [
    { id: 1, name: "Aakash Dubey", avatar: "AD", date: "Aug 4, 2026",  rating: 5, text: "PS5 Slim is sleek and quiet. Games load in seconds. DualSense haptics are amazing." },
    { id: 2, name: "Riya Chopra",  avatar: "RC", date: "Jul 27, 2026", rating: 5, text: "Haptic feedback in Spider-Man 2 is insane. Immersive experience." },
    { id: 3, name: "Gaurav Mishra",avatar: "GM", date: "Jul 19, 2026", rating: 4, text: "Great console. Games run at solid 60fps." },
    { id: 4, name: "Swati Reddy",  avatar: "SR", date: "Jul 11, 2026", rating: 5, text: "PlayStation exclusives make this a must-buy." },
  ]},
  "elec-006": { rating: 3.4, reviewCount: 650, reviews: [
    { id: 1, name: "Manish Kumar", avatar: "MK", date: "Aug 1, 2026", rating: 3, text: "Good screen but battery drains fast when watching 4K content." },
    { id: 2, name: "Deepa Shah",   avatar: "DS", date: "Jul 24, 2026", rating: 4, text: "Performance is smooth for daily tasks." },
  ]},
  "elec-008": { rating: 2.5, reviewCount: 430, reviews: [
    { id: 1, name: "Vikrant Singh",avatar: "VS", date: "Aug 2, 2026", rating: 2, text: "Too bulky on wrist and battery lasts less than 24 hours. Disappointed." },
    { id: 2, name: "Neha Roy",     avatar: "NR", date: "Jul 20, 2026", rating: 3, text: "Features are nice but not worth the high price tag." },
  ]},
  "shoe-001": { rating: 3.1, reviewCount: 890, reviews: [
    { id: 1, name: "Sameer Joshi", avatar: "SJ", date: "Aug 3, 2026", rating: 3, text: "Looks stylish but sole is quite stiff for running long distances." },
    { id: 2, name: "Raman Kant",   avatar: "RK", date: "Jul 18, 2026", rating: 3, text: "Sizing runs small. Recommend ordering 1 size larger." },
  ]},
  "shoe-002": { rating: 2.8, reviewCount: 654, reviews: [
    { id: 1, name: "Kavita Rao",   avatar: "KR", date: "Aug 1, 2026", rating: 2, text: "Stitching started coming off within 3 weeks of usage. Not happy." },
    { id: 2, name: "Abhay Sharma", avatar: "AS", date: "Jul 15, 2026", rating: 3, text: "Comfortable for walking, but mesh material feels cheap." },
  ]},
  "clot-001": { rating: 3.3, reviewCount: 1420, reviews: [
    { id: 1, name: "Alok Gupta",   avatar: "AG", date: "Aug 4, 2026", rating: 3, text: "Color faded slightly after first wash. Fit is decent." },
    { id: 2, name: "Sunil Mehra",  avatar: "SM", date: "Jul 22, 2026", rating: 4, text: "Good fit for slim guys." },
  ]},
  "clot-002": { rating: 2.4, reviewCount: 945, reviews: [
    { id: 1, name: "Tarun Bajaj",  avatar: "TB", date: "Aug 2, 2026", rating: 2, text: "Fabric feels thin and collar lost shape quickly." },
    { id: 2, name: "Preeti Jain",  avatar: "PJ", date: "Jul 19, 2026", rating: 3, text: "Average quality t-shirt." },
  ]},
  "spor-001": { rating: 3.5, reviewCount: 420, reviews: [
    { id: 1, name: "Girish Nath",  avatar: "GN", date: "Aug 3, 2026", rating: 4, text: "Good grip and weight distribution." },
    { id: 2, name: "Manoj Paul",   avatar: "MP", date: "Jul 17, 2026", rating: 3, text: "Rubber coating smells a bit strong initially." },
  ]},
};

const DEFAULT_REVIEWS = [
  { id: 1, name: "Aryan Sharma", avatar: "AS", date: "Aug 1, 2026",  rating: 4, text: "Good product. Works well and meets expectations." },
  { id: 2, name: "Priya Verma",  avatar: "PV", date: "Jul 25, 2026", rating: 3, text: "Average build quality. Delivery was fast." },
  { id: 3, name: "Rahul Tiwari", avatar: "RT", date: "Jul 18, 2026", rating: 4, text: "Satisfied with purchase. Good value for money." },
  { id: 4, name: "Sneha Gupta",  avatar: "SG", date: "Jul 10, 2026", rating: 3, text: "Decent product overall." },
];

export function getProductReviews(productId) {
  const id = String(productId);
  let baseData = REVIEW_POOL[id];
  if (!baseData) {
    const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const rating = 2.3 + (hash % 27) / 10;
    const reviewCount = 80 + (hash % 920);
    const roundedRating = Math.min(4.9, Math.round(rating * 10) / 10);
    baseData = { rating: roundedRating, reviewCount, reviews: [...DEFAULT_REVIEWS] };
  } else {
    baseData = { ...baseData, reviews: [...baseData.reviews] };
  }

  // Load custom user submitted reviews from localStorage
  try {
    const userReviews = JSON.parse(localStorage.getItem("pvx_user_reviews") || "{}");
    const itemReviews = userReviews[id] || [];
    if (itemReviews.length > 0) {
      const combinedReviews = [...itemReviews, ...baseData.reviews];
      const totalRatingSum = combinedReviews.reduce((sum, r) => sum + Number(r.rating || 5), 0);
      const avgRating = Math.min(5, Math.max(1, Math.round((totalRatingSum / combinedReviews.length) * 10) / 10));
      return {
        rating: avgRating,
        reviewCount: baseData.reviewCount + itemReviews.length,
        reviews: combinedReviews,
      };
    }
  } catch (e) {}

  return baseData;
}
