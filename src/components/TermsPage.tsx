import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '@/lib/components/Footer'; // Corregido a importación por defecto
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/components/ui/card'; // Corregida la ruta a /lib/components/ui/

export const TermsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <Card className="bg-card text-card-foreground border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">{t('terms.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-foreground">{t('terms.introduction.title')}</h2>
              <p>{t('terms.introduction.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-foreground">{t('terms.definitions.title')}</h2>
              <p>{t('terms.definitions.content')}</p>
              {/* Añadir más definiciones si es necesario */}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-foreground">{t('terms.useOfService.title')}</h2>
              <p>{t('terms.useOfService.content')}</p>
              {/* Añadir más detalles sobre el uso */}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-foreground">{t('terms.intellectualProperty.title')}</h2>
              <p>{t('terms.intellectualProperty.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-foreground">{t('terms.userContent.title')}</h2>
              <p>{t('terms.userContent.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-foreground">{t('terms.termination.title')}</h2>
              <p>{t('terms.termination.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-foreground">{t('terms.disclaimers.title')}</h2>
              <p>{t('terms.disclaimers.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-foreground">{t('terms.limitationOfLiability.title')}</h2>
              <p>{t('terms.limitationOfLiability.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-foreground">{t('terms.governingLaw.title')}</h2>
              <p>{t('terms.governingLaw.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-foreground">{t('terms.changes.title')}</h2>
              <p>{t('terms.changes.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-foreground">{t('terms.contact.title')}</h2>
              <p>{t('terms.contact.content')}</p>
            </section>

            <p className="text-sm italic mt-8">{t('terms.lastUpdated')}</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};
