import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  status: string;
  ctaText: string;
  ctaLink: string;
  statusColor: "default" | "secondary" | "destructive" | "outline";
}

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: "TehorIA",
      subtitle: "IA Musical",
      description:
        "Un DAW conversacional con IA, listo para revolucionar la música. Únete a la beta pública ahora.",
      status: "Beta Pública",
      ctaText: "Más información",
      ctaLink: "/tehoria",
      statusColor: "default",
    },
    {
      title: "KAIROS",
      subtitle: "Multiagente",
      description:
        "Simulaciones avanzadas y creatividad multiagente, en desarrollo.",
      status: "En Desarrollo",
      ctaText: "Más información",
      ctaLink: "#",
      statusColor: "secondary",
    },
    {
      title: "KAIROS Jurista",
      subtitle: "Legal Tech",
      description:
        "Una vertical de KAIROS enfocada en Legal Tech, en desarrollo.",
      status: "Beta Pública",
      ctaText: "Más información",
      ctaLink: "/kairos-jurista",
      statusColor: "default",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm font-medium text-muted-foreground mr-2">
              01
            </span>
            <div className="h-px w-8 bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Proyectos que Transforman
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            En VanguardHIVE, desarrollamos soluciones IA que desafían lo
            convencional y abren nuevas posibilidades.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col bg-card hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {project.subtitle}
                      </CardDescription>
                    </div>
                    <Badge variant={project.statusColor}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <a href={project.ctaLink}>{project.ctaText}</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
