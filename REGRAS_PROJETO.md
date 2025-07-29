# 🛡️ REGRAS DO PROJETO - PEDRO MARCONATO CV

**Versão:** 1.0  
**Data:** 28 de julho de 2025  
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
2. **CONSULTAR:** TEMPLATE_PADRAO.md antes de começar
3. **VERIFICAR:** Se a empresa já tem template
4. **PEDIR AUTORIZAÇÃO:** Não criar sem aprovação

#### 🚫 **PROIBIDO:**
- Criar templates manualmente
- Copiar templates existentes e modificar
- Pular o processo de validação

#### 📝 **PADRÃO OBRIGATÓRIO:**
```
templates/companies/[EMPRESA].html (versão EN)
templates/companies/[EMPRESA]_pt.html (versão PT)
cv_styles/cv_[EMPRESA]_style_EN.html (impressão EN)
cv_styles/cv_[EMPRESA]_style_PT.html (impressão PT)
```

#### 🔧 **ELEMENTOS OBRIGATÓRIOS EM TODO TEMPLATE:**
```html
<!-- ESTRUTURA BASE -->
<!DOCTYPE html>
<html lang="en"> <!-- ou lang="pt-BR" para PT -->
<head>
    <!-- Meta básico -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedro Marconato - [EMPRESA]</title>
</head>

<!-- IDs OBRIGATÓRIOS -->
<h1 id="cv-name">PEDRO HENRIQUE LIMA MARCONATO</h1>
<div id="cv-role">Gestão de CRM e Inteligência de Dados</div>
<span id="cv-email">pedrohmarconato@gmail.com</span>
<span id="cv-phone">+55 (55) 981147758</span>
<span id="cv-location">Cachoeira do Sul, RS</span>
<a id="cv-linkedin">LinkedIn</a>
<a id="cv-repository">Repository</a>
<p id="cv-profile">[conteúdo perfil]</p>

<!-- SEÇÕES OBRIGATÓRIAS -->
<h2 id="section-skills">SKILLS & TOOLS</h2>
<h2 id="section-experience">PROFESSIONAL EXPERIENCE</h2>
<h2 id="section-education">EDUCATION</h2>
<h2 id="section-projects">PROJECTS & INNOVATION</h2>

<!-- SCRIPTS OBRIGATÓRIOS -->
<script src="../../cv-texts.js"></script>
<script src="../../assets/js/dynamic-favicon.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        initializeContent('en'); // ou 'pt' para versão PT
    });
</script>
```

### 🎨 **PADRÃO DE CORES E CSS**

#### ✅ **VARIÁVEIS CSS CORRETAS:**
```css
:root {
    /* Cores específicas da empresa */
    --[EMPRESA]-primary: #XXXXXX;
    --[EMPRESA]-secondary: #XXXXXX;
    --[EMPRESA]-accent: #XXXXXX;
    
    /* NUNCA usar variáveis de outras empresas */
    /* ❌ ERRADO: --sicredi-green quando não é Sicredi */
}
```

### 📁 **ESTRUTURA DE ARQUIVOS**

#### 🚫 **PROIBIDO CRIAR:**
- Arquivos de backup com sufixo `_backup`
- Arquivos temporários em `templates/companies/`
- Scripts de desenvolvimento em `templates/`
- Arquivos de teste na raiz do projeto

#### ✅ **LOCAIS CORRETOS:**
- **Templates:** `templates/companies/`
- **Estilos de impressão:** `cv_styles/`
- **Scripts:** `assets/js/`
- **Imagens:** `assets/images/`
- **Documentação:** Raiz do projeto (arquivos .md)

### 🔗 **INTEGRAÇÃO CV-TEXTS.JS**

#### ✅ **OBRIGATÓRIO EM TODOS OS TEMPLATES:**
1. Referência ao script: `<script src="../../cv-texts.js"></script>`
2. Todos os IDs básicos: cv-name, cv-role, cv-email, etc.
3. Todos os IDs de seção: section-skills, section-experience, etc.
4. Sistema de inicialização automática

---

## 🚨 REGRAS DE SEGURANÇA

### ❌ **NUNCA FAZER:**
1. **Deletar** cv_styles (são necessários para impressão)
2. **Remover** referências ao cv-texts.js
3. **Alterar** estrutura de diretórios sem autorização
4. **Criar** arquivos fora dos locais especificados
5. **Usar** variáveis CSS de outras empresas

### ✅ **SEMPRE FAZER:**
1. **Validar** com script antes de commit
2. **Testar** template em ambos os idiomas
3. **Verificar** se impressão funciona (cv_styles)
4. **Documentar** mudanças no log
5. **Seguir** convenções de nomenclatura

---

## 📋 CHECKLIST PRE-COMMIT

### ☑️ **ANTES DE QUALQUER COMMIT:**
- [ ] Executei `python validate-project.py`
- [ ] Consultei REGRAS_PROJETO.md
- [ ] Testei em ambos idiomas (PT/EN)
- [ ] Verifiquei impressão (cv_styles)
- [ ] Atualizei documentação se necessário
- [ ] Não criei arquivos desnecessários

---

## 🔄 PROCESSO DE MODIFICAÇÃO

### 📋 **FLUXO OBRIGATÓRIO:**
1. **Consultar** este arquivo de regras
2. **Executar** validação: `python validate-project.py`
3. **Pedir autorização** para mudanças estruturais
4. **Implementar** seguindo padrões
5. **Validar** novamente
6. **Documentar** no log de atividades
7. **Commit** com mensagem descritiva

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
**Próxima revisão:** Conforme evolução do projeto

---

## 🎯 OBJETIVO

Manter **consistência**, **qualidade** e **padrões** em todas as modificações do projeto, garantindo que:
- Todos os templates funcionem corretamente
- Estrutura permaneça organizada  
- Documentação esteja sempre atualizada
- Novas IAs sigam os mesmos padrões