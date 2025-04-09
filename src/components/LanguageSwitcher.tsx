import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/lib/components/ui/button'; // Ajusta la ruta si es necesario
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/components/ui/dropdown-menu'; // Ajusta la ruta si es necesario
import { Languages } from 'lucide-react'; // Icono

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Mapeo de códigos de idioma a nombres legibles
  const languageNames: { [key: string]: string } = {
    en: 'English',
    es: 'Español',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         {/* Use muted-foreground, hover to foreground */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Change language</span> {/* Para accesibilidad */}
        </Button>
      </DropdownMenuTrigger>
       {/* Style dropdown content for dark mode */}
      <DropdownMenuContent align="end" className="bg-card border-lit-border text-card-foreground">
        {Object.keys(languageNames).map((lng) => (
          <DropdownMenuItem
            key={lng}
            onClick={() => changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
            // Style dropdown items for dark mode
            className="cursor-pointer focus:bg-lit-blue/10 focus:text-foreground"
          >
            {languageNames[lng]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
