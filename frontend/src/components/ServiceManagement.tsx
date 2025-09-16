import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  DollarSign, 
  Tag, 
  Save,
  X,
  Calendar,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Settings2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

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

interface ServiceManagementProps {
  services: Service[];
  onServicesUpdate: (services: Service[]) => void;
  isProviderMode: boolean;
  companyName: string;
}

interface ServiceFormData {
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

// Generate time slots for a service
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  // Generate slots for next 7 days
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    const dateStr = date.toISOString().split('T')[0];
    
    // Generate hourly slots from 8 AM to 6 PM
    for (let hour = 8; hour <= 18; hour++) {
      slots.push({
        id: `${dateStr}-${hour}`,
        time: `${hour.toString().padStart(2, '0')}:00`,
        available: Math.random() > 0.3, // Random availability for demo
        date: dateStr
      });
    }
  }
  
  return slots;
};

export function ServiceManagement({ 
  services, 
  onServicesUpdate, 
  isProviderMode, 
  companyName 
}: ServiceManagementProps) {
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    description: '',
    duration: 30,
    price: 0,
    category: ''
  });

  const categories = [
    'Consulta',
    'Exame',
    'Procedimento',
    'Tratamento',
    'Terapia',
    'Cirurgia',
    'Outro'
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      duration: 30,
      price: 0,
      category: ''
    });
  };

  const handleAddService = () => {
    if (!formData.name || !formData.description || !formData.category) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const newService: Service = {
      id: Date.now().toString(),
      ...formData,
      timeSlots: generateTimeSlots()
    };

    onServicesUpdate([...services, newService]);
    setIsAddingService(false);
    resetForm();
    toast.success('Serviço adicionado com sucesso!');
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      category: service.category
    });
    setIsAddingService(true);
  };

  const handleUpdateService = () => {
    if (!editingService) return;

    const updatedServices = services.map(service =>
      service.id === editingService.id
        ? { ...service, ...formData, timeSlots: service.timeSlots || generateTimeSlots() }
        : service
    );

    onServicesUpdate(updatedServices);
    setEditingService(null);
    setIsAddingService(false);
    resetForm();
    toast.success('Serviço atualizado com sucesso!');
  };

  const toggleServiceExpansion = (serviceId: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
  };

  const handleTimeSlotToggle = (serviceId: string, slotId: string) => {
    if (!isProviderMode) return;
    
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        const updatedTimeSlots = service.timeSlots?.map(slot =>
          slot.id === slotId ? { ...slot, available: !slot.available } : slot
        ) || [];
        return { ...service, timeSlots: updatedTimeSlots };
      }
      return service;
    });
    
    onServicesUpdate(updatedServices);
    toast.success('Horário atualizado!');
  };

  const handleBookSlot = (serviceId: string, slotId: string) => {
    const service = services.find(s => s.id === serviceId);
    const slot = service?.timeSlots?.find(s => s.id === slotId);
    
    if (service && slot) {
      toast.success(`Agendamento solicitado para ${service.name} às ${slot.time}`);
    }
  };

  const getAvailableSlotsForDate = (service: Service, date: string) => {
    return service.timeSlots?.filter(slot => slot.date === date && slot.available) || [];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (dateStr === today.toISOString().split('T')[0]) {
      return 'Hoje';
    } else if (dateStr === tomorrow.toISOString().split('T')[0]) {
      return 'Amanhã';
    } else {
      return date.toLocaleDateString('pt-BR', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const handleDeleteService = (serviceId: string) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    onServicesUpdate(updatedServices);
    toast.success('Serviço removido com sucesso!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDuration = (duration: number) => {
    if (duration < 60) {
      return `${duration} min`;
    } else {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
    }
  };

  if (!isProviderMode) {
    // Client view - just show available services
    return (
      <div className="space-y-6">
        <Card className="p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Serviços Disponíveis</h3>
            <p className="text-muted-foreground">
              Escolha entre os serviços oferecidos por {companyName}
            </p>
          </div>

          <div className="grid gap-6">
            {services.map((service) => {
              const isExpanded = expandedServices.has(service.id);
              const availableSlots = getAvailableSlotsForDate(service, selectedDate);
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
                >
                  {/* Service Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{service.name}</h4>
                          <Badge variant="secondary">{service.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{formatDuration(service.duration)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-semibold">
                            <DollarSign className="w-4 h-4" />
                            <span>{formatPrice(service.price)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-emerald-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>{availableSlots.length} horários hoje</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          onClick={() => toggleServiceExpansion(service.id)}
                          className="min-w-[120px]"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {isExpanded ? 'Ocultar' : 'Ver'} Agenda
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 ml-2" />
                          ) : (
                            <ChevronDown className="w-4 h-4 ml-2" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Schedule Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border bg-muted/20"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium">Horários Disponíveis</h5>
                            {isProviderMode && (
                              <Button variant="outline" size="sm">
                                <Settings2 className="w-4 h-4 mr-2" />
                                Gerenciar Horários
                              </Button>
                            )}
                          </div>

                          {/* Date Selector */}
                          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                            {Array.from({ length: 7 }, (_, i) => {
                              const date = new Date();
                              date.setDate(date.getDate() + i);
                              const dateStr = date.toISOString().split('T')[0];
                              const slotsForDate = getAvailableSlotsForDate(service, dateStr);
                              
                              return (
                                <Button
                                  key={dateStr}
                                  variant={selectedDate === dateStr ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setSelectedDate(dateStr)}
                                  className="min-w-[80px] flex-col h-16"
                                >
                                  <span className="text-xs">{formatDate(dateStr)}</span>
                                  <span className="text-xs opacity-70">
                                    {slotsForDate.length} vagas
                                  </span>
                                </Button>
                              );
                            })}
                          </div>

                          {/* Time Slots Grid */}
                          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                            {service.timeSlots
                              ?.filter(slot => slot.date === selectedDate)
                              ?.map((slot) => (
                                <Button
                                  key={slot.id}
                                  variant={slot.available ? "outline" : "secondary"}
                                  size="sm"
                                  className={`h-10 ${
                                    slot.available 
                                      ? "hover:bg-primary hover:text-white border-border" 
                                      : "opacity-50 cursor-not-allowed"
                                  }`}
                                  disabled={!slot.available}
                                  onClick={() => 
                                    isProviderMode 
                                      ? handleTimeSlotToggle(service.id, slot.id)
                                      : handleBookSlot(service.id, slot.id)
                                  }
                                >
                                  {slot.time}
                                </Button>
                              ))}
                          </div>

                          {availableSlots.length === 0 && (
                            <div className="text-center py-8">
                              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-muted-foreground">
                                Nenhum horário disponível para {formatDate(selectedDate)}
                              </p>
                            </div>
                          )}

                          {/* Legend */}
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border border-border rounded"></div>
                                <span>Disponível</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-muted rounded"></div>
                                <span>Ocupado</span>
                              </div>
                              {isProviderMode && (
                                <span className="text-xs">Clique nos horários para alterar disponibilidade</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {services.length === 0 && (
            <div className="text-center py-12">
              <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">Nenhum servi��o cadastrado</h3>
              <p className="text-muted-foreground">
                Este prestador ainda não cadastrou serviços.
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Provider view - full management interface
  return (
    <div className="space-y-6">
      <Card className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Gerenciar Serviços</h3>
            <p className="text-muted-foreground">
              Adicione e configure os serviços que você oferece
            </p>
          </div>
          
          <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingService(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Serviço
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? 'Editar Serviço' : 'Novo Serviço'}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Serviço *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Consulta médica"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o serviço oferecido..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (minutos) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="15"
                      step="15"
                      placeholder="30"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 30 })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="100.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={editingService ? handleUpdateService : handleAddService}
                    className="flex-1"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingService ? 'Atualizar' : 'Salvar'} Serviço
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddingService(false);
                      setEditingService(null);
                      resetForm();
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Services List */}
        <div className="space-y-6">
          <AnimatePresence>
            {services.map((service) => {
              const isExpanded = expandedServices.has(service.id);
              const availableSlots = getAvailableSlotsForDate(service, selectedDate);
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  {/* Service Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{service.name}</h4>
                          <Badge variant="secondary">{service.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{formatDuration(service.duration)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-semibold">
                            <DollarSign className="w-4 h-4" />
                            <span>{formatPrice(service.price)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-emerald-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>{availableSlots.length} horários hoje</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleServiceExpansion(service.id)}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {isExpanded ? 'Ocultar' : 'Gerenciar'} Agenda
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 ml-2" />
                          ) : (
                            <ChevronDown className="w-4 h-4 ml-2" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditService(service)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Schedule Management */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border bg-muted/20"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium">Gerenciar Horários</h5>
                            <div className="text-sm text-muted-foreground">
                              Clique nos horários para alterar disponibilidade
                            </div>
                          </div>

                          {/* Date Selector */}
                          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                            {Array.from({ length: 7 }, (_, i) => {
                              const date = new Date();
                              date.setDate(date.getDate() + i);
                              const dateStr = date.toISOString().split('T')[0];
                              const slotsForDate = getAvailableSlotsForDate(service, dateStr);
                              const totalSlots = service.timeSlots?.filter(slot => slot.date === dateStr).length || 0;
                              
                              return (
                                <Button
                                  key={dateStr}
                                  variant={selectedDate === dateStr ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setSelectedDate(dateStr)}
                                  className="min-w-[80px] flex-col h-16"
                                >
                                  <span className="text-xs">{formatDate(dateStr)}</span>
                                  <span className="text-xs opacity-70">
                                    {slotsForDate.length}/{totalSlots}
                                  </span>
                                </Button>
                              );
                            })}
                          </div>

                          {/* Time Slots Management Grid */}
                          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                            {service.timeSlots
                              ?.filter(slot => slot.date === selectedDate)
                              ?.map((slot) => (
                                <Button
                                  key={slot.id}
                                  variant={slot.available ? "default" : "outline"}
                                  size="sm"
                                  className={`h-10 transition-colors ${
                                    slot.available 
                                      ? "bg-primary text-white hover:bg-primary/90" 
                                      : "bg-muted hover:bg-muted/80"
                                  }`}
                                  onClick={() => handleTimeSlotToggle(service.id, slot.id)}
                                >
                                  {slot.time}
                                </Button>
                              ))}
                          </div>

                          {/* Quick Actions */}
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updatedServices = services.map(s => {
                                    if (s.id === service.id) {
                                      const updatedTimeSlots = s.timeSlots?.map(slot =>
                                        slot.date === selectedDate ? { ...slot, available: true } : slot
                                      ) || [];
                                      return { ...s, timeSlots: updatedTimeSlots };
                                    }
                                    return s;
                                  });
                                  onServicesUpdate(updatedServices);
                                  toast.success('Todos os horários liberados!');
                                }}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Liberar Todos
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updatedServices = services.map(s => {
                                    if (s.id === service.id) {
                                      const updatedTimeSlots = s.timeSlots?.map(slot =>
                                        slot.date === selectedDate ? { ...slot, available: false } : slot
                                      ) || [];
                                      return { ...s, timeSlots: updatedTimeSlots };
                                    }
                                    return s;
                                  });
                                  onServicesUpdate(updatedServices);
                                  toast.success('Todos os horários bloqueados!');
                                }}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Bloquear Todos
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Adicione seu primeiro serviço</h3>
            <p className="text-muted-foreground mb-4">
              Configure os serviços que você oferece para começar a receber agendamentos.
            </p>
            <Button onClick={() => setIsAddingService(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Serviço
            </Button>
          </div>
        )}
      </Card>

      {/* Quick Stats */}
      {services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Tag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{services.length}</h4>
                <p className="text-sm text-muted-foreground">Serviços Ativos</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold">
                  {formatPrice(Math.min(...services.map(s => s.price)))}
                </h4>
                <p className="text-sm text-muted-foreground">Preço Mínimo</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold">
                  {formatDuration(Math.round(services.reduce((acc, s) => acc + s.duration, 0) / services.length))}
                </h4>
                <p className="text-sm text-muted-foreground">Duração Média</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}