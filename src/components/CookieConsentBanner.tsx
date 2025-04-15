import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/lib/components/ui/button'; // Ajustada ruta ui
import { Alert, AlertDescription, AlertTitle } from '@/lib/components/ui/alert'; // Ajustada ruta ui
import { Cookie } from 'lucide-react'; // Icono

const COOKIE_CONSENT_KEY = 'vanguardhive_cookie_consent';

export const CookieConsentBanner: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Comprobar si el consentimiento ya fue dado
    const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Guardar consentimiento y ocultar banner
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // No mostrar nada si ya se aceptó o se ocultó
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
      {/* Usar Alert para un estilo consistente y poco intrusivo */}
      <Alert className="bg-card text-card-foreground border-border shadow-lg max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
           <Cookie className="h-5 w-5 text-primary flex-shrink-0" /> {/* Icono */}
           <div>
             {/* <AlertTitle>{t('cookieConsent.title')}</AlertTitle> */} {/* Título opcional si se quiere */}
             <AlertDescription className="text-sm text-muted-foreground">
               {t('cookieConsent.description')} {' '}
               <Link to="/privacy" className="underline hover:text-primary">
                 {t('cookieConsent.privacyPolicyLink')}
               </Link>
               .
             </AlertDescription>
           </div>
        </div>
        <Button
          onClick={handleAccept}
          size="sm" // Botón pequeño
          className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0" // Margen y evitar que se encoja
        >
          {t('cookieConsent.acceptButton')}
        </Button>
      </Alert>
    </div>
  );
};
