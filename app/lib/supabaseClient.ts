import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ttibuajiyhfrsdyqsqsm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0aWJ1YWppeWhmcnNkeXFzcXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNjc4MzQsImV4cCI6MjA1Mzc0MzgzNH0.fCZm8UrMopi1ULSfElRfcEWsU2WRL-CYVvx9alUj9WU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
