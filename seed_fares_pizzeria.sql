-- Seeding Data for Fares Pizzeria

-- Clear existing items (optional, comment out if you want to keep old items)
-- truncate table menu_items;

-- Insert Pizza Menu Items
insert into menu_items (name_en, name_local, price, category, is_available) values
('Margarita Pizza', 'ማርጋሪታ ፒዛ', 350, 'Lunch & Dinner', true),
('Beef Pizza', 'ቢፍ ፒዛ', 450, 'Lunch & Dinner', true),
('Chicken Pizza', 'ቺፕን ፒዛ', 400, 'Lunch & Dinner', true),
('Tuna Pizza', 'ቱና ፒዛ', 380, 'Lunch & Dinner', true),
('Vegetable Pizza', 'አትክልት ፒዛ', 300, 'Lunch & Dinner', true),
('Special Fares Pizza', 'ስፔሻል ፋሪስ ፒዛ', 550, 'Lunch & Dinner', true),

('Creamy Pasta', 'ክሬም ፓስታ', 250, 'Pasta & Rice', true),
('Tuna Pasta', 'ቱና ፓስታ', 280, 'Pasta & Rice', true),
('Fasting Pasta', 'የጾም ፓስታ', 200, 'Pasta & Rice', true),

('Avocado Juice', 'አቮካዶ', 100, 'Cold Drinks', true),
('Mango Juice', 'ማንጎ', 100, 'Cold Drinks', true),
('Special Mix Juice', 'ስፔሻል ሚክስ', 150, 'Cold Drinks', true);
