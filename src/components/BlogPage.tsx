import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Button } from '@/lib/components/ui/button';
import { Badge } from '@/lib/components/ui/badge';
import Footer from '@/lib/components/Footer';
import { supabase } from '@/lib/supabaseClient'; // Importar cliente centralizado

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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
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
              <Card key={post.id} className="flex flex-col bg-card border border-lit-border hover:border-lit-pink transition-colors duration-300 shadow-lg">
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
                  <Button asChild variant="link" className="p-0 text-lit-pink hover:text-lit-pink/80">
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
