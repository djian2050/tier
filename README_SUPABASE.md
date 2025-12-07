# Tier App - Supabase Authentication Setup

## 📋 Installation Steps

### 1. Install Required Packages

Run these commands to install all necessary dependencies:

```bash
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
```

### 2. Set Up Supabase Database

1. Go to your Supabase project: https://nisfwzxddzutqkqshqeq.supabase.co
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database/users_table.sql`
4. Execute the SQL script to create:
   - `users` table with all required fields
   - Row Level Security (RLS) policies
   - Triggers for auto-creating user profiles
   - Indexes for performance

### 3. Configure Email Templates (Important!)

1. Go to Supabase Dashboard → Authentication → Email Templates
2. Update the **Confirm signup** template
3. Change the confirmation URL to redirect back to your app:
   ```
   {{ .ConfirmationURL }}
   ```
   Make sure it redirects to your app's deep link or login screen

### 4. Enable Email Confirmations

1. Go to Supabase Dashboard → Authentication → Settings
2. Under "Email Auth", ensure:
   - ✅ Enable email confirmations is ON
   - ✅ Secure email change is ON

## 🗂️ Project Structure

```
mobile-app/
├── app/
│   ├── index.tsx          # Login screen (supports username/email/phone)
│   ├── signup.tsx         # Signup screen with all fields
│   └── verify-email.tsx   # Email verification instructions
├── lib/
│   └── supabase.ts        # Supabase client configuration
├── database/
│   └── users_table.sql    # Database schema
└── README_SUPABASE.md     # This file
```

## 🔐 Authentication Flow

### Sign Up Flow:
1. User fills signup form with:
   - Username (unique)
   - Email (unique)
   - First Name
   - Middle Name (optional)
   - Last Name
   - Date of Birth (YYYY-MM-DD)
   - Phone Number (unique)
   - Password (min 6 characters)
2. User clicks "Create Account"
3. Supabase creates auth user and triggers `handle_new_user()` function
4. User profile is automatically created in `users` table
5. User is redirected to `/verify-email` screen
6. User receives email with confirmation link
7. User clicks link and is redirected back to login

### Sign In Flow:
1. User enters username, email, OR phone number
2. User enters password
3. App queries `users` table to find email (if username/phone provided)
4. App authenticates with Supabase using email + password
5. User is logged in

## 📊 Database Schema

### Users Table Fields:
- `id` (UUID) - References auth.users(id)
- `username` (TEXT, UNIQUE) - User's unique username
- `email` (TEXT, UNIQUE) - User's email
- `first_name` (TEXT) - First name
- `middle_name` (TEXT, NULLABLE) - Middle name (optional)
- `last_name` (TEXT) - Last name
- `date_of_birth` (DATE) - Date of birth
- `phone_number` (TEXT, UNIQUE) - Phone number
- `profile_pic_url` (TEXT, NULLABLE) - Profile picture URL
- `created_at` (TIMESTAMP) - Account creation time
- `updated_at` (TIMESTAMP) - Last update time

## 🔒 Security Features

- ✅ Row Level Security (RLS) enabled
- ✅ Users can only read/update their own data
- ✅ Email verification required
- ✅ Password minimum 6 characters
- ✅ Unique constraints on username, email, phone
- ✅ Secure session storage with AsyncStorage

## 🚀 Running the App

```bash
npm start
```

Then scan the QR code with Expo Go.

## 📝 Notes

- Email verification is required before users can fully access the app
- The `handle_new_user()` trigger automatically creates user profiles
- Login supports username, email, or phone number
- All sensitive data is stored securely in Supabase
- Sessions are persisted using AsyncStorage

## 🐛 Troubleshooting

### "User not found" error on login:
- Make sure the user has verified their email
- Check that the username/email/phone exists in the `users` table

### Email not received:
- Check spam folder
- Verify email settings in Supabase Dashboard
- Check Supabase logs for email delivery status

### Database errors:
- Ensure you've run the SQL script in `database/users_table.sql`
- Check RLS policies are enabled
- Verify triggers are created

## 🔗 Supabase Project Details

- **Project URL**: https://nisfwzxddzutqkqshqeq.supabase.co
- **Anon Key**: (Stored in `lib/supabase.ts`)
