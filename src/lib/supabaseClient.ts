import { createClient } from '@supabase/supabase-js';

// Obtener las variables de entorno de Vite (deben empezar con VITE_)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que las variables de entorno estén presentes
if (!supabaseUrl) {
  console.error('Error: VITE_SUPABASE_URL environment variable is not set.');
  // Podríamos lanzar un error o devolver un cliente nulo/inválido
  // throw new Error('VITE_SUPABASE_URL environment variable is not set.');
}
if (!supabaseAnonKey) {
  console.error('Error: VITE_SUPABASE_ANON_KEY environment variable is not set.');
  // throw new Error('VITE_SUPABASE_ANON_KEY environment variable is not set.');
}

// Crear y exportar el cliente Supabase
// Asegurarse de que createClient maneje URLs/claves potencialmente undefined si no lanzamos error
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Nota para el desarrollador:
// Asegúrate de crear un archivo .env en la raíz del proyecto y añadir:
// VITE_SUPABASE_URL=TU_URL_DE_SUPABASE
// VITE_SUPABASE_ANON_KEY=TU_CLAVE_ANONIMA_DE_SUPABASE
// También configura estas variables en el entorno de despliegue (Vercel).
