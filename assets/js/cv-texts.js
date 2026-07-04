// CV Text Content - Centralized text management
const CVTexts = {
    // Common texts for all templates
    common: {
        en: {
            // Header Information
            name: "PEDRO HENRIQUE LIMA MARCONATO",
            role: "CRM Management and Data Intelligence",
            
            // Contact Information
            contact: {
                email: "pedrohmarconato@gmail.com",
                phone: "+55 (55) 981147758",
                location: "Cachoeira do Sul, RS",
                linkedin: "LinkedIn",
                repository: "Repository"
            },
            
            // Contact CTAs
            contactCTA: {
                email: "Click to send an email",
                phone: "Click to send a message",
                linkedin: "Click to visit LinkedIn",
                repository: "View source code"
            },
            
            // Section Titles
            sections: {
                profile: "PROFESSIONAL PROFILE",
                skills: "SKILLS & TOOLS",
                experience: "PROFESSIONAL EXPERIENCE",
                education: "EDUCATION",
                projects: "PROJECTS & INNOVATION"
            },
            
            // Professional Profile
            professionalProfile: "Professional in CRM Management and Data Intelligence focused on quantifiable results. At Grupo RBS, I led a Brand Equity research audit that supported strategic decisions. At DBC/Realize CFI, I developed a pipeline for competitor analysis generating insights on R$1B in transactions and automated critical reports. As CRM Coordinator at Lojas Renner, I optimized budget generating 10% annual savings, implemented 80% automated communications and strategies that resulted in consumption increase. My approach integrates data, technology and strategic vision for tangible results.",
            
            // Skills Categories
            skillCategories: {
                strategic: "Strategic Skills",
                tools: "Tools & Technologies",
                emerging: "Emerging Technologies"
            },
            
            // Skills with 5-point scale
            skills: {
                strategic: [
                    { name: "CRM Management", level: 5 },
                    { name: "Customer Equity", level: 5 },
                    { name: "Business Intelligence", level: 4 },
                    { name: "Strategic Leadership", level: 4 },
                    { name: "Brand Equity", level: 4 },
                    { name: "Brand Management", level: 4 }
                ],
                tools: [
                    { name: "PowerBI", level: 5 },
                    { name: "Oracle/Databricks", level: 5 },
                    { name: "Python/SQL", level: 4 },
                    { name: "Kanbanize", level: 5 }
                ],
                emerging: [
                    { name: "LLM & AI Agents", level: 4 },
                    { name: "AI for CRM", level: 4 },
                    { name: "AI/LLM APIs", level: 4 },
                    { name: "Data Analytics", level: 5 },
                    { name: "Machine Learning", level: 4 },
                    { name: "Responsys", level: 4 }
                ]
            },
            
            // Experience
            experience: [
                {
                    title: "DATA ANALYTICS COORDINATOR",
                    company: "Cadastra",
                    period: "Sep/2025 - Present",
                    description: "Leading Data Analytics and AI operations for enterprise clients in technology, retail and education sectors. Managing multidisciplinary team (DataViz, Data Engineering, Web Analytics) with direct interface to C-level stakeholders and business areas.",
                    achievements: [
                        {
                            icon: "fa-cloud",
                            title: "Cloud Migration",
                            description: "Technical diagnosis and restructuring of legacy data environments, including AWS→GCP migration with projected 40% reduction in processing costs."
                        },
                        {
                            icon: "fa-users",
                            title: "Team Expansion",
                            description: "Data operations restructuring with +67% team expansion and scope extension to multiple LATAM business units."
                        },
                        {
                            icon: "fa-cogs",
                            title: "Cost Optimization",
                            description: "Stabilization of critical data environments, achieving 20% savings in operational processing costs (Airflow/DAGs)."
                        },
                        {
                            icon: "fa-robot",
                            title: "AI Automation",
                            description: "Development of automations with n8n and AI Agents (LLMs), including automated Status Report with AI-generated executive summaries."
                        }
                    ],
                    tooltip: {
                        header: "Position Details: Data Analytics Coordinator",
                        sections: [
                            {
                                icon: "fa-briefcase",
                                title: "Scope and Responsibilities",
                                items: [
                                    "Data Analytics and AI operations for enterprise clients",
                                    "Simultaneous management of strategic accounts",
                                    "Direct interface with C-level and business areas (Performance, E-commerce, Commercial)"
                                ]
                            },
                            {
                                icon: "fa-database",
                                title: "Data Architecture",
                                items: [
                                    "Data architecture and governance definition for BI projects",
                                    "Real-Time Analytics and AI applications implementation",
                                    "AWS→GCP migration with 40% cost reduction"
                                ]
                            },
                            {
                                icon: "fa-rocket",
                                title: "Innovation and AI",
                                items: [
                                    "Automations with n8n and AI Agents (LLMs)",
                                    "Automated Status Report with AI-generated summaries",
                                    "Leadership in first generative AI initiatives for client operations"
                                ]
                            }
                        ]
                    }
                },
                {
                    title: "CRM COORDINATOR",
                    company: "Realize CFI",
                    period: "Sep/2022 - Feb/2025",
                    description: "Responsible for CRM strategies, budget and contract management, team leadership and implementation of performance metrics to maximize results. I manage communication with over 7 million customers monthly, optimizing channels and messages to increase engagement and conversion.",
                    achievements: [
                        {
                            icon: "fa-money-bill-wave",
                            title: "Contract Optimization",
                            description: "10% savings in outsourced contracts while maintaining service quality."
                        },
                        {
                            icon: "fa-chart-line",
                            title: "CRM Incremental",
                            description: "Growth of +7 p.p YoY in consumption incremental from CRM."
                        },
                        {
                            icon: "fa-shopping-cart",
                            title: "OFF-Us Consumption Increase",
                            description: "8% increase in OFF-Us consumption through data-driven strategies."
                        },
                        {
                            icon: "fa-users",
                            title: "Churn Reduction",
                            description: "23% reduction in churn rate and 28% consumption increase."
                        }
                    ],
                    tooltip: {
                        header: "Position Details: CRM Coordinator",
                        sections: [
                            {
                                icon: "fa-users",
                                title: "Team and Budget Management",
                                items: [
                                    "Leadership of multidisciplinary team with 8 professionals",
                                    "Annual budget management of R$ 25 million",
                                    "Savings of R$ 2.5M/year in outsourced contracts"
                                ]
                            },
                            {
                                icon: "fa-chart-line",
                                title: "Performance Metrics",
                                items: [
                                    "R$ 180M incremental consumption via CRM (+7 p.p YoY)",
                                    "+450M in OFF-Us volume (8% increase)",
                                    "350K customers retained (23% churn reduction)",
                                    "+R$ 1.2K average ticket (28% increase)"
                                ]
                            },
                            {
                                icon: "fa-rocket",
                                title: "Implemented Innovations",
                                items: [
                                    "80% automated communications",
                                    "Advanced segmentation with Machine Learning",
                                    "Real-time dashboard for decision making"
                                ]
                            }
                        ]
                    }
                },
                {
                    title: "DATA SPECIALIST",
                    company: "Realize CFI",
                    period: "Jul/2021 - Sep/2022",
                    description: "Led digital transformation and migration to Databricks platform, developing advanced analytical solutions and implementing Customer Centricity framework. Produced strategic dashboards and created segmentation models to optimize communication strategies.",
                    achievements: [
                        {
                            icon: "fa-database",
                            title: "Digital Transformation",
                            description: "Pioneer Oracle to Databricks migration, increasing processing capacity by 300%."
                        },
                        {
                            icon: "fa-tachometer-alt",
                            title: "Data Democratization",
                            description: "Enabled real-time insights for strategic decisions."
                        },
                        {
                            icon: "fa-users-cog",
                            title: "Customer Centricity Framework",
                            description: "Developed lifecycle model and clustering algorithms for 7M+ customers."
                        },
                        {
                            icon: "fa-bullseye",
                            title: "Conversion Increase",
                            description: "Created efficient segmentation base boosting conversion by +35%."
                        }
                    ],
                    tooltip: {
                        header: "Position Details: Data Specialist",
                        sections: [
                            {
                                icon: "fa-database",
                                title: "Platform Transformation",
                                items: [
                                    "Pioneer migration from Oracle to Databricks",
                                    "300% increase in processing capacity (from 2TB to 8TB/day)",
                                    "Modern data architecture implementation"
                                ]
                            },
                            {
                                icon: "fa-tachometer-alt",
                                title: "Performance and Innovation",
                                items: [
                                    "Real-time insights with latency < 2 seconds",
                                    "Segmentation model for 7M+ customers in 15 clusters",
                                    "35% increase in conversion (CTR: 2.1% → 2.8%)"
                                ]
                            },
                            {
                                icon: "fa-users-cog",
                                title: "Framework Customer Centricity",
                                items: [
                                    "Customer lifecycle model development",
                                    "Advanced clustering algorithms",
                                    "Strategic dashboards for decision making"
                                ]
                            }
                        ]
                    }
                },
                {
                    title: "MARKET INTELLIGENCE ANALYST",
                    company: "Grupo RBS",
                    period: "Mar/2019 - Jul/2020",
                    description: "Conducted Brand Equity analyses, automated strategic reports and identified significant tax opportunities. Transformed manual processes into automated solutions, freeing up weekly hours for higher value-added analyses.",
                    achievements: [
                        {
                            icon: "fa-trophy",
                            title: "Brand Equity Audit",
                            description: "R$300k research audit, supporting strategic decisions."
                        },
                        {
                            icon: "fa-clock",
                            title: "Report Automation",
                            description: "12h weekly reduction through PowerBI migration."
                        },
                        {
                            icon: "fa-comments-dollar",
                            title: "Tax Optimization",
                            description: "R$ 1.5 million tax savings through in-depth analysis."
                        }
                    ],
                    tooltip: {
                        header: "Position Details: Market Intelligence Analyst",
                        sections: [
                            {
                                icon: "fa-trophy",
                                title: "Brand Equity Audit",
                                items: [
                                    "R$ 300k research audit",
                                    "Analysis of 3,000+ respondents",
                                    "Foundation for strategic brand decisions"
                                ]
                            },
                            {
                                icon: "fa-clock",
                                title: "Automation and Efficiency",
                                items: [
                                    "12h weekly reduction in manual processes",
                                    "600h/year saved through automation",
                                    "Complete migration to PowerBI"
                                ]
                            },
                            {
                                icon: "fa-comments-dollar",
                                title: "Tax Optimization",
                                items: [
                                    "R$ 1.5 million savings in taxes",
                                    "18% reduction in tax burden",
                                    "In-depth analysis of tax opportunities"
                                ]
                            }
                        ]
                    }
                }
            ],
            
            // Education
            education: [
                {
                    degree: "Master's in Business Administration",
                    university: "Federal University of Santa Maria",
                    thesis: "Thesis: Customer Equity"
                },
                {
                    degree: "Bachelor's in Business Administration",
                    university: "Federal University of Santa Maria",
                    thesis: "Final Paper: Brand Equity"
                }
            ],
            
            // Projects
            projects: [
                {
                    title: "REPO NEWS",
                    description: "Weekly insights selected with human curation and summarized by artificial intelligence — straight to the point, no noise.",
                    techs: ["React", "TypeScript", "Tailwind CSS"]
                },
                {
                    title: "VISUAL RECOGNITION",
                    description: "Gym equipment recognition system via camera with personalized workout recommendations.",
                    techs: ["TensorFlow", "Computer Vision", "Python"]
                },
                {
                    title: "MIELKE",
                    description: "Management system for dental offices with automated billing and scheduling flow.",
                    techs: ["Next.js", "OpenAI API", "Firebase"]
                }
            ],
            
            // Modal Texts
            modals: {
                email: {
                    title: "Send Email",
                    fields: {
                        name: "Your Name",
                        email: "Your Email",
                        subject: "Subject",
                        message: "Message"
                    },
                    button: "Send"
                },
                phone: {
                    title: "Get in Touch",
                    fields: {
                        name: "Your Name",
                        phone: "Your Phone",
                        bestTime: "Best time to contact",
                        message: "Message (Optional)"
                    },
                    button: "Request Contact",
                    whatsapp: "WhatsApp"
                },
            }
        },
        
        pt: {
            // Header Information
            name: "PEDRO HENRIQUE LIMA MARCONATO",
            role: "Gestão de CRM e Inteligência de Dados",
            
            // Contact Information
            contact: {
                email: "pedrohmarconato@gmail.com",
                phone: "+55 (55) 981147758",
                location: "Cachoeira do Sul, RS",
                linkedin: "LinkedIn",
                repository: "Repositório"
            },
            
            // Contact CTAs
            contactCTA: {
                email: "Clique para enviar um e-mail",
                phone: "Clique para enviar uma mensagem",
                linkedin: "Clique para visitar o LinkedIn",
                repository: "Ver código fonte"
            },
            
            // Section Titles
            sections: {
                profile: "PERFIL PROFISSIONAL",
                skills: "HABILIDADES E FERRAMENTAS",
                experience: "EXPERIÊNCIA PROFISSIONAL",
                education: "FORMAÇÃO ACADÊMICA",
                projects: "PROJETOS E INOVAÇÃO"
            },
            
            // Professional Profile
            professionalProfile: "Profissional em Gestão de CRM e Inteligência de Dados focado em resultados quantificáveis. No Grupo RBS, liderei auditoria de pesquisa Brand Equity que suportou decisões estratégicas. Na DBC/Realize CFI, desenvolvi pipeline para análise de concorrentes gerando insights sobre R$1B em transações e automatizei relatórios críticos. Como Coordenador de CRM na Lojas Renner, otimizei orçamento gerando 10% de economia anual, implementei 80% de comunicações automatizadas e estratégias que resultaram em aumento de consumo. Minha abordagem integra dados, tecnologia e visão estratégica para resultados tangíveis.",
            
            // Skills Categories
            skillCategories: {
                strategic: "Habilidades Estratégicas",
                tools: "Ferramentas e Tecnologias",
                emerging: "Tecnologias Emergentes"
            },
            
            // Skills with 5-point scale
            skills: {
                strategic: [
                    { name: "Gestão de CRM", level: 5 },
                    { name: "Customer Equity", level: 5 },
                    { name: "Business Intelligence", level: 4 },
                    { name: "Liderança Estratégica", level: 4 },
                    { name: "Brand Equity", level: 4 },
                    { name: "Gestão de Marca", level: 4 }
                ],
                tools: [
                    { name: "PowerBI", level: 5 },
                    { name: "Oracle/Databricks", level: 5 },
                    { name: "Python/SQL", level: 4 },
                    { name: "Kanbanize", level: 5 }
                ],
                emerging: [
                    { name: "LLM e Agentes IA", level: 4 },
                    { name: "IA para CRM", level: 4 },
                    { name: "APIs IA/LLM", level: 4 },
                    { name: "Análise de Dados", level: 5 },
                    { name: "Machine Learning", level: 4 },
                    { name: "Responsys", level: 4 }
                ]
            },
            
            // Experience
            experience: [
                {
                    title: "COORDENADOR DE DATA ANALYTICS",
                    company: "Cadastra",
                    period: "Set/2025 - Presente",
                    description: "Liderança da operação de Data Analytics e AI para clientes de grande porte dos setores de tecnologia, varejo e educação. Gestão de time multidisciplinar (DataViz, Engenharia de Dados, Web Analytics) com interface direta com stakeholders C-level e áreas de negócio.",
                    achievements: [
                        {
                            icon: "fa-cloud",
                            title: "Migração Cloud",
                            description: "Diagnóstico técnico e reestruturação de ambientes de dados legados, incluindo migração AWS→GCP com redução projetada de 40% em custos de processamento."
                        },
                        {
                            icon: "fa-users",
                            title: "Expansão de Time",
                            description: "Reestruturação de operações de dados com expansão de time (+67%) e ampliação de escopo para múltiplas unidades de negócio em LATAM."
                        },
                        {
                            icon: "fa-cogs",
                            title: "Otimização de Custos",
                            description: "Estabilização de ambientes críticos de dados, alcançando economia de 20% em custos operacionais de processamento (Airflow/DAGs)."
                        },
                        {
                            icon: "fa-robot",
                            title: "Automação com IA",
                            description: "Desenvolvimento de automações com n8n e AI Agents (LLMs), incluindo Status Report automatizado com geração de resumos executivos por IA."
                        }
                    ],
                    tooltip: {
                        header: "Detalhes da Posição: Coordenador de Data Analytics",
                        sections: [
                            {
                                icon: "fa-briefcase",
                                title: "Escopo e Responsabilidades",
                                items: [
                                    "Operação de Data Analytics e AI para clientes enterprise",
                                    "Gestão simultânea de contas estratégicas",
                                    "Interface direta com C-level e áreas de negócio (Performance, E-commerce, Comercial)"
                                ]
                            },
                            {
                                icon: "fa-database",
                                title: "Arquitetura de Dados",
                                items: [
                                    "Definição de arquitetura de dados e governança para projetos de BI",
                                    "Implementação de Real-Time Analytics e aplicações de IA",
                                    "Migração AWS→GCP com 40% de redução de custos"
                                ]
                            },
                            {
                                icon: "fa-rocket",
                                title: "Inovação e IA",
                                items: [
                                    "Automações com n8n e AI Agents (LLMs)",
                                    "Status Report automatizado com resumos gerados por IA",
                                    "Liderança das primeiras iniciativas de IA generativa para operações de clientes"
                                ]
                            }
                        ]
                    }
                },
                {
                    title: "COORDENADOR DE CRM",
                    company: "Realize CFI",
                    period: "Set/2022 - Fev/2025",
                    description: "Responsável por estratégias de CRM, gestão de orçamento e contratos, liderança de equipe e implementação de métricas de performance para maximizar resultados. Gerencio comunicação com mais de 7 milhões de clientes mensalmente, otimizando canais e mensagens para aumentar engajamento e conversão.",
                    achievements: [
                        {
                            icon: "fa-money-bill-wave",
                            title: "Otimização de Contratos",
                            description: "Economia de 10% em contratos terceirizados mantendo qualidade de serviço."
                        },
                        {
                            icon: "fa-chart-line",
                            title: "Incremental CRM",
                            description: "Crescimento de +7 p.p YoY no consumo incremental oriundo do CRM."
                        },
                        {
                            icon: "fa-shopping-cart",
                            title: "Aumento Consumo OFF-Us",
                            description: "Crescimento de 8% no consumo OFF-Us através de estratégias data-driven."
                        },
                        {
                            icon: "fa-users",
                            title: "Redução de Churn",
                            description: "Redução de 23% na taxa de churn e 28% de aumento no consumo."
                        }
                    ],
                    tooltip: {
                        header: "Detalhes da Posição: Coordenador de CRM",
                        sections: [
                            {
                                icon: "fa-users",
                                title: "Gestão de Equipe e Orçamento",
                                items: [
                                    "Liderança de equipe multidisciplinar com 8 profissionais",
                                    "Gestão de orçamento anual de R$ 25 milhões",
                                    "Economia de R$ 2,5M/ano em contratos terceirizados"
                                ]
                            },
                            {
                                icon: "fa-chart-line",
                                title: "Métricas de Performance",
                                items: [
                                    "R$ 180M de consumo incremental via CRM (+7 p.p YoY)",
                                    "+450M em volume OFF-Us (aumento de 8%)",
                                    "350K clientes retidos (redução de 23% no churn)",
                                    "+R$ 1.2K ticket médio (aumento de 28%)"
                                ]
                            },
                            {
                                icon: "fa-rocket",
                                title: "Inovações Implementadas",
                                items: [
                                    "80% de comunicações automatizadas",
                                    "Segmentação avançada com Machine Learning",
                                    "Dashboard em tempo real para tomada de decisão"
                                ]
                            }
                        ]
                    }
                },
                {
                    title: "ESPECIALISTA DE DADOS",
                    company: "Realize CFI",
                    period: "Jul/2021 - Set/2022",
                    description: "Liderei a transformação digital e migração para plataforma Databricks, desenvolvendo soluções analíticas avançadas e implementando framework de Customer Centricity. Produzi dashboards estratégicos e criei modelos de segmentação para otimizar estratégias de comunicação.",
                    achievements: [
                        {
                            icon: "fa-database",
                            title: "Transformação Digital",
                            description: "Pioneiro na migração Oracle para Databricks, aumentando capacidade de processamento em 300%."
                        },
                        {
                            icon: "fa-tachometer-alt",
                            title: "Democratização de Dados",
                            description: "Habilitei insights em tempo real para decisões estratégicas."
                        },
                        {
                            icon: "fa-users-cog",
                            title: "Framework Customer Centricity",
                            description: "Desenvolvi modelo de ciclo de vida e algoritmos de clusterização para 7M+ clientes."
                        },
                        {
                            icon: "fa-bullseye",
                            title: "Aumento de Conversão",
                            description: "Criei base de segmentação eficiente aumentando conversão em +35%."
                        }
                    ],
                    tooltip: {
                        header: "Detalhes da Posição: Especialista de Dados",
                        sections: [
                            {
                                icon: "fa-database",
                                title: "Transformação de Plataforma",
                                items: [
                                    "Pioneiro na migração de Oracle para Databricks",
                                    "Aumento de 300% na capacidade de processamento (de 2TB para 8TB/dia)",
                                    "Implementação de arquitetura de dados moderna"
                                ]
                            },
                            {
                                icon: "fa-tachometer-alt",
                                title: "Performance e Inovação",
                                items: [
                                    "Insights em tempo real com latência < 2 segundos",
                                    "Modelo de segmentação para 7M+ clientes em 15 clusters",
                                    "Aumento de 35% na conversão (CTR: 2.1% → 2.8%)"
                                ]
                            },
                            {
                                icon: "fa-users-cog",
                                title: "Framework Customer Centricity",
                                items: [
                                    "Desenvolvimento de modelo de ciclo de vida do cliente",
                                    "Algoritmos avançados de clusterização",
                                    "Dashboards estratégicos para tomada de decisão"
                                ]
                            }
                        ]
                    }
                },
                {
                    title: "ANALISTA DE INTELIGÊNCIA DE MERCADO",
                    company: "Grupo RBS",
                    period: "Mar/2019 - Jul/2020",
                    description: "Conduzi análises de Brand Equity, automatizei relatórios estratégicos e identifiquei oportunidades tributárias significativas. Transformei processos manuais em soluções automatizadas, liberando horas semanais para análises de maior valor agregado.",
                    achievements: [
                        {
                            icon: "fa-trophy",
                            title: "Auditoria Brand Equity",
                            description: "Auditoria de pesquisa de R$300k, suportando decisões estratégicas."
                        },
                        {
                            icon: "fa-clock",
                            title: "Automação de Relatórios",
                            description: "Redução de 12h semanais através de migração para PowerBI."
                        },
                        {
                            icon: "fa-comments-dollar",
                            title: "Otimização Tributária",
                            description: "Economia de R$ 1,5 milhão em impostos através de análise aprofundada."
                        }
                    ],
                    tooltip: {
                        header: "Detalhes da Posição: Analista de Inteligência de Mercado",
                        sections: [
                            {
                                icon: "fa-trophy",
                                title: "Auditoria Brand Equity",
                                items: [
                                    "Auditoria de pesquisa de R$ 300k",
                                    "Análise de 3.000+ respondentes",
                                    "Fundação para decisões estratégicas de marca"
                                ]
                            },
                            {
                                icon: "fa-clock",
                                title: "Automação e Eficiência",
                                items: [
                                    "Redução de 12h semanais em processos manuais",
                                    "600h/ano economizadas através de automação",
                                    "Migração completa para PowerBI"
                                ]
                            },
                            {
                                icon: "fa-comments-dollar",
                                title: "Otimização Tributária",
                                items: [
                                    "Economia de R$ 1,5 milhão em impostos",
                                    "Redução de 18% na carga tributária",
                                    "Análise aprofundada de oportunidades fiscais"
                                ]
                            }
                        ]
                    }
                }
            ],
            
            // Education
            education: [
                {
                    degree: "Mestrado em Administração",
                    university: "Universidade Federal de Santa Maria",
                    thesis: "Dissertação: Customer Equity"
                },
                {
                    degree: "Bacharelado em Administração",
                    university: "Universidade Federal de Santa Maria",
                    thesis: "TCC: Brand Equity"
                }
            ],
            
            // Projects
            projects: [
                {
                    title: "REPO NEWS",
                    description: "Insights semanais selecionados com curadoria humana e resumidos por inteligência artificial — direto ao ponto, sem ruído.",
                    techs: ["React", "TypeScript", "Tailwind CSS"]
                },
                {
                    title: "RECONHECIMENTO VISUAL",
                    description: "Sistema de reconhecimento de equipamentos de academia via câmera com recomendações personalizadas de treino.",
                    techs: ["TensorFlow", "Computer Vision", "Python"]
                },
                {
                    title: "MIELKE",
                    description: "Sistema de gestão para consultórios odontológicos com fluxo automatizado de faturamento e agendamento.",
                    techs: ["Next.js", "OpenAI API", "Firebase"]
                }
            ],
            
            // Modal Texts
            modals: {
                email: {
                    title: "Enviar E-mail",
                    fields: {
                        name: "Seu Nome",
                        email: "Seu E-mail",
                        subject: "Assunto",
                        message: "Mensagem"
                    },
                    button: "Enviar"
                },
                phone: {
                    title: "Entre em Contato",
                    fields: {
                        name: "Seu Nome",
                        phone: "Seu Telefone",
                        bestTime: "Melhor horário para contato",
                        message: "Mensagem (Opcional)"
                    },
                    button: "Solicitar Contato",
                    whatsapp: "WhatsApp"
                },
            }
        }
    }
};

// Helper function to get text from the object
function getText(path, lang = 'en', company = null) {
    try {
        // Split the path into parts
        const parts = path.split('.');
        
        // First try to get company-specific text if company is provided
        if (company && CVTexts.companies && CVTexts.companies[company] && CVTexts.companies[company][lang]) {
            let companyText = CVTexts.companies[company][lang];
            for (const part of parts) {
                companyText = companyText[part];
                if (companyText === undefined) break;
            }
            if (companyText !== undefined) return companyText;
        }
        
        // Then get common text
        let text = CVTexts.common[lang];
        for (const part of parts) {
            text = text[part];
            if (text === undefined) return `[Missing: ${path}]`;
        }
        return text;
    } catch (error) {
        console.error(`Error getting text for path: ${path}`, error);
        return `[Error: ${path}]`;
    }
}

// Helper function to render skills with dots format (like boticario.html)
function renderSkills(containerId, skillCategory, lang = 'en') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const skills = getText(`skills.${skillCategory}`, lang);
    const categoryTitle = getText(`skillCategories.${skillCategory}`, lang);
    
    // Function to get skill level label
    function getSkillLabel(level) {
        if (level === 5) return lang === 'en' ? 'Expert' : 'Expert';
        if (level === 4) return lang === 'en' ? 'Advanced' : 'Avançado';
        if (level === 3) return lang === 'en' ? 'Intermediate' : 'Intermediário';
        if (level === 2) return lang === 'en' ? 'Basic' : 'Básico';
        return lang === 'en' ? 'Beginner' : 'Iniciante';
    }
    
    let html = `<h3 style="font-size: 18px; color: var(--primary-color); margin-bottom: 15px; font-weight: 600;">${categoryTitle}</h3>`;
    
    skills.forEach(skill => {
        // Convert level (1-5) to dots (1-10), so level * 2
        const filledDots = skill.level * 2;
        const totalDots = 10;
        
        // Create dots display
        let dots = '';
        for (let i = 1; i <= totalDots; i++) {
            if (i <= filledDots) {
                dots += '<div class="dot filled"></div>';
            } else {
                dots += '<div class="dot"></div>';
            }
        }
        
        html += `
            <div class="tool-item">
                <div class="tool-name">
                    <span>${skill.name}</span>
                    <span class="tool-percentage">${getSkillLabel(skill.level)}</span>
                </div>
                <div class="dots-container">
                    ${dots}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Helper function to render achievements
function renderAchievements(achievements) {
    return achievements.map(achievement => `
        <div class="achievement-item">
            <div class="achievement-icon">
                <i class="fas ${achievement.icon}"></i>
            </div>
            <div class="achievement-content">
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        </div>
    `).join('');
}

// Helper function to render tooltip
function renderTooltip(tooltip) {
    if (!tooltip) return '';
    
    return `
        <div class="tooltip">
            <i class="fas fa-info-circle tooltip-icon"></i>
            <span class="tooltip-text">
                <div class="tooltip-header">${tooltip.header}</div>
                <div class="tooltip-content">
                    ${tooltip.sections.map(section => `
                        <div class="tooltip-section">
                            <div class="tooltip-section-title">
                                <i class="fas ${section.icon}"></i> ${section.title}
                            </div>
                            <ul class="tooltip-list">
                                ${section.items.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </span>
        </div>
    `;
}

// Helper function to render tech tags
function renderTechTags(techs) {
    return techs.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
}

// Main initialization function
function initializeCV(lang = 'en', company = null) {
    // Update header texts
    const nameElement = document.querySelector('.header h1');
    if (nameElement) nameElement.textContent = getText('name', lang, company);
    
    const roleElement = document.querySelector('.role');
    if (roleElement) roleElement.textContent = getText('role', lang, company);
    
    // Update contact information
    const contactButtons = document.querySelectorAll('.contact-button');
    contactButtons.forEach(button => {
        const icon = button.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-envelope')) {
                button.innerHTML = `<i class="${icon.className}"></i> ${getText('contact.email', lang, company)}`;
            } else if (icon.classList.contains('fa-phone')) {
                button.innerHTML = `<i class="${icon.className}"></i> ${getText('contact.phone', lang, company)}`;
            } else if (icon.classList.contains('fa-linkedin')) {
                button.innerHTML = `<i class="${icon.className}"></i> ${getText('contact.linkedin', lang, company)}`;
            } else if (icon.classList.contains('fa-github')) {
                button.innerHTML = `<i class="${icon.className}"></i> ${getText('contact.repository', lang, company)}`;
            }
        }
    });
    
    // Update location
    const locationElement = document.querySelector('.location');
    if (locationElement) {
        locationElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${getText('contact.location', lang, company)}`;
    }
    
    // Update contact CTAs
    const contactCTAs = document.querySelectorAll('.contact-cta');
    contactCTAs.forEach((cta, index) => {
        const ctaKeys = ['email', 'phone', 'linkedin', 'repository'];
        if (ctaKeys[index]) {
            cta.textContent = getText(`contactCTA.${ctaKeys[index]}`, lang, company);
        }
    });
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const sectionKeys = ['profile', 'skills', 'experience', 'education', 'projects'];
    sectionTitles.forEach((title, index) => {
        if (sectionKeys[index]) {
            title.textContent = getText(`sections.${sectionKeys[index]}`, lang, company);
        }
    });
    
    // Update professional profile
    const profileText = document.querySelector('.profile-text');
    if (profileText) {
        profileText.textContent = getText('professionalProfile', lang, company);
    }
}

// Basic initialization function for simpler templates
function initializeBasicContent(lang = 'en') {
    // Update header texts
    const nameElement = document.getElementById('cv-name');
    if (nameElement) nameElement.textContent = getText('name', lang);
    
    const roleElement = document.getElementById('cv-role');
    if (roleElement) roleElement.textContent = getText('role', lang);
    
    // Update contact information
    const emailEl = document.getElementById('cv-email');
    if (emailEl) emailEl.textContent = getText('contact.email', lang);
    
    const phoneEl = document.getElementById('cv-phone');
    if (phoneEl) phoneEl.textContent = getText('contact.phone', lang);
    
    const locationEl = document.querySelector('#cv-location span');
    if (locationEl) locationEl.textContent = getText('contact.location', lang);
    
    const linkedinEl = document.getElementById('cv-linkedin');
    if (linkedinEl) linkedinEl.textContent = getText('contact.linkedin', lang);
    
    const repositoryEl = document.getElementById('cv-repository');
    if (repositoryEl) repositoryEl.textContent = getText('contact.repository', lang);
    
    // Update contact CTAs
    const emailCTAEl = document.getElementById('cv-cta-email');
    if (emailCTAEl) emailCTAEl.textContent = getText('contactCTA.email', lang);
    
    const phoneCTAEl = document.getElementById('cv-cta-phone');
    if (phoneCTAEl) phoneCTAEl.textContent = getText('contactCTA.phone', lang);
    
    const linkedinCTAEl = document.getElementById('cv-cta-linkedin');
    if (linkedinCTAEl) linkedinCTAEl.textContent = getText('contactCTA.linkedin', lang);
    
    const repositoryCTAEl = document.getElementById('cv-cta-repository');
    if (repositoryCTAEl) repositoryCTAEl.textContent = getText('contactCTA.repository', lang);
    
    // Update section titles
    const profileTitleEl = document.getElementById('section-profile');
    if (profileTitleEl) profileTitleEl.textContent = getText('sections.profile', lang);
    
    const skillsTitleEl = document.getElementById('section-skills');
    if (skillsTitleEl) skillsTitleEl.textContent = getText('sections.skills', lang);
    
    // Update professional profile
    const profileText = document.getElementById('cv-profile');
    if (profileText) profileText.textContent = getText('professionalProfile', lang);
}

// Helper function to render experience in timeline format (for sicredi-style templates)
function renderExperienceTimeline(lang = 'en') {
    const container = document.getElementById('experience-container');
    if (!container) return;
    
    const experiences = getText('experience', lang);
    
    let html = '';
    experiences.forEach((exp, index) => {
        html += `
            <div class="experience-item">
                <div class="job-title">
                    <div class="job-number">${index + 1}</div>
                    ${exp.title}
                    ${exp.tooltip ? renderTooltip(exp.tooltip) : ''}
                </div>
                <div class="company">${exp.company}</div>
                <div class="period">${exp.period}</div>
                
                <div class="job-description">
                    ${exp.description}
                </div>
                
                <div class="achievements-container">
                    ${renderAchievements(exp.achievements)}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Helper function to render education
function renderEducation(lang = 'en') {
    const container = document.getElementById('education-container');
    if (!container) return;
    
    const education = getText('education', lang);
    
    let html = '';
    education.forEach(edu => {
        html += `
            <div class="education-item">
                <div class="degree">${edu.degree}</div>
                <div class="university">${edu.university}</div>
                <div class="thesis">${edu.thesis}</div>
                ${edu.degree.includes('Master') ? `
                    <a href="https://repositorio.ufsm.br/bitstream/handle/1/18895/DIS_PPGADMINISTRACAO_2019_MARCONATO_PEDRO.pdf" target="_blank" class="cta-button">
                        <i class="fas fa-file-pdf"></i> View full thesis
                    </a>
                ` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Helper function to render projects
function renderProjects(lang = 'en') {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    const projects = getText('projects', lang);
    
    let html = '';
    projects.forEach(project => {
        const repoNewsLink = project.title === 'REPO NEWS' ? 
            `<a href="https://www.repo.news/" target="_blank" class="cta-button">
                <i class="fas fa-external-link-alt"></i> Visit Repo News
            </a>` : '';
        
        html += `
            <div class="project-item">
                <div class="project-title">${project.title}</div>
                <div class="project-description">
                    ${project.description}
                </div>
                ${repoNewsLink}
                <div style="margin-top: 15px;">
                    ${renderTechTags(project.techs)}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Helper function to initialize modal texts
function initializeModalTexts(lang = 'en') {
    // Email modal
    const emailTitle = document.getElementById('email-modal-title');
    if (emailTitle) emailTitle.textContent = getText('modals.email.title', lang);
    
    const emailLabelName = document.getElementById('email-label-name');
    if (emailLabelName) emailLabelName.textContent = getText('modals.email.fields.name', lang);
    
    const emailLabelEmail = document.getElementById('email-label-email');
    if (emailLabelEmail) emailLabelEmail.textContent = getText('modals.email.fields.email', lang);
    
    const emailLabelSubject = document.getElementById('email-label-subject');
    if (emailLabelSubject) emailLabelSubject.textContent = getText('modals.email.fields.subject', lang);
    
    const emailLabelMessage = document.getElementById('email-label-message');
    if (emailLabelMessage) emailLabelMessage.textContent = getText('modals.email.fields.message', lang);
    
    const emailButton = document.getElementById('email-button');
    if (emailButton) emailButton.textContent = getText('modals.email.button', lang);
    
    // Phone modal
    const phoneTitle = document.getElementById('phone-modal-title');
    if (phoneTitle) phoneTitle.textContent = getText('modals.phone.title', lang);
    
    const phoneLabelName = document.getElementById('phone-label-name');
    if (phoneLabelName) phoneLabelName.textContent = getText('modals.phone.fields.name', lang);
    
    const phoneLabelPhone = document.getElementById('phone-label-phone');
    if (phoneLabelPhone) phoneLabelPhone.textContent = getText('modals.phone.fields.phone', lang);
    
    const phoneLabelBestTime = document.getElementById('phone-label-besttime');
    if (phoneLabelBestTime) phoneLabelBestTime.textContent = getText('modals.phone.fields.bestTime', lang);
    
    const phoneLabelMessage = document.getElementById('phone-label-message');
    if (phoneLabelMessage) phoneLabelMessage.textContent = getText('modals.phone.fields.message', lang);
    
    const phoneButton = document.getElementById('phone-button');
    if (phoneButton) phoneButton.textContent = getText('modals.phone.button', lang);
    
    const whatsappText = document.getElementById('whatsapp-text');
    if (whatsappText) whatsappText.textContent = getText('modals.phone.whatsapp', lang);
}

// Export for use in templates
window.CVTexts = CVTexts;
window.getText = getText;
window.renderSkills = renderSkills;
window.renderAchievements = renderAchievements;
window.renderTooltip = renderTooltip;
window.renderTechTags = renderTechTags;
window.initializeCV = initializeCV;
window.initializeBasicContent = initializeBasicContent;
window.renderExperienceTimeline = renderExperienceTimeline;
window.renderEducation = renderEducation;
window.renderProjects = renderProjects;
window.initializeModalTexts = initializeModalTexts;