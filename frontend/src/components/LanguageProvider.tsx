import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Translations for the service scheduling platform
const translations = {
  pt: {
    // Loading
    loading_title: "AgendaFácil",
    loading_subtitle: "Conectando você aos melhores serviços",
    
    // Header
    nav_services: "Serviços",
    nav_schedule: "Agendar",
    nav_my_appointments: "Meus Agendamentos",
    nav_about: "Sobre",
    nav_contact: "Contato",
    nav_help: "Ajuda",
    login: "Entrar",
    register: "Cadastrar",
    
    // Hero Section
    hero_title: "Agende seus serviços com facilidade",
    hero_subtitle: "Conectamos você aos melhores profissionais da sua região. Agendamento online rápido, seguro e confiável.",
    hero_cta_primary: "Agendar Agora",
    hero_cta_secondary: "Ver Serviços",
    hero_stats_providers: "Profissionais",
    hero_stats_bookings: "Agendamentos",
    hero_stats_cities: "Cidades",
    hero_stats_rating: "Avaliação Média",
    
    // Service Cards
    service_medical: "Consultas Médicas",
    service_medical_desc: "Agende consultas com especialistas",
    service_beauty: "Beleza & Estética",
    service_beauty_desc: "Salões, spas e tratamentos",
    service_technical: "Assistência Técnica",
    service_technical_desc: "Reparos e manutenção",
    service_education: "Aulas Particulares",
    service_education_desc: "Professores e tutores",
    service_wellness: "Bem-estar",
    service_wellness_desc: "Massagem, fisioterapia",
    service_automotive: "Automotivo",
    service_automotive_desc: "Mecânica e estética veicular",
    
    // Quick Access
    quick_access_title: "Acesso Rápido",
    quick_access_subtitle: "Principais funcionalidades em um clique",
    quick_book: "Agendar Serviço",
    quick_book_desc: "Reserve seu horário rapidamente",
    quick_reschedule: "Reagendar",
    quick_reschedule_desc: "Altere seus agendamentos",
    quick_history: "Histórico",
    quick_history_desc: "Veja seus agendamentos anteriores",
    quick_favorites: "Favoritos",
    quick_favorites_desc: "Seus profissionais preferidos",
    
    // Services by Category
    services_title: "Serviços por Categoria",
    services_subtitle: "Encontre exatamente o que você precisa",
    
    // Category: Health
    category_health: "Saúde",
    category_health_desc: "Cuidados médicos e bem-estar",
    health_general: "Clínico Geral",
    health_dentist: "Dentista",
    health_psychologist: "Psicólogo",
    health_dermatologist: "Dermatologista",
    health_gynecologist: "Ginecologista",
    health_cardiologist: "Cardiologista",
    
    // Category: Beauty
    category_beauty: "Beleza",
    category_beauty_desc: "Cuidados estéticos e bem-estar",
    beauty_haircut: "Corte de Cabelo",
    beauty_manicure: "Manicure",
    beauty_massage: "Massagem",
    beauty_facial: "Limpeza de Pele",
    beauty_eyebrows: "Design de Sobrancelhas",
    beauty_makeup: "Maquiagem",
    
    // Category: Technical
    category_technical: "Técnico",
    category_technical_desc: "Reparos e manutenção",
    tech_computer: "Informática",
    tech_phone: "Celular",
    tech_appliances: "Eletrodomésticos",
    tech_plumbing: "Encanamento",
    tech_electrical: "Elétrica",
    tech_air_conditioning: "Ar Condicionado",
    
    // Category: Education
    category_education: "Educação",
    category_education_desc: "Aulas e tutoria personalizada",
    edu_math: "Matemática",
    edu_portuguese: "Português",
    edu_english: "Inglês",
    edu_physics: "Física",
    edu_chemistry: "Química",
    edu_music: "Música",
    
    // News Section
    news_title: "Novidades",
    news_subtitle: "Fique por dentro das últimas atualizações",
    news_1_title: "Novos profissionais na plataforma",
    news_1_excerpt: "Mais de 500 novos prestadores de serviço se cadastraram este mês",
    news_2_title: "App móvel disponível",
    news_2_excerpt: "Baixe nosso aplicativo e agende serviços pelo seu smartphone",
    news_3_title: "Sistema de avaliações atualizado",
    news_3_excerpt: "Nova interface para avaliar e comentar sobre os serviços",
    
    // Agenda Section
    agenda_title: "Agenda Inteligente",
    agenda_subtitle: "Visualize e gerencie seus agendamentos",
    agenda_today: "Hoje",
    agenda_week: "Semana",
    agenda_month: "Mês",
    agenda_no_appointments: "Nenhum agendamento para hoje",
    agenda_book_service: "Agendar Serviço",
    
    // Transparency/Reviews Section
    reviews_title: "Avaliações e Transparência",
    reviews_subtitle: "Veja o que nossos usuários estão dizendo",
    reviews_average: "Avaliação Média",
    reviews_total: "Total de Avaliações",
    reviews_5_star: "5 Estrelas",
    reviews_4_star: "4 Estrelas",
    
    // Testimonials
    testimonials_title: "Depoimentos",
    testimonials_subtitle: "Experiências reais de nossos usuários",
    testimonial_1_text: "Excelente plataforma! Consegui agendar minha consulta médica em poucos minutos.",
    testimonial_1_author: "Maria Silva",
    testimonial_1_service: "Consulta Médica",
    testimonial_2_text: "Muito prático para agendar serviços de beleza. Os profissionais são ótimos!",
    testimonial_2_author: "Ana Costa",
    testimonial_2_service: "Salão de Beleza",
    testimonial_3_text: "Resolveu meu problema técnico rapidamente. Recomendo!",
    testimonial_3_author: "João Santos",
    testimonial_3_service: "Assistência Técnica",
    
    // Footer
    footer_about: "Sobre",
    footer_about_desc: "Conectamos pessoas aos melhores profissionais da sua região",
    footer_services: "Serviços",
    footer_health: "Saúde",
    footer_beauty: "Beleza",
    footer_technical: "Técnico",
    footer_education: "Educação",
    footer_support: "Suporte",
    footer_help: "Central de Ajuda",
    footer_contact: "Contato",
    footer_faq: "FAQ",
    footer_terms: "Termos de Uso",
    footer_privacy: "Privacidade",
    footer_legal: "Legal",
    footer_accessibility: "Acessibilidade",
    footer_follow: "Siga-nos",
    footer_newsletter: "Newsletter",
    footer_newsletter_desc: "Receba novidades e promoções",
    footer_newsletter_placeholder: "Seu e-mail",
    footer_newsletter_subscribe: "Inscrever",
    footer_copyright: "© 2024 AgendaFácil. Todos os direitos reservados.",
    
    // Floating Buttons
    theme_toggle: "Alternar tema",
    scroll_to_top: "Voltar ao topo",
    
    // Accessibility
    contrast_high: "Alto contraste",
    contrast_normal: "Contraste normal",
    text_size_increase: "Aumentar texto",
    text_size_decrease: "Diminuir texto",
    
    // Common Actions
    book_now: "Agendar Agora",
    view_more: "Ver Mais",
    see_all: "Ver Todos",
    learn_more: "Saiba Mais",
    get_started: "Começar",
    choose_time: "Escolher Horário",
    confirm_booking: "Confirmar Agendamento",
    cancel: "Cancelar",
    save: "Salvar",
    edit: "Editar",
    delete: "Excluir",
    
    // Login Page
    back_to_home: "Voltar ao início",
    login_title: "Entrar na sua conta",
    login_subtitle: "Acesse seus agendamentos e serviços",
    login_email: "E-mail",
    login_email_placeholder: "Digite seu e-mail",
    login_password: "Senha",
    login_password_placeholder: "Digite sua senha",
    login_forgot_password: "Esqueceu a senha?",
    login_loading: "Entrando...",
    login_submit: "Entrar",
    login_social_divider: "ou continue com",
    login_apple: "Continuar com Apple",
    login_google: "Continuar com Google",
    login_no_account: "Não tem uma conta?",
    login_create_account: "Criar conta",
    login_terms_text: "Ao continuar, você concorda com nossos",
    login_terms: "Termos de Uso",
    login_privacy: "Política de Privacidade",
    
    // Register Page
    register_title: "Crie sua conta",
    register_subtitle: "Junte-se ao AgendaFácil e comece a agendar serviços",
    register_name: "Nome completo",
    register_name_placeholder: "Digite seu nome completo",
    register_email: "E-mail",
    register_email_placeholder: "seu@email.com",
    register_phone: "Telefone",
    register_phone_placeholder: "(00) 00000-0000",
    register_password: "Senha",
    register_password_placeholder: "Crie uma senha segura",
    register_confirm_password: "Confirmar senha",
    register_confirm_password_placeholder: "Digite a senha novamente",
    register_agree_terms: "Aceito os",
    register_terms_link: "Termos de Uso",
    register_and_text: "e",
    register_privacy_link: "Política de Privacidade",
    register_submit: "Criar Conta",
    register_loading: "Criando conta...",
    register_social_divider: "ou cadastre-se com",
    register_apple: "Cadastrar com Apple ID",
    register_google: "Cadastrar com Google",
    register_have_account: "Já tem uma conta?",
    register_login_link: "Entre agora",
    register_terms_text: "Ao se cadastrar, você concorda com nossos",
    back_to_login: "Voltar ao login",

    // Time and Date
    monday: "Segunda",
    tuesday: "Terça",
    wednesday: "Quarta",
    thursday: "Quinta",
    friday: "Sexta",
    saturday: "Sábado",
    sunday: "Domingo",
    january: "Janeiro",
    february: "Fevereiro",
    march: "Março",
    april: "Abril",
    may: "Maio",
    june: "Junho",
    july: "Julho",
    august: "Agosto",
    september: "Setembro",
    october: "Outubro",
    november: "Novembro",
    december: "Dezembro"
  }
};

type Language = 'pt';
type TranslationKey = keyof typeof translations.pt;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.pt;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}