import { motion } from 'framer-motion';
import { Calendar, RotateCcw, History, Heart, Clock, UserCheck } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useLanguage } from './LanguageProvider';

interface QuickAccessProps {
  onOpenFavorites?: () => void;
}

export function QuickAccess({onOpenFavorites}: QuickAccessProps) {
  const { t } = useLanguage();

  
  const handleAppointmentsClick = () => {
    onOpenFavorites?.();
  };
  
  const quickActions = [
    {
      icon: Calendar,
      title: t.quick_book,
      description: t.quick_book_desc,
      gradient: 'from-emerald-500 to-green-600',
      delay: 0.1,
      href: '#appointments',
      onClick: handleAppointmentsClick //TEM QUE ARRUMAR ISSO AQUI
    },
    {
      icon: RotateCcw,
      title: t.quick_reschedule,
      description: t.quick_reschedule_desc,
      gradient: 'from-blue-500 to-cyan-600',
      delay: 0.2
    },
    {
      icon: History,
      title: t.quick_history,
      description: t.quick_history_desc,
      gradient: 'from-purple-500 to-indigo-600',
      delay: 0.3
    },
    {
      icon: Heart,
      title: t.quick_favorites,
      description: t.quick_favorites_desc,
      gradient: 'from-pink-500 to-rose-600',
      delay: 0.4
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.quick_access_title}
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.quick_access_subtitle}
          </p>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: action.delay,
                ease: [0.23, 1, 0.32, 1]
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              <Card onClick={action.onClick} className="relative h-40 p-6 bg-background/50 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300 overflow-hidden group cursor-pointer">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon Background */}
                <motion.div
                  className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${action.gradient} opacity-10 rounded-full`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <action.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <h3 className="font-semibold text-foreground mb-2">
                    {action.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground flex-1">
                    {action.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}