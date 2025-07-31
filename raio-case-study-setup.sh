#!/bin/bash

# 🚀 SETUP AUTOMÁTICO - ESTUDO DE CASO RAIÔ BENEFÍCIOS
# Script para criar a estrutura base do projeto Angular

echo "🎯 Iniciando setup do projeto Estudo de Caso Raiô Benefícios..."

# Verificar se Angular CLI está instalado
if ! command -v ng &> /dev/null; then
    echo "❌ Angular CLI não encontrado. Instalando..."
    npm install -g @angular/cli
fi

# Criar novo projeto Angular
echo "📦 Criando projeto Angular..."
ng new raio-case-study --routing=true --style=scss --skip-tests=false

cd raio-case-study

# Instalar dependências adicionais
echo "📚 Instalando dependências..."
npm install chart.js ng2-charts @angular/animations @angular/cdk @angular/material

# Criar estrutura de componentes
echo "🏗️ Criando componentes..."
ng generate component components/header --skip-tests=true
ng generate component components/hero --skip-tests=true
ng generate component components/case-overview --skip-tests=true
ng generate component components/methodology --skip-tests=true
ng generate component components/results-dashboard --skip-tests=true
ng generate component components/recommendations --skip-tests=true
ng generate component components/contact --skip-tests=true

# Criar serviços
echo "⚙️ Criando serviços..."
ng generate service services/analytics --skip-tests=true
ng generate service services/chart --skip-tests=true
ng generate service services/content --skip-tests=true

# Criar modelos
echo "📝 Criando modelos..."
ng generate interface models/case-study
ng generate interface models/metrics

# Criar estrutura de pastas
echo "📁 Criando estrutura de arquivos..."
mkdir -p src/assets/images/{logos,charts,backgrounds}
mkdir -p src/assets/data
mkdir -p src/assets/styles
mkdir -p src/app/shared/{animations,utilities}

# Criar arquivos de dados base
echo "📊 Criando arquivos de dados..."
cat > src/assets/data/metrics.json << 'EOF'
{
  "kpis": {
    "customerRetention": {
      "before": 65,
      "after": 94,
      "improvement": 45,
      "unit": "%"
    },
    "leadConversion": {
      "before": 12,
      "after": 28,
      "improvement": 133,
      "unit": "%"
    },
    "customerSatisfaction": {
      "before": 7.2,
      "after": 9.1,
      "improvement": 26,
      "unit": "score"
    },
    "automationRate": {
      "before": 15,
      "after": 78,
      "improvement": 420,
      "unit": "%"
    }
  },
  "timeline": [
    {"month": "Jan", "retention": 65, "conversion": 12},
    {"month": "Feb", "retention": 68, "conversion": 14},
    {"month": "Mar", "retention": 72, "conversion": 16},
    {"month": "Apr", "retention": 78, "conversion": 20},
    {"month": "May", "retention": 85, "conversion": 24},
    {"month": "Jun", "retention": 94, "conversion": 28}
  ]
}
EOF

cat > src/assets/data/case-study.json << 'EOF'
{
  "title": "Transformação Digital CRM - Raiô Benefícios",
  "subtitle": "Como revolucionamos a gestão de relacionamento com clientes",
  "duration": "6 meses",
  "team": ["Pedro Marconato", "Equipe CRM"],
  "overview": {
    "problem": "A Raiô Benefícios enfrentava desafios na retenção de clientes e personalização do atendimento, com processos manuais que limitavam a escalabilidade.",
    "solution": "Implementação de um sistema CRM inteligente com automação de marketing, segmentação avançada e jornadas personalizadas do cliente.",
    "impact": "Transformação completa na experiência do cliente com resultados mensuráveis em retenção, conversão e satisfação."
  },
  "methodology": [
    {
      "step": 1,
      "title": "Diagnóstico Inicial",
      "description": "Análise profunda dos processos atuais e identificação de pontos de melhoria",
      "duration": "2 semanas"
    },
    {
      "step": 2,
      "title": "Mapeamento da Jornada",
      "description": "Definição detalhada de todos os pontos de contato com o cliente",
      "duration": "3 semanas"
    },
    {
      "step": 3,
      "title": "Implementação do CRM",
      "description": "Configuração e customização da plataforma para as necessidades específicas",
      "duration": "8 semanas"
    },
    {
      "step": 4,
      "title": "Automação e Otimização",
      "description": "Criação de fluxos automatizados e campanhas personalizadas",
      "duration": "6 semanas"
    },
    {
      "step": 5,
      "title": "Monitoramento e Ajustes",
      "description": "Acompanhamento contínuo dos KPIs e refinamento das estratégias",
      "duration": "Contínuo"
    }
  ],
  "results": {
    "summary": "Os resultados superaram as expectativas iniciais, demonstrando o valor de uma abordagem data-driven na gestão de relacionamento com clientes.",
    "highlights": [
      "45% de aumento na retenção de clientes",
      "133% de melhoria na conversão de leads",
      "26% de aumento na satisfação do cliente",
      "420% de aumento na automação de processos"
    ]
  }
}
EOF

# Criar variáveis SCSS
cat > src/assets/styles/variables.scss << 'EOF'
// Raiô Benefícios Color Palette
:root {
  // Cores principais
  --raio-orange: #FF8C00;
  --raio-gold: #FFD700;
  --raio-red: #FF6B35;
  
  // Cores de apoio
  --raio-dark: #2C3E50;
  --raio-light: #F8F9FA;
  --raio-gray: #6C757D;
  --raio-white: #FFFFFF;
  
  // Gradientes
  --raio-gradient: linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FF6B35 100%);
  --raio-gradient-dark: linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%);
  --raio-gradient-light: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 140, 0, 0.1) 100%);
  
  // Sombras
  --raio-shadow: 0 10px 30px rgba(255, 140, 0, 0.2);
  --raio-shadow-hover: 0 15px 40px rgba(255, 140, 0, 0.3);
  
  // Animações
  --raio-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --raio-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

// Breakpoints
$mobile: 576px;
$tablet: 768px;
$desktop: 992px;
$large: 1200px;

// Typography
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-secondary: 'Poppins', sans-serif;
$font-mono: 'JetBrains Mono', monospace;
EOF

# Criar mixins SCSS
cat > src/assets/styles/mixins.scss << 'EOF'
// Mixins para o projeto Raiô

@mixin raio-gradient-bg {
  background: var(--raio-gradient);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--raio-gradient);
    opacity: 0.9;
    z-index: -1;
  }
}

@mixin raio-card {
  background: var(--raio-white);
  border-radius: 16px;
  box-shadow: var(--raio-shadow);
  transition: var(--raio-transition);
  
  &:hover {
    box-shadow: var(--raio-shadow-hover);
    transform: translateY(-5px);
  }
}

@mixin raio-button {
  background: var(--raio-gradient);
  border: none;
  border-radius: 50px;
  color: var(--raio-white);
  font-weight: 600;
  padding: 12px 24px;
  cursor: pointer;
  transition: var(--raio-transition);
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--raio-shadow-hover);
  }
}

@mixin responsive($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: #{$mobile - 1px}) { @content; }
  }
  @if $breakpoint == tablet {
    @media (min-width: #{$mobile}) and (max-width: #{$tablet - 1px}) { @content; }
  }
  @if $breakpoint == desktop {
    @media (min-width: #{$tablet}) { @content; }
  }
  @if $breakpoint == large {
    @media (min-width: #{$desktop}) { @content; }
  }
}
EOF

# Criar animações SCSS base
cat > src/assets/styles/animations.scss << 'EOF'
// Animações para o projeto Raiô

@keyframes raio-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes raio-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes raio-scale-in {
  0% { 
    transform: scale(0.8);
    opacity: 0;
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes raio-slide-up {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes raio-gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

// Classes utilitárias
.raio-animate-float {
  animation: raio-float 3s ease-in-out infinite;
}

.raio-animate-pulse {
  animation: raio-pulse 2s ease-in-out infinite;
}

.raio-animate-scale-in {
  animation: raio-scale-in 0.6s var(--raio-bounce);
}

.raio-animate-slide-up {
  animation: raio-slide-up 0.8s ease-out;
}

.raio-gradient-animation {
  background-size: 400% 400%;
  animation: raio-gradient-shift 8s ease infinite;
}
EOF

# Atualizar angular.json para incluir novos assets
echo "⚙️ Configurando Angular..."

# Criar README personalizado
cat > README.md << 'EOF'
# 📊 Estudo de Caso - Raiô Benefícios

Site de apresentação do estudo de caso de transformação digital CRM para a Raiô Benefícios.

## 🚀 Começando

### Pré-requisitos
- Node.js 16+
- Angular CLI 16+

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
ng serve
```

### Build
```bash
ng build --prod
```

## 📋 Estrutura do Projeto

- **components/**: Componentes da aplicação
- **services/**: Serviços para dados e lógica
- **models/**: Interfaces TypeScript
- **assets/**: Recursos estáticos (imagens, dados, estilos)

## 🎨 Design System

O projeto utiliza as cores oficiais da Raiô Benefícios:
- Laranja: #FF8C00
- Dourado: #FFD700  
- Vermelho: #FF6B35

## 📊 Dados

Os dados do caso estão em `src/assets/data/` em formato JSON.

## 🛠️ Tecnologias

- Angular 16+
- TypeScript
- SCSS
- Chart.js
- Angular Animations
EOF

echo "✅ Projeto criado com sucesso!"
echo ""
echo "📁 Estrutura criada em: ./raio-case-study"
echo "🚀 Para começar:"
echo "   cd raio-case-study"
echo "   ng serve"
echo ""
echo "🌐 O site estará disponível em: http://localhost:4200"