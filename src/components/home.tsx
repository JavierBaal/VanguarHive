import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer"; // Import the new Footer component

// Ensure AboutSection is NOT imported
// import AboutSection from "./AboutSection";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
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
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tecnología que Empodera
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Desde MVPs listos para el mercado hasta visiones futuristas,
              nuestro objetivo es acelerar el descubrimiento humano a través de
              la IA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="p-6 bg-card rounded-xl shadow-md text-center">
              <h3 className="text-3xl font-bold mb-2">Creatividad</h3>
              <p className="text-muted-foreground">
                Innovación humana que impulsa soluciones únicas
              </p>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-md text-center">
              <h3 className="text-3xl font-bold mb-2">IA</h3>
              <p className="text-muted-foreground">
                Tecnología de vanguardia que potencia cada proyecto
              </p>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-md text-center">
              <h3 className="text-3xl font-bold mb-2">Disrupción</h3>
              <p className="text-muted-foreground">
                Transformando industrias con soluciones innovadoras
              </p>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-md text-center">
              <h3 className="text-3xl font-bold mb-2">Colmena</h3>
              <p className="text-muted-foreground">
                Colaboración que multiplica el potencial creativo
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl w-full text-center">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">IA</div>
                <p className="text-sm text-muted-foreground">
                  Tecnología de vanguardia
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">Creatividad</div>
                <p className="text-sm text-muted-foreground">
                  Innovación humana
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">=</div>
                <p className="text-sm text-muted-foreground">Fusión única</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">∞</div>
                <p className="text-sm text-muted-foreground">
                  Posibilidades infinitas
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
      >
        <ContactSection />
      </motion.div>

      {/* Use the Footer component */}
      <Footer />
    </div>
  );
};

export default Home;
