import { createClient as createBrowserClient } from '@supabase/supabase-js'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constants/config'

export const createClient = () => createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } })
