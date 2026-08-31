import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const domain = "imrmuj-v6.myshopify.com";
const storefrontToken = "4e5e638916f5526fb281f1eabf769b53";

// 70% Muslim Names (Everyday genuine people, ZERO celebrities)
const muslimFirstNames = [
  "Tariq", "Mohammad", "Khadija", "Zaid", "Farhan", "Shabana", "Imran", "Sana", "Rehan", "Arif",
  "Shahid", "Hafsa", "Bilal", "Nadeem", "Rizwan", "Tanveer", "Yasmeen", "Junaid", "Hamza", "Bushra",
  "Sadia", "Noman", "Sohail", "Gulzar", "Tasneem", "Salman", "Lubna", "Amreen", "Irfan", "Asma",
  "Tahira", "Humaira", "Azhar", "Nasreen", "Zubair", "Fauzia", "Majid", "Saima", "Rukhsana", "Tariq",
  "Farzana", "Sikandar", "Shazia", "Hina", "Najma", "Jamshed", "Nadia", "Atif", "Mehreen", "Usman",
  "Faisal", "Danish", "Sameer", "Adil", "Waqas", "Bilqis", "Rubina", "Parveen", "Ayesha", "Rashid"
];

const muslimLastNames = [
  "Mahmood", "Owais", "Bano", "Parveen", "Qureshi", "Malik", "Kausar", "Ansari", "Hussain", "Sheikh",
  "Siddiqui", "Akhtar", "Khan", "Alam", "Ahmed", "Ali", "Zaidi", "Habib", "Khanam", "Jabeen",
  "Begum", "Hayat", "Manzoor", "Altaf", "Sultana", "Jamil", "Raza", "Fatima", "Gani", "Faruqi"
];

// 30% Non-Muslim everyday Indian Names
const nonMuslimFirstNames = [
  "Rahul", "Ananya", "Amit", "Gurpreet", "Neha", "Vikram", "Pooja", "Rajesh", "Sunita", "Deepak",
  "Sandeep", "Meenakshi", "Rohan", "Sneha", "Alok", "Priya", "Vikas", "Swati", "Karan", "Divya",
  "Ajay", "Sunil", "Manish", "Kavita", "Ritu", "Sanjay", "Preeti", "Ashok", "Kirti", "Ramesh"
];

const nonMuslimLastNames = [
  "Verma", "Sharma", "Patel", "Singh", "Gupta", "Mehta", "Malhotra", "Kumar", "Rao", "Joshi",
  "Sundaram", "Das", "Kulkarni", "Srivastava", "Deshmukh", "Nair", "Chawla", "Agarwal", "Pillai", "Mishra",
  "Bhatia", "Reddy", "Choudhury", "Saxena", "Trivedi"
];

function generateName(isMuslim) {
  if (isMuslim) {
    const f = muslimFirstNames[Math.floor(Math.random() * muslimFirstNames.length)];
    const l = muslimLastNames[Math.floor(Math.random() * muslimLastNames.length)];
    return `${f} ${l}`;
  } else {
    const f = nonMuslimFirstNames[Math.floor(Math.random() * nonMuslimFirstNames.length)];
    const l = nonMuslimLastNames[Math.floor(Math.random() * nonMuslimLastNames.length)];
    return `${f} ${l}`;
  }
}

// Words that should NEVER appear in Non-Muslim reviews
const islamicTerms = ['sunnah', 'allah', 'mashaallah', 'prophetic', 'tibb', 'nabawi', 'abba', 'quran'];

// 50% Conversational Hindi/Hinglish Reviews Categorized
const hindiReviewTemplates = {
  talbina: [
    "Roz subah garam doodh aur shehed ke saath leta hoon, din bhar bohot energetic feel hota hai.",
    "Ekdam pure Barley Talbina hai. Koi milawat ya artificial chini nahi hai. Bohot lajawab taste hai.",
    "Ghar mein sabhi log use kar rahe hain, pet aur hazme ke liye bohot faydedar hai.",
    "Traditional superfood hai. Taste bhi badiya hai aur quality bhi number 1.",
    "Roz lene se susti aur weakness ekdam khatam ho gayi. Bahut hi badiya product hai.",
    "Pure barley malt ki khushboo hai. Subah nashte mein lene se stomach ekdam light rehta hai.",
    "Bache bhi bohot shauk se khate hain. Health aur nutrition ke hisaab se best hai.",
    "MashaAllah roz subah garam doodh aur shehed ke saath leta hoon, din bhar bohot energetic feel hota hai.",
    "Sunnah diet ka best part hai. Taste bhi badiya hai aur quality bhi number 1.",
    "High quality talbina powder. Subah lene se constipation aur acidity mein bohot relief mila."
  ],
  hair: [
    "3 hafte use karne ke baad baal jhadna 90% kam ho gaya hai. Baal kafi ghane aur soft lagne lage hain.",
    "Bina kisi chemical ke pure herbal formulation hai. Scalp bilkul clean aur fresh rehti hai.",
    "Dandruff 3-4 wash mein hi gayab ho gaya. Khushboo bhi ekdam natural aur herbal hai.",
    "Hair fall aur hair breakage ke liye sabse behtar ilaj hai. Main apne doston ko bhi recommend kar raha hoon.",
    "Bohot achhi quality hai. Pehle se kafi behtar lag raha hai baalon ka volume.",
    "Scalp ki itching aur dryness bilkul khatam ho gayi. Natural shine aa gayi hai.",
    "Mene shampoo aur oil dono try kiya, result sach mein lajawab hai."
  ],
  oil: [
    "100% pure aur asli herbal oil hai. Joints aur muscle dard mein turant aaram milta hai.",
    "Bohot jaldi absorb hota hai aur skin par chipchipahat nahi hoti. Quality bohot lajawab hai.",
    "Kafi brands try kiye par Al-Tooba ki purity sabse alag hai. Ekdam zabardast result.",
    "Soothing aroma hai aur pehle istemal mein hi fark mehsoos hua. Highly recommended!",
    "Chot aur sujan par malish karne se rath bhar mein aaram mila. Pure quality.",
    "Natural herbal oil hai, sar dard aur thakan mein malish karne se sakoon milta hai."
  ],
  vinegar: [
    "Sirka lene se pet ki gas aur acid reflux mein bohot jaldi aaram mila. Hazma ekdam badiya rehne laga.",
    "Roz subah gungune paani mein 1 chamach leta hoon. Digestion aur body energy dono badiya rehte hain.",
    "Ekdam pure traditional fermentation hai bina kisi preservative ke. Genuine product hai.",
    "Weight management aur stomach detox ke liye bohot kamal ki cheez hai.",
    "Fatty liver aur cholesterol control karne mein bohot helpful hai.",
    "Tastes very natural, artificial essence bilkul nahi hai. 100% pure vinegar."
  ],
  wellness: [
    "15 din use karne ke baad body ka stamina aur active feeling bohot badh gayi hai.",
    "Natural herbs ka pure combination hai. Physical weakness door karne ke liye best formulation hai.",
    "Natural health supplement hai. Pehle se kafi behtar lag raha hai daily energy level.",
    "Ghar ke elders ke liye mangwaya tha, unki health aur weakness mein bohot fayda mila.",
    "Stamina aur daily vitality ke liye sabse best product hai.",
    "Genuine capsule formulation, zero side effects and quick natural recovery."
  ],
  general: [
    "Bahut hi badiya product hai, packaging bhi 10/10 thi aur delivery 3 din mein ho gayi.",
    "Aam bolchal mein kahun toh lajawab product hai. Rozana ki routine mein shamil kar liya hai.",
    "Mene apne family ke liye mangwaya tha, unhe kafi aaram mila hai. Very satisfied!",
    "Shuru mein thoda doubt tha par use karne ke baad sach mein pureness feel hui. Shukriya!",
    "Product ki packing aur bottle ki quality bohot premium hai. Result bhi 1 hafte mein dikha.",
    "Fast shipping aur leak-proof bottle packaging. Top notch quality product.",
    "Value for money! Genuine herbal purity without any harmful chemical additives."
  ]
};

// English Review Templates per category
const englishReviewTemplates = {
  talbina: [
    "Having this Barley Talbina every morning with warm milk and honey. Kept me energetic and light throughout the day.",
    "Organic superfood at its purest. Finely ground, fresh aroma, and wholesome taste.",
    "My whole family loves this. Great nutritional support for bones, gut health, and general weakness.",
    "Authentic Barley Talbina with zero artificial sugar or preservatives. Pure traditional nourishment.",
    "Extremely gentle on stomach and boosts daily stamina noticeably. 5 stars!",
    "Fresh natural barley aroma and smooth texture. Helps immensely with digestion and acidity.",
    "Wonderful nutritional breakfast supplement for kids and elderly family members.",
    "Authentic Sunnah superfood at its purest. Finely ground, fresh aroma, and wholesome taste."
  ],
  hair: [
    "After using for 3 weeks, my hair fall stopped almost completely. Hair feels much thicker and healthier!",
    "Best natural hair care remedy. Pure herbal formulation with no sulphate or harsh chemicals.",
    "Noticeable reduction in hair breakage and scalp itchiness within a few washes. Truly effective.",
    "Dandruff vanished and scalp feels super clean and fresh. Smells pleasant and herbal.",
    "Great product for daily hair nourishment. Very satisfied with the results.",
    "Restored hair softness and volume naturally. Very pleased with the quality.",
    "Nourishes hair roots deeply without making scalp greasy or sticky."
  ],
  oil: [
    "100% pure and potent. Rich texture and genuine herbal potency. Very soothing.",
    "Quick relief and deep absorption. Highly effective natural formulation.",
    "Tried multiple brands but Al-Tooba's purity stands far apart. Excellent quality oil.",
    "Soothing aroma and quick joint & muscle relief. Truly authentic.",
    "Immensely helpful for muscle stiffness and back pain. Non-sticky absorption.",
    "Pure cold-pressed extract feeling. Effective from the very first application."
  ],
  vinegar: [
    "Helped immensely with acid reflux, gut digestion, and weight management. Tastes pure and natural.",
    "Best authentic Cider Vinegar available. Daily 1 spoon in lukewarm water works wonders for energy.",
    "Pure and traditional formulation. Strong, authentic fermentation without synthetic additives.",
    "Noticeable improvement in digestion within a week. Highly recommended for daily detox.",
    "Helps maintain healthy blood sugar levels and morning digestion. Excellent quality.",
    "Natural mother-of-vinegar sediment visible. Truly organic and unfiltered."
  ],
  wellness: [
    "Best investment for overall health. Everything included is of premium natural quality.",
    "Within 15 days I felt a massive boost in physical energy and stamina. Pure synergistic herbs.",
    "Life changer wellness formulation. High quality authentic herbs that restore vitality and mental clarity.",
    "Noticeable improvement in daily stamina and digestion. Highly recommended.",
    "Restores daily vitality naturally without any synthetic side effects.",
    "Top tier health tonic. Authentic herbs with noticeable physical energy boost."
  ],
  general: [
    "The quality is incredibly pure. I've noticed a huge positive difference in my daily routine.",
    "Authentic products are hard to find, but this is the real deal. Highly recommended.",
    "It's exactly what I was looking for. Will definitely reorder soon.",
    "Completely transformed my daily wellness experience. Excellent quality and fast shipping.",
    "Al-Tooba's purity is unmatched. Beautiful packaging and top-tier product quality.",
    "Genuine formulation with no artificial fillers. Exceeded all my expectations.",
    "May Allah bless the team for providing authentic remedies.",
    "Secure leak-proof packaging and fast delivery. Very pleased with the purchase."
  ]
};

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getReviewTemplate(productTitle, isHindi, isMuslim) {
  const title = productTitle.toLowerCase();
  let categoryKey = 'general';
  
  if (title.includes('talbina')) categoryKey = 'talbina';
  else if (title.includes('shampoo') || title.includes('hair') || title.includes('313')) categoryKey = 'hair';
  else if (title.includes('oil') || title.includes('tulsi') || title.includes('nafs')) categoryKey = 'oil';
  else if (title.includes('vinegar') || title.includes('vinger') || title.includes('cider')) categoryKey = 'vinegar';
  else if (title.includes('kit') || title.includes('shilajit') || title.includes('capsule') || title.includes('tonic') || title.includes('diab')) {
    categoryKey = 'wellness';
  }

  const pool = isHindi ? hindiReviewTemplates[categoryKey] : englishReviewTemplates[categoryKey];
  
  // Filter pool for Non-Muslim reviewers to make 100% SURE no Islamic/Prophetic words are present
  let validPool = pool;
  if (!isMuslim) {
    validPool = pool.filter(text => {
      const lower = text.toLowerCase();
      return !islamicTerms.some(term => lower.includes(term));
    });
  }

  return getRandomElement(validPool.length > 0 ? validPool : pool);
}

async function main() {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;
  
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': storefrontToken },
    body: JSON.stringify({ query: '{ products(first: 50) { edges { node { id title handle } } } }' })
  });
  const data = await res.json();
  const products = data.data.products.edges
    .filter(e => !e.node.handle.startsWith('hero_section') && !e.node.handle.includes('video'))
    .map(e => ({ id: e.node.id.split('/').pop(), handle: e.node.handle, title: e.node.title }));

  console.log(`Found ${products.length} products. Generating 20 to 30 reviews per product...`);

  const csvLines = [
    "title,body,rating,review_date,reviewer_name,reviewer_email,product_id,product_handle"
  ];

  let totalReviews = 0;

  for (const prod of products) {
    // Generate 22 to 28 reviews per product
    const count = 22 + Math.floor(Math.random() * 7); 
    for (let i = 0; i < count; i++) {
      totalReviews++;
      
      // 70% Muslim names, 30% Non-Muslim names
      const isMuslim = Math.random() < 0.70;
      const name = generateName(isMuslim);
      
      // Exactly 50% Hindi/Hinglish reviews
      const isHindi = i % 2 === 0; // Alternates for exact 50% split per product!
      const body = getReviewTemplate(prod.title, isHindi, isMuslim);
      
      const title = isHindi ? "Bahut Badiya Product" : (body.split('.')[0] || "Great Quality");
      
      // Ratings: 88% 5-star, 12% 4-star => Always between 4.6 and 5.0 stars!
      const rating = Math.random() < 0.88 ? 5 : 4;

      // Random date in last 150 days formatted as YYYY-MM-DD
      const daysAgo = Math.floor(Math.random() * 150) + 1;
      const dateObj = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      const reviewDate = dateObj.toISOString().split('T')[0]; // Simple YYYY-MM-DD format!

      const emailName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const email = `${emailName}${Math.floor(Math.random()*900 + 100)}@gmail.com`;

      // Escape quotes for CSV
      const safeTitle = `"${title.replace(/"/g, '""')}"`;
      const safeBody = `"${body.replace(/"/g, '""')}"`;
      const safeName = `"${name.replace(/"/g, '""')}"`;

      csvLines.push(`${safeTitle},${safeBody},${rating},${reviewDate},${safeName},${email},${prod.id},${prod.handle}`);
    }
  }

  // Save CSV file to project root
  const csvPath = path.join(process.cwd(), 'judge_me_reviews_bulk.csv');
  fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf8');
  
  // Also copy to Desktop and Downloads for 1-click convenience
  try {
    const desktopPath = path.join(process.env.USERPROFILE, 'OneDrive', 'Desktop', 'judge_me_reviews_bulk.csv');
    fs.writeFileSync(desktopPath, csvLines.join('\n'), 'utf8');
  } catch(e) {}
  try {
    const downloadsPath = path.join(process.env.USERPROFILE, 'Downloads', 'judge_me_reviews_bulk.csv');
    fs.writeFileSync(downloadsPath, csvLines.join('\n'), 'utf8');
  } catch(e) {}

  console.log(`SUCCESS! Generated ${totalReviews} total reviews with clean YYYY-MM-DD dates!`);
}

main().catch(console.error);
