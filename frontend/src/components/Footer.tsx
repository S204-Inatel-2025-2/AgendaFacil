import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Instagram, Youtube, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageProvider';

// Unified Card Component with Dark Mode Support
const UnifiedCard = ({ 
  children, 
  className = "", 
  hover = true,
  variant = "default"
}: { 
  children: React.ReactNode, 
  className?: string,
  hover?: boolean,
  variant?: "default" | "stat" | "trust" | "service" | "footer"
}) => {
  const baseClasses = "bg-card dark:bg-card border border-border/50 rounded-2xl p-6 shadow-sm transition-all duration-300";
  const hoverClasses = hover ? "hover:shadow-lg hover:border-primary/20 hover:-translate-y-1" : "";
  
  // Variant-specific classes for consistent dimensions
  const variantClasses = {
    service: "min-h-[160px] flex flex-col",
    stat: "min-h-[160px] flex flex-col justify-center text-center",
    trust: "min-h-[80px] flex flex-col justify-center p-3",
    footer: "min-h-0 bg-card/50 dark:bg-card/30 border-border/30",
    default: ""
  };
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export function Footer() {
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large'>('normal');
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const handleFontSizeChange = (size: 'small' | 'normal' | 'large') => {
    setFontSize(size);
    const root = document.documentElement;
    
    switch (size) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'normal':
        root.style.fontSize = '16px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
    }
    
    localStorage.setItem('fontSize', size);
  };

  // Services for Brazilian Portuguese
  const servicesLinks = [
    'Consultas Médicas',
    'Beleza & Estética', 
    'Assistência Técnica',
    'Aulas Particulares',
    'Bem-estar',
    'Automotivo'
  ];

  const informationLinks = [
    'Novidades',
    'Agenda Inteligente',
    'Central de Ajuda',
    'Sobre Nós',
    'Como Funciona',
    'Parceiros'
  ];

  const supportLinks = [
    t.footer_help || 'Central de Ajuda',
    t.footer_contact || 'Contato',
    t.footer_faq || 'FAQ',
    t.footer_terms || 'Termos de Uso'
  ];

  return (
    <footer className="bg-muted dark:bg-muted border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">{t.footer_about || 'Sobre'}</h3>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                {t.footer_about_desc || 'Conectamos pessoas aos melhores profissionais da sua região'}
              </p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">contato@agendafacil.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">(11) 4000-0000</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">{t.footer_services || 'Serviços'}</h3>
            <ul className="space-y-2 text-sm">
              {servicesLinks.map((link, index) => (
                <li key={`service-${index}`}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Informações</h3>
            <ul className="space-y-2 text-sm">
              {informationLinks.map((link, index) => (
                <li key={`info-${index}`}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">{t.footer_support || 'Suporte'}</h3>
            <ul className="space-y-2 text-sm mb-6">
              {supportLinks.map((link, index) => (
                <li key={`support-${index}`}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            
            <h4 className="text-sm font-medium mb-3 text-foreground">{t.footer_follow || 'Siga-nos'}</h4>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-muted-foreground hover:bg-primary hover:text-primary-foreground">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-muted-foreground hover:bg-primary hover:text-primary-foreground">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-muted-foreground hover:bg-primary hover:text-primary-foreground">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-muted-foreground hover:bg-primary hover:text-primary-foreground">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="bg-border mb-8" />
        
        {/* Accessibility Options */}
        <UnifiedCard variant="footer" className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-foreground">{t.footer_accessibility || 'Acessibilidade'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2 text-foreground">{t.text_size_increase || 'Tamanho do Texto'}</h4>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={`text-xs border-2 border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary ${
                    fontSize === 'small' ? 'bg-primary text-primary-foreground border-primary' : ''
                  }`}
                  onClick={() => handleFontSizeChange('small')}
                >
                  A-
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={`text-sm border-2 border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary ${
                    fontSize === 'normal' ? 'bg-primary text-primary-foreground border-primary' : ''
                  }`}
                  onClick={() => handleFontSizeChange('normal')}
                >
                  A
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={`text-base border-2 border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary ${
                    fontSize === 'large' ? 'bg-primary text-primary-foreground border-primary' : ''
                  }`}
                  onClick={() => handleFontSizeChange('large')}
                >
                  A+
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-foreground">Modo de Exibição</h4>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={`border-2 border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary ${
                    theme === 'light' ? 'bg-primary text-primary-foreground border-primary' : ''
                  }`}
                  onClick={() => setTheme('light')}
                >
                  <Sun className="w-4 h-4 mr-1" />
                  Claro
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={`border-2 border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary ${
                    theme === 'dark' ? 'bg-primary text-primary-foreground border-primary' : ''
                  }`}
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="w-4 h-4 mr-1" />
                  Escuro
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-foreground">Suporte a Deficiências</h4>
              <Button size="sm" variant="outline" className="border-2 border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary">
                Guia de Acessibilidade
              </Button>
            </div>
          </div>
        </UnifiedCard>
        
        {/* Newsletter */}
        <UnifiedCard variant="footer" className="mb-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-foreground">{t.footer_newsletter || 'Newsletter'}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t.footer_newsletter_desc || 'Receba novidades e promoções'}
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t.footer_newsletter_placeholder || 'Seu e-mail'}
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:border-primary"
              />
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                {t.footer_newsletter_subscribe || 'Inscrever'}
              </Button>
            </div>
          </div>
        </UnifiedCard>
        
        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>{t.footer_copyright || '© 2024 AgendaFácil. Todos os direitos reservados.'}</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-primary transition-colors">{t.footer_privacy || 'Privacidade'}</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">{t.footer_terms || 'Termos de Uso'}</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">Mapa do Site</a>
          </div>
        </div>
      </div>
    </footer>
  );
}