-- Add name column if it doesn't exist (it should, but just in case)
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name TEXT;

-- Add name_local column for local language translations (Amharic/Oromo/Somali)
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_local TEXT;

-- Optional: You can populate name_local for existing categories using SQL updates
-- UPDATE categories SET name_local = 'ፒዛ' WHERE name = 'Pizza';
-- ... etc
