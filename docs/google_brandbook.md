# Google - Resumo do Brandbook

## Sobre a Marca

O Google é a empresa de busca e tecnologia do mundo (fundada em 1998, Menlo Park/CA). Nasceu da missão de organizar a informação do mundo e torná-la universalmente acessível e útil. Do buscador cresceu para um ecossistema completo — Search, Android, Chrome, Maps, YouTube, Workspace, Cloud e IA (Gemini). A identidade visual é reconhecida globalmente pelas quatro cores primárias e por um design radicalmente limpo, humano e brincalhão.

## Identidade Visual

### Logo
- Wordmark "Google" em Product Sans (geométrica, com terminações amigáveis), sempre em cores plenas: G azul, o vermelho, o amarelo, g azul, l verde, e vermelho
- Complementado pelo "G" multicolorido (favicon/app) e pelo conjunto de quatro pontos (o "Google loader")
- Arquivo no projeto: `assets/images/google.png` (wordmark full-color)
- **Regra crítica:** exibir o logo em cores naturais — NUNCA aplicar `filter`/`invert`. Inverter destruiria as quatro cores da marca. O mesmo vale para o logo do cabeçalho de impressão.

### Paleta de Cores

**Quatro cores primárias (o coração da marca):**
- **Azul (Blue)**: `#4285F4` - cor primária, elementos interativos, links
- **Vermelho (Red)**: `#EA4335` - acento
- **Amarelo (Yellow)**: `#FBBC05` - acento
- **Verde (Green)**: `#34A853` - acento

**Escala de apoio (Material / neutros):**
- **Azul Profundo**: `#1A73E8` - hover, gradientes, títulos secundários
- **Grey-900 (Ink)**: `#202124` - texto sobre branco
- **Grey-700**: `#5F6368` - subtexto
- **Cinza claro**: `#F8F9FA` - fundos de seção alternados
- **Hairline**: `#DADCE0` / `#E8EAED` - bordas finas de cartões

**Princípio:** branco dominante e generoso; as quatro cores entram como acentos precisos — nunca poluído. Espaço em branco É o design.

### Tipografia

- Proprietária: **Product Sans** (logo) e **Google Sans** / **Roboto** (produtos e UI)
- Para o CV: **Poppins** (títulos/display — geométrica, próxima da Product Sans) + **Roboto** (texto — a fonte de UI real do Google). `@import` de ambas via Google Fonts.

### Elementos Visuais

**Estilo de Design (Material):**
- Branco radical: muito respiro, hierarquia cristalina, cantos suaves
- As quatro cores como pontos, arcos e círculos — o "Google loader" de quatro pontos que quicam/pulsam
- Sombras suaves e cinzas (elevação Material), bordas hairline; zero ruído visual
- Botões estilo Material: brancos com borda fina que preenchem em azul no hover

## Personalidade da Marca

### Atributos
- **Humana e acessível**: tecnologia a serviço de todos
- **Brincalhão com propósito**: cor e movimento (Doodles, loaders) com muita disciplina
- **Clareza radical**: simplicidade e utilidade acima de tudo
- **Otimismo**: confiança de que a informação organizada empodera pessoas

### Tom de Voz
- Claro, direto, sem jargão
- Amigável e curioso
- Confiante, útil e inclusivo

## Posicionamento

Organizar a informação do mundo e torná-la universalmente acessível e útil — do buscador à inteligência artificial, com produtos usados por bilhões de pessoas todos os dias.

## Direção para a página do CV

- **Hero CLARO** (desvio deliberado e fiel à marca em relação a heros escuros): fundo `linear-gradient(135deg, #FFFFFF 0%, #F1F3F4 100%)`, texto escuro (nome `#202124`, cargo/subtexto `#5F6368`)
- Logo natural full-color no topo (sem filtro); tagline em pílula clara com borda hairline `#DADCE0` e uma pequena fileira de quatro pontos coloridos
- Tagline: "organizing the world's information" (EN) / "organizando a informação do mundo" (PT)
- Motivo bespoke: quatro círculos coloridos translúcidos flutuando à direita + um arco/órbita multicor sutil + o "Google loader" de quatro pontos que quicam com keyframes escalonados — brincalhão porém arejado
- Botões de contato estilo Material: brancos com borda fina, preenchem `#4285F4` com texto branco no hover
- Seções sobre branco com cinza claro `#F8F9FA` alternado; cartões brancos com bordas hairline e sombras cinza suaves
- Sublinhado dos títulos de seção = gradiente das quatro cores (azul→vermelho→amarelo→verde); skills com dots azuis; timeline azul→verde; tech tags cinza claro com texto azul
- Impressão: cabeçalho branco com texto escuro + logo natural + borda superior de 4px com o gradiente das quatro cores; títulos de seção em azul com borda inferior (sem badge preenchido — economiza tinta e mantém a limpeza Google)
- `theme-color` = `#4285F4`
