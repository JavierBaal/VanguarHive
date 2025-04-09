import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Textarea } from "@/lib/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import { useToast } from "@/lib/components/ui/use-toast";
import { useTranslation } from 'react-i18next';
import { ArrowRight, Scale, Clock, Shield, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/lib/components/ui/card";

const KairosJuristaLandingPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: t('contact.form.name.error') }),
    company: z.string().min(2, { message: t('kairosJurista.beta.form.company.error') }),
    email: z.string().email({ message: t('contact.form.email.error') }),
    phone: z.string().optional(),
    message: z.string()
               .min(10, { message: t('contact.form.message.error.min') })
               .max(500, { message: t('contact.form.message.error.max', { count: 500 }) }),
  });

  type KairosFormValues = z.infer<typeof formSchema>;

  const form = useForm<KairosFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", company: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (values: KairosFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, formType: 'kairos-beta' }),
      });
      const result = await response.json();
      if (response.ok) {
        toast({
          title: t('kairosJurista.beta.toast.success.title'),
          description: t('kairosJurista.beta.toast.success.description'),
        });
        form.reset();
      } else {
        throw new Error(result.error || t('kairosJurista.beta.toast.error.description'));
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: t('kairosJurista.beta.toast.error.title'),
        description: error instanceof Error ? error.message : t('kairosJurista.beta.toast.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    // Use bg-background (very dark gray)
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('kairosJurista.meta.title')}</title>
        <meta name="description" content={t('kairosJurista.meta.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative w-full min-h-[800px] bg-background text-foreground flex items-center justify-center overflow-hidden">
        {/* Orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-lit-blue to-lit-pink opacity-15 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <span className="inline-block text-lit-blue font-medium mb-2">{t('kairosJurista.hero.pretitle')}</span>
            </motion.div>
            <motion.h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight" initial="hidden" animate="visible" variants={fadeIn}>
              {t('kairosJurista.hero.title')}
            </motion.h1>
            <motion.p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" initial="hidden" animate="visible" variants={fadeIn}>
              {t('kairosJurista.hero.description')}
            </motion.p>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              {/* Style button */}
              <Button
                size="lg"
                className="bg-lit-pink hover:bg-opacity-80 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById("beta-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t('kairosJurista.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
        {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div> */}
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t('kairosJurista.benefits.sectionTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('kairosJurista.benefits.sectionDescription')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Style Cards */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card className="h-full bg-card border border-lit-border shadow-lg hover:border-lit-blue transition-colors duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Scale className="h-12 w-12 text-lit-blue mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-card-foreground">{t('kairosJurista.benefits.card1.title')}</h3>
                  <p className="text-muted-foreground">{t('kairosJurista.benefits.card1.description')}</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="h-full bg-card border border-lit-border shadow-lg hover:border-lit-blue transition-colors duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Clock className="h-12 w-12 text-lit-blue mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-card-foreground">{t('kairosJurista.benefits.card2.title')}</h3>
                  <p className="text-muted-foreground">{t('kairosJurista.benefits.card2.description')}</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Card className="h-full bg-card border border-lit-border shadow-lg hover:border-lit-blue transition-colors duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Shield className="h-12 w-12 text-lit-blue mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-card-foreground">{t('kairosJurista.benefits.card3.title')}</h3>
                  <p className="text-muted-foreground">{t('kairosJurista.benefits.card3.description')}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-card"> {/* Use card background */}
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t('kairosJurista.features.sectionTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('kairosJurista.features.sectionDescription')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-lit-blue/10 p-3 rounded-full"><CheckCircle className="h-6 w-6 text-lit-blue" /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{t('kairosJurista.features.item1.title')}</h3>
                    <p className="text-muted-foreground">{t('kairosJurista.features.item1.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-lit-blue/10 p-3 rounded-full"><CheckCircle className="h-6 w-6 text-lit-blue" /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{t('kairosJurista.features.item2.title')}</h3>
                    <p className="text-muted-foreground">{t('kairosJurista.features.item2.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-lit-blue/10 p-3 rounded-full"><CheckCircle className="h-6 w-6 text-lit-blue" /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{t('kairosJurista.features.item3.title')}</h3>
                    <p className="text-muted-foreground">{t('kairosJurista.features.item3.description')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative">
              {/* Style MVP section */}
              <div className="aspect-video bg-gradient-to-br from-lit-blue/20 to-lit-pink/20 rounded-xl shadow-2xl overflow-hidden border border-lit-border">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-foreground text-center p-8">
                    <h3 className="text-2xl font-bold mb-4">{t('kairosJurista.mvp.title')}</h3>
                    <p className="mb-6 text-muted-foreground">{t('kairosJurista.mvp.description')}</p>
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 cursor-pointer hover:bg-white/20 transition-colors">
                      <ArrowRight className="h-6 w-6 text-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beta Form Section */}
      <section id="beta-form" className="py-20 px-4 md:px-8 lg:px-16 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">{t('kairosJurista.beta.title')}</h2>
            <p className="text-lg text-muted-foreground">{t('kairosJurista.beta.description')}</p>
          </div>
          <Card className="bg-card border border-lit-border shadow-lg">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel className="text-card-foreground">{t('kairosJurista.beta.form.name.label')}</FormLabel><FormControl><Input placeholder={t('kairosJurista.beta.form.name.placeholder')} className="mt-1 bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="company" render={({ field }) => (<FormItem><FormLabel className="text-card-foreground">{t('kairosJurista.beta.form.company.label')}</FormLabel><FormControl><Input placeholder={t('kairosJurista.beta.form.company.placeholder')} className="mt-1 bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel className="text-card-foreground">{t('kairosJurista.beta.form.email.label')}</FormLabel><FormControl><Input type="email" placeholder={t('kairosJurista.beta.form.email.placeholder')} className="mt-1 bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel className="text-card-foreground">{t('kairosJurista.beta.form.phone.label')} <span className="text-muted-foreground text-xs">{t('kairosJurista.beta.form.phone.optional')}</span></FormLabel><FormControl><Input placeholder={t('kairosJurista.beta.form.phone.placeholder')} className="mt-1 bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel className="text-card-foreground">{t('kairosJurista.beta.form.message.label')}</FormLabel><FormControl><Textarea placeholder={t('kairosJurista.beta.form.message.placeholder')} className="min-h-32 mt-1 bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="submit" className="w-full bg-lit-pink hover:bg-opacity-80 text-white" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t('kairosJurista.beta.form.submit.submitting')}</>) : (t('kairosJurista.beta.form.submit.default'))}
                  </Button>
                </form>
              </Form>
              <p className="text-sm text-center text-muted-foreground mt-4">{t('kairosJurista.beta.form.disclaimer')}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t border-lit-border"> {/* Use card background */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <div className="text-3xl font-bold mb-2 text-lit-blue">K</div> {/* Accent color */}
              <div className="text-xl font-semibold text-foreground">{t('kairosJurista.hero.title')}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">{t('kairosJurista.footer.link')}</a>
            </div>
          </div>
          <div className="border-t border-lit-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-muted-foreground mb-4 md:mb-0">{t('kairosJurista.footer.copyright')}</div>
              <div className="text-sm text-muted-foreground">{t('kairosJurista.footer.tagline')}</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KairosJuristaLandingPage;
