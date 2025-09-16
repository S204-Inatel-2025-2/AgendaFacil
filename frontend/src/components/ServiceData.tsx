export const serviceCategories = {
  medical: {
    key: 'medical',
    title: 'Consultas Médicas',
    description: 'Conecte-se com os melhores profissionais de saúde da sua região. Agende consultas, exames e procedimentos com facilidade.',
    icon: '🏥',
    gradient: 'from-blue-500 to-cyan-600',
    companies: [
      {
        id: 'med-1',
        name: 'Dr. João Silva - Cardiologista',
        description: 'Especialista em cardiologia com 15 anos de experiência. Atendimento humanizado e tecnologia de ponta.',
        image: 'https://images.unsplash.com/photo-1631217872822-1c2546d6b864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc1Nzk5MTcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.9,
        reviews: 247,
        location: 'Centro, São Paulo',
        services: ['Consulta Cardiológica', 'Ecocardiograma', 'Teste Ergométrico', 'Holter'],
        availability: 'Seg-Sex: 8h-18h',
        price: 'R$ 200',
        phone: '(11) 99999-0001',
        verified: true
      },
      {
        id: 'med-2',
        name: 'Dra. Maria Santos - Dermatologia',
        description: 'Dermatologista especializada em estética e tratamentos clínicos. Mais de 200 procedimentos realizados.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviews: 189,
        location: 'Vila Madalena, São Paulo',
        services: ['Consulta Dermatológica', 'Peeling', 'Laser', 'Botox'],
        availability: 'Seg-Sáb: 9h-19h',
        price: 'R$ 180',
        phone: '(11) 99999-0002',
        verified: true
      },
      {
        id: 'med-3',
        name: 'Dr. Carlos Oliveira - Ortopedia',
        description: 'Ortopedista especializado em lesões esportivas e cirurgia minimamente invasiva.',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        reviews: 156,
        location: 'Moema, São Paulo',
        services: ['Ortopedia Geral', 'Medicina Esportiva', 'Artroscopia', 'Traumatologia'],
        availability: 'Ter-Sex: 7h-17h',
        price: 'R$ 220',
        phone: '(11) 99999-0003',
        verified: true
      },
      {
        id: 'med-4',
        name: 'Dra. Ana Costa - Pediatria',
        description: 'Pediatra com especialização em desenvolvimento infantil. Atendimento acolhedor para crianças.',
        image: 'https://images.unsplash.com/photo-1594824475317-2a6ce651a17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 312,
        location: 'Pinheiros, São Paulo',
        services: ['Pediatria Geral', 'Puericultura', 'Vacinas', 'Desenvolvimento'],
        availability: 'Seg-Sex: 8h-18h',
        price: 'R$ 160',
        phone: '(11) 99999-0004',
        verified: true
      },
      {
        id: 'med-5',
        name: 'Dr. Rafael Lima - Psiquiatria',
        description: 'Psiquiatra especializado em transtornos de ansiedade e depressão. Terapia individualizada.',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviews: 203,
        location: 'Jardins, São Paulo',
        services: ['Consulta Psiquiátrica', 'Terapia', 'Avaliação', 'Acompanhamento'],
        availability: 'Seg-Sex: 9h-20h',
        price: 'R$ 250',
        phone: '(11) 99999-0005',
        verified: true
      },
      {
        id: 'med-6',
        name: 'Dra. Fernanda Rocha - Ginecologia',
        description: 'Ginecologista e obstetra com foco em saúde feminina integral e pré-natal.',
        image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 278,
        location: 'Vila Olímpia, São Paulo',
        services: ['Ginecologia', 'Obstetrícia', 'Pré-natal', 'Ultrassom'],
        availability: 'Seg-Sex: 8h-17h',
        price: 'R$ 190',
        phone: '(11) 99999-0006',
        verified: true
      }
    ]
  },

  beauty: {
    key: 'beauty',
    title: 'Beleza e Estética',
    description: 'Transforme seu visual com os melhores profissionais de beleza. Salões, clínicas estéticas e tratamentos especializados.',
    icon: '💅',
    gradient: 'from-pink-500 to-rose-600',
    companies: [
      {
        id: 'beauty-1',
        name: 'Studio Glamour - Salão Completo',
        description: 'Salão de beleza com serviços completos. Cabelo, unhas, maquiagem e tratamentos estéticos.',
        image: 'https://images.unsplash.com/photo-1659129908555-f33bae06eed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGhhaXJkcmVzc2VyfGVufDF8fHx8MTc1ODA0NTgxNXww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.8,
        reviews: 534,
        location: 'Ipanema, Rio de Janeiro',
        services: ['Corte', 'Coloração', 'Manicure', 'Pedicure', 'Maquiagem'],
        availability: 'Seg-Sáb: 9h-20h',
        price: 'R$ 80',
        phone: '(21) 99999-0007',
        verified: true
      },
      {
        id: 'beauty-2',
        name: 'Clínica Estética Renova',
        description: 'Tratamentos estéticos avançados com tecnologia de ponta. Rejuvenescimento facial e corporal.',
        image: 'https://images.unsplash.com/photo-1616391182219-e080b4d1043a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 298,
        location: 'Barra da Tijuca, Rio de Janeiro',
        services: ['Botox', 'Preenchimento', 'Laser', 'Radiofrequência', 'Drenagem'],
        availability: 'Seg-Sex: 8h-19h',
        price: 'R$ 300',
        phone: '(21) 99999-0008',
        verified: true
      },
      {
        id: 'beauty-3',
        name: 'Barbearia Premium',
        description: 'Barbearia moderna com ambiente masculino sofisticado. Cortes clássicos e contemporâneos.',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        reviews: 412,
        location: 'Copacabana, Rio de Janeiro',
        services: ['Corte Masculino', 'Barba', 'Bigode', 'Tratamento Capilar'],
        availability: 'Ter-Sáb: 9h-21h',
        price: 'R$ 60',
        phone: '(21) 99999-0009',
        verified: true
      },
      {
        id: 'beauty-4',
        name: 'Spa Zen Relaxamento',
        description: 'Spa completo com massagens terapêuticas e tratamentos relaxantes. Ambiente tranquilo.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviews: 367,
        location: 'Leblon, Rio de Janeiro',
        services: ['Massagem Relaxante', 'Hot Stone', 'Aromaterapia', 'Facial'],
        availability: 'Seg-Dom: 10h-22h',
        price: 'R$ 150',
        phone: '(21) 99999-0010',
        verified: true
      }
    ]
  },

  technical: {
    key: 'technical',
    title: 'Assistência Técnica',
    description: 'Resolva problemas técnicos com profissionais especializados. Eletrônicos, informática e equipamentos.',
    icon: '🔧',
    gradient: 'from-orange-500 to-red-600',
    companies: [
      {
        id: 'tech-1',
        name: 'TechFix Informática',
        description: 'Assistência técnica especializada em computadores, notebooks e smartphones.',
        image: 'https://images.unsplash.com/photo-1646756089735-487709743361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHJlcGFpciUyMHRlY2huaWNpYW58ZW58MXx8fHwxNzU4MDQ1ODE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.6,
        reviews: 289,
        location: 'Santa Efigênia, São Paulo',
        services: ['Reparo PC', 'Reparo Notebook', 'Reparo Celular', 'Formatação'],
        availability: 'Seg-Sex: 8h-18h',
        price: 'R$ 80',
        phone: '(11) 99999-0011',
        verified: true
      },
      {
        id: 'tech-2',
        name: 'Eletro Service Plus',
        description: 'Conserto de eletrodomésticos em geral. Atendimento domiciliar disponível.',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        reviews: 145,
        location: 'Vila Prudente, São Paulo',
        services: ['Geladeira', 'Máquina de Lavar', 'Micro-ondas', 'Fogão'],
        availability: 'Seg-Sáb: 7h-19h',
        price: 'R$ 60',
        phone: '(11) 99999-0012',
        verified: true
      },
      {
        id: 'tech-3',
        name: 'Auto Elétrica Express',
        description: 'Serviços elétricos automotivos. Diagnóstico e reparo em sistemas elétricos veiculares.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        reviews: 178,
        location: 'Bom Retiro, São Paulo',
        services: ['Sistema Elétrico', 'Alarme', 'Som Automotivo', 'Diagnóstico'],
        availability: 'Seg-Sex: 7h-17h',
        price: 'R$ 100',
        phone: '(11) 99999-0013',
        verified: true
      }
    ]
  },

  education: {
    key: 'education',
    title: 'Aulas Particulares',
    description: 'Encontre professores qualificados para aulas particulares e cursos personalizados.',
    icon: '📚',
    gradient: 'from-purple-500 to-indigo-600',
    companies: [
      {
        id: 'edu-1',
        name: 'Prof. Leonardo - Matemática',
        description: 'Professor de matemática com 12 anos de experiência. Especialista em ensino médio e vestibular.',
        image: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwdHV0b3IlMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NTgwMjQ1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.9,
        reviews: 156,
        location: 'Vila Mariana, São Paulo',
        services: ['Matemática Básica', 'Álgebra', 'Geometria', 'Preparação Vestibular'],
        availability: 'Seg-Sex: 14h-20h',
        price: 'R$ 80/h',
        phone: '(11) 99999-0014',
        verified: true
      },
      {
        id: 'edu-2',
        name: 'Profa. Carolina - Inglês',
        description: 'Professora nativa de inglês. Aulas conversacionais e preparação para certificações.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616c17a23ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviews: 203,
        location: 'Perdizes, São Paulo',
        services: ['Inglês Conversação', 'Business English', 'TOEFL', 'IELTS'],
        availability: 'Seg-Sáb: 8h-18h',
        price: 'R$ 90/h',
        phone: '(11) 99999-0015',
        verified: true
      },
      {
        id: 'edu-3',
        name: 'Prof. Ricardo - Programação',
        description: 'Desenvolvedor sênior e instrutor de programação. Ensino prático e projetos reais.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 127,
        location: 'Vila Olímpia, São Paulo',
        services: ['JavaScript', 'Python', 'React', 'Node.js'],
        availability: 'Seg-Sex: 19h-22h',
        price: 'R$ 120/h',
        phone: '(11) 99999-0016',
        verified: true
      }
    ]
  },

  wellness: {
    key: 'wellness',
    title: 'Bem-estar',
    description: 'Cuide da sua saúde mental e física com profissionais especializados em bem-estar.',
    icon: '🧘',
    gradient: 'from-green-500 to-emerald-600',
    companies: [
      {
        id: 'wellness-1',
        name: 'Espaço Mindful - Yoga',
        description: 'Studio de yoga e meditação. Aulas para todos os níveis em ambiente acolhedor.',
        image: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwd2VsbG5lc3MlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc1ODA0NTgyNnww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.8,
        reviews: 234,
        location: 'Vila Madalena, São Paulo',
        services: ['Hatha Yoga', 'Vinyasa', 'Meditação', 'Pilates'],
        availability: 'Seg-Dom: 6h-21h',
        price: 'R$ 50',
        phone: '(11) 99999-0017',
        verified: true
      },
      {
        id: 'wellness-2',
        name: 'Psicóloga Dra. Juliana',
        description: 'Psicóloga clínica especializada em terapia cognitivo-comportamental.',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 178,
        location: 'Jardins, São Paulo',
        services: ['Terapia Individual', 'Terapia Casal', 'Ansiedade', 'Depressão'],
        availability: 'Seg-Sex: 8h-19h',
        price: 'R$ 180',
        phone: '(11) 99999-0018',
        verified: true
      },
      {
        id: 'wellness-3',
        name: 'Academia Corpo & Mente',
        description: 'Academia completa com personal trainers e aulas funcionais.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        reviews: 345,
        location: 'Moema, São Paulo',
        services: ['Musculação', 'Personal Training', 'Crossfit', 'Natação'],
        availability: 'Seg-Sex: 5h-23h',
        price: 'R$ 120/mês',
        phone: '(11) 99999-0019',
        verified: true
      }
    ]
  },

  automotive: {
    key: 'automotive',
    title: 'Automotivo',
    description: 'Mantenha seu veículo em perfeitas condições com profissionais especializados.',
    icon: '🚗',
    gradient: 'from-gray-500 to-slate-600',
    companies: [
      {
        id: 'auto-1',
        name: 'Oficina Premium Motors',
        description: 'Oficina completa para carros nacionais e importados. Diagnóstico computadorizado.',
        image: 'https://images.unsplash.com/photo-1618783129985-dd97dbe4ad99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtZWNoYW5pYyUyMGF1dG9tb3RpdmUlMjByZXBhaXJ8ZW58MXx8fHwxNzU4MDQ1ODMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.6,
        reviews: 289,
        location: 'Tatuapé, São Paulo',
        services: ['Revisão Geral', 'Troca de Óleo', 'Freios', 'Suspensão'],
        availability: 'Seg-Sex: 7h-18h',
        price: 'R$ 80',
        phone: '(11) 99999-0020',
        verified: true
      },
      {
        id: 'auto-2',
        name: 'Lava Jato EcoCar',
        description: 'Lavagem ecológica e detalhamento automotivo. Produtos biodegradáveis.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviews: 456,
        location: 'Vila Olímpia, São Paulo',
        services: ['Lavagem Simples', 'Enceramento', 'Detalhamento', 'Lavagem Seca'],
        availability: 'Seg-Sáb: 8h-19h',
        price: 'R$ 25',
        phone: '(11) 99999-0021',
        verified: true
      },
      {
        id: 'auto-3',
        name: 'Auto Socorro 24h',
        description: 'Guincho e socorro mecânico 24 horas. Atendimento rápido em toda a cidade.',
        image: 'https://images.unsplash.com/photo-1597149963171-7e72aada5cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        reviews: 234,
        location: 'Toda São Paulo',
        services: ['Guincho', 'Socorro Mecânico', 'Troca de Pneu', 'Bateria'],
        availability: '24 horas',
        price: 'R$ 120',
        phone: '(11) 99999-0022',
        verified: true
      }
    ]
  }
};