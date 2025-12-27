-- Create a table for categories
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null unique,
  display_order int default 0,
  image_url text
);

-- Enable RLS
alter table categories enable row level security;

-- Public can view
create policy "Categories are viewable by everyone"
on categories for select
using ( true );

-- Admins can manage
create policy "Admins can manage categories"
on categories for all
using ( auth.role() = 'authenticated' );

-- Seed initial categories for Fares Pizzeria
insert into categories (name, display_order) values
('Pizza', 1),
('Juice', 2),
('Lunch & Dinner', 3),
('Breakfast', 4),
('Pasta & Rice', 5),
('Hot Drinks', 6),
('Cold Drinks', 7)
on conflict (name) do nothing;
