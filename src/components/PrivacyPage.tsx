import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '@/lib/components/Footer'; // Corregido a importación por defecto
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/components/ui/card'; // Corregida la ruta a /lib/components/ui/

export const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <Card className="bg-card text-card-foreground border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">{t('privacy.title')}</CardTitle>
          </CardHeader>
          {/* Usar text-foreground para mejor contraste en contenido */}
          <CardContent className="space-y-6 text-foreground">
            <section>
              {/* Usar text-foreground para mejor contraste en headers */}
              <h2 className="text-2xl font-semibold mb-3 text-foreground">{t('privacy.introduction.title')}</h2>
              <p>{t('privacy.introduction.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">{t('privacy.dataCollected.title')}</h2>
              <p>{t('privacy.dataCollected.content')}</p>
              {/* Detallar tipos de datos: ej. nombre, email, datos de uso, cookies */}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">{t('privacy.howDataUsed.title')}</h2>
              <p>{t('privacy.howDataUsed.content')}</p>
              {/* Detallar usos: ej. proveer servicio, comunicación, análisis, marketing */}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">{t('privacy.dataSharing.title')}</h2>
              <p>{t('privacy.dataSharing.content')}</p>
              {/* Detallar con quién se comparte: ej. proveedores de servicios, requerimientos legales */}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">{t('privacy.dataSecurity.title')}</h2>
              <p>{t('privacy.dataSecurity.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">{t('privacy.userRights.title')}</h2>
              <p>{t('privacy.userRights.content')}</p>
              {/* Detallar derechos GDPR: acceso, rectificación, supresión, etc. */}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">{t('privacy.cookies.title')}</h2>
              <p>{t('privacy.cookies.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">{t('privacy.childrensPrivacy.title')}</h2>
              <p>{t('privacy.childrensPrivacy.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">{t('privacy.changes.title')}</h2>
              <p>{t('privacy.changes.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">{t('privacy.contact.title')}</h2>
              <p>{t('privacy.contact.content')}</p>
            </section>

            <p className="text-sm italic mt-8">{t('privacy.lastUpdated')}</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};
