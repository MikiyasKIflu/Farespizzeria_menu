-- Re-create table to ensure clean slate (Optional, be careful in prod)
-- drop table if exists menu_items;
create table if not exists menu_items (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name_en text not null,
  name_local text not null,
  price numeric not null,
  category text not null, 
  is_available boolean default true,
  image_url text
);

-- Enable RLS
alter table menu_items enable row level security;

-- Policies
drop policy if exists "Public menu items are viewable by everyone" on menu_items;
create policy "Public menu items are viewable by everyone" on menu_items for select using ( true );

drop policy if exists "Admins can do everything" on menu_items;
create policy "Admins can do everything" on menu_items for all using ( auth.role() = 'authenticated' );

-- Clear existing data to avoid duplicates during seeding
delete from menu_items;

-- Insert Items
insert into menu_items (name_en, name_local, price, category) values
-- SHIRO & TRADITIONAL (Lunch & Dinner)
('Tegabino Shiro', 'ተጋቢኖ ሽሮ', 200, 'Lunch & Dinner'),
('Bozena Shiro', 'ቦዘና ሽሮ', 250, 'Lunch & Dinner'),
('Fases Shiro', 'ፋሰስ ሽሮ', 150, 'Lunch & Dinner'),
('Shiro with Gomen', 'ሽሮ በጎመንጎ', 250, 'Lunch & Dinner'),
('Suf Fitfit', 'ሱፍ ፍትፍት', 200, 'Lunch & Dinner'),
('Yfesk Maheberawi','የፍስክ ማህበራዊ', 350, 'Lunch & Dinner'),
('Telba Fetfet','ተልባ ፍትፍት', 200, 'Lunch & Dinner'),
('Atkelt Selata','የአትክልት ሰላጣ', 200, 'Lunch & Dinner'),
('Special Selata','እስፔሻል ሰላጣ', 300, 'Lunch & Dinner'),
('Temantim Selata','ቲማቲም ሰላጣ', 350, 'Lunch & Dinner'),
-- MEAT DISHES (Lunch & Dinner)
('Special Kitfo', 'ስፔሻል ክትፎ', 900, 'Lunch & Dinner'),
('Normal Kitfo', 'ክትፎ', 750, 'Lunch & Dinner'),
('Tibs', 'የፍየል ጥብስ', 400, 'Lunch & Dinner'),
('Kekl', 'የፍየል ቅቅል', 300, 'Lunch & Dinner'),
('Key Wot','ቀይ ወጥ', 300, 'Lunch & Dinner'),
('Dulet', 'ድሎት', 230, 'Lunch & Dinner'),
('Gomen Bsega', 'ጎመን በስጋ', 250, 'Lunch & Dinner'),
('Quanta Firfir', 'ቋንጣ ፍርፍር', 300, 'Lunch & Dinner'),
('Afagne', 'አፍኝ', 400, 'Lunch & Dinner'),
('Afuna', 'አፊና', 500, 'Lunch & Dinner'),

-- BREAKFAST
('Special Ful', 'ስፔሻል ፉል', 250, 'Breakfast'),
('Normal Ful', 'ፉል', 100, 'Breakfast'),
('Chechebsa', 'ጨጨብሳ', 180, 'Breakfast'),
('Special Chechebsa', 'ስፔሻል ጨጨብሳ', 250, 'Breakfast'),
('Ferfer', 'ፍርፍር', 160, 'Breakfast'),
('Sega Ferfer', 'ስጋ ፍርፍር', 250, 'Breakfast'),
('Kuanta Ferfer', 'ቋንጣ ፍርፍር', 300, 'Breakfast'),
('Eggs', 'እንቁላል ሥልስ', 200, 'Breakfast'),
('Eggs with Meat', 'እንቁላል በስጋ', 250, 'Breakfast'),
('Egg Sandwich', 'እንቁላል ሳንዱች', 200, 'Breakfast'),
('Ybula Genfo', 'የቡላ ገንፎ', 200, 'Breakfast'),
('Ybula Genfo Bketfo', 'የቡላ ገንፎ በክትፎ', 400, 'Breakfast'),
('Fetira', 'ፈጢራ', 200, 'Breakfast'),
('Qinche', 'ቂንጬ', 80, 'Breakfast'),

-- PASTA & RICE
('Pasta with Sauce', 'ፓስታ÷ሩዝ ስጎ', 200, 'Pasta & Rice'),
('Pasta/Macaroni with Meat', 'ፓስታ÷መኮሮኒ በስጋ', 300, 'Pasta & Rice'),
('Pasta/Rice Veggie', 'ፓስታ÷ሩዝ አትክልት', 230, 'Pasta & Rice'),

-- DRINKS (Hot)
('Coffee (Jebena)', 'ጀበና ቡና', 50, 'Hot Drinks'),

-- DRINKS (Cold)
('Soft Drink', 'ለስላሳ', 40, 'Cold Drinks'),
('Ambo Water', 'አምቦ', 35, 'Cold Drinks'),
('Water', 'ውሃ', 30, 'Cold Drinks'),
('Telba Juice', 'ተልባ ጁስ', 150, 'Cold Drinks');
