import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shopifyDomain = 'imrmuj-v6.myshopify.com';
const shopifyToken = '4e5e638916f5526fb281f1eabf769b53';
const judgeMePublicToken = '0L6XcHkKm3-nT83wWylPakAYKDs';
const judgeMePrivateToken = 'PXexwrEZlS2C2hKMBK9aM89mOmQ';

// Authentic reviewer names
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
  "Hina Altaf", "Shoaib Malik", "Najma Sultana", "Jamshed Khan", "Nadia Jamil",
  "Shaukat Ali", "Razia Sultana", "Daniyal M.", "Aalia Farooq", "Sarmad Khoosat",
  "Nargis Fakhri", "Haris Rauf", "Ghazala Javed", "Moazzam Ali", "Rabia Anum",
  "Shadab Khan", "Mehvish Hayat", "Mudassar Nazar", "Sumera Ahmed", "Babar Azam",
  "Kiran Naz", "Fawad Khan", "Sumbul Touqeer", "Danish Taimoor", "Ayeza Khan",
  "Shaheen Afridi", "Yumna Zaidi", "Naseem Shah", "Mahira Khan", "Asim Azhar",
  "Minal Khan", "Bilal Abbas", "Aiman Khan", "Sheheryar Munawar", "Sajal Aly"
];

// Product Category Specific Templates
const reviewBank = {
  general: [
    { title: "Pure and 100% Authentic!", body: "Al-Tooba never disappoints. The purity is clearly visible from the first use. Highly recommended!", rating: 5 },
    { title: "Best Sunnah Remedy", body: "Original Prophetic remedy as described. Packing and quality both are top notch. MashaAllah.", rating: 5 },
    { title: "Visible results in 2 weeks", body: "Been using this regularly and seeing genuine improvement in my wellness routine. Worth every rupee.", rating: 5 },
    { title: "Genuine natural product", body: "Very authentic aroma and taste. Delivered safely in robust packaging.", rating: 5 },
    { title: "High quality and fast delivery", body: "Received my order in 3 days. Superb customer service and genuine product.", rating: 5 },
    { title: "Recommended by family doctor", body: "Pure traditional formulation without any chemicals or artificial additives.", rating: 5 },
    { title: "Great product, pure quality", body: "Good packaging and very beneficial. Will definitely order again next month.", rating: 4 },
    { title: "Alhamdulillah very satisfied", body: "This has become an essential part of my daily health routine. May Allah bless the founders.", rating: 5 },
    { title: "Worth the price", body: "Pure, natural ingredients that actually work. 100% satisfied with the purchase.", rating: 5 },
    { title: "Superb herbal medicine", body: "Standard quality and effective. Noticed a positive difference in energy and well-being.", rating: 4 }
  ],
  hair: [
    { title: "Hair fall reduced drastically!", body: "After using this oil and shampoo for 3 weeks, my hair fall stopped almost completely. Hair feels much thicker and softer!", rating: 5 },
    { title: "Best Kalonji hair care in India", body: "Pure herbal ingredients with no sulphate or harmful chemicals. Scalp feels fresh and healthy.", rating: 5 },
    { title: "Visible new hair growth", body: "MashaAllah noticing tiny new hair growth along my hairline. Truly a blessed formulation.", rating: 5 },
    { title: "Smooth and shiny hair texture", body: "Dandruff vanished within 4 washes. Smells natural and herbal. 5 stars from me!", rating: 5 },
    { title: "Great hair kit", body: "Good result on hair breakage and thinning. Delivery was quick.", rating: 4 }
  ],
  talbina: [
    { title: "Energy levels improved instantly", body: "Having this Talbina every morning with milk and honey. Kept me energetic and light throughout the day.", rating: 5 },
    { title: "Sunnah Superfood at its purest", body: "Finely ground, fresh aroma, and delicious taste. Very comforting for digestion and stress relief.", rating: 5 },
    { title: "My whole family loves it", body: "Kids have it before school. Great nutritional support for bones, gut, and general weakness.", rating: 5 },
    { title: "Authentic Barley Talbina", body: "No artificial sugar or additives. Pure wholesome nourishment.", rating: 5 },
    { title: "Good taste and healthy", body: "Satisfied with the purity. Mixing with almonds and dates makes it even better.", rating: 4 }
  ],
  oil: [
    { title: "100% Pure Cold Pressed", body: "Authentic potency, rich texture, and genuine results. Very effective for daily massage.", rating: 5 },
    { title: "Quick relief and nourishment", body: "Extremely soothing on skin and joints. The natural herbal absorption is great.", rating: 5 },
    { title: "Highest grade medicinal oil", body: "Tried multiple brands but Al-Tooba's oil purity stands far apart. Excellent quality.", rating: 5 },
    { title: "Very good quality oil", body: "Arrived nicely sealed without any leakage. Effective formulation.", rating: 4 }
  ],
  vinegar: [
    { title: "Authentic Raw Vinegar with Mother", body: "Helped immensely with acid reflux, gut digestion, and weight management. Tastes pure and natural.", rating: 5 },
    { title: "Sunnah of the Prophet (SAW)", body: "Best dates & apple cider vinegar available. Daily 1 spoon in lukewarm water works wonders.", rating: 5 },
    { title: "Effective for sugar & cholesterol balance", body: "Drinking every morning. Noticeable improvement in digestion and metabolism.", rating: 5 },
    { title: "Pure and traditional", body: "Strong, authentic fermentation without preservatives. Very satisfied.", rating: 4 }
  ],
  wellness: [
    { title: "Complete Health Transformation!", body: "This complete wellness kit is the best investment for health. Everything included is of premium quality.", rating: 5 },
    { title: "Strength, Stamina & Vitality", body: "Within 15 days I felt a massive boost in physical energy and stamina. Pure Ayurvedic and Unani synergy.", rating: 5 },
    { title: "Premium wooden/box hamper", body: "Gave this as a gift to my brother. He is amazed with the purity and effectiveness.", rating: 5 },
    { title: "Life changer wellness kit", body: "High quality authentic herbs that restore natural vigor and mental clarity.", rating: 5 },
    { title: "Very powerful natural herbs", body: "All bottles are properly sealed and effective. Recommended for men seeking natural wellness.", rating: 4 }
  ]
};

// Select matching review bank based on product handle & title
function getCategoryBank(handle, title) {
  const text = (handle + ' ' + title).toLowerCase();
  if (text.includes('hair') || text.includes('shampoo') || text.includes('313')) return [...reviewBank.hair, ...reviewBank.general];
  if (text.includes('talbina')) return [...reviewBank.talbina, ...reviewBank.general];
  if (text.includes('oil') || text.includes('nafs') || text.includes('tulsi')) return [...reviewBank.oil, ...reviewBank.general];
  if (text.includes('vinegar') || text.includes('vinger') || text.includes('cider')) return [...reviewBank.vinegar, ...reviewBank.general];
  if (text.includes('kit') || text.includes('wellness') || text.includes('shilajit') || text.includes('qalbi') || text.includes('tibbe') || text.includes('hayath')) {
    return [...reviewBank.wellness, ...reviewBank.general];
  }
  return reviewBank.general;
}

// Generate deterministic number of reviews between 85 and 130 per product
function generateProductReviews(product) {
  const bank = getCategoryBank(product.handle, product.title);
  const rawIdNum = parseInt(product.rawId.slice(-4)) || 100;
  const count = 85 + (rawIdNum % 45); // 85 to 129 reviews per product

  const reviews = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const name = indianReviewerNames[(i * 7 + rawIdNum) % indianReviewerNames.length];
    const template = bank[(i * 3 + rawIdNum) % bank.length];
    
    // Spread dates over the last 180 days
    const daysAgo = Math.floor((i / count) * 170) + (i % 7);
    const reviewDate = new Date(now - daysAgo * 24 * 60 * 60 * 1000).toISOString();

    // 88% 5-star, 12% 4-star => Average Rating strictly between 4.8 and 4.9 stars
    const isFiveStar = (i % 8) !== 0;
    const rating = isFiveStar ? 5 : 4;

    const email = `${name.toLowerCase().replace(/[^a-z]/g, '')}${10 + (i % 89)}@gmail.com`;

    reviews.push({
      product_id: product.rawId,
      product_handle: product.handle,
      product_title: product.title,
      reviewer_name: name,
      reviewer_email: email,
      rating: rating,
      review_title: template.title,
      review_body: template.body.replace(/{product}/g, product.title),
      created_at: reviewDate
    });
  }

  return reviews;
}

async function fetchShopifyProducts() {
  const query = `{
    products(first: 50) {
      edges {
        node {
          id
          title
          handle
          productType
        }
      }
    }
  }`;

  const res = await fetch(`https://${shopifyDomain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': shopifyToken
    },
    body: JSON.stringify({ query })
  });

  const data = await res.json();
  return data.data.products.edges
    .filter(e => {
      const h = e.node.handle.toLowerCase();
      return !h.includes('video') && !h.startsWith('hero_section');
    })
    .map(e => ({
      id: e.node.id,
      rawId: e.node.id.split('/').pop(),
      title: e.node.title,
      handle: e.node.handle
    }));
}

async function generateCsvAndPush(pushToApi = false) {
  console.log("Fetching active store products from Shopify...");
  const products = await fetchShopifyProducts();
  console.log(`Found ${products.length} active consumer products.\n`);

  let totalReviews = [];
  const csvRows = [
    ["title", "body", "rating", "review_date", "reviewer_name", "reviewer_email", "product_id", "product_handle", "reply", "reply_date", "picture_urls"]
  ];

  products.forEach((p, idx) => {
    const productReviews = generateProductReviews(p);
    const avgRating = (productReviews.reduce((a, b) => a + b.rating, 0) / productReviews.length).toFixed(2);
    console.log(`${idx + 1}. [${p.title}] -> ${productReviews.length} reviews (Average Rating: ${avgRating} ★)`);

    totalReviews = totalReviews.concat(productReviews);

    productReviews.forEach(r => {
      csvRows.push([
        `"${r.review_title.replace(/"/g, '""')}"`,
        `"${r.review_body.replace(/"/g, '""')}"`,
        r.rating,
        r.created_at,
        `"${r.reviewer_name}"`,
        r.reviewer_email,
        r.product_id,
        r.product_handle,
        "",
        "",
        ""
      ]);
    });
  });

  console.log(`\n Total Generated Reviews Across All Products: ${totalReviews.length}`);
  const overallAvg = (totalReviews.reduce((a, b) => a + b.rating, 0) / totalReviews.length).toFixed(2);
  console.log(`⭐ Store-wide Average Rating: ${overallAvg} ★ (Strictly compliant with 4.5 - 5.0 Star Policy)`);

  // Write Judge.me CSV Import File
  const csvContent = csvRows.map(row => row.join(',')).join('\n');
  const csvPath = path.resolve(process.cwd(), 'judge_me_reviews_bulk.csv');
  fs.writeFileSync(csvPath, csvContent, 'utf8');
  console.log(`\n Successfully generated Judge.me CSV Import File at:`);
  console.log(`📁 ${csvPath}`);

  if (pushToApi) {
    console.log(`\n🚀 Starting API submission to Judge.me for first batch of reviews...`);
    for (const p of products) {
      const pReviews = totalReviews.filter(r => r.product_id === p.rawId).slice(0, 3);
      for (const r of pReviews) {
        try {
          const res = await fetch('https://judge.me/api/v1/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              api_token: judgeMePublicToken,
              shop_domain: shopifyDomain,
              platform: 'shopify',
              id: r.product_id,
              name: r.reviewer_name,
              email: r.reviewer_email,
              rating: r.rating,
              title: r.review_title,
              body: r.review_body
            })
          });
          console.log(`  [API] Pushed review for ${p.title} (${r.reviewer_name} - ${r.rating}★) - Status: ${res.status}`);
          await new Promise(res => setTimeout(res, 200));
        } catch (e) {
          console.error(`  [API Error]`, e.message);
        }
      }
    }
  }
}

generateCsvAndPush(true);
