import React from "react";
import { Link } from "react-router-dom"; // Importar Link
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { Button } from "@/lib/components/ui/button"; // Corrected path
import { ArrowRight, Languages } from "lucide-react"; // Import Languages icon if needed elsewhere, or remove if only used in Switcher
import LanguageSwitcher from "@/components/LanguageSwitcher"; // Import the switcher

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

// Remove default values from props to ensure t() is used when no props are passed
const HeroSection = ({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
}: HeroSectionProps) => {
  const { t } = useTranslation(); // Initialize translation hook

  // Use translated values or fall back to props/defaults if provided
  const currentTitle = title || t('hero.title');
  const currentSubtitle = subtitle || t('hero.subtitle');
  const currentDescription = description || t('hero.description');
  const currentCtaText = ctaText || t('hero.cta');
  const currentOnCtaClick = onCtaClick || (() => console.log("Default CTA clicked"));


  return (
    // Apply Literal AI style: bg-background (dark), text-foreground (light)
    <section className="relative w-full min-h-[800px] bg-background text-foreground flex items-center justify-center overflow-hidden">
      {/* Optional: Add subtle background pattern if desired */}
      {/* <div className="absolute inset-0 opacity-5 pattern-class"></div> */}

      {/* Animated gradient orb using Literal AI inspired colors */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-lit-blue to-lit-pink opacity-15 blur-3xl" // Use lit colors, adjust opacity/blur
        animate={{
          x: [0, 40, 0], // Adjust animation
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10, // Slower animation
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
       {/* Optional second orb */}
       <motion.div
          className="absolute w-[400px] h-[400px] left-1/4 top-1/4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 opacity-10 blur-3xl" // Example secondary orb
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Subtitle with vibrant color */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-lit-pink font-medium mb-2"> {/* Use lit-pink */}
              {currentSubtitle}
            </span>
          </motion.div>

          {/* Main title using foreground color */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight" // Use foreground
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {currentTitle}
          </motion.h1>

          {/* Description using lighter text */}
          <motion.p
            className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto" // slate-300 is okay on dark background
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {currentDescription}
          </motion.p>

          {/* CTA button with vibrant colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              onClick={currentOnCtaClick}
              size="lg"
              // Use vibrant background, ensure foreground contrast is good
              className="bg-lit-pink hover:bg-lit-pink/80 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl" // Added hover opacity
            >
              {currentCtaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Navigation links - adjust colors */}
          <motion.div
            className="mt-12 flex justify-center items-center space-x-8 text-muted-foreground" // Use muted-foreground for less emphasis
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a href="#projects" className="hover:text-foreground transition-colors">
              {t('nav.projects')}
            </a>
            <Link to="/about" className="hover:text-foreground transition-colors">
              {t('nav.about')}
            </Link>
            <a href="#contact" className="hover:text-foreground transition-colors">
              {t('nav.contact')}
            </a>
            {/* Ensure LanguageSwitcher button style fits */}
            <LanguageSwitcher />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements - Remove gradient, adjust logo color */}
      {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div> */}
      <div className="absolute top-10 right-10">
         {/* Use accent color */}
        <div className="text-lit-pink font-bold text-2xl">V</div>
      </div>
    </section>
  );
};

export default HeroSection;
