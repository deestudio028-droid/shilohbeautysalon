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
    name: "Herbal Colour",
    category: "Hair Colouring",
    description: "Natural herbal hair colouring treatment that enhances hair tone while being gentle on the scalp and hair.",
    benefits: ["Natural-looking colour enhancement", "Gentle on hair and scalp", "Adds shine and softness", "Suitable for regular maintenance"]
  },
  {
    name: "Henna (Black)",
    category: "Hair Colouring",
    description: "Traditional black henna colouring service for rich colour coverage and healthier-looking hair.",
    benefits: ["Covers grey hair naturally", "Strengthens hair strands", "Improves hair texture", "Long-lasting colour effect"]
  },
  {
    name: "Streaks Single Hair Strip",
    category: "Hair Colouring",
    description: "Stylish single-strip hair highlighting service for a trendy and modern appearance.",
    benefits: ["Adds fashionable highlights", "Enhances hairstyle definition", "Quick transformation", "Customizable look"]
  },
  {
    name: "Streaks Hair Colour",
    category: "Hair Colouring",
    description: "Professional hair streak colouring service designed to create dimension and style.",
    benefits: ["Modern fashion look", "Adds depth and contrast", "Custom colour options", "Professional finish"]
  },
  {
    name: "Matrix Hair Colour",
    category: "Hair Colouring",
    description: "Premium Matrix professional hair colouring service for vibrant and long-lasting results.",
    benefits: ["Rich colour payoff", "Professional salon finish", "Long-lasting results", "Smooth and shiny appearance"]
  },
  {
    name: "Fashion Colouring",
    category: "Hair Colouring",
    description: "Creative fashion hair colouring service for bold and trendy colour transformations.",
    benefits: ["Unique colour styles", "Trend-focused appearance", "Personalized colour options", "Professional application"]
  },
  {
    name: "Hair Straightening",
    category: "Hair Colouring",
    description: "Hair straightening treatment that helps achieve smooth, sleek, and manageable hair.",
    benefits: ["Smooth hair texture", "Reduced frizz", "Easier styling", "Long-lasting results"]
  },
  {
    name: "Hair Smoothening",
    category: "Hair Colouring",
    description: "Professional smoothening treatment designed to improve hair manageability and shine.",
    benefits: ["Controls frizz", "Improves softness", "Enhances shine", "Easier maintenance"]
  },
  {
    name: "Hair Perming",
    category: "Hair Colouring",
    description: "Hair perming service that creates long-lasting curls, waves, and volume.",
    benefits: ["Adds volume", "Long-lasting curls", "Stylish appearance", "Custom curl patterns"]
  },
  {
    name: "Hair Blow Dry",
    category: "Hair Colouring",
    description: "Professional blow-dry styling service for smooth, voluminous, and polished hair.",
    benefits: ["Instant styling", "Adds volume", "Smooth finish", "Perfect for special occasions"]
  },
  {
    name: "Temporary Straightening",
    category: "Hair Colouring",
    description: "Temporary hair straightening service that provides a sleek look without permanent treatment.",
    benefits: ["Smooth appearance", "Quick styling solution", "Non-permanent treatment", "Suitable for events"]
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

  console.log(`Seeding database with ${mappedServices.length} Hair Colouring services...`);

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
