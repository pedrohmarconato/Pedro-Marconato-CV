# Insider - Resumo do Brandbook

## Sobre a Marca

A Insider (Insider Store) é uma marca brasileira de "roupas tecnológicas" fundada em 2018, hoje descrita pelo próprio site institucional como "a maior marca de essenciais do e-commerce brasileiro, com mais de 500 mil clientes em mais de 40 países". Os três pilares declarados na fundação são **tecnologia, design e sustentabilidade**. O discurso é de ruptura com o padrão da indústria têxtil: tecidos inteligentes, peças essenciais, moda consciente.

> "A INSIDER não acompanha o que vem por aí. Ela cria o futuro."
> — página institucional, insiderstore.com.br

## Identidade Visual

> As especificações abaixo foram **medidas no CSS renderizado** de https://www.insiderstore.com.br/
> (computed styles + variáveis de tema do Shopify), não estimadas.

### Logo
- Wordmark "INSIDER" em letras geométricas condensadas, com cortes diagonais nos terminais
- Monocromático — uma única cor sólida, sem versão colorida
- Arquivo no projeto: `assets/images/insider.svg` (vetorial, `fill="black"`, viewBox 137×22)
- Sobre fundo escuro: `filter: brightness(0) invert(1)` (o wordmark é de cor única, então a inversão é segura — ao contrário de logos multicoloridos como Google e Mercado Livre)

### Paleta de Cores

**A marca não possui cor de destaque.** As variáveis de tema do site definem apenas:

| Variável do site | Valor | Hex |
|---|---|---|
| `--color-button` | `0,0,0` | `#000000` |
| `--color-button-text` | `255,255,255` | `#FFFFFF` |
| `--color-foreground` | `61,61,61` | `#3D3D3D` |
| `--color-background` | `255,255,255` | `#FFFFFF` |

**Escala monocromática recorrente no CSS** (por frequência de ocorrência):
- **Preto**: `#000000` — rodapé, botões primários, logo sobre claro (cor mais frequente do CSS)
- **Branco**: `#FFFFFF` — fundo de página, texto sobre preto
- **Grafite**: `#3D3D3D` — cor padrão do texto
- **Cinza médio**: `#5F5F5F` · `#666666` — textos auxiliares
- **Cinza escuro**: `#303030`
- **Quase-branco**: `#FAFAFA` — fundos alternativos
- **Cinza claro**: `#EBEBEB` — bordas e divisores

**Princípio:** a hierarquia visual vem de **peso tipográfico e letter-spacing**, nunca de cor. A única cor da página vem da fotografia de produto.

### Tipografia

- **Manrope** é a família única de todo o site — logo, títulos, corpo e botões. Servida como TTF self-hosted pelo CDN da loja (`Manrope-ExtraLight.ttf`), disponível também no Google Fonts.
- Logo/header: Manrope 400, `letter-spacing: 0.69px`, 16.1px
- H1 (faixa de topo): 14px, peso 400, `letter-spacing: 0.6px`
- H2 (títulos de seção): 24px, **peso 700**, `letter-spacing: 4.8px`, `text-transform: uppercase`
- Botões: peso 700, `letter-spacing: 1.15px`, `padding: 10px 32px`

> As fontes `Insider-Gilroy`, `Insider-Cardo`, `Insider-Roboto` carregadas na página pertencem ao widget de personalização/bordado de produto — **não** são tipografia de marca.

### Geometria e Superfície

- **Cantos retos**: cards de produto e imagens têm `border-radius: 0`
- **Único raio da marca**: `6px`, exclusivo dos botões CTA
- **Sem sombra**: `box-shadow: none` em botões e cards — a profundidade vem de borda e contraste
- Header `position: static` (não fixo), fundo transparente, altura ~82px
- Rodapé preto `#000000` com texto `#DDDDDD`

## Personalidade da Marca

Minimalista, tech e de alto contraste. Estética próxima do e-commerce premium europeu: fotografia grande, tipografia em caixa alta com tracking amplo, ornamento zero. Copy curta e afirmativa ("SAIBA MAIS", "NakedFeel® — na pele, só o essencial"). O site "flutua": header transparente sobre imagem cheia, sem molduras nem sombras.

## Aplicação no CV

A página `templates/companies/insider.html` traduz essa linguagem em **dark editorial**:

- Fundo `#0A0A0A`, container `#111111`, superfícies `#161616`/`#1C1C1C`, filetes `#2A2A2A`/`#3D3D3D`
- Manrope em toda a página; JetBrains Mono apenas para dados tabulares (período, índices de seção, tags técnicas)
- Caixa alta com tracking de 2,4px a 4,8px em todos os títulos; cantos retos em tudo, exceto CTA (6px) e os botões flutuantes de navegação (padrão do projeto)
- **Sem cor de destaque** — os níveis de skill são fios verticais brancos sobre trilho cinza, não barras coloridas
- Ousadia por movimento, não por cor: trama de fios em canvas que se deforma sob o ponteiro (o "tecido inteligente" da marca), reveal do nome letra a letra, cursor custom, tilt 3D nos cards, count-up das métricas que já existem no texto, barra de progresso de leitura e ticker do repertório do CV
- Todo o movimento é desligado por `prefers-reduced-motion: reduce` e por ausência de ponteiro fino (touch)

O PDF (`cv_styles/cv_insider_style_{EN,PT}.html`) segue a regra do projeto — currículo clássico estático rebrandado da base canônica Boticário — com cabeçalho preto chapado, logo branco, Manrope e chips de contato de cantos retos.

## Fontes

- https://www.insiderstore.com.br/ — home e página institucional (medição de CSS em 2026-08-13)
- `assets/images/insider.svg` — wordmark fornecido pelo dono do projeto
