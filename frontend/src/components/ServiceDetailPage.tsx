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
  X,
  Heart,
  MessageCircle,
  Shield,
  Copy, 
  Check, 
  Share2, 
  Facebook, 
  Twitter,
  Scissors,
  User,  
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ServiceManagement } from './ServiceManagement';
import { useLanguage } from './LanguageProvider';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "react-hot-toast";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isProviderMode, setIsProviderMode] = useState(false);
  
  // estados de modais
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // estado do coração favorito
  const [isFavorited, setIsFavorited] = useState(false);

  const link = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);

    if (!isFavorited) {
      toast((t) => (
    <div className="flex flex-col gap-2 bg-white/95 text-gray-900 p-3">
    <span>Adicionado aos favoritos!</span>
    <Button
      size="sm"
      variant="default"
      className="bg-emerald-500 border-0 hover:bg-emerald-600 text-white"
      onClick={() => {
        toast.dismiss(t.id);
        setIsFavOpen(true); // abre modal de favoritos
      }}
    >
      VER FAVORITOS
          </Button>
        </div>
      ), {
        duration: 4000,
        position: "top-right"
      });

    } else {
      toast("Removido dos favoritos", { duration: 1000, position: "top-right" });
    }
  };

  const handleOpenConfirm = (service: Service, time: string) => {
  setSelectedService(service);
  setSelectedTime(time);
  setIsConfirmOpen(true);
};

  // Generate time slots for a service
  // essa parte vai ser o prestador quem vai configurar
  const generateTimeSlots = () => {
    const slots: any[] = [];
    const today = new Date();
    
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
      className="min-h-screen bg-background pt-24"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <div className=" bg-background/80 backdrop-blur-xl border-b border-border">
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
              <Button variant="outline" size="sm" onClick={() => setIsShareOpen(true)}>
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>

              {/* Botão de coração */}
              <Button variant="outline" size="sm" onClick={handleFavoriteClick}>
                <Heart className={`w-4 h-4 ${isFavorited ? "text-red-500 fill-current" : ""}`} />
              </Button>

              <Button variant={isProviderMode ? "default" : "outline"} size="sm" onClick={() => setIsProviderMode(!isProviderMode)}>
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
              onSchedule={handleOpenConfirm}
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

      {/* Modais de compartilhar */}
      <AnimatePresence>
        {isShareOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Compartilhar</h2>
                <button
                  onClick={() => setIsShareOpen(false)}
                  className="text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
               {/* Link + copiar */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm text-gray-600"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copiado!");
                  }}
                >
                  <Copy className="bg-white w-4 h-4" />
                </Button>
              </div>

              {/* Opções de compartilhamento */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(window.location.href)}`,
                      "_blank"
                    )
                  }
                >
                  <FaWhatsapp className="w-4 h-4 mr-2 text-green-600" />
                  WhatsApp
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                  Facebook
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <Twitter className="w-4 h-4 mr-2 text-sky-500" />
                  Twitter
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`,
                      "_blank"
                    )
                  }
                >
                  <FaTelegramPlane className="w-4 h-4 mr-2 text-blue-500" />
                  Telegram
                </Button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        <AnimatePresence>
    {isConfirmOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Confirmar agendamento</h2>
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-6 space-y-5 text-gray-700">
            <div>
               <p className="font-medium text-gray-900">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
              <p className="text-sm text-gray-500">{selectedTime}</p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <p className="font-semibold">{company.name}</p>
                <p className="text-sm text-gray-500">
                  {company.location}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-start border-t pt-3">
              <div className="flex items-start gap-3">
                <Scissors className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold">{selectedService?.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedService?.description}
                  </p>
                </div>
              </div>
              <p className="text-gray-900 font-semibold">R$ {selectedService?.price}</p>
            </div>

            {/* Campo de comentário */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Quer deixar um comentário? (opcional)
              </label>
              <textarea
                rows={3}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                placeholder="Escreva algo..."
                maxLength={400}
              />
              <p className="text-xs text-gray-400 text-right">0 de 400 caracteres</p>
            </div>

            {/* Cupom */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Código de cupom</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="Digite aqui"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-gray-50">
            <Button
              onClick={() => {
                toast.success("Agendamento confirmado!");
                setIsConfirmOpen(false);
              }}
              className="w-full bg-primary hover:bg-esmerald-600/10 text-white font-semibold py-3 rounded-lg"
            >
              Agendar
            </Button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
    </motion.div>
  );
}
