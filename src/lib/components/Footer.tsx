import React from "react";
import { Link } from "react-router-dom"; // Import Link for internal navigation
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Footer = () => {
  const { t } = useTranslation(); // Initialize translation hook
  // TODO: Replace placeholder '#' links with actual URLs or routes
  const tehoriaUrl = "/tehoria";
  const linkedInUrl = "https://linkedin.com/in/javier-baal"; // From ContactSection

  return (
    // Use bg-background (very dark gray), adjust text color if needed
    <footer className="bg-background py-12 text-muted-foreground border-t border-lit-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 text-center md:text-left">
             {/* Use accent color for logo */}
            <div className="text-3xl font-bold mb-2 text-lit-pink">V</div>
            <div className="text-xl font-semibold text-foreground">VanguardHive</div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
             {/* Use Link for internal routes - adjust colors */}
            <Link
              to={tehoriaUrl}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('projects.tehoria.title')} {/* Use project title key */}
            </Link>
             {/* Use <a> for external links - adjust colors */}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('footer.linkedin')}
            </a>
             {/* Add link back to Home - adjust colors */}
             <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('footer.home')}
            </Link>
            {/* Añadir enlaces a Términos y Privacidad */}
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('terms.title')}
            </Link>
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('privacy.title')}
            </Link>
            {/* Añadir enlace al Blog */}
            <Link
              to="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('blog.title')} {/* Usar clave de traducción del blog */}
            </Link>
          </div>
        </div>
         {/* Use lit-border */}
        <div className="border-t border-lit-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              {t('footer.copyright')}
            </div>
            <div className="text-sm text-muted-foreground">
              {t('footer.tagline')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
