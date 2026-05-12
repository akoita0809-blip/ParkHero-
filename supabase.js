import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://bnlnmqbnyymbhewhbzra.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubG5tcWJueXltYmhld2hienJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTU1NjUsImV4cCI6MjA5NDE5MTU2NX0.Ymtz_tQuNdU7xQOwtLuIY5lwljXTMK4fUxNS2Qks4Yg'
export const supabase = createClient(supabaseUrl, supabaseKey)