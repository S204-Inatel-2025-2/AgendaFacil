import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { useLanguage } from './LanguageProvider';
import toast from 'react-hot-toast';

interface ForgotPasswordPageProps {
  onBack: () => void;
  onBackToLogin: () => void;
}

export function ForgotPasswordPage({ onBack, onBackToLogin }: ForgotPasswordPageProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simular envio de email (hardcoded)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular sucesso
      setIsEmailSent(true);
      toast.success('📧 Email de recuperação enviado com sucesso!');
      console.log('Email de recuperação enviado para:', email);
    } catch (err) {
      setError('Erro ao enviar email. Tente novamente.');
      toast.error('❌ Erro ao enviar email de recuperação.');
      console.error('Erro no envio:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setEmail(value);
    if (error) setError(null);
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

  if (isEmailSent) {
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
        
        {/* Floating orbs */}
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

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <motion.div variants={cardVariants}>
              <Card className="p-8 bg-card/80 backdrop-blur-xl border-border/50 shadow-xl text-center">
                {/* Success icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 mx-auto"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </motion.div>

                <motion.h1
                  className="text-2xl font-semibold mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {t.forgot_password_success_title}
                </motion.h1>
                
                <motion.p
                  className="text-muted-foreground mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {t.forgot_password_success_message} <strong>{email}</strong>. 
                  {t.forgot_password_success_instructions}
                </motion.p>

                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    onClick={onBackToLogin}
                    className="w-full h-12 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white font-medium"
                  >
                    {t.forgot_password_back_to_login_button}
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setIsEmailSent(false);
                      setEmail('');
                    }}
                    variant="outline"
                    className="w-full h-12"
                  >
                    {t.forgot_password_resend_button}
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

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
      
      {/* Floating orbs */}
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

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Back button */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              onClick={onBack}
              variant="ghost"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.back_to_home}
            </Button>
          </motion.div>

          {/* Forgot password card */}
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
                    🔒
                  </motion.div>
                </motion.div>
                
                <motion.h1
                  className="text-2xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {t.forgot_password_title}
                </motion.h1>
                
                <motion.p
                  className="text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {t.forgot_password_subtitle}
                </motion.p>
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t.forgot_password_email}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.forgot_password_email_placeholder}
                      value={email}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="pl-10 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white font-medium transition-all duration-200"
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
                      {t.forgot_password_loading}
                    </motion.div>
                  ) : (
                    t.forgot_password_submit
                  )}
                </Button>
              </motion.form>

              {/* Back to login */}
              <motion.div
                className="text-center mt-8 pt-6 border-t border-border/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-sm text-muted-foreground">
                  {t.forgot_password_back_to_login}{' '}
                  <button
                    type="button"
                    onClick={onBackToLogin}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {t.forgot_password_login_link}
                  </button>
                </p>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
