-- Add industry_category to early_access if it is missing
ALTER TABLE IF EXISTS public.early_access
  ADD COLUMN IF NOT EXISTS industry_category VARCHAR(50);

COMMENT ON COLUMN public.early_access.industry_category IS 'Goods, Services, or Both';
