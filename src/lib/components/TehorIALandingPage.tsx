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
import { useTranslation, Trans } from 'react-i18next';
import {
  ArrowRight,
  Loader2,
  MessageSquare,
  Music,
  Wand2,
  Zap,
  Code,
  Sparkles,
  Brain,
  Headphones,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Card, CardContent } from "@/lib/components/ui/card";
import { Badge } from "@/lib/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/lib/components/ui/dialog";

const TehorIALandingPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: t('contact.form.name.error') }),
    email: z.string().email({ message: t('contact.form.email.error') }),
    message: z.string()
               .min(10, { message: t('contact.form.message.error.min') })
               .max(500, { message: t('contact.form.message.error.max', { count: 500 }) }),
  });

  type TehoriaFormValues = z.infer<typeof formSchema>;

  const form = useForm<TehoriaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: TehoriaFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, formType: 'tehoria-beta' }),
      });
      const result = await response.json();
      if (response.ok) {
        toast({
          title: t('tehoria.beta.toast.success.title'),
          description: t('tehoria.beta.toast.success.description'),
        });
        form.reset();
      } else {
        throw new Error(result.error || t('tehoria.beta.toast.error.description'));
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: t('tehoria.beta.toast.error.title'),
        description: error instanceof Error ? error.message : t('tehoria.beta.toast.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariant = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

  return (
    // Use bg-background (very dark gray)
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('tehoria.meta.title')}</title>
        <meta name="description" content={t('tehoria.meta.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative w-full min-h-[800px] bg-background text-foreground flex items-center justify-center overflow-hidden">
        {/* Orbs with Literal AI colors */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-lit-blue to-lit-pink opacity-15 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
         <motion.div
          className="absolute w-[400px] h-[400px] left-1/4 top-1/4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 opacity-10 blur-3xl" // Keep some original colors?
          animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              {/* Use accent color */}
              <span className="inline-block text-lit-pink font-medium mb-2 tracking-wider">
                {t('tehoria.hero.pretitle')}
              </span>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
              initial="hidden" animate="visible" variants={fadeIn}
            >
              {t('tehoria.hero.title')}
            </motion.h1>
            <motion.p
              className="text-2xl text-lit-blue mb-4 font-semibold" // Use accent color
              initial="hidden" animate="visible" variants={fadeIn}
            >
              {t('tehoria.hero.subtitle')}
            </motion.p>
            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" // Use muted color
              initial="hidden" animate="visible" variants={fadeIn}
            >
              {t('tehoria.hero.description')}
            </motion.p>
            <motion.div
              initial="hidden" animate="visible" variants={fadeIn}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Style button with accent color */}
              <Button
                size="lg"
                className="bg-lit-pink hover:bg-opacity-80 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl border-0"
                onClick={() => document.getElementById("beta-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t('tehoria.hero.cta.join')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {/* Style outline button */}
              <Button
                size="lg" variant="outline"
                className="border-lit-blue text-lit-blue hover:bg-lit-blue/10 px-8 py-6 text-lg rounded-md transition-all duration-300"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t('tehoria.hero.cta.discover')}
              </Button>
            </motion.div>
            {/* Style badges */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-3"
              initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.4 }}
            >
              <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1.5">{t('tehoria.hero.badge.engine')}</Badge>
              <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1.5">{t('tehoria.hero.badge.ai')}</Badge>
              <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1.5">{t('tehoria.hero.badge.plugins')}</Badge>
            </motion.div>
          </div>
        </div>
        {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div> */}
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-8 lg:px-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-sm font-medium text-lit-pink mr-2">{t('tehoria.features.sectionPretitle')}</span>
              <div className="h-px w-8 bg-lit-pink"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t('tehoria.features.sectionTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('tehoria.features.sectionDescription')}</p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {/* Style Cards */}
            <motion.div variants={itemVariant}>
              <Card className="h-full border border-lit-border bg-card shadow-lg hover:border-lit-pink transition-colors duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <MessageSquare className="h-12 w-12 text-lit-blue mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-card-foreground">{t('tehoria.features.card1.title')}</h3>
                  <p className="text-muted-foreground">{t('tehoria.features.card1.description')}</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariant}>
              <Card className="h-full border border-lit-border bg-card shadow-lg hover:border-lit-pink transition-colors duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Music className="h-12 w-12 text-lit-pink mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-card-foreground">{t('tehoria.features.card2.title')}</h3>
                  <p className="text-muted-foreground">{t('tehoria.features.card2.description')}</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariant}>
              <Card className="h-full border border-lit-border bg-card shadow-lg hover:border-lit-pink transition-colors duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Wand2 className="h-12 w-12 text-lit-blue mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-card-foreground">{t('tehoria.features.card3.title')}</h3>
                  <p className="text-muted-foreground">{t('tehoria.features.card3.description')}</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-card"> {/* Use card background */}
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-sm font-medium text-lit-pink mr-2">{t('tehoria.problem.sectionPretitle')}</span>
              <div className="h-px w-8 bg-lit-pink"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t('tehoria.problem.sectionTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('tehoria.problem.sectionDescription')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-lit-blue/10 p-3 rounded-full"><Zap className="h-6 w-6 text-lit-blue" /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{t('tehoria.problem.item1.title')}</h3>
                    <p className="text-muted-foreground">{t('tehoria.problem.item1.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-lit-pink/10 p-3 rounded-full"><Brain className="h-6 w-6 text-lit-pink" /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{t('tehoria.problem.item2.title')}</h3>
                    <p className="text-muted-foreground">{t('tehoria.problem.item2.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-lit-blue/10 p-3 rounded-full"><Sparkles className="h-6 w-6 text-lit-blue" /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{t('tehoria.problem.item3.title')}</h3>
                    <p className="text-muted-foreground">{t('tehoria.problem.item3.description')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Demo Mockup */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative">
              <div className="aspect-video w-full bg-background rounded-xl shadow-2xl overflow-hidden border border-lit-border">
                <div className="absolute inset-0 flex flex-col p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                    <div className="text-xs text-muted-foreground">{t('tehoria.demo.windowTitle')}</div>
                  </div>
                  <div className="flex-1 bg-card/80 rounded-lg p-4 overflow-hidden"> {/* Use card background */}
                    <div className="flex flex-col h-full">
                      <div className="flex-1 overflow-y-auto space-y-4">
                        <div className="flex items-start"><div className="bg-background rounded-lg p-3 max-w-[80%]"><p className="text-muted-foreground text-sm">{t('tehoria.demo.user1')}</p></div></div>
                        <div className="flex items-start justify-end"><div className="bg-lit-blue/20 rounded-lg p-3 max-w-[80%]"><p className="text-lit-blue text-sm">{t('tehoria.demo.ai1')}</p></div></div>
                        <div className="flex items-start"><div className="bg-background rounded-lg p-3 max-w-[80%]"><p className="text-muted-foreground text-sm">{t('tehoria.demo.user2')}</p></div></div>
                        <div className="flex items-start justify-end"><div className="bg-lit-blue/20 rounded-lg p-3 max-w-[80%]">
                          <Trans i18nKey="tehoria.demo.ai2">
                            <p className="text-lit-blue text-sm">default</p>
                            <ul className="list-disc list-inside text-lit-blue text-sm mt-2"><li>default</li><li>default</li><li>default</li></ul>
                            <p className="text-lit-blue text-sm mt-2">default</p>
                          </Trans>
                        </div></div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <input type="text" className="flex-1 bg-background border border-lit-border rounded-lg px-4 py-2 text-foreground text-sm" placeholder={t('tehoria.demo.inputPlaceholder')} />
                        <button className="ml-2 bg-lit-pink p-2 rounded-lg"><ArrowRight className="h-4 w-4 text-white" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-4"><span className="text-sm font-medium text-lit-pink mr-2">{t('tehoria.status.sectionPretitle')}</span><div className="h-px w-8 bg-lit-pink"></div></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t('tehoria.status.sectionTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('tehoria.status.sectionDescription')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Style Cards */}
            <Card className="bg-card border border-lit-border"><CardContent className="p-6"><h3 className="text-xl font-bold mb-4 text-card-foreground">{t('tehoria.status.card1.title')}</h3><div className="space-y-4"><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card1.item1.label')}</span><span className="text-sm text-lit-blue">96%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-blue h-2 rounded-full" style={{ width: "96%" }}></div></div></div><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card1.item2.label')}</span><span className="text-sm text-lit-blue">100%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-blue h-2 rounded-full" style={{ width: "100%" }}></div></div></div><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card1.item3.label')}</span><span className="text-sm text-lit-blue">100%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-blue h-2 rounded-full" style={{ width: "100%" }}></div></div></div></div></CardContent></Card>
            <Card className="bg-card border border-lit-border"><CardContent className="p-6"><h3 className="text-xl font-bold mb-4 text-card-foreground">{t('tehoria.status.card2.title')}</h3><div className="space-y-4"><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card2.item1.label')}</span><span className="text-sm text-lit-pink">100%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-pink h-2 rounded-full" style={{ width: "100%" }}></div></div></div><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card2.item2.label')}</span><span className="text-sm text-lit-pink">100%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-pink h-2 rounded-full" style={{ width: "100%" }}></div></div></div><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card2.item3.label')}</span><span className="text-sm text-lit-pink">72%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-pink h-2 rounded-full" style={{ width: "72%" }}></div></div></div></div></CardContent></Card>
            <Card className="bg-card border border-lit-border"><CardContent className="p-6"><h3 className="text-xl font-bold mb-4 text-card-foreground">{t('tehoria.status.card3.title')}</h3><div className="space-y-4"><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card3.item1.label')}</span><span className="text-sm text-lit-blue">100%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-blue h-2 rounded-full" style={{ width: "100%" }}></div></div></div><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card3.item2.label')}</span><span className="text-sm text-lit-blue">65%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-blue h-2 rounded-full" style={{ width: "65%" }}></div></div></div><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card3.item3.label')}</span><span className="text-sm text-lit-blue">92%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-blue h-2 rounded-full" style={{ width: "92%" }}></div></div></div></div></CardContent></Card>
            <Card className="bg-card border border-lit-border"><CardContent className="p-6"><h3 className="text-xl font-bold mb-4 text-card-foreground">{t('tehoria.status.card4.title')}</h3><div className="space-y-4"><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card4.item1.label')}</span><span className="text-sm text-lit-pink">98%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-pink h-2 rounded-full" style={{ width: "98%" }}></div></div></div><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card4.item2.label')}</span><span className="text-sm text-lit-pink">99%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-pink h-2 rounded-full" style={{ width: "99%" }}></div></div></div><div><div className="flex justify-between mb-1"><span className="text-sm text-muted-foreground">{t('tehoria.status.card4.item3.label')}</span><span className="text-sm text-lit-pink">15%</span></div><div className="w-full bg-lit-border rounded-full h-2"><div className="bg-lit-pink h-2 rounded-full" style={{ width: "15%" }}></div></div></div></div></CardContent></Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-card"> {/* Use card background */}
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center"><div className="flex items-center justify-center mb-4"><span className="text-sm font-medium text-lit-blue mr-2">{t('tehoria.usecases.sectionPretitle')}</span><div className="h-px w-8 bg-lit-blue"></div></div><h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t('tehoria.usecases.sectionTitle')}</h2><p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('tehoria.usecases.sectionDescription')}</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Style Cards */}
            <Card className="bg-background border border-lit-border overflow-hidden"><CardContent className="p-0"><div className="bg-gradient-to-r from-lit-blue/10 to-lit-pink/10 p-6"><h3 className="text-2xl font-bold mb-2 text-foreground">{t('tehoria.usecases.card1.title')}</h3><p className="text-muted-foreground mb-4">{t('tehoria.usecases.card1.description')}</p></div><div className="p-6 space-y-4"><div className="flex items-start space-x-3"><Headphones className="h-5 w-5 text-lit-blue mt-0.5" /><p className="text-muted-foreground">{t('tehoria.usecases.card1.item1')}</p></div><div className="flex items-start space-x-3"><Headphones className="h-5 w-5 text-lit-blue mt-0.5" /><p className="text-muted-foreground">{t('tehoria.usecases.card1.item2')}</p></div><div className="flex items-start space-x-3"><Headphones className="h-5 w-5 text-lit-blue mt-0.5" /><p className="text-muted-foreground">{t('tehoria.usecases.card1.item3')}</p></div></div></CardContent></Card>
            <Card className="bg-background border border-lit-border overflow-hidden"><CardContent className="p-0"><div className="bg-gradient-to-r from-lit-pink/10 to-purple-600/10 p-6"><h3 className="text-2xl font-bold mb-2 text-foreground">{t('tehoria.usecases.card2.title')}</h3><p className="text-muted-foreground mb-4">{t('tehoria.usecases.card2.description')}</p></div><div className="p-6 space-y-4"><div className="flex items-start space-x-3"><Code className="h-5 w-5 text-lit-pink mt-0.5" /><p className="text-muted-foreground">{t('tehoria.usecases.card2.item1')}</p></div><div className="flex items-start space-x-3"><Code className="h-5 w-5 text-lit-pink mt-0.5" /><p className="text-muted-foreground">{t('tehoria.usecases.card2.item2')}</p></div><div className="flex items-start space-x-3"><Code className="h-5 w-5 text-lit-pink mt-0.5" /><p className="text-muted-foreground">{t('tehoria.usecases.card2.item3')}</p></div></div></CardContent></Card>
          </div>
        </div>
      </section>

      {/* Beta Form Section */}
      <section id="beta-form" className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-background to-card"> {/* Gradient from dark gray to lighter dark gray */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="mb-8"><h2 className="text-4xl font-bold mb-4 text-foreground">{t('tehoria.beta.title')}</h2><p className="text-lg text-muted-foreground mb-6">{t('tehoria.beta.description')}</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {/* Style Badges */}
                <Badge className="bg-lit-blue/10 text-lit-blue border border-lit-blue/30 px-3 py-1.5">{t('tehoria.beta.badge1')}</Badge>
                <Badge className="bg-lit-pink/10 text-lit-pink border border-lit-pink/30 px-3 py-1.5">{t('tehoria.beta.badge2')}</Badge>
                <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1.5">{t('tehoria.beta.badge3')}</Badge>
              </div>
            </div>
            <Card className="border border-lit-border bg-card shadow-lg">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel className="text-card-foreground">{t('tehoria.beta.form.name.label')}</FormLabel><FormControl><Input placeholder={t('tehoria.beta.form.name.placeholder')} className="bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel className="text-card-foreground">{t('tehoria.beta.form.email.label')}</FormLabel><FormControl><Input type="email" placeholder={t('tehoria.beta.form.email.placeholder')} className="bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel className="text-card-foreground">{t('tehoria.beta.form.message.label')}</FormLabel><FormControl><Textarea placeholder={t('tehoria.beta.form.message.placeholder')} className="min-h-32 bg-background border-lit-border focus:border-lit-pink focus:ring-lit-pink" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit" className="w-full bg-gradient-to-r from-lit-blue to-lit-pink hover:opacity-90 text-white border-0" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t('tehoria.beta.form.submit.submitting')}</>) : (t('tehoria.beta.form.submit.default'))}
                    </Button>
                  </form>
                </Form>
                <p className="text-sm text-center text-muted-foreground mt-4">{t('tehoria.beta.form.disclaimer')}</p>
              </CardContent>
            </Card>
          </div>
          {/* Video Section */}
          <div className="flex items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <div className="aspect-video w-full bg-gradient-to-br from-lit-blue/10 to-lit-pink/10 rounded-xl shadow-2xl overflow-hidden border border-lit-border relative cursor-pointer group">
                  <div className="absolute inset-0 flex items-center justify-center"><div className="text-foreground text-center p-8 z-10"><h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lit-blue to-lit-pink">{t('tehoria.video.title')}</h3><p className="mb-6 text-muted-foreground max-w-md mx-auto">{t('tehoria.video.description')}</p><div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-lit-blue to-lit-pink transition-all duration-300 group-hover:scale-110 shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></div></div></div>
                  {/* <div className="absolute top-0 left-0 w-full h-full opacity-5 pattern-class"></div> */}
                  <motion.div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-lit-blue to-lit-pink opacity-15 blur-3xl" animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                </div>
              </DialogTrigger>
              <DialogContent className="w-[80vw] max-w-[80vw] h-[80vh] max-h-[80vh] p-0 bg-black border-lit-border overflow-hidden flex items-center justify-center">
                <div className="w-full h-full"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/m5913fGfVGw?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 border-t border-lit-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <div className="text-3xl font-bold mb-2 text-lit-pink">T</div>
              <div className="text-xl font-semibold text-foreground">{t('tehoria.hero.title')}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">{t('tehoria.footer.link')}</a>
            </div>
          </div>
          <div className="border-t border-lit-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-muted-foreground mb-4 md:mb-0">{t('tehoria.footer.copyright')}</div>
              <div className="text-sm text-muted-foreground">{t('tehoria.footer.tagline')}</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TehorIALandingPage;
