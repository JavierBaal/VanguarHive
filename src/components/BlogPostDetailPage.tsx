import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabaseClient';
import Footer from '@/lib/components/Footer';
import { Badge } from '@/lib/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/lib/components/ui/button';

// Reutilizar la interfaz BlogPost, quizás moverla a un archivo de tipos compartido más adelante
interface BlogPost {
  id: number;
  created_at: string;
  published_at: string;
  title: string;
  slug: string;
  summary: string; // Podríamos querer mostrar el contenido completo aquí
  // TODO: Añadir campo 'content' a la tabla y a la interfaz si es necesario
  original_url?: string;
  project_tag?: string;
  image_url?: string;
  image_attribution_text?: string;
  image_attribution_url?: string;
}

export const BlogPostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // Obtener el slug de la URL
  const { t } = useTranslation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError("Post slug not found in URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { data, error: dbError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug) // Buscar por slug
          .single(); // Esperamos un único resultado

        if (dbError) {
          if (dbError.code === 'PGRST116') { // Código para "No rows found"
             setError(t('blog.postNotFound'));
          } else {
            throw dbError;
          }
        }
        setPost(data);
      } catch (err) {
        console.error(`Error fetching blog post with slug ${slug}:`, err);
        setError(err instanceof Error ? err.message : "Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, t]); // Depender de slug y t

  // Formateador de fecha simple
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    // Añadir clase para aplicar tema claro específico
    <div className="light-theme-override flex flex-col min-h-screen bg-background text-foreground">
      {/* Actualizar Helmet dinámicamente */}
      <Helmet>
        <title>{post ? `${post.title} | ${t('blog.title')}` : t('blog.title')}</title>
        {post && <meta name="description" content={post.summary} />}
      </Helmet>

      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Botón para volver al listado */}
          <Button asChild variant="outline" className="mb-8 border-lit-border hover:bg-lit-card">
             <Link to="/blog">
               <ArrowLeft className="mr-2 h-4 w-4" />
               {t('blog.backToList')}
             </Link>
          </Button>

          {loading && <p className="text-center text-muted-foreground">{t('blog.loading')}</p>}
          {error && <p className="text-center text-destructive">{t('blog.error')}: {error}</p>}

          {!loading && !error && !post && (
             <p className="text-center text-muted-foreground">{t('blog.postNotFound')}</p>
          )}

          {post && (
            <article className="bg-card p-6 md:p-8 rounded-lg border border-lit-border shadow-lg">
              {/* Imagen destacada y atribución */}
              {post.image_url && (
                <div className="mb-6">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-auto max-h-[400px] object-cover rounded-md mb-2"
                  />
                  {post.image_attribution_text && (
                    <p className="text-xs text-muted-foreground text-center italic">
                      {post.image_attribution_url ? (
                        <a href={post.image_attribution_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                          {post.image_attribution_text}
                        </a>
                      ) : (
                        post.image_attribution_text
                      )}
                    </p>
                  )}
                </div>
              )}

              {/* Título y Metadatos */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{post.title}</h1>
              <div className="flex items-center space-x-4 mb-6 text-sm text-muted-foreground">
                <span>{formatDate(post.published_at)}</span>
                {post.project_tag && <Badge variant="secondary">{post.project_tag}</Badge>}
                {post.original_url && (
                   <a href={post.original_url} target="_blank" rel="noopener noreferrer" className="text-lit-pink hover:text-lit-pink/80 underline">
                     {t('blog.viewOriginal')}
                   </a>
                )}
              </div>

              {/* Contenido Principal (usando summary por ahora) */}
              {/* TODO: Usar un campo 'content' (Markdown/HTML) cuando esté disponible */}
              <div className="prose prose-invert max-w-none text-foreground space-y-4">
                 {/* Temporalmente mostramos el resumen. Idealmente aquí iría el contenido completo renderizado */}
                 <p>{post.summary}</p>
                 {/* Aquí se renderizaría el contenido Markdown/HTML */}
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
