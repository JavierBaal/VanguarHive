import React from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next'; // Import useTranslation
// Corrected relative paths
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

// Ensure AboutSection is NOT imported
// import AboutSection from "./AboutSection";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const Home = () => {
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta name="description" content={t('home.meta.description')} />
      </Helmet>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full"
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="w-full"
        id="projects-section" // Añadir ID para Proyectos
      >
        <ProjectsSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="w-full"
      >
         {/* Use bg-background, ensure text colors are correct */}
        <div className="container mx-auto px-4 py-20 bg-background">
          <div className="text-center mb-16">
             {/* Ensure title uses foreground */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {t('home.empower.title')}
            </h2>
             {/* Ensure description uses muted-foreground */}
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('home.empower.description')}
            </p>
          </div>

           {/* Use bg-card, lit-border, ensure text colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="p-6 bg-card border border-lit-border rounded-xl shadow-md text-center">
              <h3 className="text-3xl font-bold mb-2 text-card-foreground">{t('home.concept.creativity.title')}</h3>
              <p className="text-muted-foreground">
                {t('home.concept.creativity.description')}
              </p>
            </div>
            <div className="p-6 bg-card border border-lit-border rounded-xl shadow-md text-center">
              <h3 className="text-3xl font-bold mb-2 text-card-foreground">{t('home.concept.ai.title')}</h3>
              <p className="text-muted-foreground">
                {t('home.concept.ai.description')}
              </p>
            </div>
            <div className="p-6 bg-card border border-lit-border rounded-xl shadow-md text-center">
              <h3 className="text-3xl font-bold mb-2 text-card-foreground">{t('home.concept.disruption.title')}</h3>
              <p className="text-muted-foreground">
                {t('home.concept.disruption.description')}
              </p>
            </div>
            <div className="p-6 bg-card border border-lit-border rounded-xl shadow-md text-center">
              <h3 className="text-3xl font-bold mb-2 text-card-foreground">{t('home.concept.hive.title')}</h3>
              <p className="text-muted-foreground">
                {t('home.concept.hive.description')}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl w-full text-center">
              <div className="flex flex-col items-center">
                 {/* Apply accent color */}
                <div className="text-4xl font-bold mb-2 text-lit-blue">{t('home.formula.ai.label')}</div>
                <p className="text-sm text-muted-foreground">
                  {t('home.formula.ai.description')}
                </p>
              </div>
              <div className="flex flex-col items-center">
                 {/* Apply accent color */}
                <div className="text-4xl font-bold mb-2 text-lit-pink">{t('home.formula.creativity.label')}</div>
                <p className="text-sm text-muted-foreground">
                  {t('home.formula.creativity.description')}
                </p>
              </div>
              <div className="flex flex-col items-center">
                 {/* Keep foreground or use a neutral accent */}
                <div className="text-4xl font-bold mb-2 text-foreground">{t('home.formula.equals.label')}</div>
                <p className="text-sm text-muted-foreground">{t('home.formula.equals.description')}</p>
              </div>
              <div className="flex flex-col items-center">
                 {/* Apply accent color */}
                <div className="text-4xl font-bold mb-2 text-lit-blue">{t('home.formula.infinity.label')}</div>
                <p className="text-sm text-muted-foreground">
                  {t('home.formula.infinity.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ensure the section calling AboutSection is removed */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="w-full"
        id="contact-section" // Añadir ID para Contacto
      >
        <ContactSection />
      </motion.div>

      {/* Use the Footer component */}
      <Footer />
    </div>
  );
};

export default Home;
