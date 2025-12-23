-- Migration: Add missing language columns to menu_items table
-- Run this in your Supabase SQL Editor

-- Add name_om column (Afan Oromo)
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS name_om text;

-- Add name_so column (Somali)
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS name_so text;
