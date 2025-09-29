export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  companyName: string;
  companyId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string; // ISO date string
  time: string; // HH:MM format
  duration: number; // in minutes
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface AppointmentFilters {
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  dateFrom?: string;
  dateTo?: string;
  companyId?: string;
  serviceId?: string;
}

export interface AppointmentStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

