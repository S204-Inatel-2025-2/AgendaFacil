import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Search,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar as CalendarIcon,
  Eye,
  Trash2,
  ArrowLeft,
  X,
  DollarSign
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useLanguage } from './LanguageProvider';
import { useTheme } from './ThemeProvider';
import { useAuth } from '../hooks/useAuth';
import { type Appointment, type AppointmentFilters, type AppointmentStats } from '../types/Appointment';
import toast from 'react-hot-toast';

interface AppointmentsPageProps {
  onBack: () => void;
}

// Mock data para demonstração
const generateMockAppointments = (): Appointment[] => {
  const appointments: Appointment[] = [];
  const today = new Date();
  
  const services = [
    { id: '1', name: 'Consulta Básica', company: 'Clínica Saúde Total' },
    { id: '2', name: 'Exame de Sangue', company: 'Laboratório Diagnóstico' },
    { id: '3', name: 'Fisioterapia', company: 'Centro de Reabilitação' },
    { id: '4', name: 'Consulta Cardiológica', company: 'Instituto do Coração' }
  ];

  const statuses: Array<Appointment['status']> = ['pending', 'confirmed', 'cancelled', 'completed'];
  
  for (let i = 0; i < 20; i++) {
    const service = services[Math.floor(Math.random() * services.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + Math.floor(Math.random() * 30) - 10);
    
    appointments.push({
      id: `apt-${i + 1}`,
      serviceId: service.id,
      serviceName: service.name,
      companyName: service.company,
      companyId: `company-${Math.floor(Math.random() * 4) + 1}`,
      userId: 'user-1',
      userName: 'João Silva',
      userEmail: 'joao.silva@email.com',
      userPhone: '(11) 99999-9999',
      date: appointmentDate.toISOString().split('T')[0],
      time: `${8 + Math.floor(Math.random() * 10)}:${Math.random() > 0.5 ? '00' : '30'}`,
      duration: [30, 45, 60][Math.floor(Math.random() * 3)],
      price: [150, 200, 300, 450][Math.floor(Math.random() * 4)],
      status,
      notes: status === 'completed' ? 'Consulta realizada com sucesso' : undefined,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return appointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const getStatusConfig = (status: Appointment['status']) => {
  const configs = {
    pending: {
      label: 'Pendente',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      darkColor: 'dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
    },
    confirmed: {
      label: 'Confirmado',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 border-green-200',
      darkColor: 'dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
    },
    cancelled: {
      label: 'Cancelado',
      icon: XCircle,
      color: 'bg-red-100 text-red-800 border-red-200',
      darkColor: 'dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
    },
    completed: {
      label: 'Concluído',
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      darkColor: 'dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
    }
  };
  
  return configs[status];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (timeString: string) => {
  return timeString;
};

export function AppointmentsPage({ onBack }: AppointmentsPageProps) {
  const { } = useLanguage();
  const { } = useTheme();
  const { } = useAuth();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<AppointmentStats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  });
  
  const [filters, setFilters] = useState<AppointmentFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados iniciais
  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      try {
        // Simular carregamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = generateMockAppointments();
        setAppointments(mockData);
        setFilteredAppointments(mockData);
        
        // Calcular estatísticas
        const today = new Date().toISOString().split('T')[0];
        const thisWeek = new Date();
        thisWeek.setDate(thisWeek.getDate() + 7);
        const thisMonth = new Date();
        thisMonth.setMonth(thisMonth.getMonth() + 1);
        
        const newStats: AppointmentStats = {
          total: mockData.length,
          pending: mockData.filter(apt => apt.status === 'pending').length,
          confirmed: mockData.filter(apt => apt.status === 'confirmed').length,
          cancelled: mockData.filter(apt => apt.status === 'cancelled').length,
          completed: mockData.filter(apt => apt.status === 'completed').length,
          today: mockData.filter(apt => apt.date === today).length,
          thisWeek: mockData.filter(apt => new Date(apt.date) <= thisWeek).length,
          thisMonth: mockData.filter(apt => new Date(apt.date) <= thisMonth).length
        };
        
        setStats(newStats);
      } catch (error) {
        toast.error('Erro ao carregar agendamentos');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointments();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = appointments;
    
    // Filtro por status
    if (filters.status) {
      filtered = filtered.filter(apt => apt.status === filters.status);
    }
    
    // Filtro por data
    if (filters.dateFrom) {
      filtered = filtered.filter(apt => apt.date >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(apt => apt.date <= filters.dateTo!);
    }
    
    // Filtro por empresa
    if (filters.companyId) {
      filtered = filtered.filter(apt => apt.companyId === filters.companyId);
    }
    
    // Filtro por serviço
    if (filters.serviceId) {
      filtered = filtered.filter(apt => apt.serviceId === filters.serviceId);
    }
    
    // Busca por texto
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(apt => 
        apt.serviceName.toLowerCase().includes(term) ||
        apt.companyName.toLowerCase().includes(term) ||
        apt.userName.toLowerCase().includes(term)
      );
    }
    
    setFilteredAppointments(filtered);
  }, [appointments, filters, searchTerm]);

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: newStatus, updatedAt: new Date().toISOString() }
          : apt
      )
    );
    toast.success('Status atualizado com sucesso!');
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    toast.success('Agendamento removido com sucesso!');
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (isLoading) {
    return (
      <motion.div 
        className="min-h-screen bg-background flex items-center justify-center"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <div className="text-center">
          <motion.div
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-muted-foreground">Carregando agendamentos...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="hover:bg-muted/80 rounded-xl px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </motion.div>
              
              <div className="space-y-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Meus Agendamentos
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Gerencie todos os seus agendamentos de forma inteligente
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-8"
          variants={cardVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-background to-muted/20 dark:from-muted/10 dark:to-muted/5 border-border/50 dark:border-border/30 hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-xl">
              <div className="text-3xl font-bold text-foreground mb-2">{stats.total}</div>
              <div className="text-sm font-medium text-muted-foreground">Total</div>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-900/30 dark:to-yellow-800/20 border-yellow-200/50 dark:border-yellow-800/40 hover:border-yellow-300/50 dark:hover:border-yellow-700/60 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-xl">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">{stats.pending}</div>
              <div className="text-sm font-medium text-muted-foreground">Pendentes</div>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/20 border-green-200/50 dark:border-green-800/40 hover:border-green-300/50 dark:hover:border-green-700/60 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-xl">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{stats.confirmed}</div>
              <div className="text-sm font-medium text-muted-foreground">Confirmados</div>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20 border-blue-200/50 dark:border-blue-800/40 hover:border-blue-300/50 dark:hover:border-blue-700/60 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-xl">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stats.completed}</div>
              <div className="text-sm font-medium text-muted-foreground">Concluídos</div>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/30 dark:to-red-800/20 border-red-200/50 dark:border-red-800/40 hover:border-red-300/50 dark:hover:border-red-700/60 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-xl">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">{stats.cancelled}</div>
              <div className="text-sm font-medium text-muted-foreground">Cancelados</div>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-primary/20 dark:border-primary/30 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-xl">
              <div className="text-3xl font-bold text-primary mb-2">{stats.today}</div>
              <div className="text-sm font-medium text-muted-foreground">Hoje</div>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/30 dark:to-emerald-800/20 border-emerald-200/50 dark:border-emerald-800/40 hover:border-emerald-300/50 dark:hover:border-emerald-700/60 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-xl">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{stats.thisWeek}</div>
              <div className="text-sm font-medium text-muted-foreground">Esta Semana</div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="mb-8"
          variants={cardVariants}
          initial="initial"
          animate="animate"
        >
          <Card className="p-6 bg-gradient-to-r from-background to-muted/10 dark:from-muted/5 dark:to-muted/10 border-border/50 dark:border-border/30 rounded-2xl shadow-sm dark:shadow-none">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Buscar por serviço, empresa ou cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 rounded-xl border-border/50 dark:border-border/30 focus:border-primary/50 dark:focus:border-primary/60 focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30 transition-all duration-300 bg-background/50 dark:bg-muted/20"
                  />
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="whitespace-nowrap rounded-xl border-border/50 dark:border-border/30 hover:border-primary/50 dark:hover:border-primary/60 transition-all duration-300 px-6 py-3"
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpar Filtros
                </Button>
              </motion.div>
            </div>
          </Card>

        </motion.div>

        {/* Appointments List */}
        <motion.div 
          className="space-y-4"
          variants={cardVariants}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence>
            {filteredAppointments.length === 0 ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center">
                  <CalendarIcon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Nenhum agendamento encontrado
                </h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  {searchTerm || Object.keys(filters).length > 0 
                    ? 'Tente ajustar os filtros de busca para encontrar seus agendamentos'
                    : 'Você ainda não possui agendamentos. Que tal agendar um serviço?'
                  }
                </p>
                {(searchTerm || Object.keys(filters).length > 0) && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="rounded-xl px-6 py-3"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Limpar Filtros
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              filteredAppointments.map((appointment, index) => {
                const statusConfig = getStatusConfig(appointment.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card className="p-6 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 rounded-2xl border-border/50 dark:border-border/30 hover:border-primary/30 dark:hover:border-primary/40 bg-gradient-to-r from-background to-muted/5 dark:from-muted/5 dark:to-muted/10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-foreground mb-1">
                                {appointment.serviceName}
                              </h3>
                              <p className="text-sm text-muted-foreground font-medium">
                                {appointment.companyName}
                              </p>
                            </div>
                            <Badge 
                              className={`${statusConfig.color} ${statusConfig.darkColor} border px-3 py-1 rounded-full text-xs font-medium`}
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.label}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 dark:bg-muted/20">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Data</p>
                                <p className="text-sm font-semibold text-foreground">{formatDate(appointment.date)}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 dark:bg-muted/20">
                              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Horário</p>
                                <p className="text-sm font-semibold text-foreground">{formatTime(appointment.time)} ({appointment.duration}min)</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 dark:bg-muted/20">
                              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Local</p>
                                <p className="text-sm font-semibold text-foreground">{appointment.companyName}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 dark:bg-muted/20">
                              <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                                <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Cliente</p>
                                <p className="text-sm font-semibold text-foreground">{appointment.userName}</p>
                              </div>
                            </div>
                          </div>
                          
                          {appointment.notes && (
                            <div className="mt-4 p-4 bg-gradient-to-r from-muted/50 to-muted/30 dark:from-muted/30 dark:to-muted/20 rounded-xl border border-border/50 dark:border-border/30">
                              <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">Observações:</strong> {appointment.notes}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 ml-6">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedAppointment(appointment)}
                              className="w-10 h-10 rounded-xl hover:bg-primary/10 hover:text-primary"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </motion.div>
                          
                          {appointment.status === 'pending' && (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                                className="w-10 h-10 rounded-xl hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          )}
                          
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAppointment(appointment.id)}
                              className="w-10 h-10 rounded-xl hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Appointment Detail Modal */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="max-w-3xl rounded-2xl border-border/50 dark:border-border/30">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Detalhes do Agendamento
            </DialogTitle>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-8">
              {/* Header do Agendamento */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/15 border border-primary/20 dark:border-primary/30">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">{selectedAppointment.serviceName}</h3>
                  <p className="text-muted-foreground font-medium">{selectedAppointment.companyName}</p>
                </div>
                <Badge className={`${getStatusConfig(selectedAppointment.status).color} ${getStatusConfig(selectedAppointment.status).darkColor} border px-4 py-2 rounded-full text-sm font-medium`}>
                  {getStatusConfig(selectedAppointment.status).label}
                </Badge>
              </div>

              {/* Informações Principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/30 dark:bg-muted/20 border border-border/50 dark:border-border/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <label className="text-sm font-semibold text-foreground">Data</label>
                    </div>
                    <p className="text-foreground font-medium">{formatDate(selectedAppointment.date)}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 dark:bg-muted/20 border border-border/50 dark:border-border/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <label className="text-sm font-semibold text-foreground">Horário</label>
                    </div>
                    <p className="text-foreground font-medium">{formatTime(selectedAppointment.time)}</p>
                    <p className="text-sm text-muted-foreground">Duração: {selectedAppointment.duration} minutos</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/30 dark:bg-muted/20 border border-border/50 dark:border-border/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <label className="text-sm font-semibold text-foreground">Local</label>
                    </div>
                    <p className="text-foreground font-medium">{selectedAppointment.companyName}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 dark:bg-muted/20 border border-border/50 dark:border-border/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <label className="text-sm font-semibold text-foreground">Preço</label>
                    </div>
                    <p className="text-2xl font-bold text-foreground">R$ {selectedAppointment.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              {/* Informações do Cliente */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-muted/20 to-muted/10 dark:from-muted/10 dark:to-muted/5 border border-border/50 dark:border-border/30">
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Informações do Cliente
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 dark:bg-muted/10">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Nome</p>
                      <p className="text-sm font-semibold text-foreground">{selectedAppointment.userName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 dark:bg-muted/10">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Email</p>
                      <p className="text-sm font-semibold text-foreground">{selectedAppointment.userEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 dark:bg-muted/10">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Telefone</p>
                      <p className="text-sm font-semibold text-foreground">{selectedAppointment.userPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedAppointment.notes && (
                <div className="p-6 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-200/50 dark:border-amber-800/50">
                  <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    Observações
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedAppointment.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
