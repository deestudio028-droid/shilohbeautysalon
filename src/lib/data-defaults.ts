export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration?: string;
  benefits: string[];
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  imageUrl: string;
  title: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  role: string;
}

export const DEFAULT_SERVICES: Service[] = [
  // HAIR CARE
  {
    id: "h1",
    name: "Straight Cut",
    category: "Hair Care",
    description: "A classic straight haircut designed for clean, even ends and a polished appearance.",
    duration: "20 mins",
    benefits: ["Eliminates split ends", "Gives a neat, healthy look", "Easy to manage"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM (2).jpeg"
  },
  {
    id: "h2",
    name: "U Cut",
    category: "Hair Care",
    description: "A beautiful, traditional U-shaped haircut adding soft curves and fluid movement to the back.",
    duration: "30 mins",
    benefits: ["Creates natural volume", "Elegant back profile", "Suits all hair lengths"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM (2).jpeg"
  },
  {
    id: "h3",
    name: "V Cut",
    category: "Hair Care",
    description: "Deep V-shaped haircut that tapers down to a point, creating dramatic angles and layers.",
    duration: "30 mins",
    benefits: ["Modern, edgy silhouette", "Lightens thick hair", "Highlights layers"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM (2).jpeg"
  },
  {
    id: "h4",
    name: "Step Cut",
    category: "Hair Care",
    description: "A structured layered cut with distinct, visible 'steps' that create amazing bounce and body.",
    duration: "40 mins",
    benefits: ["Adds dramatic volume", "Gives thick appearance", "Perfect for wavy hair"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM (2).jpeg"
  },
  {
    id: "h5",
    name: "Layer Cut",
    category: "Hair Care",
    description: "Soft, flowing layers tailored to frame your face and complement your natural hair texture.",
    duration: "45 mins",
    benefits: ["Frames the face elegantly", "Reduces heaviness", "Adds movement and bounce"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM (2).jpeg"
  },
  {
    id: "h6",
    name: "Feather Cut",
    category: "Hair Care",
    description: "Feminine, soft outward layers with feathered ends for a light, breezy, and voluminous feel.",
    duration: "45 mins",
    benefits: ["Soft, romantic texture", "Lightweight styling", "Frames face features beautifully"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM (2).jpeg"
  },
  {
    id: "h7",
    name: "Step With Feather Cut",
    category: "Hair Care",
    description: "A premium combination styling that merges the structure of step cutting with soft feathered tips.",
    duration: "60 mins",
    benefits: ["Maximum volume and bounce", "High-fashion look", "Reduces split ends"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM (2).jpeg"
  },
  {
    id: "h8",
    name: "Hair Smoothening",
    category: "Hair Care",
    description: "A professional chemical treatment designed to straighten out frizz and leave hair incredibly smooth and soft.",
    duration: "3-4 hours",
    benefits: ["Eliminates frizz entirely", "Creates a silky, shiny finish", "Reduces daily styling time"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.20 AM.jpeg"
  },
  {
    id: "h9",
    name: "Hair Straightening",
    category: "Hair Care",
    description: "Permanent thermal straightening for pin-straight, ultra-sleek, and glass-like hair.",
    duration: "3-4 hours",
    benefits: ["Permanent pin-straight result", "High glossy reflection", "Sleek, sophisticated look"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.20 AM.jpeg"
  },
  {
    id: "h10",
    name: "Hair Spa",
    category: "Hair Care",
    description: "Deep conditioning and massage treatment to revive dry, damaged hair and nourish the scalp.",
    duration: "45-60 mins",
    benefits: ["Deeply hydrates hair shafts", "Reduces hair fall", "Relieves stress and relaxes"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.20 AM.jpeg"
  },
  {
    id: "h11",
    name: "Hair Blow Dry",
    category: "Hair Care",
    description: "Luxury wash and professional blow-out for bouncy curls or sleek straight styles.",
    duration: "30 mins",
    benefits: ["Instant volume", "Professional setting", "Glamorous finish"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.20 AM.jpeg"
  },

  // SKIN CARE
  {
    id: "s1",
    name: "Threading (Eyebrows)",
    category: "Skin Care",
    description: "Precise thread work to shape and clean the eyebrow arches for a sharp facial framing.",
    duration: "10 mins",
    benefits: ["Perfect symmetrical arches", "Removes finest hair from roots", "Longer-lasting than shaving"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.17 AM.jpeg"
  },
  {
    id: "s2",
    name: "Gold Bleach",
    category: "Skin Care",
    description: "Premium bleaching treatment with gold particles to lighten facial hair and brighten skin tone.",
    duration: "25 mins",
    benefits: ["Lightens facial hair evenly", "Restores golden radiance", "Deep cleanses pores"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.17 AM.jpeg"
  },
  {
    id: "s3",
    name: "Goat Milk Facial",
    category: "Skin Care",
    description: "Nourishing facial utilizing goat milk extracts rich in lactic acid to exfoliate, hydrate, and soften sensitive skin.",
    duration: "60 mins",
    benefits: ["Gentle, natural exfoliation", "Deep hydration for dry skin", "Soothes sensitive skin types"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM.jpeg"
  },
  {
    id: "s4",
    name: "Vitamin C Facial",
    category: "Skin Care",
    description: "Brightening facial packed with active Vitamin C antioxidants to target dark spots, sun damage, and uneven skin tone.",
    duration: "60 mins",
    benefits: ["Fades dark spots and pigmentation", "Boosts collagen production", "Reveals radiant, youthful skin"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM.jpeg"
  },
  {
    id: "s5",
    name: "D-Tan Facial",
    category: "Skin Care",
    description: "Deep clarifying facial formulated to remove sun tan, dirt, and pollution damage from the skin layers.",
    duration: "50 mins",
    benefits: ["Removes persistent sun tan", "Soothes sunburnt skin", "Restores natural complexion"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM.jpeg"
  },
  {
    id: "s6",
    name: "Gold Facial",
    category: "Skin Care",
    description: "A royal treatment infused with 24k gold leaf extracts to firm, hydrate, and brighten the skin.",
    duration: "75 mins",
    benefits: ["Improves skin elasticity", "Provides an intense, luminous glow", "Anti-aging properties"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM.jpeg"
  },
  {
    id: "s7",
    name: "Chocolate Facial",
    category: "Skin Care",
    description: "Deliciously rich antioxidant facial using cocoa extracts to detoxify skin and combat aging signs.",
    duration: "60 mins",
    benefits: ["Stress-relieving aroma", "Rich in skin-loving antioxidants", "Leaves skin deeply nourished"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM.jpeg"
  },

  // BRIDAL SERVICES
  {
    id: "b1",
    name: "Bridal Combo",
    category: "Bridal Services",
    description: "A premium package covering the essential styling requirements for a stunning wedding look.",
    duration: "2-3 hours",
    benefits: ["Bridal Makeup", "Advance Hairdo", "Professional Saree Draping", "Comfortable Contact Lenses", "Volume Eyelashes", "Hair Extensions"],
    imageUrl: "/images/bridal/WhatsApp Image 2026-06-24 at 11.08.31 AM (1).jpeg"
  },
  {
    id: "b2",
    name: "HD Bridal Combo",
    category: "Bridal Services",
    description: "A professional High-Definition bridal setup designed to look flawless under camera flashes and videography.",
    duration: "3 hours",
    benefits: ["HD Bridal Makeup", "HD Advance Hairdo", "Saree Draping", "Hair Extensions", "Lenses & Lashes", "Exquisite Bridal Jewelry Set Styling"],
    imageUrl: "/images/bridal/WhatsApp Image 2026-06-24 at 11.08.31 AM.jpeg"
  },
  {
    id: "b3",
    name: "HD Glass Bridal Combo",
    category: "Bridal Services",
    description: "An ultra-modern bridal package delivering the coveted glassy, dewy makeup look with complete skin prep.",
    duration: "3.5 hours",
    benefits: ["HD Glass Bridal Makeup", "Premium Hairdo", "Saree Draping", "Hair Extensions", "Lenses & Lashes", "Bridal Jewelry Styling", "Pre-makeup Bridal Facial"],
    imageUrl: "/images/bridal/WhatsApp Image 2026-06-24 at 11.08.31 AM (2).jpeg"
  },
  {
    id: "b4",
    name: "Royal Bridal Combo",
    category: "Bridal Services",
    description: "Indulge in royal bridal styling that covers both wedding makeup and traditional bridal arts.",
    duration: "5 hours",
    benefits: ["HD Glass Bridal Makeup", "Premium Hairdo", "Saree Draping", "Hair Extensions", "Lenses & Lashes", "Bridal Jewelry Styling", "Pre-bridal Skin Facial", "Bridal Mehndi (Intricate Henna)"],
    imageUrl: "/images/bridal/WhatsApp Image 2026-06-24 at 11.08.30 AM.jpeg"
  },
  {
    id: "b5",
    name: "Imperial Bridal Combo",
    category: "Bridal Services",
    description: "The ultimate head-to-toe styling treatment for the discerning bride wanting absolute luxury.",
    duration: "6 hours",
    benefits: ["HD Glass Bridal Makeup", "Premium Hairdo", "Saree Draping", "Hair Extensions", "Lenses & Lashes", "Bridal Jewelry Styling", "Luxury Bridal Skin Prep Facial", "Full Bridal Hand & Leg Mehndi"],
    imageUrl: "/images/bridal/WhatsApp Image 2026-06-24 at 11.08.30 AM (1).jpeg"
  },

  // KIDS SERVICES
  {
    id: "k1",
    name: "Baby Cut",
    category: "Kids Services",
    description: "A gentle, quick, and safe haircut designed for babies and toddlers to keep them neat and comfortable.",
    duration: "20 mins",
    benefits: ["Patience-filled stylist handling", "Fun styling chairs", "Kid-safe tools"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.17 AM.jpeg"
  },
  {
    id: "k2",
    name: "Mushroom Cut",
    category: "Kids Services",
    description: "Classic rounded bowl cut for young children, framing the face cutely and easily manageable.",
    duration: "25 mins",
    benefits: ["Adorable classic design", "Easy to wash and style", "Keeps hair out of eyes"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.17 AM.jpeg"
  },

  // HOME SERVICES
  {
    id: "hs1",
    name: "Premium Home Salon",
    category: "Home Services",
    description: "Book our experienced beauticians to visit your residence for complete bridal, skin, or hair makeovers.",
    duration: "Flexible",
    benefits: ["Absolute comfort of home", "Full hygienic setup carried by us", "Perfect for pre-wedding functions"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.20 AM (1).jpeg"
  },

  // BEAUTY ACADEMY
  {
    id: "a1",
    name: "Basic Beauty Class",
    category: "Beauty Academy",
    description: "Our entry-level professional course covering the fundamentals of skin care, basic haircuts, and threading.",
    duration: "1 Month",
    benefits: ["Hands-on practical training", "Expert mentorship", "Basic certification upon completion"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.20 AM (2).jpeg"
  },
  {
    id: "a2",
    name: "Advance Makeup Class",
    category: "Beauty Academy",
    description: "Master advanced makeup arts including HD, Glass, Airbrush, and traditional bridal techniques.",
    duration: "2 Months",
    benefits: ["Portfolio creation photoshoot", "Premium makeup kit guidance", "Master Academy Diploma"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.20 AM (2).jpeg"
  },
  {
    id: "a3",
    name: "Saree Pre-Pleating Course",
    category: "Beauty Academy",
    description: "Learn professional pleating, box-folding, and draping techniques to drape any saree in under 5 minutes.",
    duration: "1 Week",
    benefits: ["Draping variations (Gujarati, South Indian)", "Ironing and box-pleating tricks", "Quick draping certification"],
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.20 AM (2).jpeg"
  }
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Shiloh Royal Herb Hair Oil",
    description: "Our signature hair growth formulation infused with hibiscus, bringraj, and cold-pressed coconut oil.",
    benefits: ["Stops hair fall within 15 days", "Deeply conditions scalp roots", "Promotes dense black hair growth"],
    imageUrl: "/images/product.webp"
  },
  {
    id: "p2",
    name: "Professional D-Tan Cleanser Pack",
    description: "Salon-grade organic tan removal clay mask formulated with orange peel extracts and tea tree oils.",
    benefits: ["Instantly brightens sun-damaged skin", "Refines pores and removes oiliness", "Soothing cooling sensation"],
    imageUrl: "/images/product.webp"
  },
  {
    id: "p3",
    name: "Silky Smooth Argan Hair Mask",
    description: "Intense moisture repair hair mask rich in Moroccan Argan oil and silk proteins, used in our premium hair spas.",
    benefits: ["Restores damaged, chemically treated hair", "Creates incredible softness", "Long-lasting sweet fragrance"],
    imageUrl: "/images/product.webp"
  },
  {
    id: "p4",
    name: "Luxury Rose Petal Skin Serum",
    description: "Concentrated floral serum containing active hyaluronic acid and distilled rose lipids for glass-like dewy skin.",
    benefits: ["Plumps skin with hydration", "Fades fine lines and dry patches", "Perfect base before applying makeup"],
    imageUrl: "/images/product.webp"
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  // BRIDAL LOOKS
  {
    id: "g1",
    category: "Bridal Looks",
    imageUrl: "/images/bridal/WhatsApp Image 2026-06-24 at 11.08.31 AM (1).jpeg",
    title: "Classic Red Bridal Combo Transformation"
  },
  {
    id: "g2",
    category: "Bridal Looks",
    imageUrl: "/images/bridal/WhatsApp Image 2026-06-24 at 11.08.31 AM.jpeg",
    title: "Stunning HD Bridal Jewelry & Makeup"
  },
  {
    id: "g3",
    category: "Bridal Looks",
    imageUrl: "/images/bridal/WhatsApp Image 2026-06-24 at 11.08.31 AM (2).jpeg",
    title: "Dewy HD Glass Bridal Perfection"
  },
  {
    id: "g4",
    category: "Bridal Looks",
    imageUrl: "/images/bridal/WhatsApp Image 2026-06-24 at 11.08.30 AM.jpeg",
    title: "Royal Crimson Saree & Bridal Facial Prep"
  },
  {
    id: "g5",
    category: "Bridal Looks",
    imageUrl: "/images/bridal/WhatsApp Image 2026-06-24 at 11.08.30 AM (1).jpeg",
    title: "Imperial Full Mehndi & Makeup Transformation"
  },
  
  // MENU references for details
  {
    id: "g6",
    category: "Hair Transformations",
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM (2).jpeg",
    title: "Professional Haircut Design Menu"
  },
  {
    id: "g7",
    category: "Hair Transformations",
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.20 AM.jpeg",
    title: "Hair Coloring & Straightening Options"
  },
  {
    id: "g8",
    category: "Skin Care Results",
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.19 AM.jpeg",
    title: "Custom Facial & Skin Treatment Selection"
  },
  {
    id: "g9",
    category: "Home Service Moments",
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.20 AM (1).jpeg",
    title: "Manicure, Pedicure & Massages"
  },
  {
    id: "g10",
    category: "Kids Styling",
    imageUrl: "/images/menu/WhatsApp Image 2026-06-24 at 10.53.17 AM.jpeg",
    title: "Gentle Grooming & Threading Guide"
  }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aishwarya Rajesh",
    rating: 5,
    comment: "I booked their HD Glass Bridal Combo for my wedding, and I was absolutely stunned. The makeup felt so lightweight and lasted the entire day. The saree draping was incredibly neat and secure!",
    role: "Bride"
  },
  {
    id: "t2",
    name: "Meera Krishnan",
    rating: 5,
    comment: "Shiloh has been my go-to salon for facials. Their Goat Milk Facial is out of this world! It left my dry skin feeling so plump and glowing. Exceptional service in Chennai.",
    role: "Regular Customer"
  },
  {
    id: "t3",
    name: "Divya Prakash",
    rating: 5,
    comment: "The Saree Pre-Pleating Course at their academy was excellent. The trainers teach very patiently, and now I can box-fold and pleat any silk saree in under 5 minutes. Best investment ever!",
    role: "Academy Student"
  },
  {
    id: "t4",
    name: "Sharmila Roy",
    rating: 5,
    comment: "Their home service option is so convenient. They sent two therapists for a hair spa and pedicure. They brought all hygienic equipment, and the experience was just like a 5-star spa at home.",
    role: "Home Service Client"
  }
];
