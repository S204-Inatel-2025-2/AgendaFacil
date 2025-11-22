import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Edit2, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

interface ProfilePageProps {
  onBack?: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome_completo: user?.nome_completo || '',
    email: user?.email || '',
    telefone: user?.telefone || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Sincronizar formData quando o user mudar
  useEffect(() => {
    if (user) {
      setFormData({
        nome_completo: user.nome_completo || '',
        email: user.email || '',
        telefone: user.telefone || ''
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
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

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // TODO: Implementar chamada à API para atualizar perfil
      // Atualiza o contexto de autenticação e o localStorage
      updateUser(formData);
      
      toast.success('✅ Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error) {
      toast.error('❌ Erro ao atualizar perfil. Tente novamente.');
      console.error('Erro ao atualizar perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('❌ As senhas não coincidem');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('❌ A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implementar chamada à API para alterar senha
      toast.success('✅ Senha alterada com sucesso!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsEditingPassword(false);
    } catch (error) {
      toast.error('❌ Erro ao alterar senha. Tente novamente.');
      console.error('Erro ao alterar senha:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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

  if (!user) {
    return (
      <motion.div 
        className="min-h-screen bg-background flex items-center justify-center"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <Card className="p-8 bg-card/80 backdrop-blur-xl border-border/50 shadow-xl">
          <p className="text-muted-foreground">Você precisa estar logado para acessar o perfil.</p>
        </Card>
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

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8 max-w-4xl">
        {/* Profile Header Card */}
        <motion.div variants={cardVariants} className="mb-6">
          <Card className="p-8 bg-card/80 backdrop-blur-xl border-border/50 shadow-xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-2xl font-bold">
                    {getInitials(user.nome_completo)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <motion.h1
                  className="text-3xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {user.nome_completo}
                </motion.h1>
                <motion.div
                  className="flex flex-col md:flex-row items-center md:items-start gap-4 text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{user.telefone}</span>
                  </div>
                </motion.div>
              </div>

              {/* Edit Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar Perfil
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="flex items-center gap-2 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white"
                    >
                      <Save className="w-4 h-4" />
                      Salvar
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          nome_completo: user.nome_completo,
                          email: user.email,
                          telefone: user.telefone
                        });
                      }}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Personal Information Card */}
        <motion.div variants={cardVariants} className="mb-6">
          <Card className="p-8 bg-card/80 backdrop-blur-xl border-border/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Informações Pessoais</h2>
            </div>

            <div className="space-y-6">
              {/* Name field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nome Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.nome_completo}
                    onChange={(e) => handleInputChange('nome_completo', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Phone field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Telefone
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                    maxLength={15}
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Security Card */}
        <motion.div variants={cardVariants}>
          <Card className="p-8 bg-card/80 backdrop-blur-xl border-border/50 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Segurança</h2>
              </div>
              {!isEditingPassword && (
                <Button
                  onClick={() => setIsEditingPassword(true)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Alterar Senha
                </Button>
              )}
            </div>

            {isEditingPassword ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-sm font-medium">
                    Senha Atual
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="Digite sua senha atual"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      className="pl-10 pr-12 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-medium">
                    Nova Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Digite sua nova senha"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      className="pl-10 pr-12 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirmar Nova Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirme sua nova senha"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-12 h-12 bg-input-background border-border/50 focus:border-primary/50 focus:ring-primary/20"
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

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSavePassword}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white"
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
                        Salvando...
                      </motion.div>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Salvar Senha
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditingPassword(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                    }}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="text-muted-foreground text-sm">
                <p>Mantenha sua conta segura alterando sua senha regularmente.</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={() => {
              logout();
              toast.success('👋 Logout realizado com sucesso!');
              if (onBack) onBack();
            }}
            variant="outline"
            className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive"
          >
            Sair da Conta
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

