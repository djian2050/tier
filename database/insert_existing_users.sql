-- Fixed: Insert existing auth users with proper date handling
-- This handles different date formats

-- Insert ALL existing auth users at once with date format conversion
INSERT INTO public.users (id, username, email, first_name, middle_name, last_name, date_of_birth, phone_number)
SELECT 
  au.id,
  COALESCE(au.raw_user_meta_data->>'username', 'user_' || substring(au.id::text, 1, 8)),
  au.email,
  COALESCE(au.raw_user_meta_data->>'first_name', 'User'),
  au.raw_user_meta_data->>'middle_name',
  COALESCE(au.raw_user_meta_data->>'last_name', 'Name'),
  -- Handle date conversion - try to parse DD/MM/YYYY format
  CASE 
    WHEN au.raw_user_meta_data->>'date_of_birth' IS NULL THEN CURRENT_DATE
    WHEN au.raw_user_meta_data->>'date_of_birth' ~ '^\d{2}/\d{2}/\d{4}$' THEN 
      -- Convert DD/MM/YYYY to YYYY-MM-DD
      TO_DATE(au.raw_user_meta_data->>'date_of_birth', 'DD/MM/YYYY')
    WHEN au.raw_user_meta_data->>'date_of_birth' ~ '^\d{4}-\d{2}-\d{2}$' THEN
      -- Already in YYYY-MM-DD format
      (au.raw_user_meta_data->>'date_of_birth')::DATE
    ELSE CURRENT_DATE
  END,
  COALESCE(au.raw_user_meta_data->>'phone_number', '+250' || substring(au.id::text, 1, 9))
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

-- Verify the users were added
SELECT 
  u.username,
  u.email,
  u.first_name,
  u.last_name,
  u.date_of_birth,
  u.phone_number
FROM public.users u;
