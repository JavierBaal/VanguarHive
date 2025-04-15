import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Button } from '@/lib/components/ui/button';
import { Badge } from '@/lib/components/ui/badge';
import Footer from '@/lib/components/Footer';
import { supabase } from '@/lib/supabaseClient'; // Importar cliente centralizado
import { motion } from 'framer-motion'; // Importar motion para animaciones

// Tipado para las entradas del blog (debería coincidir con la tabla)
interface BlogPost {
  id: number;
  created_at: string;
  published_at: string;
  title: string;
  slug: string;
  summary: string;
  original_url?: string; // Añadido
  project_tag?: string;
  image_url?: string;
  image_attribution_text?: string; // Añadido
  image_attribution_url?: string; // Añadido
}


export const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      // Validar si el cliente Supabase se inicializó correctamente (si las env vars están presentes)
      // El cliente en supabaseClient.ts manejará URLs/claves vacías, pero la conexión fallará.
      // Podríamos añadir una comprobación más explícita aquí si fuera necesario.
      // if (!supabase.auth) { // Una forma simple de verificar si el cliente es válido
      //   setError("Supabase client not initialized. Check environment variables.");
      //   setLoading(false);
      //   return;
      // }
      try {
        const { data, error: dbError } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false }); // Ordenar por fecha de publicación

        if (dbError) {
          throw dbError;
        }
        setPosts(data || []);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError(err instanceof Error ? err.message : "Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    // Eliminar clase light-theme-override para usar el tema oscuro global
    // Añadir relative y overflow-hidden para contener los orbes animados
    <div className="relative overflow-hidden flex flex-col min-h-screen bg-background text-foreground">
       {/* Fondo animado copiado de HeroSection */}
       <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-lit-blue to-lit-pink opacity-10 blur-3xl -z-10 top-[-100px] left-[-100px]" // Ajustar opacidad/posición/z-index
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15, // Duración ligeramente diferente
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
       <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 opacity-5 blur-3xl -z-10 bottom-[-50px] right-[-50px]" // Ajustar opacidad/posición/z-index
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 18, // Duración ligeramente diferente
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      {/* Fin Fondo animado */}

      <Helmet>
        <title>{t('blog.meta.title')}</title>
        <meta name="description" content={t('blog.meta.description')} />
      </Helmet>

      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-primary">
          {t('blog.title')}
        </h1>

        {loading && <p className="text-center text-muted-foreground">{t('blog.loading')}</p>}
        {error && <p className="text-center text-destructive">{t('blog.error')}: {error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-muted-foreground">{t('blog.noPosts')}</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              // Aplicar clase card-light-theme a cada tarjeta
              <Card key={post.id} className="card-light-theme flex flex-col bg-card border border-border hover:border-primary transition-colors duration-300 shadow-lg">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg" // Estilo para la imagen
                  />
                  // TODO: Añadir componente para mostrar atribución si existe
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-card-foreground">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground pt-1">
                     {/* Formatear fecha */}
                    {new Date(post.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    {post.project_tag && <Badge variant="secondary" className="ml-2">{post.project_tag}</Badge>}
                  </p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">{post.summary}</p> {/* Limitar resumen */}
                </CardContent>
                <CardFooter>
                  {/* Enlazar a la página de detalle del post usando el slug */}
                  {/* Usar text-primary definido en card-light-theme */}
                  <Button asChild variant="link" className="p-0 text-primary hover:text-primary/80">
                    <Link to={`/blog/${post.slug}`}>
                      {t('blog.readMore')}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
