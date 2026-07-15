const names = [
  "Aisha M.", "Omar F.", "Fatima S.", "Zainab R.", "Ahmed K.", 
  "Ibrahim A.", "Khadija T.", "Yusuf H.", "Maryam N.", "Ali B.",
  "Hassan W.", "Sara Q.", "Bilal M.", "Hafsa K.", "Tariq P."
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

const templates = [
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
];

// Simple hash function to generate a consistent number from a string
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function generateReviews(productId, productName) {
  const seed = hashString(productId || productName || "default");
  
  const reviews = [];
  const numReviews = 8;
  
  for (let i = 0; i < numReviews; i++) {
    // Generate deterministic but seemingly random indices
    const nameIndex = (seed + i * 3) % names.length;
    const avatarIndex = (seed + i * 7) % avatars.length;
    const templateIndex = (seed + i * 11) % templates.length;
    
    // Add some random dates within the last 30 days
    const daysAgo = (seed % 30) + (i * 3) % 15 + 1;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    // Determine rating (mostly 5, some 4)
    const rating = ((seed + i) % 10) > 7 ? 4 : 5;
    
    let text = templates[templateIndex].replace(/{product}/g, productName);
    
    reviews.push({
      id: `gen-${productId}-${i}`,
      productId: productId,
      name: names[nameIndex],
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
