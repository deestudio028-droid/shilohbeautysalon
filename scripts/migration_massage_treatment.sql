-- -------------------------------------------------------------
-- SQL Migration: Replace 'Hair Treatment' with 'Massage Treatment'
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- -------------------------------------------------------------

-- 1. Delete all services currently assigned to the old category
delete from services where category = 'Hair Treatment';

-- 2. Insert the 5 services under the new category 'Massage Treatment'
insert into services (name, category, description, benefits) values
(
  'Head Oil Massage', 
  'Massage Treatment', 
  'Relaxing scalp and head massage designed to reduce stress and nourish the hair roots.', 
  array['Relieves stress and tension', 'Improves scalp circulation', 'Nourishes hair roots', 'Promotes relaxation']
),
(
  'Hair SPA', 
  'Massage Treatment', 
  'Deep conditioning hair treatment that restores moisture, shine, and softness.', 
  array['Deep nourishment', 'Reduces dryness', 'Improves hair texture', 'Adds shine']
),
(
  'Oil Massage with Root Pack', 
  'Massage Treatment', 
  'Scalp massage combined with a nourishing root pack for healthier hair growth.', 
  array['Strengthens roots', 'Improves scalp health', 'Reduces hair fall', 'Nourishes follicles']
),
(
  'Oil Massage with Henna', 
  'Massage Treatment', 
  'Traditional oil massage followed by henna-based hair care treatment.', 
  array['Natural conditioning', 'Strengthens hair', 'Improves texture', 'Enhances shine']
),
(
  'Dandruff Treatment', 
  'Massage Treatment', 
  'Specialized scalp treatment designed to reduce dandruff and scalp irritation.', 
  array['Controls dandruff', 'Soothes scalp', 'Reduces itching', 'Promotes scalp health']
);
