-- -------------------------------------------------------------
-- SQL Seed File for Shiloh Salon Services Database Table
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- -------------------------------------------------------------

-- 1. Optional: Clear existing services
delete from services;

-- 2. Insert all 66 service records
insert into services (name, category, description, benefits) values
-- --- THREADING ---
(
  'Eyebrows', 
  'Threading', 
  'Professional eyebrow shaping using clean cotton thread to define and clean the arches for a sharp facial framing.', 
  array['Symmetrical arch alignment', 'Removes finest hair from the roots', 'Longer-lasting than shaving', 'Enhances eye expressions']
),
(
  'Upper Lips', 
  'Threading', 
  'Gentle hair removal from the upper lip area to leave the skin smooth and shadow-free.', 
  array['Creates smooth skin finish', 'Slows down hair regrowth', 'Removes minor tan from lip area', 'Quick and precise procedure']
),
(
  'Chin', 
  'Threading', 
  'Precise threading to clear stubborn hair from the chin area for a clean jawline.', 
  array['Provides clean and smooth jawline', 'Quick hair removal', 'Safe for sensitive chin skin', 'Reduces thick hair growth over time']
),
(
  'Fore Head', 
  'Threading', 
  'Threading to remove fine baby hair and peach fuzz from the forehead, creating a brighter complexion.', 
  array['Creates bright and clear forehead', 'Ensures even makeup application', 'Exfoliates dead skin cells', 'Gives a symmetrical facial frame']
),
(
  'Side Locks', 
  'Threading', 
  'Precise sideburn and side lock hair shaping for clean, sharp facial contours.', 
  array['Sharpens facial features', 'Removes dark peach fuzz', 'Produces smooth cheek profiles', 'Easy maintenance']
),
(
  'Full Face', 
  'Threading', 
  'Comprehensive full-face threading for a flawless, completely hair-free face.', 
  array['Instantly brightens overall complexion', 'Ensures ultra-smooth makeup base', 'Exfoliates dead skin layers', 'Boosts absorption of skincare products']
),

-- --- BLEACH ---
(
  'Herbal Bleach', 
  'Bleach', 
  'Gentle herbal bleaching cream to lighten facial hair and reduce discoloration using natural botanicals.', 
  array['Minimizes facial hair visibility', 'Soothes skin with herbal extracts', 'Even skin tone restoration', 'Safe for sensitive skin']
),
(
  'Herbal Bleach (Face & Neck)', 
  'Bleach', 
  'Herbal bleaching service extended to the neck area for a uniform, natural glow.', 
  array['Matches neck skin tone to face', 'Fades dark spots and neck tan', 'Calming botanical nourishment', 'Deeply purifies surface dirt']
),
(
  'Fruit Bleach', 
  'Bleach', 
  'Vitamin-rich fruit bleach designed to instantly boost radiance and soften skin texture.', 
  array['Infused with natural fruit AHA acids', 'Fades persistent blemishes', 'Delivers an instant glowing look', 'Exfoliates dull outer layers']
),
(
  'D Tan Bleach', 
  'Bleach', 
  'Strong anti-tan bleach formulation to reverse sun damage and hyperpigmentation on the skin.', 
  array['Erases deep sun tan', 'Restores original skin complexion', 'Purifies skin pores', 'Fades dark spots']
),
(
  'Wine Bleach', 
  'Bleach', 
  'Anti-aging wine extract bleach that brightens skin and fights free radical damage.', 
  array['Rich in grape seed antioxidants', 'Improves skin firmness', 'Lightens facial hair evenly', 'Restores youthful glow']
),
(
  'Gold Bleach', 
  'Bleach', 
  'Premium bleaching treatment with real gold dust for a sparkling, royal facial radiance.', 
  array['Imparts a brilliant golden glow', 'Stimulates skin cell renewal', 'Evens out skin pigmentation', 'Provides a polished facial look']
),
(
  'Whitening Bleach', 
  'Bleach', 
  'Intense brightening bleach formulated to lighten skin tone and reduce deep-seated dullness.', 
  array['Reduces dark pigmentation', 'Lightens stubborn dark hair', 'Reveals bright, refreshed skin', 'Smooths skin texture']
),

-- --- WAXING ---
(
  'Hand Wax (Half)', 
  'Waxing', 
  'Quick half-arm waxing using premium wax for smooth, hair-free elbows and forearms.', 
  array['Removes hair from lower arms', 'Exfoliates dead skin', 'Creates soft skin texture', 'Quick service time']
),
(
  'Hand Wax (Full)', 
  'Waxing', 
  'Complete arm waxing from shoulders to fingers for flawless smoothness.', 
  array['Hair-free skin from shoulders to fingers', 'Removes deep tan and dirt', 'Promotes softer hair regrowth', 'Smoother skin tone']
),
(
  'Leg Wax (Half)', 
  'Waxing', 
  'Half-leg waxing targeting lower legs for sleek, silky calves.', 
  array['Silky, hair-free calves', 'Fades tan on shins', 'Removes dead skin', 'Leaves legs feeling light']
),
(
  'Leg Wax (Full)', 
  'Waxing', 
  'Full-leg waxing from thighs to toes to remove unwanted hair and deep tan.', 
  array['Complete leg hair removal', 'Deeply exfoliates dry skin', 'Ensures even leg tone', 'No razor burns or cuts']
),
(
  'Underarms Wax', 
  'Waxing', 
  'Quick and hygienic underarm hair removal using sensitive-skin wax formula.', 
  array['Removes underarm hair from root', 'Reduces sweat odor by clearing hair', 'Helps lighten dark underarms', 'Keeps area fresh for weeks']
),
(
  'Face Wax', 
  'Waxing', 
  'Gentle facial waxing to eliminate peach fuzz and facial hair for an ultra-smooth finish.', 
  array['Ultra-smooth face texture', 'Makeup glides on flawlessly', 'Removes dead skin cells', 'Long-lasting hair-free results']
),
(
  'Upper Lip Wax', 
  'Waxing', 
  'Quick wax strip application to clear upper lip hair with minimal discomfort.', 
  array['Instant hair removal', 'Leaves area completely smooth', 'Fewer ingrown hairs than shaving', 'Very quick procedure']
),
(
  'Chin Wax', 
  'Waxing', 
  'Chin hair removal using specialized gentle wax to prevent irritation.', 
  array['Removes coarse chin hairs', 'Silky smooth skin feel', 'Slows down thick hair regrowth', 'Clean facial profile']
),
(
  'Full Body Wax', 
  'Waxing', 
  'Full body waxing service for head-to-toe smoothness and deep exfoliation.', 
  array['Complete body hair elimination', 'Exfoliates dead skin globally', 'Restores uniform body complexion', 'Boosts personal hygiene and comfort']
),

-- --- HAIRCUT ---
(
  'Straight Cut', 
  'Haircut', 
  'A classic straight haircut designed for clean, even ends and a polished appearance.', 
  array['Eliminates split ends', 'Gives a neat, healthy look', 'Easy to manage', 'Polished classic look']
),
(
  'U Cut', 
  'Haircut', 
  'A beautiful, traditional U-shaped haircut adding soft curves and fluid movement to the back profile.', 
  array['Creates natural volume', 'Elegant back profile', 'Suits all hair lengths', 'Adds body to flat hair']
),
(
  'V Cut', 
  'Haircut', 
  'Deep V-shaped haircut that tapers down to a point, creating dramatic angles and layers.', 
  array['Modern, edgy silhouette', 'Lightens thick hair weight', 'Highlights layers', 'Stylish cascading effect']
),
(
  'Step Cut', 
  'Haircut', 
  'A structured layered cut with distinct, visible steps that create amazing bounce and body.', 
  array['Adds dramatic volume', 'Gives a thick hair appearance', 'Perfect for wavy hair', 'Highly textured style']
),
(
  'Layer Cut', 
  'Haircut', 
  'Soft, flowing layers tailored to frame your face and complement your natural hair texture.', 
  array['Frames the face features', 'Reduces heavy hair weight', 'Adds bounce and motion', 'Suits all face shapes']
),
(
  'Feather Cut', 
  'Haircut', 
  'Feminine, soft outward layers with feathered ends for a light, breezy, and voluminous feel.', 
  array['Soft, romantic texture', 'Lightweight styling', 'Frames face features beautifully', 'Delicate layered ends']
),
(
  'Step With Feather Cut', 
  'Haircut', 
  'A premium combination styling that merges the structure of step cutting with soft feathered tips.', 
  array['Maximum volume and bounce', 'High-fashion aesthetic', 'Reduces split ends', 'Beautiful styling versatility']
),
(
  'Baby Cut', 
  'Haircut', 
  'A gentle, quick, and safe haircut designed to keep babies and toddlers neat and comfortable.', 
  array['Fun, stress-free handling', 'Keeps children neat and comfortable', 'Kid-safe styling scissors', 'Cute style outcome']
),
(
  'Mushroom Cut', 
  'Haircut', 
  'Classic rounded bowl cut for young children, framing the face cutely and easily manageable.', 
  array['Adorable retro design', 'Easy to wash and manage', 'Keeps hair out of kid''s eyes', 'Neat outline structure']
),
(
  'Diana Cut', 
  'Haircut', 
  'Sophisticated short layered crop inspired by timeless royal elegance.', 
  array['Sleek, sophisticated look', 'Extremely low maintenance', 'Accents cheekbones and eyes', 'Comfortable summer style']
),
(
  'Front Feather Cut', 
  'Haircut', 
  'Front-framing outward layers designed to add volume and shape around the face.', 
  array['Brings focus to eyes and lips', 'Gives body to limp front hair', 'Elegantly blends with longer back hair', 'Provides visual lift']
),

-- --- FACIAL ---
(
  'Face Cleanup', 
  'Facial', 
  'Quick pore cleansing, scrubbing, and blackhead removal to refresh tired skin.', 
  array['Removes deep-seated dirt', 'Clears blackheads and whiteheads', 'Refreshes dull facial skin', 'Prevents acne breakouts']
),
(
  'Herbal Facial', 
  'Facial', 
  'Natural facial using organic botanical extracts to soothe, heal, and hydrate the skin.', 
  array['Soothes and heals irritated skin', 'Free from harsh chemicals', 'Provides gentle hydration', 'Restores natural skin health']
),
(
  'Fruit Facial', 
  'Facial', 
  'Vitamin-rich fruit facial utilizing natural AHAs for a fresh, gentle skin glow.', 
  array['AHA acids gently exfoliate', 'Infuses skin with fruit vitamins', 'Improves skin suppleness', 'Restores fresh look']
),
(
  'D Tan Facial', 
  'Facial', 
  'Clarifying facial designed to remove sun tan, pollution particles, and hyperpigmentation.', 
  array['Clears sun damage', 'Brightens dark skin patches', 'Exfoliates dead tan layers', 'Restores original tone']
),
(
  'Sea Weed Facial', 
  'Facial', 
  'Hydrating marine-algae facial that detoxifies skin pores and regulates sebum production.', 
  array['Deeply hydrates thirsty skin', 'Regulates sebum production', 'Rich in ocean minerals', 'Combats free radical damage']
),
(
  'Goat Milk Facial', 
  'Facial', 
  'Nourishing facial utilizing goat milk extracts to deeply moisturize dry, sensitive skin.', 
  array['Very gentle on sensitive skin', 'Deeply moisturizes dry patches', 'Fades dark spots over time', 'Leaves skin baby-soft']
),
(
  'Vitamin C Facial', 
  'Facial', 
  'Brightening facial packed with active Vitamin C antioxidants to target dark spots and uneven tone.', 
  array['Fades dark spots and pigmentation', 'Boosts collagen production', 'Powerful antioxidant protection', 'Radiant skin renewal']
),
(
  'Chocolate Facial', 
  'Facial', 
  'Rich cocoa-infused facial that detoxifies skin while providing deep relaxation.', 
  array['Detoxifies and firms skin', 'High in skin-loving antioxidants', 'Deeply nourishes dry skin', 'Relieves stress and relaxes mind']
),
(
  'Gold Facial', 
  'Facial', 
  'A royal treatment infused with 24k gold leaf extracts to firm, hydrate, and brighten the skin.', 
  array['Imparts an intense, luminous glow', 'Improves skin elasticity', 'Delays skin aging signs', 'Stimulates blood circulation']
),
(
  'Wine Facial', 
  'Facial', 
  'Red grape seed extract facial designed to repair skin cells and combat early aging signs.', 
  array['Boosts skin cellular repair', 'Fights early signs of aging', 'Tightens open skin pores', 'Creates a smooth, dewy look']
),
(
  'Skin Lightening Facial', 
  'Facial', 
  'Brightening treatment formulated to reduce melanin, fade blemishes, and even out skin tone.', 
  array['Evens out blotchy skin tone', 'Reduces hyperpigmentation', 'Gives bright, clear skin', 'Fades stubborn blemishes']
),
(
  'Pearl Facial', 
  'Facial', 
  'Pearl dust facial to polish skin surface, minimize tan, and control excess oiliness.', 
  array['Exfoliates for pearl-like shine', 'Reduces tan and blemishes', 'Controls skin oiliness', 'Smooths rough skin texture']
),
(
  'Bridal Facial', 
  'Facial', 
  'The ultimate luxury facial delivering deep hydration and an intense dewy glow for brides-to-be.', 
  array['Intense dewy brightness', 'Flawless base for bridal makeup', 'Smooths skin lines', 'Deep hydration and luxury prep']
),

-- --- HAIR TREATMENT ---
(
  'Head Oil Massage', 
  'Hair Treatment', 
  'Relaxing hot oil scalp massage to relieve stress, nourish roots, and promote hair growth.', 
  array['Relieves stress and tension', 'Stimulates blood circulation', 'Nourishes hair roots', 'Promotes sound sleep']
),
(
  'Hair SPA', 
  'Hair Treatment', 
  'Deep conditioning and nourishment treatment to revive dry, damaged, and frizzy hair.', 
  array['Intensely hydrates hair shafts', 'Reduces frizz and split ends', 'Smoothens hair texture', 'Combats scalp dryness']
),
(
  'Oil Massage with Root Pack', 
  'Hair Treatment', 
  'Hot oil scalp massage followed by a purifying clay root pack to strengthen follicles.', 
  array['Strengthens hair roots', 'Prevents premature hair fall', 'Purifies scalp surface', 'Adds natural volume']
),
(
  'Oil Massage with Henna', 
  'Hair Treatment', 
  'Scalp massage combined with a cooling henna pack for natural conditioning and coloring.', 
  array['Combats scalp heat', 'Provides natural copper highlights', 'Conditions hair naturally', 'Fights dandruff and itchiness']
),
(
  'Dandruff Treatment', 
  'Hair Treatment', 
  'Targeted anti-fungal scalp treatment to eliminate flakes and soothe itchiness.', 
  array['Clears persistent dandruff flakes', 'Soothes dry, itchy scalp', 'Balances scalp pH level', 'Prevents scalp infections']
),

-- --- PEDICURE ---
(
  'Pedicure', 
  'Pedicure', 
  'Classic foot cleansing, scrubbing, nail trimming, and cuticle grooming.', 
  array['Cleans feet and trims nails', 'Removes cracked heel skin', 'Relaxes tired foot muscles', 'Improves foot hygiene']
),
(
  'D Tan Pedicure', 
  'Pedicure', 
  'Foot cleanup targeting sun tan and dark ankle areas to restore even skin tone.', 
  array['Lightens ankle and foot tan', 'Exfoliates dead tanned skin', 'Moisturizes dry feet', 'Softens rough cuticles']
),
(
  'Spa Pedicure', 
  'Pedicure', 
  'A relaxing foot treatment featuring an aromatherapy soak, deep scrubbing, and massage.', 
  array['Deeply relaxes foot arches', 'Softens calluses and heels', 'Aromatherapy stress relief', 'Leaves feet smelling fresh']
),
(
  'Pasafin Pedicure', 
  'Pedicure', 
  'Intense moisture treatment featuring a warm paraffin wax dip for cracked heels.', 
  array['Intense moisture for dry heels', 'Relieves joint stiffness in feet', 'Softens extremely rough skin', 'Creates a protective moisture barrier']
),
(
  'Ortho Oil Pedicure', 
  'Pedicure', 
  'Therapeutic pedicure with specialized pain-relief oil massage to ease muscle soreness.', 
  array['Relieves joint and muscle pain', 'Improves blood circulation in legs', 'Reduces foot swelling', 'Soothing therapeutic comfort']
),

-- --- MANICURE ---
(
  'Manicure', 
  'Manicure', 
  'Essential hand care including nail shaping, cuticle nourishment, and skin hydration.', 
  array['Cleans hands and shapes nails', 'Nourishes hand cuticles', 'Improves hand skin elasticity', 'Clean, groomed look']
),
(
  'D Tan Manicure', 
  'Manicure', 
  'Hand treatment designed to remove tan, fade spots, and restore skin complexion.', 
  array['Removes hand and wrist tan', 'Fades dark spots on fingers', 'Exfoliates dead skin', 'Restores even skin tone']
),
(
  'Spa Manicure', 
  'Manicure', 
  'Premium hand treatment with aromatherapy soak, exfoliation, and relaxing massage.', 
  array['Relaxes hand muscles', 'Exfoliates dry hand skin', 'Hydrates hands deeply', 'Luxurious sensory relaxation']
),
(
  'Pasafin Manicure', 
  'Manicure', 
  'Warm paraffin wax treatment to locks in deep moisture and soften hand lines.', 
  array['Locks in deep skin moisture', 'Smooths fine lines on hands', 'Soothes stiff finger joints', 'Heals cracked skin']
),
(
  'Ortho Oil Manicure', 
  'Manicure', 
  'Therapeutic hand massage using specialized oils to target wrist and joint fatigue.', 
  array['Eases wrist and finger stiffness', 'Promotes blood flow in hands', 'Relieves hand fatigue', 'Calming therapeutic massage']
),

-- --- SPA & WELLNESS ---
(
  'Body Spa', 
  'Spa & Wellness', 
  'Full body massage therapy to soothe muscle knots, improve circulation, and relax the mind.', 
  array['Relieves full body muscle knots', 'Improves lymphatic drainage', 'Detoxifies skin pores', 'Deep mental relaxation']
),

-- --- TRAINING COURSES ---
(
  'Basic Class', 
  'Training Courses', 
  'Entry-level beauty course teaching fundamentals of threading, basic cleanups, and haircuts.', 
  array['Perfect for absolute beginners', 'Hands-on practical training', 'Covers day-to-day salon skills', 'Academy certification upon completion']
),
(
  'Advance Class', 
  'Training Courses', 
  'Advanced academy class covering professional makeup, bridal looks, and chemical hair styling.', 
  array['Advanced bridal makeup training', 'Covers hair chemical treatments', 'In-depth styling portfolio prep', 'Master academy diploma']
),
(
  'Hair Dressing Course', 
  'Training Courses', 
  'Specialized vocational course focusing on haircut design, styling, and color chemistry.', 
  array['Professional haircut techniques', 'Mastery in blow-dry and styling', 'Understanding hair color chemistry', 'Prepares you for salon jobs']
),
(
  'Saree Pre Pleating', 
  'Training Courses', 
  'Short course teaching folding, box-pleating, and secure draping of heavy silk sarees under 5 minutes.', 
  array['Learn pre-pleating and box-folding', 'Drape any silk saree under 5 mins', 'Ironing and preservation secrets', 'High-demand wedding skill']
);
