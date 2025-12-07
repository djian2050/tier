-- Complete fix for user creation trigger
-- Run this to ensure users are added to the users table on signup

-- First, check if the trigger exists and drop it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the function
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Recreate the function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert into users table
  INSERT INTO public.users (
    id,
    username,
    email,
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    phone_number,
    profile_pic_url
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || NEW.id::text),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    NEW.raw_user_meta_data->>'middle_name',
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'date_of_birth')::DATE, CURRENT_DATE),
    COALESCE(NEW.raw_user_meta_data->>'phone_number', ''),
    NEW.raw_user_meta_data->>'profile_pic_url'
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the auth user creation
    RAISE WARNING 'Error creating user profile: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

-- Verify the trigger was created
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
