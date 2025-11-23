import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Menu, X, User, Bell, Search, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageProvider';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

interface HeaderProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onAppointmentsClick?: () => void;
  onLogoutClick?: () => void;
  onProfileClick?: () => void;
}

export function Header({ onLoginClick, onRegisterClick, onAppointmentsClick, onLogoutClick, onProfileClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      
      toast.success('Logout realizado com sucesso! Até logo!', { id: 'logout' });
      // Simular delay para mostrar o loading
      await new Promise(resolve => setTimeout(resolve, 700));
      
      logout();
      
      // Redirecionar para a home
      onLogoutClick?.();
      
      // Scroll suave para o topo da página
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      toast.error('Erro ao fazer logout. Tente novamente.', { id: 'logout' });
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAppointmentsClick = () => {
    onAppointmentsClick?.();
  };

  const navItems = [
    { label: t.nav_my_appointments, href: '#appointments', onClick: handleAppointmentsClick },
    { label: t.nav_reagendar, href: '#reagendar', onClick: handleAppointmentsClick },
    { label: t.nav_historico, href: '#historico', onClick: handleAppointmentsClick },
    { label: t.nav_fav, href: '#fav', onClick: handleAppointmentsClick },
  ];

  return (
    <>
      {/* Loading overlay durante logout */}
      {isLoggingOut && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card p-6 rounded-2xl shadow-xl border border-border/50 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <motion.div
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <h3 className="text-lg font-semibold text-foreground mb-2">Fazendo logout...</h3>
            <p className="text-sm text-muted-foreground">Redirecionando para a página inicial</p>
          </motion.div>
        </motion.div>
      )}

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm' 
            : 'bg-transparent'
        } ${isLoggingOut ? 'pointer-events-none' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            onClick={() => window.location.href = '/'}
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              AgendaFácil
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.onClick ? undefined : item.href}
                onClick={item.onClick}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative cursor-pointer"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">

            {isAuthenticated ? (
              // Usuário logado
              <>
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-sm">
                    <span className="text-muted-foreground">Bem-vindo, </span>
                    <span className="font-medium text-foreground">
                      {user?.nome_completo?.split(' ')[0] || 'Usuário'}
                    </span>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={onProfileClick}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: isLoggingOut ? 1 : 1.05 }}
                  whileTap={{ scale: isLoggingOut ? 1 : 0.95 }}
                >
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isLoggingOut}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleLogout}
                  >
                    {isLoggingOut ? (
                      <motion.div
                        className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <LogOut className="w-4 h-4 mr-2" />
                    )}
                    {isLoggingOut ? 'Saindo...' : 'Sair'}
                  </Button>
                </motion.div>
              </>
            ) : (
              // Usuário não logado
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={onLoginClick}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t.login}
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={onRegisterClick}
                  >
                    {t.register}
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg ${
                isLoggingOut ? 'pointer-events-none opacity-75' : ''
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.onClick ? undefined : item.href}
                    onClick={item.onClick ? () => {
                      setIsMobileMenuOpen(false);
                      item.onClick?.();
                    } : () => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                <div className="pt-4 border-t border-border space-y-3">
                  {isAuthenticated ? (
                    // Usuário logado no mobile
                    <>
                      <div className="px-2 py-2 text-sm">
                        <span className="text-muted-foreground">Bem-vindo, </span>
                        <span className="font-medium text-foreground">
                          {user?.nome_completo?.split(' ')[0] || 'Usuário'}
                        </span>
                      </div>
                      
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground cursor-pointer"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onProfileClick?.();
                        }}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Perfil
                      </Button>
                      
                      <Button
                        variant="outline"
                        disabled={isLoggingOut}
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={async () => {
                          setIsMobileMenuOpen(false);
                          await handleLogout();
                        }}
                      >
                        {isLoggingOut ? (
                          <motion.div
                            className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          <LogOut className="w-4 h-4 mr-2" />
                        )}
                        {isLoggingOut ? 'Saindo...' : 'Sair'}
                      </Button>
                    </>
                  ) : (
                    // Usuário não logado no mobile
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground cursor-pointer"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onLoginClick?.();
                        }}
                      >
                        <User className="w-4 h-4 mr-2" />
                        {t.login}
                      </Button>
                      
                      <Button
                        className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white border-0 cursor-pointer"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onRegisterClick?.();
                        }}                  
                        >
                        {t.register}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
    </>
  );
}