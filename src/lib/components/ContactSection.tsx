import React, { useState } from "react"; // Keep useState for isSubmitting
import { useForm } from "react-hook-form"; // Import useForm
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver
import * as z from "zod"; // Import zod
import { Card, CardContent } from "@/lib/components/ui/card"; // Corrected path
import { Input } from "@/lib/components/ui/input"; // Corrected path
// Label might still be used outside the form, keep it for now
import { Label } from "@/lib/components/ui/label"; // Corrected path
import { Textarea } from "@/lib/components/ui/textarea"; // Corrected path
import { Button } from "@/lib/components/ui/button"; // Corrected path
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select"; // Corrected path
import {
  Form, // Import Form components from Shadcn
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form"; // Corrected path
import { useToast } from "@/lib/components/ui/use-toast"; // Corrected path
import { Mail, Linkedin, Loader2 } from "lucide-react"; // Import Loader2

// 1. Define Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  project: z.string().optional(), // Project selection is optional or allow empty
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }).max(1000, { message: "El mensaje no puede exceder los 1000 caracteres." }),
});

type ContactFormValues = z.infer<typeof formSchema>;


interface ContactSectionProps {
  className?: string;
  defaultProduct?: string; // Add prop for default product/context
}

const ContactSection: React.FC<ContactSectionProps> = ({ className = "", defaultProduct = "" }) => {
  const { toast } = useToast(); // Initialize toast
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading

  // 2. Initialize react-hook-form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      project: defaultProduct, // Use the prop for default value
      message: "",
    },
  });

  // 3. Define onSubmit handler
  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The 'project' field from values now contains the identifier if set
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "¡Mensaje Enviado!",
          description: "Gracias por contactarnos. Te responderemos pronto.",
        });
        form.reset(); // Reset form on success
      } else {
        throw new Error(result.error || 'Error al enviar el mensaje.');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo enviar el mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section
      className={`py-20 px-4 md:px-8 lg:px-16 bg-background ${className}`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contáctanos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Listo para explorar cómo la IA puede revolucionar tu proyecto?
            Contáctanos directamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Card className="border-2 border-primary/10 shadow-lg">
              <CardContent className="p-6">
                {/* 4. Wrap form with Shadcn Form component */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* 5. Use FormField for each input */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu nombre" className="mt-1" {...field} disabled={isSubmitting} />
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
                          <FormLabel>Correo electrónico</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="tu@correo.com" className="mt-1" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="project"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asunto / Proyecto de interés <span className="text-muted-foreground text-xs">(Opcional)</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || defaultProduct} disabled={isSubmitting}>
                            <FormControl>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Selecciona un asunto o proyecto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* Add Kairos Creative if defaultProduct is set to it */}
                              {defaultProduct === "Kairos Creative Interest" && (
                                <SelectItem value="Kairos Creative Interest">Kairos Creative</SelectItem>
                              )}
                              <SelectItem value="TehorIA Beta">TehorIA (Beta)</SelectItem>
                              <SelectItem value="Kairos Jurista Beta">KAIROS Jurista (Beta)</SelectItem>
                              <SelectItem value="General Inquiry">Consulta General</SelectItem>
                              <SelectItem value="Partnership">Propuesta de Colaboración</SelectItem>
                              <SelectItem value="Other">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Escribe tu mensaje aquí..."
                              className="mt-1 min-h-32"
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
                          Enviando...
                        </>
                      ) : (
                        "Enviar mensaje"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="h-full border-2 border-primary/10 shadow-lg">
              <CardContent className="p-6 flex flex-col justify-center h-full space-y-8">
                <div className="text-2xl font-semibold mb-6">
                  Información de contacto
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Correo electrónico</h3>
                      <a
                        href="mailto:info@vanguardhive.com"
                        className="text-primary hover:underline"
                      >
                        info@vanguardhive.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Linkedin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">LinkedIn</h3>
                      <a
                        href="https://linkedin.com/in/javier-baal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Javier Baal
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="text-xl font-semibold mb-4">
                    Únete a la Colmena
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                      Creatividad
                    </span>
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                      IA
                    </span>
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                      Disrupción
                    </span>
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                      Colmena
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
