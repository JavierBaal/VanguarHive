import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection"; // Reutilizamos HeroSection
import Footer from "./Footer"; // Reutilizamos Footer
import ContactSection from "./ContactSection"; // Reutilizamos ContactSection
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const KairosCreativeLandingPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-slate-900 text-slate-200"
    >
      {/* Hero Section Adaptada */}
      <HeroSection
        title="Kairos Creative"
        subtitle="La Revolución de la Publicidad Creativa"
        description='IA Multiagente que Cambia el Juego Publicitario. Creamos campañas en horas, no semanas.'
        ctaText="Únete a la Revolución"
        onCtaClick={() => document.getElementById('contact-kairos-creative')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Contenido del Pitch */}
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">

        {/* Introducción */}
        <motion.section variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8">
            Introducción: El Momento Perfecto para Hacer Historia
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
            Imagina un mundo donde las campañas publicitarias se crean en horas, no en semanas. Donde la creatividad no tiene techo y cada idea es más brutal que la anterior. Donde los datos y el instinto humano se fusionan para generar contenido que no solo vende, sino que golpea directo en el alma. Ese mundo no es un sueño lejano; es lo que Kairos Creative está construyendo hoy.
          </p>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            El mercado publicitario digital está explotando: se proyecta que alcance los $1.2 billones para 2027. Las marcas están desesperadas por destacar en un mar de contenido mediocre, y los consumidores exigen experiencias únicas y personalizadas. Kairos Creative no es solo una agencia; es una máquina de innovación impulsada por IA multiagente que usa la plataforma KAIROS para redefinir lo que es posible en publicidad. Este es el momento kairos, el instante perfecto para actuar. Si dejas pasar esto, no solo te pierdes un negocio; te pierdes el futuro.
          </p>
        </motion.section>

        <Separator className="bg-slate-700" />

        {/* El Problema */}
        <motion.section variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8">
            El Problema: La Creatividad Atrapada en el Siglo Pasado
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
            Las agencias tradicionales están estancadas. Sus procesos son lentos, caros y obsoletos: briefs infinitos, reuniones eternas y revisiones que nunca acaban. Mientras tanto, las marcas necesitan campañas que se adapten al instante a las tendencias y al comportamiento del consumidor. La solución no es contratar más gente; es tener más inteligencia, más velocidad y más precisión.
          </p>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            Kairos Creative lo resuelve con un sistema de IA multiagente que convierte el caos creativo en una máquina bien aceitada. Tenemos agentes especializados: el "AI Copywriter" que escribe textos que enganchan, el "AI Art Director" que diseña visuales que impactan, y todos trabajan juntos en tiempo real. Pero el verdadero golpe maestro es la plataforma KAIROS: un sistema que simula escenarios publicitarios complejos antes de lanzar una campaña. Podemos predecir resultados, optimizar ideas y garantizar éxito como nadie más en el mercado. Esto no es una agencia; es un laboratorio de creatividad con esteroides.
          </p>
        </motion.section>

        <Separator className="bg-slate-700" />

        {/* La Solución */}
        <motion.section variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8">
            La Solución: IA Multiagente que Rompe Todas las Reglas
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
            Kairos Creative no sigue el juego; lo cambia. Aquí te dejo lo que nos hace únicos:
          </p>
          <ul className="list-disc list-inside space-y-3 text-lg md:text-xl text-slate-300 mb-6">
            <li><strong className="text-blue-300">Eficiencia Brutal:</strong> Pasamos de semanas a horas en la creación de campañas. Más velocidad, menos costos, resultados inmediatos.</li>
            <li><strong className="text-blue-300">Creatividad Imparable:</strong> Nuestra IA no solo genera ideas; las perfecciona con datos en tiempo real, creando contenido que conecta y convierte.</li>
            <li><strong className="text-blue-300">Escalabilidad Infinita:</strong> Podemos manejar un tsunami de proyectos sin sudar, algo que las agencias tradicionales no sueñan ni en sus mejores días.</li>
            <li><strong className="text-blue-300">Simulación que Gana:</strong> Con KAIROS, testeamos campañas antes de que salgan al aire, ajustamos variables y maximizamos el ROI. Es como tener el futuro en nuestras manos.</li>
          </ul>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-semibold">
            En pocas palabras, somos la agencia del mañana: rápida, inteligente y siempre un paso adelante.
          </p>
        </motion.section>

        <Separator className="bg-slate-700" />

        {/* El Mercado */}
        <motion.section variants={fadeIn}>
           <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8">
            El Mercado: Un Pastel Gigante Listo para Ser Cortado
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
            El mercado está gritando por soluciones como la nuestra. Mira estos números:
          </p>
          <ul className="list-disc list-inside space-y-3 text-lg md:text-xl text-slate-300 mb-6">
            <li><strong className="text-blue-300">Tamaño del Mercado:</strong> El mercado publicitario digital va rumbo a $1.2 billones para 2027, con una CAGR del 15.4% desde 2025 hasta 2030. Ahí hay espacio de sobra para nosotros.</li>
            <li><strong className="text-blue-300">Boom de la IA:</strong> El 92% de las empresas planean invertir en IA generativa en los próximos tres años, y el mercado de IA en marketing se proyecta en $217.33 billones para 2034. La demanda está explotando.</li>
            <li><strong className="text-blue-300">Tendencias Ganadoras:</strong> Hiperpersonalización, publicidad móvil y optimización en tiempo real son el presente y el futuro. Kairos Creative está diseñada para dominarlas todas.</li>
          </ul>
           <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-semibold">
            En un mundo donde el contenido manda, nosotros somos los reyes y reinas que lo hacen posible.
          </p>
        </motion.section>

        <Separator className="bg-slate-700" />

        {/* Proyecciones Financieras */}
        <motion.section variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8">
            Proyecciones Financieras: Números que Te Van a Volar la Cabeza
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
            Hablemos de plata, porque aquí es donde se pone serio. Estas son nuestras proyecciones para los primeros tres años:
          </p>
          {/* Podríamos usar una tabla aquí si tuviéramos los componentes de tabla de Shadcn */}
          <Card className="bg-slate-800 border-slate-700 text-slate-300 mb-6">
            <CardHeader>
              <CardTitle className="text-blue-300">Proyecciones (Ingresos Estimados)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="p-2">Año</th>
                      <th className="p-2">Escenario Base</th>
                      <th className="p-2">Escenario Optimista</th>
                      <th className="p-2">Escenario Pesimista</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="p-2 font-semibold">2026</td>
                      <td className="p-2">$2.5M</td>
                      <td className="p-2">$4.0M</td>
                      <td className="p-2">$1.5M</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="p-2 font-semibold">2027</td>
                      <td className="p-2">$6.0M</td>
                      <td className="p-2">$10.0M</td>
                      <td className="p-2">$3.5M</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">2028</td>
                      <td className="p-2">$12.0M</td>
                      <td className="p-2">$20.0M</td>
                      <td className="p-2">$7.0M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
            Con un margen de beneficio del 35% en el escenario base, esto no es solo viable; es una mina de oro. Y con la plataforma KAIROS, podemos escalar a la velocidad de la luz y comernos mercados enteros. Esto no es una apuesta; es un cheque en blanco con tu nombre.
          </p>
        </motion.section>

        <Separator className="bg-slate-700" />

        {/* La Oportunidad */}
        <motion.section variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8">
            La Oportunidad: Subirte al Tren o Quedarte en la Estación
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
            Invertir en Kairos Creative no es solo poner dinero; es comprar un boleto al frente de la revolución publicitaria. Los primeros en subirse a esta ola van a dominar el mercado en los próximos años. Imagínate ser el inversor que dijo "sí" a esto. No solo hablamos de billetes; hablamos de dejar un legado.
          </p>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-semibold text-yellow-400">
            Pero ojo, el reloj está corriendo. El mercado no espera, y los competidores ya están oliendo lo que traemos. Si no actúas ahora, alguien más lo hará, y tú serás el que se quede mirando desde afuera, pensando "qué carajo dejé pasar".
          </p>
        </motion.section>

        <Separator className="bg-slate-700" />

        {/* Conclusión */}
        <motion.section variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8">
            Conclusión: O Haces Historia o Te Quedas en el Pasado
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
            Kairos Creative no es una agencia más; es el futuro de la publicidad creativa. Con nuestra IA multiagente y la plataforma KAIROS, estamos listos para reventar el mercado. Los números hablan solos, el mercado está hambriento, y la oportunidad es ahora.
          </p>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed font-semibold">
            Si no inviertes en esto, no solo pierdes dinero; pierdes la chance de ser parte de algo épico. ¿Vas a ser el visionario que cambió el juego o el viejo vinagre que se quedó cruzado de brazos? El momento kairos está aquí, compañero. Decide rápido.
          </p>
          <p className="text-xl md:text-2xl text-center font-bold text-blue-300">
            ¿Listo para hacer historia? Contáctanos hoy y asegura tu lugar en la cima de la publicidad creativa.
          </p>
        </motion.section>

      </div>

      {/* Contact Section */}
      <div id="contact-kairos-creative">
        <ContactSection formIdentifier="Kairos Creative Interest" />
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default KairosCreativeLandingPage;
