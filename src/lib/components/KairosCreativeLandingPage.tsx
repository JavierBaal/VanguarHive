import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useTranslation, Trans } from 'react-i18next';
// Removed HeroSection import as this page has its own custom hero
// import Footer from "./Footer"; // Re-using Footer might need adjustments
// Removed ContactSection import as it's handled by Patreon link
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Separator } from "@/lib/components/ui/separator";
import { Button } from "@/lib/components/ui/button";
import { Lock, DoorOpen, Gift, Clock, Loader2 } from "lucide-react"; // Added Clock and Loader2 icons
import { useState } from "react"; // Import useState for loading state

const KairosCreativeLandingPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<string | null>(null); // State to track loading for specific button/price
  const [error, setError] = useState<string | null>(null); // State for error messages
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Static calculator display - Uses the corrected translation key
  const staticCalculatorDisplay = t('kairosCreative.v2.hero.calculator.result');

  // Price ID for the "Newbie Tester" (Free Tier)
  const newbiePriceId = "price_1RCuhgRfXEI83hj8vTf7ZLN3";
  // URL of our backend endpoint to create the checkout session
  // TODO: Get this from environment variables ideally
  const createCheckoutSessionUrl = "https://kairos-creative-webhook.onrender.com/create-checkout-session"; // Replace with your actual deployed webhook server URL

  const handleCheckout = async (priceId: string) => {
    setIsLoading(priceId); // Set loading state for this price ID
    setError(null); // Clear previous errors
    console.log(`Initiating checkout for price ID: ${priceId}`);

    try {
      // We don't have user context here yet, so we don't pass user_id or email
      const response = await fetch(createCheckoutSessionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price_id: priceId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const session = await response.json();
      console.log("Checkout session created:", session);

      if (session.checkout_url) {
        // Redirect the user to Stripe Checkout
        window.location.href = session.checkout_url;
      } else {
        throw new Error("Checkout URL not found in response.");
      }

    } catch (error) {
      console.error("Failed to create checkout session:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
      setIsLoading(null); // Clear loading state on error
    }
    // No need to clear loading state on success, as we redirect
  };


  return (
    // Base dark background and light text
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-background text-foreground"
    >
      <Helmet>
        <title>{t('kairosCreative.v2.meta.title')}</title>
        <meta name="description" content={t('kairosCreative.v2.meta.description')} />
      </Helmet>

      {/* Section 1: Hero Section - Apply Literal AI Style Consistently */}
      <section className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden px-4">
         {/* Orbs with Literal AI colors */}
         <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-lit-blue to-lit-pink opacity-15 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] left-1/4 top-1/4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 opacity-10 blur-3xl" // Example secondary orb
            animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
         <div className="container mx-auto z-10 text-center">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              style={{ textShadow: '0 0 10px #FF00A9' }} // Use lit-pink hex for glow
              variants={fadeIn}
            >
              {t('kairosCreative.v2.hero.headline')}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              {t('kairosCreative.v2.hero.subheadline')}
            </motion.p>

            {/* Static Time Wasted Calculator Display - Use lit-pink */}
            <motion.div className="my-8 p-6 bg-black border border-lit-pink rounded-lg max-w-md mx-auto" variants={fadeIn}>
               <p className="text-white mb-2">{t('kairosCreative.v2.hero.calculator.text')}</p>
               <p className="text-2xl font-bold text-lit-pink">{staticCalculatorDisplay}</p>
            </motion.div>

            <motion.div variants={fadeIn}>
              {/* Style button with lit-pink */}
              <Button
                size="lg"
                className="bg-lit-pink hover:bg-opacity-80 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl border border-lit-pink disabled:opacity-50"
                onClick={() => handleCheckout(newbiePriceId)} // Call handleCheckout with newbie price ID
                disabled={isLoading === newbiePriceId} // Disable button while loading this specific checkout
              >
                {isLoading === newbiePriceId ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {t('kairosCreative.v2.hero.mainCta')}
              </Button>
               {/* Use lit-pink text color */}
              <p className="text-lit-pink mt-4 text-sm font-semibold animate-pulse flex items-center justify-center">
                 <Clock className="h-4 w-4 mr-1" />
                 {t('kairosCreative.v2.hero.subCta')}
              </p>
            </motion.div>
         </div>
      </section>

      {/* Content Sections - Apply Literal AI style (lit-*) */}
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">

        {/* Section 2: The Problem */}
        <motion.section variants={fadeIn} className="bg-card p-8 md:p-12 rounded-lg border border-lit-border">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-lit-blue mb-8">
            {t('kairosCreative.v2.problem.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
             <Trans i18nKey="kairosCreative.v2.problem.p1">
                default <strong className="text-lit-pink">92%</strong> default <strong className="text-lit-pink">€5,200/year</strong> default
             </Trans>
          </p>
           {/* Visual placeholder */}
        </motion.section>

        <Separator className="bg-lit-border" />

        {/* Section 3: The Solution */}
        <motion.section variants={fadeIn} className="p-8 md:p-12 rounded-lg border border-lit-border bg-card">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
            {t('kairosCreative.v2.solution.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
            {t('kairosCreative.v2.solution.intro')}
          </p>
          <ul className="list-none space-y-3 text-lg md:text-xl text-muted-foreground mb-6">
            <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.solution.listItem1')}</li>
            <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.solution.listItem2')}</li>
            <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.solution.listItem3')}</li>
            <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.solution.listItem4')}</li>
          </ul>
           <p className="italic text-muted-foreground mb-6">
             <Trans i18nKey="kairosCreative.v2.solution.testimonial">
                <span className="font-bold">default</span> default
             </Trans>
           </p>
           {/* Removed outro paragraph */}
           {/* Visual placeholder */}
        </motion.section>

        <Separator className="bg-lit-border" />

         {/* Section 4: The Numbers Don’t Lie */}
         <motion.section variants={fadeIn} className="bg-card p-8 md:p-12 rounded-lg border border-lit-border">
           <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
             {t('kairosCreative.v2.numbers.title')}
           </h2>
           <div className="space-y-4 text-lg md:text-xl text-muted-foreground">
             <p><Trans i18nKey="kairosCreative.v2.numbers.item1"><strong className="text-lit-blue">0</strong><strong className="text-lit-pink">1</strong></Trans></p>
             <p><Trans i18nKey="kairosCreative.v2.numbers.item2"><strong className="text-lit-blue">0</strong><strong className="text-lit-pink">1</strong></Trans></p>
             <p><Trans i18nKey="kairosCreative.v2.numbers.item3"><strong className="text-lit-blue">0</strong><strong className="text-lit-pink">1</strong></Trans></p>
             <p><Trans i18nKey="kairosCreative.v2.numbers.item4"><strong className="text-lit-blue">0</strong></Trans></p>
           </div>
            {/* Visual placeholder */}
         </motion.section>

        <Separator className="bg-lit-border" />

        {/* Section 5: Social Proof */}
        <motion.section variants={fadeIn} className="p-8 md:p-12 rounded-lg bg-background">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {t('kairosCreative.v2.socialProof.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-card text-card-foreground border border-lit-pink p-6">
              <p className="italic mb-4">
                <Trans i18nKey="kairosCreative.v2.socialProof.testimonial1">
                  <span className="font-bold">default</span> default
                </Trans>
              </p>
              <p className="text-right font-semibold">– Maria, Freelance Designer, New York.</p>
            </Card>
            <Card className="bg-card text-card-foreground border border-lit-pink p-6">
              <p className="italic mb-4">
                <Trans i18nKey="kairosCreative.v2.socialProof.testimonial2">
                  <span className="font-bold">default</span> default
                </Trans>
              </p>
              <p className="text-right font-semibold">– SparkVibe Studio Team, Los Angeles.</p>
            </Card>
          </div>
          <div className="text-center p-4 bg-black border border-lit-pink rounded">
            <p className="text-xl md:text-2xl font-bold text-lit-pink">
              {t('kairosCreative.v2.socialProof.stat')}
            </p>
          </div>
        </motion.section>

        <Separator className="bg-lit-border" />

        {/* Section 6: Exclusivity + Urgency */}
        <motion.section variants={fadeIn} className="p-8 md:p-12 rounded-lg text-center border border-lit-border bg-card">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t('kairosCreative.v2.exclusivity.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed max-w-3xl mx-auto">
            {t('kairosCreative.v2.exclusivity.intro')}
          </p>
          <ul className="list-none space-y-3 text-lg md:text-xl text-muted-foreground mb-6 inline-block text-left">
             <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.exclusivity.listItem1')}</li>
             <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.exclusivity.listItem2')}</li>
             <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.exclusivity.listItem3')}</li>
          </ul>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
             <Trans i18nKey="kairosCreative.v2.exclusivity.outro">
               default <span className="text-lit-pink italic">sourpuss</span> default
             </Trans>
          </p>
           {/* Visual placeholder */}
           <p className="text-2xl font-bold text-lit-pink mb-8 animate-pulse">
             {t('kairosCreative.v2.exclusivity.counter')}
           </p>
           <Button
             size="lg"
             className="bg-lit-pink hover:bg-opacity-80 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl border border-lit-pink disabled:opacity-50"
             onClick={() => handleCheckout(newbiePriceId)} // Call handleCheckout with newbie price ID
             disabled={isLoading === newbiePriceId} // Disable button while loading this specific checkout
           >
             {isLoading === newbiePriceId ? (
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
             ) : null}
             {t('kairosCreative.v2.exclusivity.mainCta')}
           </Button>
           <p className="text-lit-pink mt-4 text-sm font-semibold animate-pulse flex items-center justify-center">
              <Clock className="h-4 w-4 mr-1" />
              {t('kairosCreative.v2.exclusivity.subCta')}
           </p>
        </motion.section>

        <Separator className="bg-lit-border" />

        {/* Section 7: Post-CTA */}
        <motion.section variants={fadeIn} className="bg-card p-8 md:p-12 rounded-lg text-center border border-lit-border">
           <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
             {t('kairosCreative.v2.postCta.title')}
           </h2>
           <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
             {t('kairosCreative.v2.postCta.text')}
           </p>
           {/* Replace icons/text with a single CTA button */}
           <div className="flex justify-center">
             <Button
               size="lg"
               className="bg-lit-pink hover:bg-opacity-80 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl border border-lit-pink disabled:opacity-50"
               onClick={() => handleCheckout(newbiePriceId)} // Call handleCheckout with newbie price ID
               disabled={isLoading === newbiePriceId} // Disable button while loading this specific checkout
             >
               {isLoading === newbiePriceId ? (
                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               ) : null}
               {t('kairosCreative.v2.postCta.combinedCta')}
             </Button>
           </div>
        </motion.section>

        {/* Section 8: Bonus - REMOVED */}

        {/* Display Error Message */}
        {error && (
          <motion.div
            className="mt-4 p-4 bg-red-900 border border-red-700 text-red-100 rounded-md text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>Error: {error}</p>
          </motion.div>
        )}

      </div>

      {/* Footer - Simplified version from pitch, styled */}
       <footer className="bg-black py-8 text-white border-t border-lit-border">
         <div className="container mx-auto px-4 text-center">
           <div className="mb-4 text-lit-pink text-2xl font-bold">{t('kairosCreative.v2.hero.title')}</div>
           {/* Removed the div containing the links */}
           {/* Add Social Media Icons here if needed */}
           <p className="text-sm text-muted-foreground">{t('kairosCreative.v2.footer.copyright')}</p>
         </div>
       </footer>
    </motion.div>
  );
};

export default KairosCreativeLandingPage;
