-- Fix: Manually confirm existing users' emails (corrected version)
-- confirmed_at is a generated column, so we only update email_confirmed_at

-- Update all unconfirmed users to confirmed
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Verify users are confirmed
SELECT 
  email,
  email_confirmed_at,
  confirmed_at
FROM auth.users;
