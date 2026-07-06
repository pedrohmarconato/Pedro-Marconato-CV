# Pedro Marconato — CV

Currículo web de **Pedro Henrique Lima Marconato** que veste a identidade visual
(cores, tipografia, tom) da empresa que o acessa — o mesmo currículo, rebrandado
sob demanda para dezenas de empresas diferentes.

![Efeito camaleão: o currículo trocando de identidade visual conforme a marca](docs/media/chameleon-demo.gif)

## Como funciona

1. **`index.html`** — home com busca por empresa; direciona para a versão
   correspondente do currículo.
2. **`templates/companies/{empresa}.html` / `{empresa}_pt.html`** — a página web
   de cada empresa (EN/PT), com conteúdo renderizado dinamicamente a partir de
   `assets/js/cv-texts.js`, a fonte única de todo o texto do CV.
3. **`cv_styles/cv_{empresa}_style_EN.html` / `_PT.html`** — a versão de
   impressão/PDF de cada empresa, aberta pelo botão de impressão da página.
4. **`create-new-template.py`** — gerador oficial de uma nova empresa (cria as
   4 páginas, aplica a paleta de cores informada e atualiza o índice).

![Fluxo de criação de uma nova versão do currículo](docs/media/flow-diagram.svg)

Hoje o site tem **41 empresas** cadastradas (82 páginas web + 82 versões de
impressão, em português e inglês).

## Estrutura do repositório

```
index.html                  home / seleção de empresa
templates/companies/        páginas web por empresa (EN/PT)
cv_styles/                  versões de impressão/PDF por empresa (EN/PT)
assets/
  css/                      estilos
  js/                       cv-texts.js (conteúdo), brands-config.js, transições
  images/                   logos e imagens usadas nas páginas
  favicons/                 favicons por empresa
  brandbooks/               referência de identidade visual por empresa
docs/                       documentação de arquitetura e brandbooks
create-new-template.py      gerador oficial de novas empresas
validate-project.py         validador do projeto (roda no pre-commit)
serve.py                    servidor HTTP local para desenvolvimento
```

Detalhes de arquitetura, convenções e regras de contribuição estão em
[`CLAUDE.md`](CLAUDE.md) e [`docs/`](docs/).

## Como rodar localmente

```bash
python3 serve.py
```

Acesse `http://localhost:8000` e navegue pelas páginas.

## Licença

Ver [`LICENSE`](LICENSE) — todos os direitos reservados.
