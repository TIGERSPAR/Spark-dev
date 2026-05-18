/* ═══════════════════════════════════════════════
   SPARKLING DEV — Supabase Configuration
═══════════════════════════════════════════════ */

const SUPABASE_URL  = 'https://isudfsgwqtcdyyjotmpe.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdWRmc2d3cXRjZHl5am90bXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNTIyNzEsImV4cCI6MjA5NDYyODI3MX0.CZUb-v2072Q1gkKSEBQLj2kyDHPaAPE_MIQEU_NRfPk';

// Initialize Supabase client (loaded via CDN in HTML)
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
