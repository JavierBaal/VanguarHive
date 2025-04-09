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
import { useTranslation } from 'react-i18next'; // Import useTranslation

// Schema will be defined inside the component to use translations


interface ContactSectionProps {
  className?: string;
  defaultProduct?: string; // Add prop for default product/context
}

const ContactSection: React.FC<ContactSectionProps> = ({ className = "", defaultProduct = "" }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const { toast } = useToast(); // Initialize toast
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading

  // 1. Define Zod schema inside the component to use t()
  const formSchema = z.object({
    name: z.string().min(2, { message: t('contact.form.name.error') }),
    email: z.string().email({ message: t('contact.form.email.error') }),
    project: z.string().optional(), // Project selection is optional or allow empty
    message: z.string()
               .min(10, { message: t('contact.form.message.error.min') })
               .max(1000, { message: t('contact.form.message.error.max') }),
  });

  type ContactFormValues = z.infer<typeof formSchema>;

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
          title: t('contact.toast.success.title'),
          description: t('contact.toast.success.description'),
        });
        form.reset({ name: "", email: "", project: defaultProduct, message: "" }); // Reset form on success, keeping defaultProduct if set
      } else {
        throw new Error(result.error || t('contact.toast.error.description'));
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: t('contact.toast.error.title'),
        description: error instanceof Error ? error.message : t('contact.toast.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    // Use bg-background (now very dark gray)
    <section
      className={`py-20 px-4 md:px-8 lg:px-16 bg-background ${className}`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
           {/* Title uses foreground (light) */}
          <h2 className="text-4xl font-bold mb-4 text-foreground">{t('contact.sectionTitle')}</h2>
           {/* Description uses muted-foreground (adjust if needed) */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.sectionDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
             {/* Use bg-card (now dark gray), use lit-border */}
            <Card className="bg-card border border-lit-border shadow-lg">
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
                          <FormLabel className="text-card-foreground">{t('contact.form.name.label')}</FormLabel>
                          <FormControl>
                             {/* Use bg-background (very dark) for input, lit-border, focus on lit-pink */}
                            <Input placeholder={t('contact.form.name.placeholder')} className="mt-1 bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage /> {/* Error messages are now translated via schema */}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">{t('contact.form.email.label')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder={t('contact.form.email.placeholder')} className="mt-1 bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage /> {/* Error messages are now translated via schema */}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="project"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">{t('contact.form.project.label')} <span className="text-muted-foreground text-xs">{t('contact.form.project.optional')}</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || defaultProduct} disabled={isSubmitting}>
                            <FormControl>
                              <SelectTrigger className="mt-1 bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink">
                                <SelectValue placeholder={t('contact.form.project.placeholder')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-lit-border">
                              {/* Add Kairos Creative if defaultProduct is set to it */}
                              {defaultProduct === "Kairos Creative Interest" && (
                                <SelectItem value="Kairos Creative Interest">{t('contact.form.project.option.kairosCreative')}</SelectItem>
                              )}
                              <SelectItem value="TehorIA Beta">{t('contact.form.project.option.tehoriaBeta')}</SelectItem>
                              <SelectItem value="Kairos Jurista Beta">{t('contact.form.project.option.kairosJuristaBeta')}</SelectItem>
                              <SelectItem value="General Inquiry">{t('contact.form.project.option.general')}</SelectItem>
                              <SelectItem value="Partnership">{t('contact.form.project.option.partnership')}</SelectItem>
                              <SelectItem value="Other">{t('contact.form.project.option.other')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage /> {/* Error messages are now translated via schema */}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">{t('contact.form.message.label')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t('contact.form.message.placeholder')}
                              className="mt-1 min-h-32 bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage /> {/* Error messages are now translated via schema */}
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-lit-pink hover:bg-opacity-80 text-white" size="lg" disabled={isSubmitting}>
                       {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('contact.form.submit.submitting')}
                        </>
                      ) : (
                        t('contact.form.submit.default')
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="h-full bg-card border border-lit-border shadow-lg">
              <CardContent className="p-6 flex flex-col justify-center h-full space-y-8">
                <div className="text-2xl font-semibold mb-6 text-card-foreground">
                  {t('contact.info.title')}
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-lit-pink mt-1" />
                    <div>
                      <h3 className="font-medium text-card-foreground">{t('contact.info.email.label')}</h3>
                      <a
                        href="mailto:info@vanguardhive.com" // Keep email address static
                        className="text-lit-pink hover:opacity-80"
                      >
                        info@vanguardhive.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Linkedin className="h-6 w-6 text-lit-pink mt-1" />
                    <div>
                      <h3 className="font-medium text-card-foreground">{t('contact.info.linkedin.label')}</h3>
                      <a
                        href="https://linkedin.com/in/javier-baal" // Keep URL static
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lit-pink hover:opacity-80"
                      >
                        {t('contact.info.linkedin.value')}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-lit-border">
                  <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                    {t('contact.join.title')}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-lit-pink/10 text-lit-pink rounded-full text-sm">
                      {t('contact.join.tag.creativity')}
                    </span>
                    <span className="px-3 py-1 bg-lit-pink/10 text-lit-pink rounded-full text-sm">
                      {t('contact.join.tag.ai')}
                    </span>
                    <span className="px-3 py-1 bg-lit-pink/10 text-lit-pink rounded-full text-sm">
                      {t('contact.join.tag.disruption')}
                    </span>
                    <span className="px-3 py-1 bg-lit-pink/10 text-lit-pink rounded-full text-sm">
                      {t('contact.join.tag.hive')}
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
