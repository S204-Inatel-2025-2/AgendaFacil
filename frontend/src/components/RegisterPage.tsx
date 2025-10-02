import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Apple, Smartphone, User, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { useLanguage } from './LanguageProvider';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

interface RegisterPageProps {
  onBack: () => void;
  onLoginClick: () => void;
}

export function RegisterPage({ onBack, onLoginClick }: RegisterPageProps) {
  const { t } = useLanguage();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    telefone: '',
    senha: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Validação de senha
    if (formData.senha !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }
    
    try {
      const success = await register({
        nome_completo: formData.nome_completo,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.senha
      });
      
      if (success) {
        toast.success('🎉 Cadastro realizado com sucesso! Bem-vindo ao AgendaFácil!');
        console.log('Cadastro realizado com sucesso!');
        onBack();
      } else {
        setError('Erro no cadastro. Tente novamente.');
        toast.error('❌ Erro no cadastro. Verifique os dados e tente novamente.');
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
      console.error('Erro no cadastro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatPhone = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Apply Brazilian phone number format
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleInputChange('telefone', formatted);
  };

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
        duration: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background relative overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5" />
      
      {/* Floating orbs for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-18">
        <div className="w-full max-w-md">

          {/* Register card */}
          <motion.div variants={cardVariants}>
            <Card className="p-8 bg-card/80 backdrop-blur-xl border-border/50 shadow-xl">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  <motion.div
                    className="text-white font-bold text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    A
                  </motion.div>
                </motion.div>
                
                <motion.h1
                  className="text-2xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {t.register_title}
                </motion.h1>
                
                <motion.p
                  className="text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {t.register_subtitle}
                </motion.p>
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Register form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {/* Name field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {t.register_name}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder={t.register_name_placeholder}
                      value={formData.nome_completo}
                      onChange={(e) => handleInputChange('nome_completo', e.target.value)}
                      className="pl-10 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t.register_email}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.register_email_placeholder}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                {/* Phone field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    {t.register_phone}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t.register_phone_placeholder}
                      value={formData.telefone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="pl-10 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      maxLength={15}
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    {t.register_password}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t.register_password_placeholder}
                      value={formData.senha}
                      onChange={(e) => handleInputChange('senha', e.target.value)}
                      className="pl-10 pr-12 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    {t.register_confirm_password}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t.register_confirm_password_placeholder}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-12 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms agreement */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label 
                    htmlFor="terms" 
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    {t.register_agree_terms}{' '}
                    <button
                      type="button"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {t.register_terms_link}
                    </button>{' '}
                    {t.register_and_text}{' '}
                    <button
                      type="button"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {t.register_privacy_link}
                    </button>
                  </Label>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isLoading || !agreeTerms}
                  className="w-full h-12 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      {t.register_loading}
                    </motion.div>
                  ) : (
                    t.register_submit
                  )}
                </Button>
              </motion.form>

              {/* Divider */}
              <motion.div
                className="my-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-sm text-muted-foreground">
                    {t.register_social_divider}
                  </span>
                </div>
              </motion.div>

              {/* Social register buttons */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-border/50 hover:border-border hover:bg-accent/50 transition-all duration-200"
                >
                  <Apple className="w-4 h-4 mr-2" />
                  {t.register_apple}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-border/50 hover:border-border hover:bg-accent/50 transition-all duration-200"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  {t.register_google}
                </Button>
              </motion.div>

              {/* Login link */}
              <motion.div
                className="text-center mt-8 pt-6 border-t border-border/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm text-muted-foreground">
                  {t.register_have_account}{' '}
                  <button
                    type="button"
                    onClick={onLoginClick}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {t.register_login_link}
                  </button>
                </p>
              </motion.div>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p className="text-xs text-muted-foreground">
              {t.register_terms_text}{' '}
              <button className="text-primary hover:text-primary/80 transition-colors">
                {t.login_terms}
              </button>{' '}
              e{' '}
              <button className="text-primary hover:text-primary/80 transition-colors">
                {t.login_privacy}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}