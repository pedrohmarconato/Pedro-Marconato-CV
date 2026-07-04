# 🛡️ REGRAS DO PROJETO - PEDRO MARCONATO CV

**Versão:** 2.0
**Data:** 03 de julho de 2026
**Status:** OBRIGATÓRIO PARA TODAS AS MODIFICAÇÕES

---

## ⚠️ **INSTRUÇÕES PARA IAs**

**ANTES DE FAZER QUALQUER MODIFICAÇÃO NO CÓDIGO:**
1. 🔍 **SEMPRE CONSULTE** este arquivo
2. 📋 **EXECUTE** o script de validação: `python validate-project.py`
3. ✋ **PEÇA AUTORIZAÇÃO** para mudanças estruturais
4. 📝 **DOCUMENTE** todas as alterações no log de atividades

---

## 📋 REGRAS OBRIGATÓRIAS

### 🆕 **CRIAÇÃO DE NOVOS TEMPLATES**

#### ✅ **PROCESSO OBRIGATÓRIO:**
1. **SEMPRE** usar o script oficial: `python create-new-template.py`
   (interativo, ou `python create-new-template.py <Empresa> <#primaria> <#secundaria> <#destaque>`)
2. **CONSULTAR:** TEMPLATE_PADRAO.md antes de começar
3. **VERIFICAR:** Se a empresa já tem template
4. **PEDIR AUTORIZAÇÃO:** Não criar sem aprovação

#### 🚫 **PROIBIDO:**
- Criar templates manualmente
- Copiar templates existentes e modificar
- Pular o processo de validação

#### 📝 **ARQUIVOS GERADOS PARA CADA EMPRESA (padrão obrigatório):**
```
templates/companies/[empresa].html        (página EN)
templates/companies/[empresa]_pt.html     (página PT)
cv_styles/cv_[empresa]_style_EN.html      (impressão EN — dinâmica)
cv_styles/cv_[empresa]_style_PT.html      (impressão PT — dinâmica)
```
O script também atualiza `assets/js/brands-config.js` e o
`companyMappings` do `index.html` (sem isso a empresa não aparece na busca da home).

**Não existem mais** arquivos `cv_[empresa]_style.html` sem sufixo de idioma —
esse padrão legado foi removido. Todo estilo de impressão tem sufixo `_EN` ou `_PT`.

#### 🔧 **ELEMENTOS OBRIGATÓRIOS EM TODO TEMPLATE:**
```html
<!-- ESTRUTURA BASE -->
<!DOCTYPE html>
<html lang="en"> <!-- ou lang="pt-BR" para PT -->

<!-- IDs OBRIGATÓRIOS (preenchidos por initializeBasicContent) -->
<h1 id="cv-name">, <h2 id="cv-role">, <span id="cv-email">, <span id="cv-phone">,
<span id="cv-location">, <a id="cv-linkedin">, <a id="cv-repository">, <p id="cv-profile">

<!-- SEÇÕES OBRIGATÓRIAS -->
<h2 id="section-skills">, <h2 id="section-experience">,
<h2 id="section-education">, <h2 id="section-projects">

<!-- CONTAINERS DE CONTEÚDO DINÂMICO -->
<div id="skills-strategic">, <div id="skills-tools">, <div id="skills-emerging">
<div id="experience-container">, <div id="education-container">, <div id="projects-container">

<!-- SCRIPTS OBRIGATÓRIOS (sempre em assets/js/) -->
<script src="../../assets/js/cv-texts.js"></script>
<script src="../../assets/js/dynamic-favicon.js"></script>
```

#### ⚙️ **INICIALIZAÇÃO DE CONTEÚDO — API REAL do cv-texts.js:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
    var lang = 'en'; // ou 'pt' na versão PT
    initializeBasicContent(lang);                      // nome, cargo, contatos, perfil
    renderSkills('skills-strategic', 'strategic', lang); // skills por categoria
    renderSkills('skills-tools', 'tools', lang);
    renderSkills('skills-emerging', 'emerging', lang);
    renderExperienceTimeline(lang);                    // #experience-container
    renderEducation(lang);                             // #education-container
    renderProjects(lang);                              // #projects-container
    initializeModalTexts(lang);                        // modais (se existirem)
});
```
> ⚠️ **NÃO existe** função `initializeContent()`. Documentos e scripts antigos
> que a mencionavam estavam errados — chamadas a ela falham silenciosamente
> e deixam a página vazia. Use as funções acima.

### 🎨 **PADRÃO DE CORES E CSS**

```css
:root {
    /* Cores específicas da empresa */
    --[empresa]-primary: #XXXXXX;
    --[empresa]-secondary: #XXXXXX;
    --[empresa]-accent: #XXXXXX;

    /* NUNCA usar variáveis de outras empresas */
    /* ❌ ERRADO: --sicredi-green quando não é Sicredi */
}
```
Variáveis adicionais com o prefixo da própria empresa são permitidas
(ex.: `--ifood-light-gray` dentro do template do iFood).

### 📁 **ESTRUTURA DE ARQUIVOS**

#### ✅ **LOCAIS CORRETOS:**
- **Templates:** `templates/companies/`
- **Estilos de impressão:** `cv_styles/` (somente `_EN`/`_PT`)
- **Scripts JS:** `assets/js/` (cv-texts.js, dynamic-favicon.js, brands-config.js, fallback-script.js)
- **Imagens:** `assets/images/`
- **Documentação:** Raiz do projeto (arquivos .md)

#### 🚫 **PROIBIDO CRIAR:**
- Arquivos de backup com sufixo `_backup`
- Arquivos temporários em `templates/companies/`
- Scripts de desenvolvimento em `templates/`
- Arquivos de teste ou páginas soltas na raiz do projeto
- Cópias de cv-texts.js fora de `assets/js/` (fonte única!)

### 🖨️ **BOTÃO DE IMPRESSÃO**

Toda página DEVE ter um botão que abre o estilo de impressão **do mesmo idioma**:
```javascript
// página EN -> cv_..._style_EN.html | página PT -> cv_..._style_PT.html
var win = window.open('../../cv_styles/cv_[empresa]_style_EN.html', '_blank');
win.onload = function() { win.print(); }
```

### 🔗 **INTEGRAÇÃO CV-TEXTS.JS**

1. Fonte única: `assets/js/cv-texts.js` (nunca duplicar)
2. Referência nos templates: `../../assets/js/cv-texts.js`
3. Referência nos cv_styles dinâmicos: `../assets/js/cv-texts.js`
4. Todos os IDs básicos e de seção presentes
5. Ao atualizar o CV (novo emprego, idade etc.), editar **somente** o cv-texts.js;
   estilos de impressão estáticos antigos precisam ser atualizados manualmente —
   prefira os dinâmicos gerados pelo script atual

---

## 🚨 REGRAS DE SEGURANÇA

### ❌ **NUNCA FAZER:**
1. **Deletar** cv_styles (são necessários para impressão)
2. **Remover** referências ao cv-texts.js
3. **Alterar** estrutura de diretórios sem autorização
4. **Criar** arquivos fora dos locais especificados
5. **Usar** variáveis CSS de outras empresas
6. **Duplicar** o cv-texts.js

### ✅ **SEMPRE FAZER:**
1. **Validar** com script antes de commit
2. **Testar** template em ambos os idiomas
3. **Verificar** se impressão funciona (cv_styles do idioma correto)
4. **Documentar** mudanças no log
5. **Seguir** convenções de nomenclatura

---

## 📋 CHECKLIST PRE-COMMIT

- [ ] Executei `python validate-project.py`
- [ ] Consultei REGRAS_PROJETO.md
- [ ] Testei em ambos idiomas (PT/EN)
- [ ] Verifiquei impressão (cv_styles `_EN` e `_PT`)
- [ ] Atualizei documentação se necessário
- [ ] Não criei arquivos desnecessários

---

## 📞 QUANDO PEDIR AUTORIZAÇÃO

### 🛑 **SEMPRE PEDIR ANTES DE:**
- Criar novos templates
- Modificar estrutura de diretórios
- Alterar cv-texts.js
- Remover arquivos existentes
- Mudar sistema de cores/CSS
- Alterar scripts principais

### ✅ **PODE FAZER SEM PEDIR:**
- Corrigir typos em conteúdo
- Ajustar espaçamentos CSS
- Atualizar documentação
- Executar validações
- Corrigir bugs óbvios

---

## 📊 VERSIONAMENTO

**v1.0** - 28/07/2025 - Versão inicial
**v2.0** - 03/07/2026 - Estrutura deduplicada: fonte única do cv-texts.js em
`assets/js/`, estilos de impressão somente `_EN`/`_PT`, API real de inicialização
documentada (initializeBasicContent + render*), `add_new_brand.py` aposentado,
`create-new-template.py` reescrito (gera estilos dinâmicos e atualiza o index)

---

## 🎯 OBJETIVO

Manter **consistência**, **qualidade** e **padrões** em todas as modificações,
garantindo que todos os templates funcionem, a estrutura permaneça organizada,
a documentação reflita a realidade do código e novas IAs sigam os mesmos padrões.
