import React from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet
import { motion } from "framer-motion";
import { useTranslation, Trans } from 'react-i18next'; // Import useTranslation and Trans
// Corrected paths using alias
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import { Button } from "@/lib/components/ui/button";
import { Card, CardContent } from "@/lib/components/ui/card";
// Removed Twitter import, kept Linkedin
import { Linkedin } from "lucide-react";
// Corrected paths using alias
import HeroSection from "@/lib/components/HeroSection";
import Footer from "@/lib/components/Footer";
import { useNavigate } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutPage = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const navigate = useNavigate();

  // Updated URLs
  const linkedInUrl = "https://linkedin.com/in/javier-baal";
  const xUrl = "https://x.com/javierbaal00"; // Updated X URL

  return (
    // Use bg-background (very dark gray)
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{t('about.meta.title')}</title>
        <meta name="description" content={t('about.meta.description')} />
      </Helmet>
      {/* 1. Add Hero Section - Use translated props */}
      <HeroSection
        title={t('about.hero.title')}
        subtitle={t('about.hero.subtitle')}
        description={t('about.hero.description')}
        ctaText={t('about.hero.cta')}
        onCtaClick={() => navigate('/')}
      />

      {/* 2. Main content section - Use bg-background, adjust text colors */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-background text-foreground flex-grow">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              {/* Profile Card - Use bg-card, lit-border, accent colors */}
              <div className="lg:col-span-1 flex flex-col items-center">
                <Card className="w-full max-w-sm bg-card border border-lit-border">
                  <CardContent className="p-6 text-center">
                     {/* Use accent border */}
                    <Avatar className="w-32 h-32 mx-auto mb-4 border-2 border-lit-pink">
                      <AvatarImage src="/images/Javier-Baal_Fran-Barbero-2025.jpg" alt="Fran Barbero" />
                       {/* Use accent gradient for fallback */}
                      <AvatarFallback className="text-4xl font-bold bg-gradient-to-r from-lit-blue to-lit-pink text-white">
                        JB
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-bold mb-1 text-foreground">Fran Barbero</h3> {/* Keep name static */}
                     {/* Use accent color */}
                    <p className="text-lit-pink mb-4">{t('about.profile.role')}</p>
                    <div className="flex justify-center space-x-4">
                      {/* X Button - Style for dark mode */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-lit-border hover:bg-lit-card text-muted-foreground hover:text-foreground"
                        asChild
                      >
                        <a href={xUrl} target="_blank" rel="noopener noreferrer" aria-label={t('about.profile.aria.x')}>
                          <span className="font-bold">X</span>
                        </a>
                      </Button>
                      {/* LinkedIn Button - Style for dark mode */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-lit-border hover:bg-lit-card text-muted-foreground hover:text-foreground"
                        asChild
                      >
                        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label={t('about.profile.aria.linkedin')}>
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Bio Text - Ensure text uses foreground or muted-foreground */}
              <div className="lg:col-span-2">
                <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
                  <p>{t('about.bio.p1')}</p>
                  <p>
                     {/* Use accent colors for highlights */}
                    <Trans i18nKey="about.bio.p2">
                      As a technological creative director, he left his mark on iconic brands such as <span className="text-lit-blue font-medium">El Corte Inglés</span> (Doble Cero), <span className="text-lit-blue font-medium">Sony PlayStation</span>, <span className="text-lit-blue font-medium">Häagen-Dazs</span>, and <span className="text-lit-blue font-medium">Blackberry</span>, demonstrating his ability to make technology impactful.
                    </Trans>
                  </p>
                  <p>{t('about.bio.p3')}</p>
                  <p>
                     {/* Use accent colors for highlights */}
                    <Trans i18nKey="about.bio.p4">
                      Here lies the difference: his <span className="text-lit-pink font-medium">neurodivergent mind</span> and <span className="text-lit-pink font-medium">synesthesia</span> are not just characteristics, they are cognitive superpowers. They allow him to perceive technology, connect invisible dots, and see patterns from radically new angles.
                    </Trans>
                  </p>
                  <p className="text-xl font-semibold text-foreground mt-4"> {/* Use foreground */}
                    <Trans i18nKey="about.bio.p5">
                      <span className="text-lit-blue">VanguardHive</span> is the materialization of this vision: a laboratory where AI becomes a new language to create disruptive solutions that challenge the possible.
                    </Trans>
                  </p>
                  <p className="font-medium text-foreground"> {/* Use foreground */}
                    {t('about.bio.p6')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Add Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
