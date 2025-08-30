import { motion } from 'framer-motion';
import { ArrowRight, Clock, Star, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useLanguage } from './LanguageProvider';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ServicesByPersona() {
  const { t } = useLanguage();

  const serviceCategories = [
    {
      category: t.category_health,
      description: t.category_health_desc,
      image: "https://images.unsplash.com/photo-1631217873430-6eabf5ee1b0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9uJTIwZG9jdG9yfGVufDF8fHx8MTc1NjE5NzE5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: 'from-blue-500 to-cyan-600',
      services: [
        { name: t.health_general, price: 'R$ 120', time: '30min', rating: '4.9' },
        { name: t.health_dentist, price: 'R$ 200', time: '45min', rating: '4.8' },
        { name: t.health_psychologist, price: 'R$ 150', time: '50min', rating: '4.9' },
        { name: t.health_dermatologist, price: 'R$ 180', time: '40min', rating: '4.7' },
        { name: t.health_gynecologist, price: 'R$ 160', time: '35min', rating: '4.8' },
        { name: t.health_cardiologist, price: 'R$ 220', time: '45min', rating: '4.9' }
      ]
    },
    {
      category: t.category_beauty,
      description: t.category_beauty_desc,
      image: "https://images.unsplash.com/photo-1626383126210-15c15e62d9ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHNlcnZpY2VzfGVufDF8fHx8MTc1NjIxMjc4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: 'from-pink-500 to-rose-600',
      services: [
        { name: t.beauty_haircut, price: 'R$ 50', time: '60min', rating: '4.8' },
        { name: t.beauty_manicure, price: 'R$ 35', time: '45min', rating: '4.7' },
        { name: t.beauty_massage, price: 'R$ 80', time: '90min', rating: '4.9' },
        { name: t.beauty_facial, price: 'R$ 120', time: '75min', rating: '4.8' },
        { name: t.beauty_eyebrows, price: 'R$ 40', time: '30min', rating: '4.7' },
        { name: t.beauty_makeup, price: 'R$ 100', time: '45min', rating: '4.8' }
      ]
    },
    {
      category: t.category_technical,
      description: t.category_technical_desc,
      image: "https://images.unsplash.com/photo-1753964724380-2c5ae02512a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljYWwlMjByZXBhaXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc1NjIyNDQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: 'from-orange-500 to-red-600',
      services: [
        { name: t.tech_computer, price: 'R$ 80', time: '60min', rating: '4.6' },
        { name: t.tech_phone, price: 'R$ 60', time: '30min', rating: '4.7' },
        { name: t.tech_appliances, price: 'R$ 100', time: '90min', rating: '4.5' },
        { name: t.tech_plumbing, price: 'R$ 120', time: '120min', rating: '4.8' },
        { name: t.tech_electrical, price: 'R$ 90', time: '75min', rating: '4.7' },
        { name: t.tech_air_conditioning, price: 'R$ 150', time: '90min', rating: '4.6' }
      ]
    },
    {
      category: t.category_education,
      description: t.category_education_desc,
      image: "https://images.unsplash.com/photo-1660128359777-c7e5f29e4106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwdHV0b3IlMjBlZHVjYXRpb258ZW58MXx8fHwxNzU2MjI0NDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: 'from-purple-500 to-indigo-600',
      services: [
        { name: t.edu_math, price: 'R$ 60', time: '60min', rating: '4.9' },
        { name: t.edu_portuguese, price: 'R$ 55', time: '60min', rating: '4.8' },
        { name: t.edu_english, price: 'R$ 70', time: '60min', rating: '4.9' },
        { name: t.edu_physics, price: 'R$ 65', time: '60min', rating: '4.7' },
        { name: t.edu_chemistry, price: 'R$ 65', time: '60min', rating: '4.8' },
        { name: t.edu_music, price: 'R$ 80', time: '45min', rating: '4.9' }
      ]
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl" />
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
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            🎯 Categorias de Serviços
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.services_title}
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.services_subtitle}
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="space-y-20">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: categoryIndex * 0.2,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              {/* Category Info */}
              <div className={`space-y-8 ${categoryIndex % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="space-y-4">
                  <motion.div
                    className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${category.gradient} text-white text-sm font-medium`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {category.category}
                  </motion.div>
                  
                  <motion.h3
                    className="text-3xl font-bold text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {category.description}
                  </motion.h3>
                </div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {category.services.map((service, serviceIndex) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.5 + serviceIndex * 0.1
                      }}
                      whileHover={{ 
                        y: -4,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Card className="p-4 bg-background/80 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground text-sm">
                            {service.name}
                          </h4>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">
                              {service.rating}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="text-xs">
                              {service.price}
                            </Badge>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {service.time}
                            </div>
                          </div>
                          
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${category.gradient} hover:opacity-90 text-white border-0 px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  >
                    {t.see_all} {category.category}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>

              {/* Category Image */}
              <motion.div
                className={`relative ${categoryIndex % 2 === 1 ? 'lg:order-1' : ''}`}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                  
                  {/* Floating Card */}
                  <motion.div
                    className="absolute bottom-6 left-6 right-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Card className="p-4 bg-background/90 backdrop-blur-md border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {category.services.length} serviços disponíveis
                          </h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            Profissionais próximos a você
                          </div>
                        </div>
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                          <ArrowRight className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}