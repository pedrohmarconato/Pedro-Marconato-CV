# 📋 TEMPLATE PADRÃO - PEDRO MARCONATO CV

**Versão:** 3.0
**Data:** 03 de julho de 2026
**Status:** OBRIGATÓRIO PARA NOVOS TEMPLATES

---

## 🎯 FONTE DA VERDADE

O template oficial **vive dentro do gerador**: `create-new-template.py`
(constantes `PAGE_TEMPLATE` e `PRINT_TEMPLATE`). Este documento descreve o
padrão; o gerador o materializa. **Nunca crie template copiando HTML deste
arquivo ou de outra empresa** — rode o script:

```bash
# interativo
python create-new-template.py

# não-interativo
python create-new-template.py "Nome Da Empresa" "#0066CC" "#004499" "#87CEEB"
```

O script cria/atualiza automaticamente:

```
templates/companies/[empresa].html        # página EN
templates/companies/[empresa]_pt.html     # página PT
cv_styles/cv_[empresa]_style_EN.html      # impressão EN (currículo estático branded)
cv_styles/cv_[empresa]_style_PT.html      # impressão PT (currículo estático branded)
assets/js/brands-config.js                # cores/gradiente da marca
index.html                                # companyMappings (busca da home)
```

---

## 📏 PADRÃO VISUAL APROVADO

### Container Principal
```css
.cv-container {
    max-width: 1000px;      /* Largura fixa — NÃO alterar */
    margin: 30px auto;      /* Centralizado */
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
}
```

### Estrutura de Cores
```css
:root {
    /* Cores da Empresa */
    --[empresa]-primary: #XXXXXX;
    --[empresa]-secondary: #XXXXXX;
    --[empresa]-accent: #XXXXXX;

    /* Cores Aplicadas */
    --primary-color: var(--[empresa]-primary);
    --secondary-color: var(--[empresa]-secondary);
    --accent-color: var(--[empresa]-accent);
    --text-color: #2c3e50;
    --border-color: rgba(0, 0, 0, 0.1);
}
```

---

## 🧩 ANATOMIA DO TEMPLATE GERADO

1. **Controles fixos fora do `.cv-container`** (o `backdrop-filter` do container
   quebraria `position: fixed` de descendentes):
   - Language toggle (EN ↔ PT): pílula branca **fixa no canto superior direito**
     (`position: fixed; top: 30px; right: 30px`), opção ativa com gradiente da
     marca + ícone `fa-check-circle`
   - Print button: **FAB redondo fixo no canto inferior direito**
     (`position: fixed; bottom: 30px; right: 30px; border-radius: 50%; 60×60px`,
     ícone `fa-file-pdf`) que abre o `cv_styles/cv_[empresa]_style_[EN|PT].html`
     do **mesmo idioma** e aciona `print()`
   - Mobile ≤768px: ambos migram para o rodapé (print à direita, toggle à esquerda)
2. **Header** com gradiente da marca contendo:
   - IDs de identidade: `cv-name`, `cv-role`, `cv-email`, `cv-phone`,
     `cv-location`, `cv-linkedin`, `cv-repository`
3. **Seções** com títulos identificados (`section-profile`, `section-skills`,
   `section-experience`, `section-education`, `section-projects`)
4. **Containers dinâmicos** preenchidos pelo cv-texts.js:
   `skills-strategic`, `skills-tools`, `skills-emerging`,
   `experience-container`, `education-container`, `projects-container`
5. **Scripts obrigatórios** no fim do body:
   ```html
   <script src="../../assets/js/cv-texts.js"></script>
   <script src="../../assets/js/dynamic-favicon.js"></script>
   ```

## ⚙️ INICIALIZAÇÃO — API REAL

```javascript
document.addEventListener('DOMContentLoaded', function() {
    var lang = 'en'; // 'pt' na versão PT
    initializeBasicContent(lang);
    renderSkills('skills-strategic', 'strategic', lang);
    renderSkills('skills-tools', 'tools', lang);
    renderSkills('skills-emerging', 'emerging', lang);
    renderExperienceTimeline(lang);
    renderEducation(lang);
    renderProjects(lang);
    initializeModalTexts(lang);
});
```

> ⚠️ A função `initializeContent()` **não existe** e nunca deve ser usada.
> Versões antigas deste documento e do gerador a mencionavam — páginas geradas
> assim ficavam com as seções vazias sem nenhum erro no console.

## 🖨️ ESTILO DE IMPRESSÃO (cv_styles)

Os arquivos de impressão são o **currículo clássico ESTÁTICO** (RESUMO DE
QUALIFICAÇÕES → FORMAÇÃO → EXPERIÊNCIA), branded por empresa — **um documento
propositalmente diferente da página** (a página é a versão web rica/dinâmica via
cv-texts.js; o PDF é o currículo tradicional de 1 página). O conteúdo canônico do
currículo mora em `cv_boticario_style_{EN,PT}.html`; o gerador **rebranda** essa
base para cada nova empresa (header escuro + cores da marca; logo, fontes e
tratamentos especiais de header entram na elevação da marca). Para atualizar o
currículo do PDF, edite a base canônica e re-rebrande — **nunca** faça o PDF
espelhar a página (foi o bug corrigido em 2026-07-05).

---

## 🎯 CHECKLIST PARA NOVO TEMPLATE

### Antes de criar
- [ ] Verificar se empresa já existe (`templates/companies/`)
- [ ] Obter cores oficiais da marca (primária, secundária, destaque)
- [ ] Preparar logo em `assets/images/` (opcional)

### Criar
- [ ] Rodar `python create-new-template.py`
- [ ] Conferir os 4 arquivos gerados + brands-config + index

### Depois de criar
- [ ] Executar `python validate-project.py`
- [ ] Abrir página EN e PT no navegador — todas as seções populadas
- [ ] Testar o botão de impressão nos dois idiomas
- [ ] Personalizar detalhes visuais da marca se necessário (sem quebrar IDs)

---

## 🚫 PROIBIDO

1. **NÃO** alterar largura do container (sempre 1000px)
2. **NÃO** remover IDs obrigatórios nem containers dinâmicos
3. **NÃO** esquecer scripts essenciais (`assets/js/cv-texts.js` + `dynamic-favicon.js`)
4. **NÃO** usar variáveis CSS de outras empresas
5. **NÃO** criar template copiando arquivos — sempre pelo gerador
6. **NÃO** criar estilos de impressão sem sufixo de idioma (`_EN`/`_PT`)

---

**IMPORTANTE:** Este é o padrão OFICIAL. Todos os novos templates DEVEM seguir este modelo!
