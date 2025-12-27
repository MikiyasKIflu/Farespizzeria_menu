-- Create a table for menu items
create table if not exists menu_items (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name_en text not null,
  name_local text not null,
  name_om text,
  name_so text,
  price numeric not null,
  category text not null,
  is_available boolean default true,
  image_url text
);

-- Enable Row Level Security (RLS)
alter table menu_items enable row level security;

-- Create a policy that allows everyone to view available menu items
create policy "Public menu items are viewable by everyone"
on menu_items for select
using ( true );

-- Create a policy that allows authenticated users (admins) to do everything
create policy "Admins can do everything"
on menu_items for all
using ( auth.role() = 'authenticated' );

-- Seed Data (Ethiopian Menu Items)
insert into menu_items (name_en, name_local, price, category) values
('Special Ful', 'ስፔሻል ፉል', 150, 'Breakfast'),
('Chechebsa', 'ጨጨብሳ', 120, 'Breakfast'),
('Scrambled Eggs', 'እንቁላል ፍርፍር', 100, 'Breakfast'),
('Tibs Firfir', 'ጥብስ ፍርፍር', 250, 'Lunch & Dinner'),
('Kitfo', 'ክትፎ', 400, 'Lunch & Dinner'),
('Shiro Tegabino', 'ሽሮ ተጋቢኖ', 180, 'Lunch & Dinner'),
('Doro Wat', 'ዶሮ ወጥ', 350, 'Lunch & Dinner'),
('Pasta with Tomato Sauce', 'ፓስታ በሎሚ', 140, 'Pasta & Rice'),
('Rice with Veggies', 'ሩዝ በአትክልት', 130, 'Pasta & Rice'),
('Spaghetti Bolognese', 'ፓስታ ቦሎኛ', 200, 'Pasta & Rice');
