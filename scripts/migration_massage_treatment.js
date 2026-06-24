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
  {
    name: "Head Oil Massage",
    category: "Massage Treatment",
    description: "Relaxing scalp and head massage designed to reduce stress and nourish the hair roots.",
    benefits: ["Relieves stress and tension", "Improves scalp circulation", "Nourishes hair roots", "Promotes relaxation"]
  },
  {
    name: "Hair SPA",
    category: "Massage Treatment",
    description: "Deep conditioning hair treatment that restores moisture, shine, and softness.",
    benefits: ["Deep nourishment", "Reduces dryness", "Improves hair texture", "Adds shine"]
  },
  {
    name: "Oil Massage with Root Pack",
    category: "Massage Treatment",
    description: "Scalp massage combined with a nourishing root pack for healthier hair growth.",
    benefits: ["Strengthens roots", "Improves scalp health", "Reduces hair fall", "Nourishes follicles"]
  },
  {
    name: "Oil Massage with Henna",
    category: "Massage Treatment",
    description: "Traditional oil massage followed by henna-based hair care treatment.",
    benefits: ["Natural conditioning", "Strengthens hair", "Improves texture", "Enhances shine"]
  },
  {
    name: "Dandruff Treatment",
    category: "Massage Treatment",
    description: "Specialized scalp treatment designed to reduce dandruff and scalp irritation.",
    benefits: ["Controls dandruff", "Soothes scalp", "Reduces itching", "Promotes scalp health"]
  }
];

const mappedServices = servicesData.map(s => ({
  name: s.name,
  category: s.category,
  description: s.description,
  benefits: s.benefits,
  image_url: null
}));

async function runMigration() {
  console.log("Attempting to authenticate user:", email);
  
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (authError) {
    console.warn("Authentication failed:", authError.message);
    console.warn("Proceeding anonymously (operations may fail if RLS is enabled).");
  } else {
    console.log("Successfully authenticated as admin user!");
  }

  console.log("Deleting services under old 'Hair Treatment' category...");
  const { error: deleteError } = await supabase
    .from('services')
    .delete()
    .eq('category', 'Hair Treatment');

  if (deleteError) {
    console.error("Failed to delete old services:", deleteError.message);
    process.exit(1);
  }

  console.log(`Inserting ${mappedServices.length} services under 'Massage Treatment'...`);
  const { data, error } = await supabase.from('services').insert(mappedServices);
  
  if (error) {
    console.error("Failed to insert new services:", error);
    process.exit(1);
  } else {
    console.log("Migration successfully completed!");
    process.exit(0);
  }
}

runMigration();
