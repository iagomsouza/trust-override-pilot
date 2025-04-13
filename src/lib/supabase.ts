import { createClient } from '@supabase/supabase-js'

// Using environment variables for Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
    signUp: async (email: string, password: string) => {
        return await supabase.auth.signUp({ email, password })
    },
    signIn: async (email: string, password: string) => {
        return await supabase.auth.signInWithPassword({ email, password })
    },
    signOut: async () => {
        return await supabase.auth.signOut()
    },
    getUser: async () => {
        return await supabase.auth.getUser()
    },
    getSession: async () => {
        return await supabase.auth.getSession()
    }
}

// Database helpers
export const db = {
    // Generic query function
    query: async <T>(tableName: string, query: any = {}) => {
        let { data, error } = await supabase
            .from(tableName)
            .select(query.select || '*')
            .order(query.orderBy || 'id', { ascending: query.ascending })

        return { data: data as T[], error }
    },

    // Get a single record
    getById: async <T>(tableName: string, id: number | string, idField: string = 'id') => {
        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .eq(idField, id)
            .single()

        return { data: data as T, error }
    },

    // Insert a record
    insert: async <T>(tableName: string, record: any) => {
        const { data, error } = await supabase
            .from(tableName)
            .insert(record)
            .select()

        return { data: data?.[0] as T, error }
    },

    // Update a record
    update: async <T>(tableName: string, id: number | string, updates: any, idField: string = 'id') => {
        const { data, error } = await supabase
            .from(tableName)
            .update(updates)
            .eq(idField, id)
            .select()

        return { data: data?.[0] as T, error }
    },

    // Delete a record
    delete: async (tableName: string, id: number | string, idField: string = 'id') => {
        return await supabase
            .from(tableName)
            .delete()
            .eq(idField, id)
    }
} 