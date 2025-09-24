import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Star, Clock, Phone, Users, Calendar, Filter, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageProvider';

interface Company {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  services: string[];
  availability: string;
  price: string;
  phone: string;
  verified: boolean;
}

interface ServiceCategoryPageProps {
  onBack: () => void;
  onCompanySelect: (company: Company) => void;
  categoryKey: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  companies: Company[];
}

export function ServiceCategoryPage({
  onBack,
  onCompanySelect,
  categoryKey,
  title,
  description,
  icon,
  gradient,
  companies
}: ServiceCategoryPageProps) {
  const { t } = useLanguage();

  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const companyCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }
    })
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="hover:bg-muted/80"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              
              <div className="flex items-center gap-3">
                <div className={`text-2xl p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
                  {icon}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">{title}</h1>
                  <p className="text-sm text-muted-foreground">{companies.length} empresas disponíveis</p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-emerald-600">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Agora
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Encontre os melhores profissionais em {title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {description}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Busque por profissional, especialidade ou localização..."
                className="pl-12 pr-4 py-6 text-lg bg-background/80 backdrop-blur-sm border-border"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              custom={index}
              variants={companyCardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              onClick={() => onCompanySelect(company)}
            >
              <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                {/* Company Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={company.image}
                    alt={company.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Verified Badge */}
                  {company.verified && (
                    <div className="absolute top-3 right-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className="bg-primary text-white cursor-help">
                            ✓ Verificado
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white text-gray-900 border border-gray-200 shadow-lg max-w-xs">
                          <p className="text-sm font-medium leading-relaxed">
                            Este usuário comprovou com documentos que existe e é um profissional qualificado
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{company.rating}</span>
                    <span className="text-white/80">({company.reviews})</span>
                  </div>
                </div>

                {/* Company Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {company.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {company.description}
                    </p>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2">
                    {company.services.slice(0, 3).map((service, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {company.services.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{company.services.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{company.availability}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>A partir de {company.price}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCompanySelect(company);
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border hover:border-primary/50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button variant="outline" size="lg" className="px-8">
            Carregar mais empresas
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}