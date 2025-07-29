# DIAGRAMA DE COMPONENTES - PEDRO MARCONATO CV

## Visão Geral da Arquitetura

```mermaid
graph TB
    subgraph "Frontend - Interface de Usuário"
        A[index.html<br/>Página de Seleção]
        B[cv_general.html<br/>CV Genérico]
        C[Templates de Empresas<br/>30+ arquivos HTML]
    end
    
    subgraph "Camada de Estilos"
        D[cv_styles/<br/>Estilos Específicos]
        E[assets/css/<br/>Estilos Globais]
        F[Estilos Inline<br/>nos Templates]
    end
    
    subgraph "Camada de Scripts"
        G[cv-texts.js<br/>Conteúdo Dinâmico]
        H[brands-config.js<br/>Configuração de Marcas]
        I[dynamic-favicon.js<br/>Sistema de Favicons]
        J[Transições<br/>sand/simple-transition.js]
        K[fallback-script.js<br/>Script de Contingência]
    end
    
    subgraph "Assets Estáticos"
        L[assets/images/<br/>Logos e Ilustrações]
        M[assets/favicons/<br/>Ícones SVG]
        N[docs/<br/>Imagens de Referência]
    end
    
    subgraph "Ferramentas e Scripts"
        O[add_new_brand.py<br/>Adicionar Nova Marca]
        P[generate-favicons.py<br/>Gerar Favicons]
        Q[update-favicons.py<br/>Atualizar Favicons]
        R[server.py<br/>Servidor Local]
    end
    
    A --> B
    A --> C
    C --> D
    C --> E
    C --> F
    C --> G
    C --> H
    C --> I
    C --> J
    B --> G
    B --> H
    B --> I
    H --> L
    I --> M
    C --> L
    C --> N
```

## Fluxo de Dados Detalhado

```mermaid
sequenceDiagram
    participant U as Usuário
    participant I as index.html
    participant T as Template CV
    participant JS as cv-texts.js
    participant BC as brands-config.js
    participant DF as dynamic-favicon.js
    participant CSS as Estilos
    
    U->>I: Acessa página inicial
    I->>U: Exibe opções de empresas
    U->>I: Seleciona empresa
    I->>T: Redireciona para template
    T->>JS: Carrega conteúdo dinâmico
    T->>BC: Carrega configuração da marca
    T->>DF: Aplica favicon dinâmico
    T->>CSS: Aplica estilos específicos
    JS->>T: Preenche conteúdo
    BC->>T: Aplica tema da marca
    DF->>T: Define favicon
    T->>U: Exibe CV personalizado
```

## Estrutura de Componentes

### 1. **Componente de Entrada (index.html)**
```
┌─────────────────────────────────┐
│         index.html              │
├─────────────────────────────────┤
│ • Grid de seleção de empresas  │
│ • Animações de background       │
│ • Links para templates          │
│ • Efeitos visuais (glassmorphism)│
└─────────────────────────────────┘
```

### 2. **Componentes de Template (30+ arquivos)**
```
┌─────────────────────────────────┐
│    Template de Empresa          │
├─────────────────────────────────┤
│ • Header com informações        │
│ • Seção de habilidades          │
│ • Experiência profissional      │
│ • Formação acadêmica            │
│ • Projetos e inovação           │
│ • Estilos específicos da marca  │
└─────────────────────────────────┘
```

### 3. **Sistema de Conteúdo Dinâmico**
```
┌─────────────────────────────────┐
│        cv-texts.js              │
├─────────────────────────────────┤
│ • Textos em PT/EN               │
│ • Dados de experiência          │
│ • Informações de contato        │
│ • Habilidades e ferramentas     │
│ • Funções de renderização       │
└─────────────────────────────────┘
```

### 4. **Sistema de Marcas**
```
┌─────────────────────────────────┐
│      brands-config.js           │
├─────────────────────────────────┤
│ • Configurações de 12+ marcas   │
│ • Paletas de cores              │
│ • Gradientes personalizados     │
│ • Logos e taglines              │
│ • Tipos de animação             │
└─────────────────────────────────┘
```

### 5. **Sistema de Favicons Dinâmicos**
```
┌─────────────────────────────────┐
│     dynamic-favicon.js          │
├─────────────────────────────────┤
│ • Detecção automática de marca  │
│ • Geração dinâmica de favicon   │
│ • Canvas API para renderização  │
│ • Meta tags de tema             │
└─────────────────────────────────┘
```

## Dependências entre Componentes

```mermaid
graph LR
    subgraph "Templates HTML"
        T1[allos.html]
        T2[ifood.html]
        T3[sicredi.html]
        TN[...outros]
    end
    
    subgraph "Scripts Principais"
        CV[cv-texts.js]
        BC[brands-config.js]
        DF[dynamic-favicon.js]
    end
    
    subgraph "Estilos"
        S1[styles.css]
        S2[optimized-styles.css]
        S3[transition-styles.css]
    end
    
    T1 --> CV
    T1 --> BC
    T1 --> DF
    T1 --> S1
    
    T2 --> CV
    T2 --> BC
    T2 --> DF
    T2 --> S1
    
    T3 --> CV
    T3 --> BC
    T3 --> DF
    T3 --> S1
```

## Estrutura de Diretórios Simplificada

```
Pedro-Marconato-CV/
│
├── index.html                    # Entrada principal
├── cv_general.html              # Template genérico
│
├── templates/companies/         # Templates específicos
│   ├── [empresa].html          # Versão EN
│   └── [empresa]_pt.html       # Versão PT
│
├── cv_styles/                   # Estilos específicos (legado)
│   └── cv_[empresa]_style_[LANG].html
│
├── assets/
│   ├── css/                    # Estilos globais
│   ├── js/                     # Scripts principais
│   ├── images/                 # Imagens e logos
│   └── favicons/               # Ícones SVG
│
├── docs/                        # Documentação e refs
│
└── *.py                        # Scripts utilitários
```

## Fluxo de Personalização por Empresa

```mermaid
graph TD
    A[Usuário seleciona empresa] --> B{Qual empresa?}
    B -->|iFood| C[Carrega ifood.html]
    B -->|Sicredi| D[Carrega sicredi.html]
    B -->|Outras| E[Carrega template específico]
    
    C --> F[brands-config.js aplica tema iFood]
    D --> G[brands-config.js aplica tema Sicredi]
    E --> H[brands-config.js aplica tema correspondente]
    
    F --> I[cv-texts.js carrega conteúdo]
    G --> I
    H --> I
    
    I --> J[dynamic-favicon.js define ícone]
    J --> K[CV Personalizado Renderizado]
```

## Componentes Críticos

1. **cv-texts.js**: Central para todo conteúdo dinâmico
2. **brands-config.js**: Define identidade visual
3. **dynamic-favicon.js**: Experiência visual consistente
4. **Templates HTML**: Base estrutural para cada empresa

## Pontos de Extensão

- **Adicionar nova empresa**: Use `add_new_brand.py`
- **Novo idioma**: Estender cv-texts.js
- **Nova seção**: Modificar templates HTML
- **Novo estilo**: Adicionar em brands-config.js