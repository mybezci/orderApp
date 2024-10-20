// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Supabase projesine ait URL ve public key
const supabaseUrl = 'https://vnribtagnrrvuisxmtxe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZucmlidGFnbnJydnVpc3htdHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4MjM5MjksImV4cCI6MjA0NDM5OTkyOX0.o3xjDa_yWtyq_tsJAJxO04a2xixEHrN_UmLJXsbFYxg';

// Supabase istemcisi oluşturma
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
