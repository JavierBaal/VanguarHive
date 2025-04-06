import React from "react";
import { Link } from "react-router-dom"; // Import Link for internal navigation

const Footer = () => {
  // TODO: Replace placeholder '#' links with actual URLs or routes
  const tehoriaUrl = "/tehoria";
  const linkedInUrl = "https://linkedin.com/in/javier-baal"; // From ContactSection

  return (
    <footer className="bg-card py-12 text-white"> {/* Assuming white text on dark card */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="text-3xl font-bold mb-2">V</div>
            <div className="text-xl font-semibold">VanguardHive</div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
             {/* Use Link for internal routes */}
            <Link
              to={tehoriaUrl}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              TehorIA
            </Link>
             {/* Use <a> for external links */}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              LinkedIn
            </a>
             {/* Add link back to Home */}
             <Link
              to="/"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Inicio
            </Link>
          </div>
        </div>
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 VanguardHive. Innovación con Alma.
            </div>
            <div className="text-sm text-muted-foreground">
              Creatividad • IA • Disrupción
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
