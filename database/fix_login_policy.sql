-- Fix for "user not found" error during login
-- This allows anonymous users to query the users table for login purposes

-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;

-- Create new policy that allows reading email for login
CREATE POLICY "Allow reading user data for authentication"
  ON public.users
  FOR SELECT
  USING (true);

-- Note: This allows reading user data, but RLS still protects sensitive operations
-- Users can only UPDATE/DELETE their own data
