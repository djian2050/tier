import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://nisfwzxddzutqkqshqeq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pc2Z3enhkZHp1dHFrcXNocWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMTI2NDgsImV4cCI6MjA4MDY4ODY0OH0.nEl71kSgd3AnkMoBp9MOekjqMdZBiiLbUZZH3roMe2A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
