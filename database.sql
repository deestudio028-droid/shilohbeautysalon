-- -------------------------------------------------------------
-- Supabase Database Schema for Shiloh Ladies & Kids Beauty Salon
-- -------------------------------------------------------------

-- Enable UUID extension if not enabled
create extension if not exists "uuid-ossp";

-- 1. Services Table
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  description text,
  duration text,
  benefits text[] not null default '{}',
  image_url text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table services enable row level security;

-- Policy: Allow read access to anyone
drop policy if exists "Allow public read access on services" on services;
create policy "Allow public read access on services" on services
  for select using (true);

-- Policy: Allow full CRUD only to authenticated users (admin)
drop policy if exists "Allow auth CRUD on services" on services;
create policy "Allow auth CRUD on services" on services
  for all using (auth.role() = 'authenticated');


-- 2. Products Table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  benefits text[] not null default '{}',
  image_url text,
  created_at timestamp with time zone default now()
);

alter table products enable row level security;

drop policy if exists "Allow public read access on products" on products;
create policy "Allow public read access on products" on products
  for select using (true);

drop policy if exists "Allow auth CRUD on products" on products;
create policy "Allow auth CRUD on products" on products
  for all using (auth.role() = 'authenticated');


-- 3. Transformations Gallery Table
create table if not exists gallery (
  id uuid default gen_random_uuid() primary key,
  category text not null, -- Bridal Looks, Hair Transformations, Skin Care Results, Kids Styling, Home Service Moments
  image_url text not null,
  title text,
  created_at timestamp with time zone default now()
);

alter table gallery enable row level security;

drop policy if exists "Allow public read access on gallery" on gallery;
create policy "Allow public read access on gallery" on gallery
  for select using (true);

drop policy if exists "Allow auth CRUD on gallery" on gallery;
create policy "Allow auth CRUD on gallery" on gallery
  for all using (auth.role() = 'authenticated');


-- 4. Testimonials Table
create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null,
  role text default 'Customer',
  created_at timestamp with time zone default now()
);

alter table testimonials enable row level security;

drop policy if exists "Allow public read access on testimonials" on testimonials;
create policy "Allow public read access on testimonials" on testimonials
  for select using (true);

drop policy if exists "Allow auth CRUD on testimonials" on testimonials;
create policy "Allow auth CRUD on testimonials" on testimonials
  for all using (auth.role() = 'authenticated');


-- 5. Appointments Table
create table if not exists appointments (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  service text not null,
  appointment_type text not null check (appointment_type in ('Salon Visit', 'Home Service')),
  address text, -- Can be null for Salon Visit
  preferred_date date not null,
  preferred_time text not null,
  notes text,
  status text default 'Pending Confirmation' check (status in ('Pending Confirmation', 'Confirmed', 'Completed', 'Cancelled')),
  booking_type text default 'Standard' check (booking_type in ('Standard', 'Special Request')),
  appointment_reference text unique,
  created_at timestamp with time zone default now()
);

alter table appointments enable row level security;

-- Policy: Allow inserts by anyone (public booking)
drop policy if exists "Allow public insert on appointments" on appointments;
create policy "Allow public insert on appointments" on appointments
  for insert with check (true);

-- Policy: Allow full CRUD only to authenticated users (admin)
drop policy if exists "Allow auth CRUD on appointments" on appointments;
create policy "Allow auth CRUD on appointments" on appointments
  for all using (auth.role() = 'authenticated');

-- Policy: Allow public read access (necessary for anonymous users checking slot capacity)
drop policy if exists "Allow public select on appointments" on appointments;
create policy "Allow public select on appointments" on appointments
  for select using (true);


-- 5b. Business Settings Table (Singleton)
create table if not exists business_settings (
  id integer primary key default 1 check (id = 1),
  opening_time text default '10:00 AM',
  closing_time text default '08:00 PM',
  slot_capacity integer default 3,
  closed_days text[] default '{}',
  whatsapp_number text default '919962110080',
  created_at timestamp with time zone default now()
);

insert into business_settings (id, opening_time, closing_time, slot_capacity, whatsapp_number)
values (1, '10:00 AM', '08:00 PM', 3, '919962110080')
on conflict (id) do nothing;



-- -------------------------------------------------------------
-- 6. Storage Bucket & Policies for Shiloh Media (Image Uploads)
-- -------------------------------------------------------------
-- Note: Run this script in the Supabase SQL editor to create the bucket and enable access.

-- Create shiloh-media bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('shiloh-media', 'shiloh-media', true)
on conflict (id) do nothing;

-- Storage Policies:
-- 1. Allow public select access to anyone
drop policy if exists "Allow public read access on shiloh-media" on storage.objects;
create policy "Allow public read access on shiloh-media" on storage.objects
  for select using (bucket_id = 'shiloh-media');

-- 2. Allow authenticated users (admin) to insert/upload files
drop policy if exists "Allow auth insert access on shiloh-media" on storage.objects;
create policy "Allow auth insert access on shiloh-media" on storage.objects
  for insert with check (bucket_id = 'shiloh-media' and auth.role() = 'authenticated');

-- 3. Allow authenticated users (admin) to update files
drop policy if exists "Allow auth update access on shiloh-media" on storage.objects;
create policy "Allow auth update access on shiloh-media" on storage.objects
  for update using (bucket_id = 'shiloh-media' and auth.role() = 'authenticated');

-- 4. Allow authenticated users (admin) to delete files
drop policy if exists "Allow auth delete access on shiloh-media" on storage.objects;
create policy "Allow auth delete access on shiloh-media" on storage.objects
  for delete using (bucket_id = 'shiloh-media' and auth.role() = 'authenticated');

-- -------------------------------------------------------------
-- Instructions for Admin Setup:
-- -------------------------------------------------------------
-- 1. Go to your Supabase Dashboard -> Authentication -> Users.
-- 2. Click "Add user" -> "Create user".
-- 3. Enter Email: admin@shiloh.com (or your email) and set a secure Password.
-- 4. Uncheck "Send email confirmation" to enable immediate login.
-- 5. Save the user. Now you can log in to /admin/login on the website!
-- -------------------------------------------------------------


-- -------------------------------------------------------------
-- MIGRATION: Booking System Upgrade
-- -------------------------------------------------------------
-- Run the following script in the Supabase SQL editor to upgrade your existing database:

-- 1. Drop existing status check constraint
alter table appointments drop constraint if exists appointments_status_check;

-- 2. Update any existing 'Pending' statuses to 'Pending Confirmation'
update appointments set status = 'Pending Confirmation' where status = 'Pending';

-- 3. Add updated status check constraint
alter table appointments add constraint appointments_status_check check (status in ('Pending Confirmation', 'Confirmed', 'Completed', 'Cancelled'));

-- 4. Set default value for new appointments
alter table appointments alter column status set default 'Pending Confirmation';

-- 5. Add booking_type column
alter table appointments add column if not exists booking_type text default 'Standard' check (booking_type in ('Standard', 'Special Request'));

-- 6. Add appointment_reference column
alter table appointments add column if not exists appointment_reference text unique;


-- 7. Create business_settings singleton table
create table if not exists business_settings (
  id integer primary key default 1 check (id = 1),
  opening_time text default '10:00 AM',
  closing_time text default '08:00 PM',
  slot_capacity integer default 3,
  closed_days text[] default '{}',
  whatsapp_number text default '919962110080',
  created_at timestamp with time zone default now()
);

-- 8. Seed business_settings
insert into business_settings (id, opening_time, closing_time, slot_capacity, whatsapp_number)
values (1, '10:00 AM', '08:00 PM', 3, '919962110080')
on conflict (id) do nothing;


-- 9. Feedbacks Table
create table if not exists feedbacks (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  phone_number text not null,
  service_name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  message text not null,
  photo_url text,
  status text default 'Pending' check (status in ('Pending', 'Approved', 'Rejected')),
  created_at timestamp with time zone default now()
);

alter table feedbacks enable row level security;

-- Policy: Allow inserts by anyone (public feedback submission)
drop policy if exists "Allow public insert on feedbacks" on feedbacks;
create policy "Allow public insert on feedbacks" on feedbacks
  for insert with check (true);

-- Policy: Allow public read access to approved feedbacks (or admins)
drop policy if exists "Allow public select approved feedbacks" on feedbacks;
create policy "Allow public select approved feedbacks" on feedbacks
  for select using (status = 'Approved' or auth.role() = 'authenticated');

-- Policy: Allow authenticated users (admin) to do all (CRUD)
drop policy if exists "Allow auth CRUD on feedbacks" on feedbacks;
create policy "Allow auth CRUD on feedbacks" on feedbacks
  for all using (auth.role() = 'authenticated');


