import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  Users, 
  Calendar, 
  Settings,
  Plus,
  Edit3,
  Check,
  X,
  Heart,
  Share2,
  MessageCircle,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ServiceManagement } from './ServiceManagement';
import { useLanguage } from './LanguageProvider';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  date: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  timeSlots: TimeSlot[];
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  serviceId?: string;
}

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

interface ServiceDetailPageProps {
  onBack: () => void;
  company: Company;
  categoryTitle: string;
  gradient: string;
}

export function ServiceDetailPage({ 
  onBack, 
  company, 
  categoryTitle, 
  gradient 
}: ServiceDetailPageProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [isProviderMode, setIsProviderMode] = useState(false);
  // Generate time slots for a service
  const generateTimeSlots = () => {
    const slots: any[] = [];
    const today = new Date();
    
    // Generate slots for next 7 days
    // essa parte vai ser o prestador quem vai configurar
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(today.getDate() + day);
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate hourly slots from 8 AM to 6 PM
      for (let hour = 8; hour <= 18; hour++) {
        slots.push({
          id: `${dateStr}-${hour}`,
          time: `${hour.toString().padStart(2, '0')}:00`,
          available: Math.random() > 0.3,
          date: dateStr
        });
      }
    }
    
    return slots;
  };

  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Consulta Básica',
      description: 'Consulta médica geral com avaliação completa',
      duration: 30,
      price: 200,
      category: 'Consulta',
      timeSlots: generateTimeSlots()
    },
    {
      id: '2',
      name: 'Consulta Especializada',
      description: 'Consulta com foco em especialidade específica',
      duration: 45,
      price: 300,
      category: 'Consulta',
      timeSlots: generateTimeSlots()
    }
  ]);

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: '1', time: '08:00', available: true },
    { id: '2', time: '08:30', available: true },
    { id: '3', time: '09:00', available: false },
    { id: '4', time: '09:30', available: true },
    { id: '5', time: '10:00', available: true },
    { id: '6', time: '10:30', available: false },
    { id: '7', time: '11:00', available: true },
    { id: '8', time: '11:30', available: true },
    { id: '9', time: '14:00', available: true },
    { id: '10', time: '14:30', available: true },
    { id: '11', time: '15:00', available: false },
    { id: '12', time: '15:30', available: true },
  ]);

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

  const handleServiceUpdate = (updatedServices: Service[]) => {
    setServices(updatedServices);
  };

  const handleTimeSlotsUpdate = (updatedTimeSlots: TimeSlot[]) => {
    setTimeSlots(updatedTimeSlots);
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
              
              <div>
                <h1 className="font-semibold text-foreground">{company.name}</h1>
                <p className="text-sm text-muted-foreground">{categoryTitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button 
                variant={isProviderMode ? "default" : "outline"} 
                size="sm"
                onClick={() => setIsProviderMode(!isProviderMode)}
              >
                <Settings className="w-4 h-4 mr-2" />
                {isProviderMode ? 'Modo Cliente' : 'Modo Prestador'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src={company.image}
          alt={company.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Company Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end justify-between">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{company.name}</h2>
                {company.verified && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className="bg-primary text-white cursor-help">
                        <Shield className="w-3 h-3 mr-1" />
                        Verificado
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-gray-900 border border-gray-200 shadow-lg max-w-xs">
                      <p className="text-sm font-medium leading-relaxed">
                        Este usuário comprovou com documentos que existe e é um profissional qualificado
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <p className="text-white/90 mb-3 max-w-2xl">{company.description}</p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{company.rating}</span>
                  <span className="text-white/80">({company.reviews} avaliações)</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-4 h-4" />
                  <span>{company.availability}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white border-0 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover: cursor pointer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Conversar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 lg:w-[300px] mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{company.reviews}+</h3>
                <p className="text-sm text-muted-foreground">Clientes Atendidos</p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-500/10 rounded-xl mx-auto mb-3">
                  <Star className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold mb-1">{company.rating}</h3>
                <p className="text-sm text-muted-foreground">Avaliação Média</p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-xl mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1">15 min</h3>
                <p className="text-sm text-muted-foreground">Tempo Resposta</p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-xl mx-auto mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-1">100%</h3>
                <p className="text-sm text-muted-foreground">Verificado</p>
              </Card>
            </div>

            {/* About */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4">Sobre {company.name}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {company.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                esse cillum dolore eu fugiat nulla pariatur.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Especialidades</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.services.map((service, idx) => (
                      <Badge key={idx} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Contato</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{company.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{company.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <ServiceManagement
              services={services}
              onServicesUpdate={handleServiceUpdate}
              isProviderMode={isProviderMode}
              companyName={company.name}
            />
          </TabsContent>



          <TabsContent value="reviews" className="space-y-6">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Avaliações dos Clientes</h3>
                  <p className="text-muted-foreground">{company.reviews} avaliações • Média {company.rating}/5</p>
                </div>
                
                <Button>
                  Deixar Avaliação
                </Button>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="pb-6 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-full flex items-center justify-center text-white font-medium">
                        M
                      </div>
                      <div>
                        <h4 className="font-medium">Maria Silva</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">2 dias atrás</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Excelente atendimento! Profissional muito competente e atencioso. 
                      Recomendo a todos que precisarem do serviço.
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}