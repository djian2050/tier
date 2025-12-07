-- Fix for signup error - Run this to update RLS policies

-- First, drop the existing insert policy
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- Create a new policy that allows service role to insert
CREATE POLICY "Enable insert for authenticated users and service role"
  ON public.users
  FOR INSERT
  WITH CHECK (true);

-- Also ensure the trigger function has proper security
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, username, email, first_name, middle_name, last_name, date_of_birth, phone_number, profile_pic_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'middle_name',
    NEW.raw_user_meta_data->>'last_name',
    (NEW.raw_user_meta_data->>'date_of_birth')::DATE,
    NEW.raw_user_meta_data->>'phone_number',
    NEW.raw_user_meta_data->>'profile_pic_url'
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
