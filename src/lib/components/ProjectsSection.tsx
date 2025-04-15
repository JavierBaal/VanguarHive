import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card"; // Corrected path
import { Button } from "@/lib/components/ui/button"; // Corrected path
import { Badge } from "@/lib/components/ui/badge"; // Corrected path
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next'; // Import useTranslation

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
  const { t } = useTranslation(); // Initialize translation hook

  // Define projects using translation keys - Reordenado alfabéticamente
  const projects: Project[] = [
    {
      title: t('projects.kairosCreative.title'),
      subtitle: t('projects.kairosCreative.subtitle'),
      description: t('projects.kairosCreative.description'),
      status: t('projects.kairosCreative.status'),
      ctaText: t('projects.kairosCreative.cta'),
      ctaLink: "/kairos-creative",
      statusColor: "default",
    },
    {
      title: t('projects.kairosJurista.title'),
      subtitle: t('projects.kairosJurista.subtitle'),
      description: t('projects.kairosJurista.description'),
      status: t('projects.kairosJurista.status'),
      ctaText: t('projects.kairosJurista.cta'),
      ctaLink: "/kairos-jurista",
      statusColor: "default",
    },
    {
      title: t('projects.tehoria.title'),
      subtitle: t('projects.tehoria.subtitle'),
      description: t('projects.tehoria.description'),
      status: t('projects.tehoria.status'),
      ctaText: t('projects.tehoria.cta'),
      ctaLink: "/tehoria",
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
    // Original styling before Literal AI changes
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm font-medium text-muted-foreground mr-2">
              01 {/* Original pretitle number */}
            </span>
            <div className="h-px w-8 bg-primary"></div> {/* Original primary color */}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('projects.sectionTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('projects.sectionDescription')}
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
              {/* Apply Literal AI styles to Card */}
              <Card className="h-full flex flex-col bg-card border border-lit-border hover:border-lit-pink transition-colors duration-300 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-card-foreground">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1 text-muted-foreground">
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
                   {/* Apply Literal AI styles to the link styled as button */}
                   <a
                     href={project.ctaLink}
                     className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full bg-lit-pink text-white hover:opacity-90 h-10 px-4 py-2" // Mimic Button styles + lit-pink
                   >
                     {project.ctaText}
                   </a>
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
