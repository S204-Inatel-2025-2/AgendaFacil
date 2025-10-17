import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider, useLanguage } from './components/LanguageProvider';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QuickAccess } from './components/QuickAccess';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { AuthProvider } from './hooks/useAuth';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { serviceCategories } from './components/ServiceData';
import { ServiceCategoryPage } from './components/ServiceCategoryPage';
import { AppointmentsPage } from './components/AppointmentsPage';

// Apple-style Loading Component
function AppleLoadingScreen() {
  const { t } = useLanguage();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
      }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="text-center">
        {/* Apple-style loading ring */}
        <motion.div
          className="relative w-16 h-16 mx-auto mb-8"
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-muted"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-emerald-600 opacity-20"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h2
            className="text-xl mb-2 font-semibold text-foreground"
          >
            {t.loading_title}
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t.loading_subtitle}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Apple-style Page Transition
function ApplePageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 20,
        scale: 0.98
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: 1
      }}
      exit={{ 
        opacity: 0, 
        y: -10, 
        scale: 1.02
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// Apple-style Redirecting Screen
function RedirectingScreen() {

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
      }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="text-center">
        {/* Apple-style loading ring */}
        <motion.div
          className="relative w-16 h-16 mx-auto mb-8"
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-muted"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-emerald-600 opacity-20"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h2
            className="text-xl mb-2 font-semibold text-foreground"
          >
            Redirecionando...
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Você precisa fazer login para acessar seus agendamentos
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'register' | 'service-category' | 'service-detail' | 'appointments'>('home');
  const [currentServiceCategory, setCurrentServiceCategory] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const handleServiceCategoryClick = (categoryKey: string) => {
    setCurrentServiceCategory(categoryKey);
    setCurrentPage('service-category');
  };

  const handleCompanySelect = (company: any) => {
    setSelectedCompany(company);
    setCurrentPage('service-detail');
  };

  const handleAppointmentsClick = async () => {
    // Simular verificação de autenticação
    const isAuthenticated = localStorage.getItem('user') !== null;
    
    if (!isAuthenticated) {
      setIsRedirecting(true);
      
      // Simular delay de redirecionamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsRedirecting(false);
      setCurrentPage('login');
    } else {
      setCurrentPage('appointments');
    }
  };

  const handleLogoutClick = () => {
    setCurrentPage('home');
  };

  useEffect(() => {
    window.scrollTo(0,0); // Scroll to top on page change
  }, [currentPage]);

  useEffect(() => {
    // Apple-style loading duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Enable smooth scrolling with Apple-style behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Preload critical images
    const imagesToPreload = [
      'https://unsplash.com/pt-br/fotografias/uma-foto-desfocada-de-um-fundo-azul-claro-XSL3nmNMl5Ilib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ];
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Section animation variants with Apple-style easing
  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number]

      }
    }
  };

  return (
    <div className="min-h-screen relative bg-background">
      <AnimatePresence mode="wait">
        {isLoading && <AppleLoadingScreen key="loading" />}
        {isRedirecting && <RedirectingScreen key="redirecting" />}
      </AnimatePresence>

    {/* ✅ Header fixo em todas as páginas */}
      {!isLoading && (
        <Header 
          onLoginClick={() => setCurrentPage('login')}
          onRegisterClick={() => setCurrentPage('register')}
          onAppointmentsClick={handleAppointmentsClick}
          onLogoutClick={handleLogoutClick}
        />
      )}

      <FloatingButtons/>

      <AnimatePresence mode="wait">
        {!isLoading && currentPage === 'home' && (
          <ApplePageTransition key="main">
            {/* Hero section - full screen without padding conflicts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <HeroSection onServiceClick={handleServiceCategoryClick} />
            </motion.div>
            
            {/* Main content sections */}
            <main className="relative z-10">
              {/* Staggered section animations */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <QuickAccess />
              </motion.div>
          
            </main>
            
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Footer />
            </motion.div>
          
          </ApplePageTransition>
        )}

         {!isLoading && currentPage === 'login' && (
          <LoginPage 
            key="login" 
            onBack={() => setCurrentPage('home')}
            onRegisterClick={() => setCurrentPage('register')}
          />
        )}

        {!isLoading && currentPage === 'register' && (
          <RegisterPage 
            key="register" 
            onBack={() => setCurrentPage('home')}
            onLoginClick={() => setCurrentPage('login')}
          />
        )}

         {!isLoading && currentPage === 'service-category' && currentServiceCategory && (
          <ServiceCategoryPage
            key={`category-${currentServiceCategory}`}
            onBack={() => setCurrentPage('home')}
            onCompanySelect={handleCompanySelect}
            categoryKey={currentServiceCategory}
            title={serviceCategories[currentServiceCategory as keyof typeof serviceCategories].title}
            description={serviceCategories[currentServiceCategory as keyof typeof serviceCategories].description}
            icon={serviceCategories[currentServiceCategory as keyof typeof serviceCategories].icon}
            gradient={serviceCategories[currentServiceCategory as keyof typeof serviceCategories].gradient}
            companies={serviceCategories[currentServiceCategory as keyof typeof serviceCategories].companies}
          />
        )}

        {!isLoading && currentPage === 'service-detail' && selectedCompany && currentServiceCategory && (
          <ServiceDetailPage
            key={`detail-${selectedCompany.id}`}
            onBack={() => setCurrentPage('service-category')}
            company={selectedCompany}
            categoryTitle={serviceCategories[currentServiceCategory as keyof typeof serviceCategories].title}
            gradient={serviceCategories[currentServiceCategory as keyof typeof serviceCategories].gradient}
          />
        )}
      </AnimatePresence>

      {/* Apple-style scroll progress indicator - only show on home page */}
      {currentPage === 'home' && (
      <motion.div
        className="fixed top-0 left-0 w-full h-0.5 bg-primary z-50 origin-left"
        style={{
          scaleX: typeof window !== 'undefined' 
            ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) 
            : 0
        }}
        initial={{ scaleX: 0 }}
      />
      )}

      {!isLoading && currentPage === 'appointments' && (
        <ApplePageTransition key="appointments">
          <AppointmentsPage 
            onBack={() => setCurrentPage('home')}
          />
        </ApplePageTransition>
      )}
      
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
          success: {
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}