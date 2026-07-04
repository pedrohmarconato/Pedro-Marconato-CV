# CLAUDE.md — Pedro Marconato CV

Site estático (GitHub Pages) com versões do CV personalizadas por empresa-alvo,
em EN e PT.

## Mapa do projeto

- `index.html` — home com busca por empresa (objeto `companyMappings` no próprio arquivo)
- `templates/companies/[empresa].html` + `[empresa]_pt.html` — páginas por empresa
- `cv_styles/cv_[empresa]_style_EN.html` + `_PT.html` — versões de impressão
  (somente sufixos `_EN`/`_PT`; o padrão legado sem sufixo foi extinto)
- `assets/js/cv-texts.js` — **fonte única de todo o conteúdo do CV**
  (textos, experiências, skills, projetos, nos dois idiomas). Nunca duplicar.
- `assets/js/dynamic-favicon.js`, `brands-config.js`, `fallback-script.js`
- `create-new-template.py` — único gerador de novas empresas (gera as 4 páginas,
  atualiza brands-config.js e o companyMappings do index)
- `validate-project.py` — validação (roda no pre-commit)

## Regras essenciais

1. Leia `REGRAS_PROJETO.md` antes de modificar qualquer coisa.
2. Novo template: **sempre** via `python create-new-template.py` — nunca copiar
   HTML de outra empresa.
3. Conteúdo do CV (novo emprego, idade, skills): editar **apenas**
   `assets/js/cv-texts.js`. Estilos de impressão antigos com conteúdo estático
   precisam de atualização manual; os gerados atualmente são dinâmicos.
4. API de inicialização real: `initializeBasicContent(lang)`,
   `renderSkills(containerId, categoria, lang)`, `renderExperienceTimeline(lang)`,
   `renderEducation(lang)`, `renderProjects(lang)`, `initializeModalTexts(lang)`.
   **`initializeContent()` não existe** — não use nem gere código com ela.
5. Botão de impressão abre o `cv_styles` do **mesmo idioma** da página.
6. Caminhos relativos: templates usam `../../assets/...`; arquivos em
   `cv_styles/` usam `../assets/...`. Nunca caminhos absolutos (`/assets/...`)
   — quebram no subpath do GitHub Pages.
7. Antes de commit: `python validate-project.py`.

## Verificação rápida de renderização

```bash
python3 -m http.server 8777 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --dump-dom http://localhost:8777/templates/companies/general.html | grep -c experience-item
```
