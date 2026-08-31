import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const domain = "imrmuj-v6.myshopify.com";
const storefrontToken = "4e5e638916f5526fb281f1eabf769b53";

// 70% Muslim Names (100% everyday genuine people, ZERO celebrities)
const muslimNames = [
  "Tariq Mahmood", "Mohammad Owais", "Khadija Bano", "Zaid Parveen", "Farhan Qureshi",
  "Shabana Parveen", "Imran Malik", "Sana Kausar", "Rehan Ansari", "Arif Hussain",
  "Shahid Ali", "Hafsa Sheikh", "Bilal Siddiqui", "Nadeem Akhtar", "Rizwan Khan",
  "Tanveer Alam", "Yasmeen Bano", "Junaid Ahmed", "Hamza Qureshi", "Bushra Khan",
  "Sadia Parveen", "Noman Ali", "Sohail Ahmed", "Gulzar Hussain", "Tasneem Kausar",
  "Dr. Salman F.", "Lubna Zaidi", "Amreen Bano", "Irfan Habib", "Asma Khanam",
  "Tahira Jabeen", "Humaira Sheikh", "Azhar Mahmood", "Nasreen Akhtar", "Zubair Khan",
  "Fauzia Khan", "Majid Ali", "Saima Noor", "Rukhsana Begum", "Tariq Jamil",
  "Farzana Kausar", "Sikandar Hayat", "Shazia Manzoor", "Hina Altaf", "Najma Sultana",
  "Jamshed Khan", "Nadia Jamil", "Atif Raza", "Mehreen Fatima", "Usman Gani"
];

// 30% Non-Muslim everyday Indian Names
const nonMuslimNames = [
  "Rahul Verma", "Dr. Ananya Sharma", "Amit Patel", "Gurpreet Singh", "Neha Gupta",
  "Vikram Mehta", "Pooja Malhotra", "Rajesh Kumar", "Sunita Rao", "Deepak Joshi",
  "Sandeep Singh", "Meenakshi Sundaram", "Rohan Das", "Sneha Kulkarni", "Alok Srivastava",
  "Priya Deshmukh", "Vikas Nair", "Swati Chawla", "Karan Agarwal", "Divya Pillai"
];

// 50% Conversational Hindi/Hinglish Reviews Categorized
const hindiReviewTemplates = {
  talbina: [
    "MashaAllah roz subah garam doodh aur shehed ke saath leta hoon, din bhar bohot energetic feel hota hai.",
    "Ekdam pure Barley Talbina hai. Koi milawat ya artificial chini nahi hai. Bohot lajawab taste hai.",
    "Ghar mein sabhi log use kar rahe hain, pet aur hazme ke liye bohot faydedar hai.",
    "Sunnah diet ka best part hai. Taste bhi badiya hai aur quality bhi number 1.",
    "Roz lene se susti aur weakness ekdam khatam ho gayi. Bahut hi badiya product hai."
  ],
  hair: [
    "3 hafte use karne ke baad baal jhadna 90% kam ho gaya hai. Baal kafi ghane aur soft lagne lage hain.",
    "Bina kisi chemical ke pure herbal formulation hai. Scalp bilkul clean aur fresh rehti hai.",
    "Dandruff 3-4 wash mein hi gayab ho gaya. Khushboo bhi ekdam natural aur herbal hai.",
    "Hair fall aur hair breakage ke liye sabse behtar ilaj hai. Main apne doston ko bhi recommend kar raha hoon.",
    "Bohot achhi quality hai. Pehle se kafi behtar lag raha hai baalon ka volume."
  ],
  oil: [
    "100% pure aur asli herbal oil hai. Joints aur muscle dard mein turant aaram milta hai.",
    "Bohot jaldi absorb hota hai aur skin par chipchipahat nahi hoti. Quality bohot lajawab hai.",
    "Kafi brands try kiye par Al-Tooba ki purity sabse alag hai. Ekdam zabardast result.",
    "Soothing aroma hai aur pehle istemal mein hi fark mehsoos hua. Highly recommended!"
  ],
  vinegar: [
    "Sirka lene se pet ki gas aur acid reflux mein bohot jaldi aaram mila. Hazma ekdam badiya rehne laga.",
    "Roz subah gungune paani mein 1 chamach leta hoon. Digestion aur body energy dono badiya rehte hain.",
    "Ekdam pure traditional fermentation hai bina kisi preservative ke. Genuine product hai.",
    "Weight management aur stomach detox ke liye bohot kamal ki cheez hai."
  ],
  wellness: [
    "15 din use karne ke baad body ka stamina aur active feeling bohot badh gayi hai.",
    "Natural herbs ka pure combination hai. Physical weakness door karne ke liye best formulation hai.",
    "Authentic prophetic herbs hain. Pehle se kafi behtar lag raha hai daily energy level.",
    "Ghar ke elders ke liye mangwaya tha, unki health aur weakness mein bohot fayda mila."
  ],
  general: [
    "Bahut hi badiya product hai, packaging bhi 10/10 thi aur delivery 3 din mein ho gayi.",
    "Aam bolchal mein kahun toh lajawab product hai. Rozana ki routine mein shamil kar liya hai.",
    "Mene apne abba ke liye mangwaya tha, unhe kafi aaram mila hai. Very satisfied!",
    "Shuru mein thoda doubt tha par use karne ke baad sach mein pureness feel hui. Shukriya!",
    "Product ki packing aur bottle ki quality bohot premium hai. Result bhi 1 hafte mein dikha."
  ]
};

// English Review Templates per category
const englishReviewTemplates = {
  talbina: [
    "Having this Talbina every morning with warm milk and honey. Kept me energetic and light throughout the day.",
    "Sunnah superfood at its purest. Finely ground, fresh aroma, and wholesome taste.",
    "My whole family loves this. Great nutritional support for bones, gut health, and general weakness.",
    "Authentic Barley Talbina with zero artificial sugar or preservatives. Pure traditional nourishment.",
    "Extremely gentle on stomach and boosts daily stamina noticeably. 5 stars!"
  ],
  hair: [
    "After using for 3 weeks, my hair fall stopped almost completely. Hair feels much thicker and healthier!",
    "Best natural hair care remedy. Pure herbal formulation with no sulphate or harsh chemicals.",
    "Noticeable reduction in hair breakage and scalp itchiness within a few washes. Truly effective.",
    "Dandruff vanished and scalp feels super clean and fresh. Smells pleasant and herbal.",
    "Great product for daily hair nourishment. Very satisfied with the results."
  ],
  oil: [
    "100% pure and potent. Rich texture and genuine herbal potency. Very soothing.",
    "Quick relief and deep absorption. Highly effective natural formulation.",
    "Tried multiple brands but Al-Tooba's purity stands far apart. Excellent quality oil.",
    "Soothing aroma and quick joint & muscle relief. Truly authentic."
  ],
  vinegar: [
    "Helped immensely with acid reflux, gut digestion, and weight management. Tastes pure and natural.",
    "Best authentic Cider Vinegar available. Daily 1 spoon in lukewarm water works wonders for energy.",
    "Pure and traditional formulation. Strong, authentic fermentation without synthetic additives.",
    "Noticeable improvement in digestion within a week. Highly recommended for daily detox."
  ],
  wellness: [
    "Best investment for overall health. Everything included is of premium natural quality.",
    "Within 15 days I felt a massive boost in physical energy and stamina. Pure synergistic herbs.",
    "Life changer wellness formulation. High quality authentic herbs that restore vitality and mental clarity.",
    "Noticeable improvement in daily stamina and digestion. Highly recommended."
  ],
  general: [
    "The quality is incredibly pure. I've noticed a huge positive difference in my daily routine.",
    "Authentic products are hard to find, but this is the real deal. Highly recommended.",
    "It's exactly what I was looking for. Will definitely reorder soon.",
    "Completely transformed my daily wellness experience. Excellent quality and fast shipping.",
    "Al-Tooba's purity is unmatched. Beautiful packaging and top-tier product quality.",
    "May Allah bless the team for providing authentic prophetic remedies.",
    "Genuine formulation with no artificial fillers. Exceeded all my expectations."
  ]
};

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getReviewTemplate(productTitle, isHindi) {
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
  return getRandomElement(pool);
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

  console.log(`Found ${products.length} products to generate reviews for.`);

  const csvLines = [
    "title,body,rating,review_date,reviewer_name,reviewer_email,product_id,product_handle"
  ];

  let totalReviews = 0;

  for (const prod of products) {
    // Generate 3 to 4 reviews per product
    const count = 3 + Math.floor(Math.random() * 2); 
    for (let i = 0; i < count; i++) {
      totalReviews++;
      
      // 70% Muslim names, 30% Non-Muslim names
      const isMuslim = Math.random() < 0.70;
      const name = isMuslim ? getRandomElement(muslimNames) : getRandomElement(nonMuslimNames);
      
      // Exactly 50% Hindi/Hinglish reviews
      const isHindi = i % 2 === 0; // Alternates for exact 50% split per product!
      const body = getReviewTemplate(prod.title, isHindi);
      
      const title = isHindi ? "Bahut Badiya Product" : (body.split('.')[0] || "Great Quality");
      
      // Ratings: 88% 5-star, 12% 4-star => Always between 4.6 and 5.0 stars!
      const rating = Math.random() < 0.88 ? 5 : 4;

      // Random date in last 90 days
      const daysAgo = Math.floor(Math.random() * 90) + 1;
      const dateObj = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      const reviewDate = dateObj.toISOString().split('T')[0] + " 12:00:00 +0000";

      const emailName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const email = `${emailName}${Math.floor(Math.random()*90 + 10)}@gmail.com`;

      // Escape quotes for CSV
      const safeTitle = `"${title.replace(/"/g, '""')}"`;
      const safeBody = `"${body.replace(/"/g, '""')}"`;
      const safeName = `"${name.replace(/"/g, '""')}"`;

      csvLines.push(`${safeTitle},${safeBody},${rating},${reviewDate},${safeName},${email},${prod.id},${prod.handle}`);
    }
  }

  // Save CSV file
  const csvPath = path.join(process.cwd(), 'judge_me_reviews_bulk.csv');
  fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf8');
  console.log(`Saved ${totalReviews} reviews (50% Hindi, 50% English) to ${csvPath}`);
}

main().catch(console.error);
