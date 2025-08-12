import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  country: string
  property_type: string
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  features: string[]
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  message: string
  service_type: string
  created_at: string
}

export interface CountryInfo {
  id: string
  name: string
  code: string
  description: string
  visa_info: string
  cost_of_living: string
  healthcare_info: string
  education_info: string
  created_at: string
  updated_at: string
}
