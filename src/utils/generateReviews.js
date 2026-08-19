const indianReviewerNames = [
  "Dr. Ayesha Siddiqui", "Mohammad Tariq", "Faizan Ahmed", "Zaid Qureshi", "Khadija Fatima",
  "Farhan Khan", "Zainab Begum", "Imran Malik", "Sana Parveen", "Rehan Ansari",
  "Arif Hussain", "Shahid Ali", "Hafsa Sheikh", "Bilal R.", "Nadeem Akhtar",
  "Rizwan Khan", "Shabana Azmi", "Tanveer Alam", "Yasmeen Bano", "Wasim Akram",
  "Mariam Naqvi", "Junaid Siddiqui", "Hamza Qureshi", "Bushra Khan", "Adnan Sami",
  "Sadia Parveen", "Noman Ali", "Sohail Ahmed", "Gulzar Hussain", "Tasneem Kausar",
  "Dr. Salman F.", "Fahad Mustafa", "Lubna Zaidi", "Nawaz Sharif", "Amreen Bano",
  "Irfan Habib", "Asma Khanam", "Rashid Latif", "Tahira Jabeen", "Waqar Younis",
  "Humaira Sheikh", "Azhar Mahmood", "Nasreen Akhtar", "Zubair Khan", "Fauzia Khan",
  "Majid Ali", "Saima Noor", "Kamran Akmal", "Rukhsana Begum", "Tariq Jamil",
  "Zafar Iqbal", "Farzana Kausar", "Sikandar Hayat", "Shazia Manzoor", "Mustafa Kamal",
  "Hina Altaf", "Shoaib Malik", "Najma Sultana", "Jamshed Khan", "Nadia Jamil"
];

const avatars = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=150&auto=format&fit=crop"
];

const reviewTemplates = {
  general: [
    "The {product} is incredibly pure. I've noticed a huge difference in my daily routine since using it.",
    "Authentic products are hard to find, but {product} is the real deal. Highly recommended.",
    "I love the {product}! It's exactly what I was looking for. Will definitely buy again.",
    "The {product} completely transformed my experience. Excellent quality and fast shipping.",
    "I was skeptical at first, but {product} has drastically improved my wellness routine. I feel great.",
    "Al-Tooba's {product} is unmatched in purity. The packaging was beautiful and the product itself is top-tier.",
    "My family has been using {product} for a few weeks now. Very satisfied with the results.",
    "Absolutely beautiful product! {product} is a blessing. May Allah reward the team.",
    "MashaAllah, the quality of {product} speaks for itself. Genuine prophetic remedy.",
    "I ordered {product} on a friend's recommendation and it exceeded all expectations."
  ],
  hair: [
    "After using {product} for 3 weeks, my hair fall stopped almost completely. Hair feels much thicker and softer!",
    "Best hair care remedy in India. Pure herbal ingredients with no sulphate or harmful chemicals. Scalp feels fresh.",
    "MashaAllah noticing tiny new hair growth along my hairline with {product}. Truly a blessed formulation.",
    "Dandruff vanished within 4 washes with {product}. Smells natural and herbal. 5 stars from me!",
    "Great result on hair breakage and thinning. Very satisfied with {product}."
  ],
  talbina: [
    "Having {product} every morning with milk and honey. Kept me energetic and light throughout the day.",
    "{product} is Sunnah superfood at its purest. Finely ground, fresh aroma, and delicious taste.",
    "My whole family loves {product}. Great nutritional support for bones, gut, and general weakness.",
    "Authentic Barley Talbina with no artificial sugar or additives. Pure wholesome nourishment."
  ],
  oil: [
    "100% pure and potent. {product} has rich texture and genuine herbal potency. Very soothing.",
    "Quick relief and deep nourishment with {product}. The natural herbal absorption is great.",
    "Tried multiple brands but Al-Tooba's {product} purity stands far apart. Excellent quality."
  ],
  vinegar: [
    "{product} helped immensely with acid reflux, gut digestion, and weight management. Tastes pure and natural.",
    "Best authentic {product} available. Daily 1 spoon in lukewarm water works wonders for digestion and energy.",
    "Pure and traditional formulation. Strong, authentic fermentation without preservatives."
  ],
  wellness: [
    "{product} is the best investment for health. Everything included is of premium quality.",
    "Within 15 days I felt a massive boost in physical energy and stamina from {product}. Pure synergistic herbs.",
    "Life changer wellness formulation. High quality authentic herbs that restore natural vigor and mental clarity."
  ]
};

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getTemplatesForProduct(productName) {
  const p = (productName || '').toLowerCase();
  if (p.includes('hair') || p.includes('shampoo') || p.includes('313')) return [...reviewTemplates.hair, ...reviewTemplates.general];
  if (p.includes('talbina')) return [...reviewTemplates.talbina, ...reviewTemplates.general];
  if (p.includes('oil') || p.includes('nafs') || p.includes('tulsi')) return [...reviewTemplates.oil, ...reviewTemplates.general];
  if (p.includes('vinegar') || p.includes('vinger') || p.includes('cider')) return [...reviewTemplates.vinegar, ...reviewTemplates.general];
  if (p.includes('kit') || p.includes('wellness') || p.includes('shilajit') || p.includes('qalbi') || p.includes('tibbe') || p.includes('hayath')) {
    return [...reviewTemplates.wellness, ...reviewTemplates.general];
  }
  return reviewTemplates.general;
}

export function generateReviews(productId, productName) {
  const seed = hashString(productId || productName || "default");
  const templates = getTemplatesForProduct(productName);
  
  const reviews = [];
  // Generate 85 to 110 deterministic verified reviews per product
  const numReviews = 85 + (seed % 35);
  
  for (let i = 0; i < numReviews; i++) {
    const nameIndex = (seed + i * 7) % indianReviewerNames.length;
    const avatarIndex = (seed + i * 3) % avatars.length;
    const templateIndex = (seed + i * 5) % templates.length;
    
    // Spread dates over the last 150 days
    const daysAgo = Math.floor((i / numReviews) * 140) + ((seed + i) % 7) + 1;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    // 88% 5-star, 12% 4-star => Rating is strictly between 4.8 and 4.9 stars (Never below 4.5!)
    const isFiveStar = (i % 8) !== 0;
    const rating = isFiveStar ? 5 : 4;
    
    let text = templates[templateIndex].replace(/{product}/g, productName || "this product");
    
    reviews.push({
      id: `gen-${productId}-${i}`,
      productId: productId,
      name: indianReviewerNames[nameIndex],
      role: "Verified Buyer",
      rating: rating,
      text: text,
      product: productName,
      avatar: avatars[avatarIndex],
      date: date.toISOString(),
      isGenerated: true
    });
  }
  
  return reviews;
}
