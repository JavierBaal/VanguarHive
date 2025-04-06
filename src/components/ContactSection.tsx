import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Linkedin } from "lucide-react";

interface ContactSectionProps {
  className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, project: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", project: "", message: "" });
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="project">Proyecto de interés</Label>
                      <Select
                        value={formData.project}
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tehoria">TehorIA</SelectItem>
                          <SelectItem value="kairos">KAIROS</SelectItem>
                          <SelectItem value="kairos-jurista">
                            KAIROS Jurista
                          </SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 min-h-32"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Enviar mensaje
                  </Button>
                </form>
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
