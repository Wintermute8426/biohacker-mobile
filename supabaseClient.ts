import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://kjzxvqiodwfvzvpnxgop.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqenh2cWlvZHdmdnp2cG54Z29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2MzI5MTksImV4cCI6MjAyMjIwODkxOX0.WVGVb8pjdPFLXyKhM7Y-L0VbxJL8KXAf1QEYPncsVvk'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
