import { motion } from 'framer-motion';
import { Calendar, Star, Users, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage } from './LanguageProvider';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  const { t } = useLanguage();

  const stats = [
    { 
      icon: Users, 
      value: '15.000+', 
      label: t.hero_stats_providers,
      color: 'text-blue-500' 
    },
    { 
      icon: Calendar, 
      value: '250K+', 
      label: t.hero_stats_bookings,
      color: 'text-emerald-500' 
    },
    { 
      icon: MapPin, 
      value: '120+', 
      label: t.hero_stats_cities,
      color: 'text-purple-500' 
    },
    { 
      icon: Star, 
      value: '4.9', 
      label: t.hero_stats_rating,
      color: 'text-orange-500' 
    }
  ];

  const serviceCards = [
    {
      title: t.service_medical,
      description: t.service_medical_desc,
      icon: '🏥',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      title: t.service_beauty,
      description: t.service_beauty_desc,
      icon: '💅',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      title: t.service_technical,
      description: t.service_technical_desc,
      icon: '🔧',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: t.service_education,
      description: t.service_education_desc,
      icon: '📚',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      title: t.service_wellness,
      description: t.service_wellness_desc,
      icon: '🧘',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: t.service_automotive,
      description: t.service_automotive_desc,
      icon: '🚗',
      gradient: 'from-gray-500 to-slate-600'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Agendamento 24/7 disponível
            </motion.div>

            {/* Main Heading */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {t.hero_title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t.hero_subtitle}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white border-0 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {t.hero_cta_primary}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm px-8 py-6 text-lg font-semibold hover:bg-primary/5 transition-all duration-300"
              >
                {t.hero_cta_secondary}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Service Cards */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1713726679712-864a40cb8e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwYXBwb2ludG1lbnQlMjBzY2hlZHVsaW5nfGVufDF8fHx8MTc1NjIyNDM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Healthcare professional"
                className="w-full h-full object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-emerald-600/10" />
            </div>

            {/* Service Cards Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-4 p-6">
              {serviceCards.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + index * 0.1,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="relative h-40 p-4 bg-background/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group cursor-pointer">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="text-2xl mb-2">{service.icon}</div>
                      <h3 className="font-semibold text-foreground text-sm mb-2 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs text-muted-foreground flex-1 leading-relaxed">
                        {service.description}
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
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}