import React from "react"; // Asegurar que React esté importado
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useTranslation, Trans } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card"; // Usar alias correcto
import { Separator } from "@/lib/components/ui/separator"; // Usar alias correcto
import { Button } from "@/lib/components/ui/button"; // Usar alias correcto
import { Lock, DoorOpen, Gift, Clock, Loader2, UserPlus, LogIn } from "lucide-react";
import { useState, FormEvent } from "react"; // Importar FormEvent
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/lib/components/ui/dialog"; // Usar alias correcto
import { Input } from "@/lib/components/ui/input"; // Usar alias correcto
import { Label } from "@/lib/components/ui/label"; // Usar alias correcto

const KairosCreativeLandingPage = () => {
  const { t } = useTranslation();
  // Checkout states
  const [isCheckoutLoading, setIsCheckoutLoading] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  // Auth Modal states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo estado para confirmar contraseña
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null); // For success/error messages in modal

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Static calculator display - Uses the corrected translation key
  const staticCalculatorDisplay = t('kairosCreative.v2.hero.calculator.result');

  // --- URLs ---
  const newbiePriceId = "price_1RCuhgRfXEI83hj8vTf7ZLN3";
  // TODO: Get backend URLs from environment variables
  const backendUrl = "https://kairos-creative-webhook.onrender.com"; // Base URL for webhook server
  const createCheckoutSessionUrl = `${backendUrl}/create-checkout-session`;
  const registerUrl = `${backendUrl}/register`;
  const loginUrl = `${backendUrl}/login`;
  const chainlitAppUrl = "https://kairos-creative.vanguardhive.com/"; // URL de la app Chainlit

  // --- Handlers ---

  const handleCheckout = async (priceId: string) => {
    setIsCheckoutLoading(priceId); // Use dedicated loading state
    setCheckoutError(null); // Use dedicated error state
    console.log(`Initiating checkout for price ID: ${priceId}`);

    // --- ASOCIAR USUARIO LOGUEADO (SI EXISTE) ---
    const token = localStorage.getItem('sessionToken'); // NOTE: Still using sessionToken here, might need update if login uses jwtToken
    let userIdInternal: string | null = null; // Placeholder for Supabase user ID (UUID)
    let userEmailForCheckout: string | null = null; // Placeholder for user email

    // TODO: Decodificar token para obtener user_id/email si es necesario pasarlo
    // O mejor, el backend /create-checkout-session podría verificar el token si se envía
    // Por ahora, no pasamos user_id_internal ni user_email al checkout inicial.

    try {
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      // if (token) { // Opcional: Enviar token si existe
      //   headers['Authorization'] = `Bearer ${token}`;
      // }

      const response = await fetch(createCheckoutSessionUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            price_id: priceId,
            // user_id_internal: userIdInternal, // No lo pasamos por ahora
            // user_email: userEmailForCheckout // No lo pasamos por ahora
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const session = await response.json();
      console.log("Checkout session created:", session);

      if (session.checkout_url) {
        // Redirect the user to Stripe Checkout
        window.location.href = session.checkout_url;
      } else {
        throw new Error("Checkout URL not found in response.");
      }

    } catch (error) {
      console.error("Failed to create checkout session:", error);
      setCheckoutError(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
      setIsCheckoutLoading(null); // Clear loading state on error
    }
  };

  const handleAuthSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setAuthMessage(null); // Clear previous messages

    // Validación de contraseña para registro
    if (authMode === 'register' && password !== confirmPassword) {
      setAuthMessage("Passwords do not match.");
      return; // Detener envío
    }

    setIsAuthLoading(true);
    const url = authMode === 'register' ? registerUrl : loginUrl;
    const isLogin = authMode === 'login';

    console.log(`Attempting ${authMode} for ${email}...`);

    try {
        let response: Response;
        if (isLogin) {
            // FastAPI OAuth2PasswordRequestForm expects form data
            const formData = new URLSearchParams();
            formData.append('username', email); // Use email as username
            formData.append('password', password);
            response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
        } else {
            // Register uses JSON
            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Solo enviar email y password
            });
        }

      // Intentar parsear JSON incluso si la respuesta no es OK (para obtener 'detail')
      let data;
      try {
          data = await response.json();
      } catch (jsonError) {
          // Si no es JSON, usar el texto de estado
          throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }


      if (!response.ok) {
        const errorDetail = data.detail || `HTTP error! status: ${response.status}`;
        if (response.status === 400 && typeof errorDetail === 'string' && errorDetail.includes("Email already registered")) {
             setAuthMessage("This email is already registered. Please log in instead.");
             setAuthMode('login');
        } else {
             throw new Error(errorDetail);
        }
      } else {
          // Petición OK
          console.log(`LOGIN HANDLER: Response OK. Checking authMode: ${authMode}, isLogin: ${isLogin}`); // Mantener este log
          if (isLogin) {
            // Ya no necesitamos verificar data.access_token ni guardar en localStorage
            // La cookie HttpOnly se establece en el backend
            console.log("LOGIN HANDLER: Login request successful (200 OK). Cookie should be set by backend.");
            setAuthMessage("Login successful! Redirecting...");
            // Redirigir directamente
            setTimeout(() => {
              console.log("LOGIN HANDLER: Redirecting to Chainlit app...");
              window.location.href = chainlitAppUrl;
            }, 1500); // Mantener un pequeño delay para que el usuario vea el mensaje
          } else { // Bloque de Registro
            console.log("Registration successful:", data.message);
            setAuthMessage(data.message || "Registration successful! Please log in.");
            setAuthMode('login'); // Switch to login mode after successful registration
            // Limpiar campos después de registro exitoso
            setEmail('');
            setPassword('');
            setConfirmPassword('');
          }
      }

    } catch (error) {
      console.error(`Failed to ${authMode}:`, error);
      setAuthMessage(error instanceof Error ? error.message : `An unexpected error occurred during ${authMode}.`);
    } finally {
      setIsAuthLoading(false);
    }
  };


  return (
    // Base dark background and light text
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-background text-foreground"
    >
      <Helmet>
        <title>{t('kairosCreative.v2.meta.title')}</title>
        <meta name="description" content={t('kairosCreative.v2.meta.description')} />
      </Helmet>

       {/* Header with Login/Register Button */}
       <header className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-end container mx-auto">
         <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
           <DialogTrigger asChild>
             <Button variant="outline" className="text-white border-lit-pink hover:bg-lit-pink hover:text-black">
               Login / Register
             </Button>
           </DialogTrigger>
           <DialogContent className="sm:max-w-[425px] bg-card border-lit-border text-foreground">
             <DialogHeader>
               <DialogTitle>{authMode === 'login' ? 'Login' : 'Register'}</DialogTitle>
               <DialogDescription>
                 {authMode === 'login'
                   ? "Enter your email and password to access your account."
                   : "Create an account to start your free trial."}
               </DialogDescription>
             </DialogHeader>
             <form onSubmit={handleAuthSubmit}>
               <div className="grid gap-4 py-4">
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="email-auth" className="text-right">
                     Email
                   </Label>
                   <Input
                     id="email-auth"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     className="col-span-3 bg-input border-input-border"
                     autoComplete="email"
                   />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="password-auth" className="text-right">
                     Password
                   </Label>
                   <Input
                     id="password-auth"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     className="col-span-3 bg-input border-input-border"
                     autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
                   />
                 </div>
                 {/* Campo Confirmar Contraseña (solo para registro) */}
                 {authMode === 'register' && (
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="confirm-password-auth" className="text-right">
                       Confirm
                     </Label>
                     <Input
                       id="confirm-password-auth"
                       type="password"
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}
                       required
                       className="col-span-3 bg-input border-input-border"
                       autoComplete="new-password"
                     />
                   </div>
                 )}
                 {authMessage && (
                   <p className={`text-sm ${authMessage.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                     {authMessage}
                   </p>
                 )}
               </div>
               <DialogFooter className="sm:justify-between">
                 <Button
                   type="button"
                   variant="link"
                   className="text-lit-pink hover:text-opacity-80" // Clase de color rosa añadida
                   onClick={() => {
                     setAuthMode(authMode === 'login' ? 'register' : 'login');
                     setAuthMessage(null); // Clear message on mode switch
                     setEmail(''); // Clear fields on mode switch
                     setPassword('');
                     setConfirmPassword(''); // Clear confirm password field
                   }}
                 >
                   {authMode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
                 </Button>
                 <Button
                   type="submit"
                   disabled={isAuthLoading}
                   className="bg-lit-pink hover:bg-opacity-80 text-white"
                 >
                   {isAuthLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (authMode === 'login' ? <LogIn className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />)}
                   {authMode === 'login' ? 'Login' : 'Register'}
                 </Button>
               </DialogFooter>
             </form>
           </DialogContent>
         </Dialog>
       </header>

      {/* Section 1: Hero Section - Apply Literal AI Style Consistently */}
      <section className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden px-4 pt-16"> {/* Added pt-16 for header */}
         {/* Orbs with Literal AI colors */}
         <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-lit-blue to-lit-pink opacity-15 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] left-1/4 top-1/4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 opacity-10 blur-3xl" // Example secondary orb
            animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
         <div className="container mx-auto z-10 text-center">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              style={{ textShadow: '0 0 10px #FF00A9' }} // Use lit-pink hex for glow
              variants={fadeIn}
            >
              {t('kairosCreative.v2.hero.headline')}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              {t('kairosCreative.v2.hero.subheadline')}
            </motion.p>

            {/* Static Time Wasted Calculator Display - Use lit-pink */}
            <motion.div className="my-8 p-6 bg-black border border-lit-pink rounded-lg max-w-md mx-auto" variants={fadeIn}>
               <p className="text-white mb-2">{t('kairosCreative.v2.hero.calculator.text')}</p>
               <p className="text-2xl font-bold text-lit-pink">{staticCalculatorDisplay}</p>
            </motion.div>

            <motion.div variants={fadeIn}>
              {/* Style button with lit-pink */}
              {/* El botón principal ahora abre el modal de registro/login en lugar de ir a checkout */}
              <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-lit-pink hover:bg-opacity-80 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl border border-lit-pink"
                  >
                    {t('kairosCreative.v2.hero.mainCta')} {/* Ajustar texto si es necesario */}
                  </Button>
                </DialogTrigger>
                 {/* El DialogContent se define en el header */}
              </Dialog>
               {/* Use lit-pink text color */}
              <p className="text-lit-pink mt-4 text-sm font-semibold animate-pulse flex items-center justify-center">
                 <Clock className="h-4 w-4 mr-1" />
                 {t('kairosCreative.v2.hero.subCta')}
              </p>
            </motion.div>
         </div>
      </section>

      {/* Content Sections - Apply Literal AI style (lit-*) */}
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">

        {/* Section 2: The Problem */}
        <motion.section variants={fadeIn} className="bg-card p-8 md:p-12 rounded-lg border border-lit-border">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-lit-blue mb-8">
            {t('kairosCreative.v2.problem.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
             <Trans i18nKey="kairosCreative.v2.problem.p1">
                default <strong className="text-lit-pink">92%</strong> default <strong className="text-lit-pink">€5,200/year</strong> default
             </Trans>
          </p>
           {/* Visual placeholder */}
        </motion.section>

        <Separator className="bg-lit-border" />

        {/* Section 3: The Solution */}
        <motion.section variants={fadeIn} className="p-8 md:p-12 rounded-lg border border-lit-border bg-card">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
            {t('kairosCreative.v2.solution.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
            {t('kairosCreative.v2.solution.intro')}
          </p>
          <ul className="list-none space-y-3 text-lg md:text-xl text-muted-foreground mb-6">
            <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.solution.listItem1')}</li>
            <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.solution.listItem2')}</li>
            <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.solution.listItem3')}</li>
            <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.solution.listItem4')}</li>
          </ul>
           <p className="italic text-muted-foreground mb-6">
             <Trans i18nKey="kairosCreative.v2.solution.testimonial">
                <span className="font-bold">default</span> default
             </Trans>
           </p>
           {/* Removed outro paragraph */}
           {/* Visual placeholder */}
        </motion.section>

        <Separator className="bg-lit-border" />

         {/* Section 4: The Numbers Don’t Lie */}
         <motion.section variants={fadeIn} className="bg-card p-8 md:p-12 rounded-lg border border-lit-border">
           <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
             {t('kairosCreative.v2.numbers.title')}
           </h2>
           <div className="space-y-4 text-lg md:text-xl text-muted-foreground">
             <p><Trans i18nKey="kairosCreative.v2.numbers.item1"><strong className="text-lit-blue">0</strong><strong className="text-lit-pink">1</strong></Trans></p>
             <p><Trans i18nKey="kairosCreative.v2.numbers.item2"><strong className="text-lit-blue">0</strong><strong className="text-lit-pink">1</strong></Trans></p>
             <p><Trans i18nKey="kairosCreative.v2.numbers.item3"><strong className="text-lit-blue">0</strong><strong className="text-lit-pink">1</strong></Trans></p>
             <p><Trans i18nKey="kairosCreative.v2.numbers.item4"><strong className="text-lit-blue">0</strong></Trans></p>
           </div>
            {/* Visual placeholder */}
         </motion.section>

        <Separator className="bg-lit-border" />

        {/* Section 5: Social Proof */}
        <motion.section variants={fadeIn} className="p-8 md:p-12 rounded-lg bg-background">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {t('kairosCreative.v2.socialProof.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-card text-card-foreground border border-lit-pink p-6">
              <p className="italic mb-4">
                <Trans i18nKey="kairosCreative.v2.socialProof.testimonial1">
                  <span className="font-bold">default</span> default
                </Trans>
              </p>
              <p className="text-right font-semibold">– Maria, Freelance Designer, New York.</p>
            </Card>
            <Card className="bg-card text-card-foreground border border-lit-pink p-6">
              <p className="italic mb-4">
                <Trans i18nKey="kairosCreative.v2.socialProof.testimonial2">
                  <span className="font-bold">default</span> default
                </Trans>
              </p>
              <p className="text-right font-semibold">– SparkVibe Studio Team, Los Angeles.</p>
            </Card>
          </div>
          <div className="text-center p-4 bg-black border border-lit-pink rounded">
            <p className="text-xl md:text-2xl font-bold text-lit-pink">
              {t('kairosCreative.v2.socialProof.stat')}
            </p>
          </div>
        </motion.section>

        <Separator className="bg-lit-border" />

        {/* Section 6: Exclusivity + Urgency */}
        {/* Modificado: El botón principal ahora abre el modal */}
        <motion.section variants={fadeIn} className="p-8 md:p-12 rounded-lg text-center border border-lit-border bg-card">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t('kairosCreative.v2.exclusivity.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed max-w-3xl mx-auto">
            {t('kairosCreative.v2.exclusivity.intro')}
          </p>
          <ul className="list-none space-y-3 text-lg md:text-xl text-muted-foreground mb-6 inline-block text-left">
             <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.exclusivity.listItem1')}</li>
             <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.exclusivity.listItem2')}</li>
             <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-lit-pink before:font-bold">{t('kairosCreative.v2.exclusivity.listItem3')}</li>
          </ul>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
             <Trans i18nKey="kairosCreative.v2.exclusivity.outro">
               default <span className="text-lit-pink italic">sourpuss</span> default
             </Trans>
          </p>
           {/* Visual placeholder */}
           <p className="text-2xl font-bold text-lit-pink mb-8 animate-pulse">
             {t('kairosCreative.v2.exclusivity.counter')}
           </p>
           {/* Este botón ahora abre el modal */}
           <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
             <DialogTrigger asChild>
               <Button
                 size="lg"
                 className="bg-lit-pink hover:bg-opacity-80 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl border border-lit-pink"
               >
                 {t('kairosCreative.v2.exclusivity.mainCta')}
               </Button>
             </DialogTrigger>
             {/* El DialogContent se define en el header */}
           </Dialog>
           <p className="text-lit-pink mt-4 text-sm font-semibold animate-pulse flex items-center justify-center">
              <Clock className="h-4 w-4 mr-1" />
              {t('kairosCreative.v2.exclusivity.subCta')}
           </p>
        </motion.section>

        <Separator className="bg-lit-border" />

        {/* Section 7: Post-CTA */}
        {/* Modificado: El botón principal ahora abre el modal */}
        <motion.section variants={fadeIn} className="bg-card p-8 md:p-12 rounded-lg text-center border border-lit-border">
           <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
             {t('kairosCreative.v2.postCta.title')}
           </h2>
           <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
             {t('kairosCreative.v2.postCta.text')}
           </p>
           <div className="flex justify-center">
             <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
               <DialogTrigger asChild>
                 <Button
                   size="lg"
                   className="bg-lit-pink hover:bg-opacity-80 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl border border-lit-pink"
                 >
                   {t('kairosCreative.v2.postCta.combinedCta')}
                 </Button>
               </DialogTrigger>
               {/* El DialogContent se define en el header */}
             </Dialog>
           </div>
        </motion.section>

        {/* Section 8: Bonus - REMOVED */}

        {/* Display Checkout Error Message */}
        {checkoutError && (
          <motion.div
            className="mt-4 p-4 bg-red-900 border border-red-700 text-red-100 rounded-md text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>Checkout Error: {checkoutError}</p>
          </motion.div>
        )}

      </div>

      {/* Footer - Simplified version from pitch, styled */}
       <footer className="bg-black py-8 text-white border-t border-lit-border">
         <div className="container mx-auto px-4 text-center">
           <div className="mb-4 text-lit-pink text-2xl font-bold">{t('kairosCreative.v2.hero.title')}</div>
           {/* Removed the div containing the links */}
           {/* Add Social Media Icons here if needed */}
           <p className="text-sm text-muted-foreground">{t('kairosCreative.v2.footer.copyright')}</p>
         </div>
       </footer>
    </motion.div>
  );
};

export default KairosCreativeLandingPage;
