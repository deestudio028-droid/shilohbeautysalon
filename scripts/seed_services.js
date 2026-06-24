const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Read command line arguments or use defaults
const email = process.argv[2] || 'admin@shiloh.com';
const password = process.argv[3] || 'shilohadmin123';

// 2. Read environment variables from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
let envVars = {};
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      // Remove surrounding quotes if any
      envVars[key] = val.replace(/^["']|["']$/g, '');
    }
  });
} catch (err) {
  console.error("Error reading .env.local file:", err.message);
  process.exit(1);
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase configuration in .env.local!");
  process.exit(1);
}

console.log("Connecting to Supabase at:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const servicesData = [
  // --- THREADING ---
  {
    name: "Eyebrows",
    category: "Threading",
    description: "Professional eyebrow shaping using clean cotton thread to define and clean the arches for a sharp facial framing.",
    benefits: ["Symmetrical arch alignment", "Removes finest hair from the roots", "Longer-lasting than shaving", "Enhances eye expressions"]
  },
  {
    name: "Upper Lips",
    category: "Threading",
    description: "Gentle hair removal from the upper lip area to leave the skin smooth and shadow-free.",
    benefits: ["Creates smooth skin finish", "Slows down hair regrowth", "Removes minor tan from lip area", "Quick and precise procedure"]
  },
  {
    name: "Chin",
    category: "Threading",
    description: "Precise threading to clear stubborn hair from the chin area for a clean jawline.",
    benefits: ["Provides clean and smooth jawline", "Quick hair removal", "Safe for sensitive chin skin", "Reduces thick hair growth over time"]
  },
  {
    name: "Fore Head",
    category: "Threading",
    description: "Threading to remove fine baby hair and peach fuzz from the forehead, creating a brighter complexion.",
    benefits: ["Creates bright and clear forehead", "Ensures even makeup application", "Exfoliates dead skin cells", "Gives a symmetrical facial frame"]
  },
  {
    name: "Side Locks",
    category: "Threading",
    description: "Precise sideburn and side lock hair shaping for clean, sharp facial contours.",
    benefits: ["Sharpens facial features", "Removes dark peach fuzz", "Produces smooth cheek profiles", "Easy maintenance"]
  },
  {
    name: "Full Face",
    category: "Threading",
    description: "Comprehensive full-face threading for a flawless, completely hair-free face.",
    benefits: ["Instantly brightens overall complexion", "Ensures ultra-smooth makeup base", "Exfoliates dead skin layers", "Boosts absorption of skincare products"]
  },

  // --- BLEACH ---
  {
    name: "Herbal Bleach",
    category: "Bleach",
    description: "Gentle herbal bleaching cream to lighten facial hair and reduce discoloration using natural botanicals.",
    benefits: ["Minimizes facial hair visibility", "Soothes skin with herbal extracts", "Even skin tone restoration", "Safe for sensitive skin"]
  },
  {
    name: "Herbal Bleach (Face & Neck)",
    category: "Bleach",
    description: "Herbal bleaching service extended to the neck area for a uniform, natural glow.",
    benefits: ["Matches neck skin tone to face", "Fades dark spots and neck tan", "Calming botanical nourishment", "Deeply purifies surface dirt"]
  },
  {
    name: "Fruit Bleach",
    category: "Bleach",
    description: "Vitamin-rich fruit bleach designed to instantly boost radiance and soften skin texture.",
    benefits: ["Infused with natural fruit AHA acids", "Fades persistent blemishes", "Delivers an instant glowing look", "Exfoliates dull outer layers"]
  },
  {
    name: "D Tan Bleach",
    category: "Bleach",
    description: "Strong anti-tan bleach formulation to reverse sun damage and hyperpigmentation on the skin.",
    benefits: ["Erases deep sun tan", "Restores original skin complexion", "Purifies skin pores", "Fades dark spots"]
  },
  {
    name: "Wine Bleach",
    category: "Bleach",
    description: "Anti-aging wine extract bleach that brightens skin and fights free radical damage.",
    benefits: ["Rich in grape seed antioxidants", "Improves skin firmness", "Lightens facial hair evenly", "Restores youthful glow"]
  },
  {
    name: "Gold Bleach",
    category: "Bleach",
    description: "Premium bleaching treatment with real gold dust for a sparkling, royal facial radiance.",
    benefits: ["Imparts a brilliant golden glow", "Stimulates skin cell renewal", "Evens out skin pigmentation", "Provides a polished facial look"]
  },
  {
    name: "Whitening Bleach",
    category: "Bleach",
    description: "Intense brightening bleach formulated to lighten skin tone and reduce deep-seated dullness.",
    benefits: ["Reduces dark pigmentation", "Lightens stubborn dark hair", "Reveals bright, refreshed skin", "Smooths skin texture"]
  },

  // --- WAXING ---
  {
    name: "Hand Wax (Half)",
    category: "Waxing",
    description: "Quick half-arm waxing using premium wax for smooth, hair-free elbows and forearms.",
    benefits: ["Removes hair from lower arms", "Exfoliates dead skin", "Creates soft skin texture", "Quick service time"]
  },
  {
    name: "Hand Wax (Full)",
    category: "Waxing",
    description: "Complete arm waxing from shoulders to fingers for flawless smoothness.",
    benefits: ["Hair-free skin from shoulders to fingers", "Removes deep tan and dirt", "Promotes softer hair regrowth", "Smoother skin tone"]
  },
  {
    name: "Leg Wax (Half)",
    category: "Waxing",
    description: "Half-leg waxing targeting lower legs for sleek, silky calves.",
    benefits: ["Silky, hair-free calves", "Fades tan on shins", "Removes dead skin", "Leaves legs feeling light"]
  },
  {
    name: "Leg Wax (Full)",
    category: "Waxing",
    description: "Full-leg waxing from thighs to toes to remove unwanted hair and deep tan.",
    benefits: ["Complete leg hair removal", "Deeply exfoliates dry skin", "Ensures even leg tone", "No razor burns or cuts"]
  },
  {
    name: "Underarms Wax",
    category: "Waxing",
    description: "Quick and hygienic underarm hair removal using sensitive-skin wax formula.",
    benefits: ["Removes underarm hair from root", "Reduces sweat odor by clearing hair", "Helps lighten dark underarms", "Keeps area fresh for weeks"]
  },
  {
    name: "Face Wax",
    category: "Waxing",
    description: "Gentle facial waxing to eliminate peach fuzz and facial hair for an ultra-smooth finish.",
    benefits: ["Ultra-smooth face texture", "Makeup glides on flawlessly", "Removes dead skin cells", "Long-lasting hair-free results"]
  },
  {
    name: "Upper Lip Wax",
    category: "Waxing",
    description: "Quick wax strip application to clear upper lip hair with minimal discomfort.",
    benefits: ["Instant hair removal", "Leaves area completely smooth", "Fewer ingrown hairs than shaving", "Very quick procedure"]
  },
  {
    name: "Chin Wax",
    category: "Waxing",
    description: "Chin hair removal using specialized gentle wax to prevent irritation.",
    benefits: ["Removes coarse chin hairs", "Silky smooth skin feel", "Slows down thick hair regrowth", "Clean facial profile"]
  },
  {
    name: "Full Body Wax",
    category: "Waxing",
    description: "Full body waxing service for head-to-toe smoothness and deep exfoliation.",
    benefits: ["Complete body hair elimination", "Exfoliates dead skin globally", "Restores uniform body complexion", "Boosts personal hygiene and comfort"]
  },

  // --- HAIRCUT ---
  {
    name: "Straight Cut",
    category: "Haircut",
    description: "A classic straight haircut designed for clean, even ends and a polished appearance.",
    benefits: ["Eliminates split ends", "Gives a neat, healthy look", "Easy to manage", "Polished classic look"]
  },
  {
    name: "U Cut",
    category: "Haircut",
    description: "A beautiful, traditional U-shaped haircut adding soft curves and fluid movement to the back profile.",
    benefits: ["Creates natural volume", "Elegant back profile", "Suits all hair lengths", "Adds body to flat hair"]
  },
  {
    name: "V Cut",
    category: "Haircut",
    description: "Deep V-shaped haircut that tapers down to a point, creating dramatic angles and layers.",
    benefits: ["Modern, edgy silhouette", "Lightens thick hair weight", "Highlights layers", "Stylish cascading effect"]
  },
  {
    name: "Step Cut",
    category: "Haircut",
    description: "A structured layered cut with distinct, visible steps that create amazing bounce and body.",
    benefits: ["Adds dramatic volume", "Gives a thick hair appearance", "Perfect for wavy hair", "Highly textured style"]
  },
  {
    name: "Layer Cut",
    category: "Haircut",
    description: "Soft, flowing layers tailored to frame your face and complement your natural hair texture.",
    benefits: ["Frames the face features", "Reduces heavy hair weight", "Adds bounce and motion", "Suits all face shapes"]
  },
  {
    name: "Feather Cut",
    category: "Haircut",
    description: "Feminine, soft outward layers with feathered ends for a light, breezy, and voluminous feel.",
    benefits: ["Soft, romantic texture", "Lightweight styling", "Frames face features beautifully", "Delicate layered ends"]
  },
  {
    name: "Step With Feather Cut",
    category: "Haircut",
    description: "A premium combination styling that merges the structure of step cutting with soft feathered tips.",
    benefits: ["Maximum volume and bounce", "High-fashion aesthetic", "Reduces split ends", "Beautiful styling versatility"]
  },
  {
    name: "Baby Cut",
    category: "Haircut",
    description: "A gentle, quick, and safe haircut designed to keep babies and toddlers neat and comfortable.",
    benefits: ["Fun, stress-free handling", "Keeps children neat and comfortable", "Kid-safe styling scissors", "Cute style outcome"]
  },
  {
    name: "Mushroom Cut",
    category: "Haircut",
    description: "Classic rounded bowl cut for young children, framing the face cutely and easily manageable.",
    benefits: ["Adorable retro design", "Easy to wash and manage", "Keeps hair out of kid's eyes", "Neat outline structure"]
  },
  {
    name: "Diana Cut",
    category: "Haircut",
    description: "Sophisticated short layered crop inspired by timeless royal elegance.",
    benefits: ["Sleek, sophisticated look", "Extremely low maintenance", "Accents cheekbones and eyes", "Comfortable summer style"]
  },
  {
    name: "Front Feather Cut",
    category: "Haircut",
    description: "Front-framing outward layers designed to add volume and shape around the face.",
    benefits: ["Brings focus to eyes and lips", "Gives body to limp front hair", "Elegantly blends with longer back hair", "Provides visual lift"]
  },

  // --- FACIAL ---
  {
    name: "Face Cleanup",
    category: "Facial",
    description: "Quick pore cleansing, scrubbing, and blackhead removal to refresh tired skin.",
    benefits: ["Removes deep-seated dirt", "Clears blackheads and whiteheads", "Refreshes dull facial skin", "Prevents acne breakouts"]
  },
  {
    name: "Herbal Facial",
    category: "Facial",
    description: "Natural facial using organic botanical extracts to soothe, heal, and hydrate the skin.",
    benefits: ["Soothes and heals irritated skin", "Free from harsh chemicals", "Provides gentle hydration", "Restores natural skin health"]
  },
  {
    name: "Fruit Facial",
    category: "Facial",
    description: "Vitamin-rich fruit facial utilizing natural AHAs for a fresh, gentle skin glow.",
    benefits: ["AHA acids gently exfoliate", "Infuses skin with fruit vitamins", "Improves skin suppleness", "Restores fresh look"]
  },
  {
    name: "D Tan Facial",
    category: "Facial",
    description: "Clarifying facial designed to remove sun tan, pollution particles, and hyperpigmentation.",
    benefits: ["Clears sun damage", "Brightens dark skin patches", "Exfoliates dead tan layers", "Restores original tone"]
  },
  {
    name: "Sea Weed Facial",
    category: "Facial",
    description: "Hydrating marine-algae facial that detoxifies skin pores and regulates sebum production.",
    benefits: ["Deeply hydrates thirsty skin", "Regulates sebum production", "Rich in ocean minerals", "Combats free radical damage"]
  },
  {
    name: "Goat Milk Facial",
    category: "Facial",
    description: "Nourishing facial utilizing goat milk extracts to deeply moisturize dry, sensitive skin.",
    benefits: ["Very gentle on sensitive skin", "Deeply moisturizes dry patches", "Fades dark spots over time", "Leaves skin baby-soft"]
  },
  {
    name: "Vitamin C Facial",
    category: "Facial",
    description: "Brightening facial packed with active Vitamin C antioxidants to target dark spots and uneven tone.",
    benefits: ["Fades dark spots and pigmentation", "Boosts collagen production", "Powerful antioxidant protection", "Radiant skin renewal"]
  },
  {
    name: "Chocolate Facial",
    category: "Facial",
    description: "Rich cocoa-infused facial that detoxifies skin while providing deep relaxation.",
    benefits: ["Detoxifies and firms skin", "High in skin-loving antioxidants", "Deeply nourishes dry skin", "Relieves stress and relaxes mind"]
  },
  {
    name: "Gold Facial",
    category: "Facial",
    description: "A royal treatment infused with 24k gold leaf extracts to firm, hydrate, and brighten the skin.",
    benefits: ["Imparts an intense, luminous glow", "Improves skin elasticity", "Delays skin aging signs", "Stimulates blood circulation"]
  },
  {
    name: "Wine Facial",
    category: "Facial",
    description: "Red grape seed extract facial designed to repair skin cells and combat early aging signs.",
    benefits: ["Boosts skin cellular repair", "Fights early signs of aging", "Tightens open skin pores", "Creates a smooth, dewy look"]
  },
  {
    name: "Skin Lightening Facial",
    category: "Facial",
    description: "Brightening treatment formulated to reduce melanin, fade blemishes, and even out skin tone.",
    benefits: ["Evens out blotchy skin tone", "Reduces hyperpigmentation", "Gives bright, clear skin", "Fades stubborn blemishes"]
  },
  {
    name: "Pearl Facial",
    category: "Facial",
    description: "Pearl dust facial to polish skin surface, minimize tan, and control excess oiliness.",
    benefits: ["Exfoliates for pearl-like shine", "Reduces tan and blemishes", "Controls skin oiliness", "Smooths rough skin texture"]
  },
  {
    name: "Bridal Facial",
    category: "Facial",
    description: "The ultimate luxury facial delivering deep hydration and an intense dewy glow for brides-to-be.",
    benefits: ["Intense dewy brightness", "Flawless base for bridal makeup", "Smooths skin lines", "Deep hydration and luxury prep"]
  },

  // --- HAIR TREATMENT ---
  {
    name: "Head Oil Massage",
    category: "Hair Treatment",
    description: "Relaxing hot oil scalp massage to relieve stress, nourish roots, and promote hair growth.",
    benefits: ["Relieves stress and tension", "Stimulates blood circulation", "Nourishes hair roots", "Promotes sound sleep"]
  },
  {
    name: "Hair SPA",
    category: "Hair Treatment",
    description: "Deep conditioning and nourishment treatment to revive dry, damaged, and frizzy hair.",
    benefits: ["Intensely hydrates hair shafts", "Reduces frizz and split ends", "Smoothens hair texture", "Combats scalp dryness"]
  },
  {
    name: "Oil Massage with Root Pack",
    category: "Hair Treatment",
    description: "Hot oil scalp massage followed by a purifying clay root pack to strengthen follicles.",
    benefits: ["Strengthens hair roots", "Prevents premature hair fall", "Purifies scalp surface", "Adds natural volume"]
  },
  {
    name: "Oil Massage with Henna",
    category: "Hair Treatment",
    description: "Scalp massage combined with a cooling henna pack for natural conditioning and coloring.",
    benefits: ["Combats scalp heat", "Provides natural copper highlights", "Conditions hair naturally", "Fights dandruff and itchiness"]
  },
  {
    name: "Dandruff Treatment",
    category: "Hair Treatment",
    description: "Targeted anti-fungal scalp treatment to eliminate flakes and soothe itchiness.",
    benefits: ["Clears persistent dandruff flakes", "Soothes dry, itchy scalp", "Balances scalp pH level", "Prevents scalp infections"]
  },

  // --- PEDICURE ---
  {
    name: "Pedicure",
    category: "Pedicure",
    description: "Classic foot cleansing, scrubbing, nail trimming, and cuticle grooming.",
    benefits: ["Cleans feet and trims nails", "Removes cracked heel skin", "Relaxes tired foot muscles", "Improves foot hygiene"]
  },
  {
    name: "D Tan Pedicure",
    category: "Pedicure",
    description: "Foot cleanup targeting sun tan and dark ankle areas to restore even skin tone.",
    benefits: ["Lightens ankle and foot tan", "Exfoliates dead tanned skin", "Moisturizes dry feet", "Softens rough cuticles"]
  },
  {
    name: "Spa Pedicure",
    category: "Pedicure",
    description: "A relaxing foot treatment featuring an aromatherapy soak, deep scrubbing, and massage.",
    benefits: ["Deeply relaxes foot arches", "Softens calluses and heels", "Aromatherapy stress relief", "Leaves feet smelling fresh"]
  },
  {
    name: "Pasafin Pedicure",
    category: "Pedicure",
    description: "Intense moisture treatment featuring a warm paraffin wax dip for cracked heels.",
    benefits: ["Intense moisture for dry heels", "Relieves joint stiffness in feet", "Softens extremely rough skin", "Creates a protective moisture barrier"]
  },
  {
    name: "Ortho Oil Pedicure",
    category: "Pedicure",
    description: "Therapeutic pedicure with specialized pain-relief oil massage to ease muscle soreness.",
    benefits: ["Relieves joint and muscle pain", "Improves blood circulation in legs", "Reduces foot swelling", "Soothing therapeutic comfort"]
  },

  // --- MANICURE ---
  {
    name: "Manicure",
    category: "Manicure",
    description: "Essential hand care including nail shaping, cuticle nourishment, and skin hydration.",
    benefits: ["Cleans hands and shapes nails", "Nourishes hand cuticles", "Improves hand skin elasticity", "Clean, groomed look"]
  },
  {
    name: "D Tan Manicure",
    category: "Manicure",
    description: "Hand treatment designed to remove tan, fade spots, and restore skin complexion.",
    benefits: ["Removes hand and wrist tan", "Fades dark spots on fingers", "Exfoliates dead skin", "Restores even skin tone"]
  },
  {
    name: "Spa Manicure",
    category: "Manicure",
    description: "Premium hand treatment with aromatherapy soak, exfoliation, and relaxing massage.",
    benefits: ["Relaxes hand muscles", "Exfoliates dry hand skin", "Hydrates hands deeply", "Luxurious sensory relaxation"]
  },
  {
    name: "Pasafin Manicure",
    category: "Manicure",
    description: "Warm paraffin wax treatment to locks in deep moisture and soften hand lines.",
    benefits: ["Locks in deep skin moisture", "Smooths fine lines on hands", "Soothes stiff finger joints", "Heals cracked skin"]
  },
  {
    name: "Ortho Oil Manicure",
    category: "Manicure",
    description: "Therapeutic hand massage using specialized oils to target wrist and joint fatigue.",
    benefits: ["Eases wrist and finger stiffness", "Promotes blood flow in hands", "Relieves hand fatigue", "Calming therapeutic massage"]
  },

  // --- SPA & WELLNESS ---
  {
    name: "Body Spa",
    category: "Spa & Wellness",
    description: "Full body massage therapy to soothe muscle knots, improve circulation, and relax the mind.",
    benefits: ["Relieves full body muscle knots", "Improves lymphatic drainage", "Detoxifies skin pores", "Deep mental relaxation"]
  },

  // --- TRAINING COURSES ---
  {
    name: "Basic Class",
    category: "Training Courses",
    description: "Entry-level beauty course teaching fundamentals of threading, basic cleanups, and haircuts.",
    benefits: ["Perfect for absolute beginners", "Hands-on practical training", "Covers day-to-day salon skills", "Academy certification upon completion"]
  },
  {
    name: "Advance Class",
    category: "Training Courses",
    description: "Advanced academy class covering professional makeup, bridal looks, and chemical hair styling.",
    benefits: ["Advanced bridal makeup training", "Covers hair chemical treatments", "In-depth styling portfolio prep", "Master academy diploma"]
  },
  {
    name: "Hair Dressing Course",
    category: "Training Courses",
    description: "Specialized vocational course focusing on haircut design, styling, and color chemistry.",
    benefits: ["Professional haircut techniques", "Mastery in blow-dry and styling", "Understanding hair color chemistry", "Prepares you for salon jobs"]
  },
  {
    name: "Saree Pre Pleating",
    category: "Training Courses",
    description: "Short course teaching folding, box-pleating, and secure draping of heavy silk sarees under 5 minutes.",
    benefits: ["Learn pre-pleating and box-folding", "Drape any silk saree under 5 mins", "Ironing and preservation secrets", "High-demand wedding skill"]
  }
];

const mappedServices = servicesData.map(s => ({
  name: s.name,
  category: s.category,
  description: s.description,
  benefits: s.benefits,
  image_url: null
}));

async function runSeed() {
  console.log("Attempting to authenticate user:", email);
  
  // 3. Log in first so the client can bypass Row Level Security policies
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (authError) {
    console.warn("Authentication failed:", authError.message);
    console.warn("Proceeding anonymously (inserts may fail if RLS is enabled).");
  } else {
    console.log("Successfully authenticated as admin user!");
  }

  console.log(`Seeding database with ${mappedServices.length} services...`);
  
  console.log("Clearing old records...");
  const { error: deleteError } = await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteError) {
    console.warn("Could not delete old services (safe if database is empty):", deleteError.message);
  }

  // Insert in batch
  const { data, error } = await supabase.from('services').insert(mappedServices);
  
  if (error) {
    console.error("Failed to seed database services:", error);
    process.exit(1);
  } else {
    console.log("Seeding successfully completed!");
    process.exit(0);
  }
}

runSeed();
