import React from "react";
import { motion } from "framer-motion";
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
  const navigate = useNavigate();

  // Updated URLs
  const linkedInUrl = "https://linkedin.com/in/javier-baal";
  const xUrl = "https://x.com/javierbaal00"; // Updated X URL

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 1. Add Hero Section */}
      <HeroSection
        title="Detrás de VanguardHive"
        subtitle="El Fundador"
        description="Conoce la mente que impulsa la innovación en la intersección de la IA y la creatividad."
        ctaText="Volver al Inicio"
        onCtaClick={() => navigate('/')}
      />

      {/* 2. Main content section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-slate-900 text-white flex-grow">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              {/* Profile Card */}
              <div className="lg:col-span-1 flex flex-col items-center">
                <Card className="w-full max-w-sm bg-slate-800/50 border-cyan-500/20">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-32 h-32 mx-auto mb-4 border-2 border-cyan-400">
                      <AvatarImage src="/images/Javier-Baal_Fran-Barbero-2025.jpg" alt="Javier Baal" />
                      <AvatarFallback className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600">
                        JB
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-bold mb-1">Javier Baal</h3>
                    <p className="text-cyan-400 mb-4">Fundador de VanguardHive</p>
                    <div className="flex justify-center space-x-4">
                      {/* X Button */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-slate-600 hover:bg-slate-700"
                        asChild
                      >
                        <a href={xUrl} target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
                          {/* Using a simple 'X' text for now */}
                          <span className="font-bold text-slate-300">X</span>
                        </a>
                      </Button>
                      {/* LinkedIn Button */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-slate-600 hover:bg-slate-700"
                        asChild
                      >
                        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <Linkedin className="h-5 w-5 text-slate-300" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Bio Text */}
              <div className="lg:col-span-2">
                {/* Changed text-slate-300 to text-slate-200 for better contrast */}
                <div className="space-y-5 text-slate-200 text-lg leading-relaxed">
                  <p>
                    Javier Baal no es un testigo de la revolución tecnológica; es
                    un protagonista que la ha vivido y moldeado desde dentro. Su
                    viaje comenzó en 1984 con un Commodore 16, forjando una
                    conexión íntima con cada ola tecnológica, desde el pixel
                    hasta la IA generativa.
                  </p>
                  <p>
                    Como director creativo tecnológico, dejó su huella en marcas
                    icónicas como <span className="text-cyan-400 font-medium">El Corte Inglés</span> (Doble Cero),{" "}
                    <span className="text-cyan-400 font-medium">Sony PlayStation</span>,{" "}
                    <span className="text-cyan-400 font-medium">Häagen-Dazs</span> y{" "}
                    <span className="text-cyan-400 font-medium">Blackberry</span>, demostrando su habilidad para hacer
                    impactar la tecnología.
                  </p>
                  <p>
                    La llegada de GPT en 2020 no fue solo una noticia, fue una
                    llamada. Javier se sumergió para entender la IA desde su
                    núcleo, no para seguir tendencias, sino para anticiparlas.
                  </p>
                  <p>
                    Aquí reside la diferencia: su <span className="text-purple-400 font-medium">mente neurodivergente</span> y{" "}
                    <span className="text-purple-400 font-medium">sinestesia</span> no son solo características, son
                    superpoderes cognitivos. Le permiten percibir la tecnología,
                    conectar puntos invisibles y ver patrones desde ángulos
                    radicalmente nuevos.
                  </p>
                  <p className="text-xl font-semibold text-white mt-4">
                    <span className="text-cyan-400">VanguardHive</span> es la
                    materialización de esta visión: un laboratorio donde la IA se
                    convierte en un nuevo lenguaje para crear soluciones
                    disruptivas que desafían lo posible.
                  </p>
                  <p className="font-medium text-white">
                    Bienvenidos al futuro, rediseñado por VanguardHive.
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
