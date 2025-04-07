import React, { useState } from "react"; // Import useState
import { motion } from "framer-motion";
import { useForm } from "react-hook-form"; // Import useForm
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver
import * as z from "zod"; // Import zod
import { Button } from "@/lib/components/ui/button"; // Corrected path
import { Input } from "@/lib/components/ui/input"; // Corrected path
import { Label } from "@/lib/components/ui/label"; // Corrected path
import { Textarea } from "@/lib/components/ui/textarea"; // Corrected path
import {
  Form, // Import Form components from Shadcn
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form"; // Corrected path
import { useToast } from "@/lib/components/ui/use-toast"; // Corrected path
import {
  ArrowRight,
  Loader2, // Import Loader icon
  MessageSquare,
  Music,
  Wand2,
  Zap,
  Code,
  Sparkles,
  Brain,
  Headphones,
  Linkedin,
  Twitter, // Keep Twitter for now, might be used elsewhere or intended
} from "lucide-react";
import { Card, CardContent } from "@/lib/components/ui/card"; // Corrected path
import { Badge } from "@/lib/components/ui/badge"; // Corrected path
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/lib/components/ui/dialog"; // Import Dialog components

// 1. Define Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }).max(500, { message: "El mensaje no puede exceder los 500 caracteres." }),
});

type TehoriaFormValues = z.infer<typeof formSchema>;

const TehorIALandingPage = () => {
  const { toast } = useToast(); // Initialize toast
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading

  // 2. Initialize react-hook-form
  const form = useForm<TehoriaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });


  // 3. Define onSubmit handler
  const onSubmit = async (values: TehoriaFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          formType: 'tehoria-beta', // Add form type identifier
        }),
      });

      const result = await response.json(); // Assuming server sends JSON

      if (response.ok) {
        toast({
          title: "¡Solicitud Enviada!",
          description: "Gracias por tu interés en TehorIA. Nos pondremos en contacto pronto.",
        });
        form.reset(); // Reset form on success
      } else {
        throw new Error(result.error || 'Error al enviar el formulario.');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo enviar la solicitud. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* ATTENTION: Hero Section with striking visuals */}
      <section className="relative w-full min-h-[800px] bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 flex items-center justify-center overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0zMCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6TTI0IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

        {/* Multiple animated gradient orbs for visual impact */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 opacity-20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] left-1/4 top-1/4 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-10 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Attention-grabbing subtitle */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <span className="inline-block text-cyan-400 font-medium mb-2 tracking-wider">
                REVOLUCIONANDO LA PRODUCCIÓN MUSICAL
              </span>
            </motion.div>

            {/* Bold, impactful headline */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              TehorIA
            </motion.h1>

            {/* Compelling subheadline */}
            <motion.p
              className="text-2xl text-cyan-300 mb-4 font-semibold"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              El Socio Creativo que Revolucionará tu Música
            </motion.p>

            {/* Attention-grabbing description */}
            <motion.p
              className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              No es un DAW más. Es tu compañero creativo que siente, entiende y
              crea música contigo mediante conversación natural.
            </motion.p>

            {/* CTA button with animation */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl border-0"
                onClick={() =>
                  document
                    .getElementById("beta-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Únete a la Beta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-950 px-8 py-6 text-lg rounded-md transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Descubre Cómo Funciona
              </Button>
            </motion.div>

            {/* Development status indicators */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-3"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1.5">
                Motor DAWnomicom: 96% completado
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1.5">
                Integración IA: 100% operativa
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1.5">
                Plugins VST/VST3: 99% listos
              </Badge>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </section>

      {/* INTEREST: Features Section */}
      <section
        id="features"
        className="py-20 px-4 md:px-8 lg:px-16 bg-slate-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-sm font-medium text-cyan-400 mr-2">01</span>
              <div className="h-px w-8 bg-cyan-400"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              No Es Una IA Generativa Cualquiera
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              TehorIA es un socio creativo que evoluciona contigo y lleva tu
              música a lugares que ni siquiera imaginabas.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={itemVariant}>
              <Card className="h-full border-2 border-cyan-500/10 bg-slate-800/50 shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <MessageSquare className="h-12 w-12 text-cyan-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Interfaz Conversacional
                  </h3>
                  <p className="text-slate-300">
                    Habla con TehorIA como si fuera tu asistente personal. Dile
                    lo que quieres y deja que cree pistas, loops o efectos en
                    tiempo real.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariant}>
              <Card className="h-full border-2 border-purple-500/10 bg-slate-800/50 shadow-lg hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Music className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Composición Personalizada
                  </h3>
                  <p className="text-slate-300">
                    Genera melodías, armonías y ritmos únicos basados en tus
                    instrucciones, con un toque humano que respeta tu estilo
                    personal.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariant}>
              <Card className="h-full border-2 border-pink-500/10 bg-slate-800/50 shadow-lg hover:shadow-pink-500/5 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Wand2 className="h-12 w-12 text-pink-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Evoluciona Contigo
                  </h3>
                  <p className="text-slate-300">
                    TehorIA aprende de ti, recuerda cada sesión, afina su estilo
                    para reflejar el tuyo y se vuelve más brillante con cada
                    interacción.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DESIRE: Problem-Solution Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-sm font-medium text-purple-400 mr-2">
                02
              </span>
              <div className="h-px w-8 bg-purple-400"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Supera las Barreras de la Producción Musical
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              TehorIA elimina los obstáculos técnicos y creativos que frenan tu
              proceso musical.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-900/30 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      Adiós a las Interfaces Complejas
                    </h3>
                    <p className="text-slate-300">
                      Olvídate de navegar por menús confusos. Simplemente dile a
                      TehorIA lo que quieres y ella lo hará por ti, manteniendo
                      tu flujo creativo intacto.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-900/30 p-3 rounded-full">
                    <Brain className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      Supera el Bloqueo Creativo
                    </h3>
                    <p className="text-slate-300">
                      TehorIA te sugiere ideas cuando te quedas sin inspiración,
                      adaptándose a tu estilo y ayudándote a explorar nuevas
                      direcciones musicales.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-pink-900/30 p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      Portabilidad Sin Compromisos
                    </h3>
                    <p className="text-slate-300">
                      Lleva tu estudio completo en un pendrive. TehorIA funciona
                      sin instalación y detecta automáticamente tus plugins
                      VST/VST3 favoritos.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interactive Demo Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-video w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl overflow-hidden border-2 border-slate-700">
                <div className="absolute inset-0 flex flex-col p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-slate-400">TehorIA DAW</div>
                  </div>

                  <div className="flex-1 bg-slate-900/80 rounded-lg p-4 overflow-hidden">
                    <div className="flex flex-col h-full">
                      <div className="flex-1 overflow-y-auto space-y-4">
                        <div className="flex items-start">
                          <div className="bg-slate-800 rounded-lg p-3 max-w-[80%]">
                            <p className="text-slate-300 text-sm">
                              Quiero hacer un track de techno oscuro a 128 BPM
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start justify-end">
                          <div className="bg-cyan-900/30 rounded-lg p-3 max-w-[80%]">
                            <p className="text-cyan-300 text-sm">
                              Me gusta la idea. Por tu historial, veo que
                              prefieres empezar con el ritmo y crear atmósferas
                              densas. ¿Te gustaría que empecemos con un patrón
                              de drums inspirado en el estilo Berlin techno que
                              usamos en tu último proyecto? O podemos explorar
                              algo nuevo, quizás con influencias industriales.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="bg-slate-800 rounded-lg p-3 max-w-[80%]">
                            <p className="text-slate-300 text-sm">
                              Sí, empecemos por el ritmo, pero esta vez quiero
                              algo más industrial
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start justify-end">
                          <div className="bg-cyan-900/30 rounded-lg p-3 max-w-[80%]">
                            <p className="text-cyan-300 text-sm">
                              Vale, vamos a ello. Ya que te gustó cómo quedó la
                              compresión paralela en el último track, la
                              aplicaré sutilmente al bombo mientras trabajamos.
                              Para darle ese toque industrial, sugiero:
                            </p>
                            <ul className="list-disc list-inside text-cyan-300 text-sm mt-2">
                              <li>Un bombo más crudo a 128 BPM</li>
                              <li>
                                Un patrón de hi-hats metálicos con algo de
                                distorsión
                              </li>
                              <li>Claps procesados con reverb metálica</li>
                            </ul>
                            <p className="text-cyan-300 text-sm mt-2">
                              ¿Por cuál prefieres que empecemos?
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center">
                        <input
                          type="text"
                          className="flex-1 bg-slate-800 border-0 rounded-lg px-4 py-2 text-slate-300 text-sm"
                          placeholder="Dile a TehorIA qué quieres crear..."
                        />
                        <button className="ml-2 bg-cyan-600 p-2 rounded-lg">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DESIRE: Status Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-sm font-medium text-pink-400 mr-2">03</span>
              <div className="h-px w-8 bg-pink-400"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Casi Listo Para Revolucionar Tu Música
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              TehorIA está en fase final de desarrollo, con la mayoría de sus
              características ya operativas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-cyan-500/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Motor de Audio
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">DAWnomicom</span>
                      <span className="text-sm text-cyan-400">96%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{ width: "96%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">
                        Integración IA
                      </span>
                      <span className="text-sm text-cyan-400">100%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">
                        Teoría Musical
                      </span>
                      <span className="text-sm text-cyan-400">100%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Composición
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">
                        MIDI Personalizado
                      </span>
                      <span className="text-sm text-purple-400">100%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">
                        Estructuras PLN
                      </span>
                      <span className="text-sm text-purple-400">100%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">
                        Pianoroll Visual
                      </span>
                      <span className="text-sm text-purple-400">72%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: "72%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-pink-500/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Producción
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">
                        Mezcla y Masterización
                      </span>
                      <span className="text-sm text-pink-400">100%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">
                        Ondas Visuales
                      </span>
                      <span className="text-sm text-pink-400">65%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">
                        Mezcla con Efectos
                      </span>
                      <span className="text-sm text-pink-400">92%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-cyan-500/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Integración
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">
                        Instrumentos MIDI VST
                      </span>
                      <span className="text-sm text-cyan-400">98%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{ width: "98%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">
                        Plugins de Efectos
                      </span>
                      <span className="text-sm text-cyan-400">99%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{ width: "99%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">
                        Plugins Propios
                      </span>
                      <span className="text-sm text-cyan-400">15%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* DESIRE: Testimonials/Use Cases */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-sm font-medium text-cyan-400 mr-2">04</span>
              <div className="h-px w-8 bg-cyan-400"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Diseñado Para Productores Como Tú
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              TehorIA se adapta a tu flujo de trabajo y te ayuda a superar los
              obstáculos creativos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-cyan-500/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Para Productores Digitales
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Flujos de trabajo más eficientes y nuevas formas de creación
                    musical.
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Headphones className="h-5 w-5 text-cyan-400 mt-0.5" />
                    <p className="text-slate-300">
                      Genera ideas musicales mediante comandos naturales
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Headphones className="h-5 w-5 text-cyan-400 mt-0.5" />
                    <p className="text-slate-300">
                      Control preciso de elementos musicales mediante
                      descripción verbal
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Headphones className="h-5 w-5 text-cyan-400 mt-0.5" />
                    <p className="text-slate-300">
                      Ajustes rápidos de parámetros mediante comandos de
                      voz/texto
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Para Creadores en Movimiento
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Lleva tu estudio completo a cualquier lugar sin
                    instalaciones complejas.
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Code className="h-5 w-5 text-purple-400 mt-0.5" />
                    <p className="text-slate-300">
                      Funciona desde un pendrive sin instalación previa
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Code className="h-5 w-5 text-purple-400 mt-0.5" />
                    <p className="text-slate-300">
                      Detección automática de plugins VST/VST3 instalados
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Code className="h-5 w-5 text-purple-400 mt-0.5" />
                    <p className="text-slate-300">
                      Entorno Python aislado que elimina problemas de
                      dependencias
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ACTION: Beta Form Section */}
      <section
        id="beta-form"
        className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-slate-900 to-slate-800"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4 text-white">
                Prepárate Para Lo Imposible
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                TehorIA está aquí para cambiar el juego. ¿Estás listo para crear
                sin límites?
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 px-3 py-1.5">
                  Acceso Anticipado
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 px-3 py-1.5">
                  Plazas Limitadas
                </Badge>
                <Badge className="bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 px-3 py-1.5">
                  Soporte Prioritario
                </Badge>
              </div>
            </div>

            <Card className="border-2 border-cyan-500/20 bg-slate-900/80 shadow-lg hover:shadow-cyan-500/5 transition-all duration-300">
              <CardContent className="p-8">
                {/* 4. Wrap form with Shadcn Form component */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 5. Use FormField for each input */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Nombre completo</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Introduzca su nombre"
                                className="bg-slate-800 border-slate-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20"
                                {...field}
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Correo electrónico</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="correo@ejemplo.com"
                                className="bg-slate-800 border-slate-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20"
                                {...field}
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">¿Qué tipo de música creas?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Cuéntanos sobre tu estilo musical y cómo te gustaría usar TehorIA..."
                              className="min-h-32 bg-slate-800 border-slate-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white border-0"
                      size="lg"
                      disabled={isSubmitting} // 6. Disable button on submit
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Únete a la Beta Ahora"
                      )}
                    </Button>
                  </form>
                </Form>
                <p className="text-sm text-center text-slate-400 mt-4">
                  Las plazas son limitadas. Al enviar este formulario, te
                  aseguras un lugar en la lista de espera prioritaria.
                </p>
              </CardContent> {/* Closing CardContent */}
            </Card> {/* Closing Card */}
          </div> {/* Closing div for first column */}

          {/* Video Section with Dialog */}
          <div className="flex items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <div className="aspect-video w-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-xl shadow-2xl overflow-hidden border-2 border-slate-700 relative cursor-pointer group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center p-8 z-10">
                      <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                        TehorIA en Acción
                      </h3>
                      <p className="mb-6 text-slate-300 max-w-md mx-auto">
                        Mira cómo TehorIA transforma el proceso creativo musical y
                        revoluciona la forma en que produces música.
                      </p>
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-cyan-500/30 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0zMCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6TTI0IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>

                  <motion.div
                    className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 blur-3xl"
                    animate={{
                      x: [0, 30, 0],
                      y: [0, -30, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
              </DialogTrigger>
              {/* Adjusted DialogContent size using viewport units */}
              <DialogContent className="w-[80vw] max-w-[80vw] h-[80vh] max-h-[80vh] p-0 bg-black border-slate-800 overflow-hidden flex items-center justify-center">
                {/* Removed aspect-video to allow iframe to fill height */}
                <div className="w-full h-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/m5913fGfVGw?autoplay=1" // Added autoplay
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div> {/* Closing div for grid */}
      </section> {/* Closing section */}

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <div className="text-3xl font-bold mb-2 text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                T
              </div>
              <div className="text-xl font-semibold text-white">TehorIA</div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <a
                href="/"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Volver a VanguardHive
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-slate-400 mb-4 md:mb-0">
                © 2025 VanguardHive. Todos los derechos reservados.
              </div>
              <div className="text-sm text-slate-400">
                Innovación • IA • Música
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TehorIALandingPage;
