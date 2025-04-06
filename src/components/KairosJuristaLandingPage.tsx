import React, { useState } from "react"; // Import useState
import { motion } from "framer-motion";
import { useForm } from "react-hook-form"; // Import useForm
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver
import * as z from "zod"; // Import zod
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Keep Label for non-form elements if needed
import { Textarea } from "@/components/ui/textarea";
import {
  Form, // Import Form components from Shadcn
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast"; // Import useToast
import { ArrowRight, Scale, Clock, Shield, CheckCircle, Loader2 } from "lucide-react"; // Import Loader2
import { Card, CardContent } from "@/components/ui/card";


// 1. Define Zod schema for validation (Kairos specific)
const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  company: z.string().min(2, { message: "El nombre de la empresa/bufete es requerido." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  phone: z.string().optional(), // Phone is optional
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }).max(500, { message: "El mensaje no puede exceder los 500 caracteres." }),
});

type KairosFormValues = z.infer<typeof formSchema>;


const KairosJuristaLandingPage = () => {
  const { toast } = useToast(); // Initialize toast
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading

  // 2. Initialize react-hook-form
  const form = useForm<KairosFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // 3. Define onSubmit handler
  const onSubmit = async (values: KairosFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          formType: 'kairos-beta', // Add form type identifier
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "¡Solicitud Enviada!",
          description: "Gracias por tu interés en KAIROS Jurista. Nuestro equipo se pondrá en contacto pronto.",
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full min-h-[800px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0zMCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6TTI0IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

        {/* Animated gradient orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-3xl"
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

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Subtitle with animation */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <span className="inline-block text-blue-400 font-medium mb-2">
                Una vertical del proyecto KAIROS
              </span>
            </motion.div>

            {/* Main title with animation */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              KAIROS Jurista
            </motion.h1>

            {/* Description with animation */}
            <motion.p
              className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              Una plataforma para la simulación de escenarios jurídicos que
              revoluciona la estrategia legal.
            </motion.p>

            {/* CTA button with animation */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() =>
                  document
                    .getElementById("beta-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Solicitar Acceso a la Beta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Se imagina poder...?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              KAIROS Jurista transforma la práctica legal con tecnología de
              vanguardia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-2 border-primary/10 shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Scale className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    Predecir Resultados
                  </h3>
                  <p className="text-muted-foreground">
                    Anticipe el resultado de un juicio con un 90% de precisión,
                    basado en 50 años de jurisprudencia.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-2 border-primary/10 shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Clock className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Reducir Tiempos</h3>
                  <p className="text-muted-foreground">
                    Disminuya hasta un 70% el tiempo de preparación de casos,
                    transformando meses en horas.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full border-2 border-primary/10 shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Shield className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Blindar Clientes</h3>
                  <p className="text-muted-foreground">
                    Proteja a sus clientes contra riesgos legales ocultos,
                    anticipando vulnerabilidades antes de que surjan.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Más que un Asistente Legal
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              KAIROS Jurista no es solo un equipo virtual de abogados, jueces y
              fiscales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Simulación de Juicios Reales
                    </h3>
                    <p className="text-muted-foreground">
                      Recrea escenarios judiciales completos basados en casos
                      reales y jurisprudencia actualizada.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Anticipación de Argumentos
                    </h3>
                    <p className="text-muted-foreground">
                      Predice los argumentos de la parte contraria,
                      permitiéndole preparar contraargumentos efectivos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Detección de Vulnerabilidades
                    </h3>
                    <p className="text-muted-foreground">
                      Identifica puntos débiles en su estrategia legal y sugiere
                      mejoras basadas en precedentes exitosos.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <h3 className="text-2xl font-bold mb-4">
                      MVP 95% Completado
                    </h3>
                    <p className="mb-6">
                      Validado con bufetes líderes y listo para revolucionar su
                      estrategia legal
                    </p>
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/20 cursor-pointer hover:bg-white/30 transition-colors">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beta Form Section */}
      <section
        id="beta-form"
        className="py-20 px-4 md:px-8 lg:px-16 bg-background"
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Solicite Acceso a la Beta Pública
            </h2>
            <p className="text-lg text-muted-foreground">
              ¿Le interesa ser el primer partner en España en ofrecer esta
              ventaja competitiva a sus clientes?
            </p>
          </div>

          <Card className="border-2 border-primary/10 shadow-lg">
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
                          <FormLabel>Nombre completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Introduzca su nombre" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa/Bufete</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre de su organización" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo electrónico</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="correo@ejemplo.com" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono <span className="text-muted-foreground text-xs">(Opcional)</span></FormLabel>
                          <FormControl>
                            <Input placeholder="+34 XXX XXX XXX" {...field} disabled={isSubmitting} />
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
                        <FormLabel>¿Cómo podría KAIROS Jurista ayudar a su práctica legal?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Cuéntenos sobre sus necesidades específicas..."
                            className="min-h-32"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando Solicitud...
                      </>
                    ) : (
                      "Solicitar Acceso"
                    )}
                  </Button>
                </form>
              </Form>
              <p className="text-sm text-center text-muted-foreground mt-4">
                Al enviar este formulario, acepta ser contactado por nuestro
                equipo para recibir más información sobre KAIROS Jurista.
              </p>
            </CardContent> {/* Correctly closed CardContent */}
          </Card> {/* Correctly closed Card */}
        </div> {/* Correctly closed div */}
      </section> {/* Correctly closed section */}

      {/* Footer */}
      <footer className="bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <div className="text-3xl font-bold mb-2">K</div>
              <div className="text-xl font-semibold">KAIROS Jurista</div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <a
                href="/"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Volver a VanguardHive
              </a>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-muted-foreground mb-4 md:mb-0">
                © 2025 VanguardHive. Todos los derechos reservados.
              </div>
              <div className="text-sm text-muted-foreground">
                Innovación • IA • Justicia
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KairosJuristaLandingPage;
