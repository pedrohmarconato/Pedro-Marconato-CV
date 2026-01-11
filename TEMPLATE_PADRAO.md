# 📋 TEMPLATE PADRÃO - PEDRO MARCONATO CV

**Versão:** 2.0  
**Data:** 28 de julho de 2025  
**Status:** OBRIGATÓRIO PARA NOVOS TEMPLATES

---

## 🎯 **PADRÃO VISUAL APROVADO**

### 📏 **Container Principal:**
```css
.cv-container {
    max-width: 1000px;      /* Largura fixa */
    margin: 30px auto;      /* Centralizado */
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
}
```

### 🎨 **Estrutura de Cores (Exemplo):**
```css
:root {
    /* Cores da Empresa */
    --[EMPRESA]-primary: #XXXXXX;
    --[EMPRESA]-secondary: #XXXXXX;
    --[EMPRESA]-accent: #XXXXXX;
    
    /* Cores Aplicadas */
    --primary-color: var(--[EMPRESA]-primary);
    --secondary-color: var(--[EMPRESA]-secondary);
    --accent-color: var(--[EMPRESA]-accent);
    --text-color: #2c3e50;
    --border-color: rgba(0, 0, 0, 0.1);
}
```

---

## 📄 **TEMPLATE BASE - VERSÃO EN**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedro Marconato - [EMPRESA]</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
            /* [EMPRESA] Official Colors */
            --[EMPRESA]-primary: #XXXXXX;
            --[EMPRESA]-secondary: #XXXXXX;
            --[EMPRESA]-accent: #XXXXXX;
            
            /* Applied Colors */
            --primary-color: var(--[EMPRESA]-primary);
            --secondary-color: var(--[EMPRESA]-secondary);
            --accent-color: var(--[EMPRESA]-accent);
            --text-color: #2c3e50;
            --border-color: rgba(0, 0, 0, 0.1);
            --background-gradient: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: var(--text-color);
            line-height: 1.6;
            background: #f8f9fa;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }
        
        /* Animated background */
        .animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%);
            background-size: 400% 400%;
            animation: gradientShift 20s ease infinite;
            z-index: -2;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Container PADRÃO - 1000px centralizado */
        .cv-container {
            max-width: 1000px;
            margin: 30px auto;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            position: relative;
            border: 1px solid var(--border-color);
        }
        
        /* Header */
        .header {
            background: var(--background-gradient);
            color: white;
            padding: 60px 50px;
            text-align: center;
            position: relative;
        }
        
        /* Content sections */
        .content {
            padding: 50px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 1.5em;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--border-color);
        }
        
        /* Print button */
        .print-button {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .print-button:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .cv-container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header {
                padding: 40px 30px;
            }
            
            .content {
                padding: 30px;
            }
        }
        
        /* Print styles */
        @media print {
            body {
                background: white;
            }
            
            .animated-bg,
            .print-button {
                display: none;
            }
            
            .cv-container {
                margin: 0;
                box-shadow: none;
                border: none;
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="animated-bg"></div>
    
    <div class="cv-container">
        <header class="header">
            <button class="print-button" onclick="window.open('../../cv_styles/cv_[EMPRESA]_style_EN.html', '_blank')">
                <i class="fas fa-print"></i> Print CV
            </button>
            
            <h1 id="cv-name">PEDRO HENRIQUE LIMA MARCONATO</h1>
            <h2 id="cv-role">CRM Management and Data Intelligence</h2>
            
            <div class="contact-info">
                <span id="cv-email">pedrohmarconato@gmail.com</span> | 
                <span id="cv-phone">+55 (55) 981147758</span> | 
                <span id="cv-location">Cachoeira do Sul, RS</span>
                <div>
                    <a href="https://linkedin.com/in/pedrohmarconato" id="cv-linkedin">LinkedIn</a> | 
                    <a href="https://github.com/pedrohmarconato" id="cv-repository">Repository</a>
                </div>
            </div>
        </header>
        
        <div class="content">
            <section class="section">
                <h2 class="section-title">Professional Profile</h2>
                <p id="cv-profile">Professional profile content will be loaded here...</p>
            </section>
            
            <section class="section">
                <h2 class="section-title" id="section-skills">Skills & Tools</h2>
                <div id="skills-container">
                    <!-- Skills will be loaded by cv-texts.js -->
                </div>
            </section>
            
            <section class="section">
                <h2 class="section-title" id="section-experience">Professional Experience</h2>
                <div id="experience-container">
                    <!-- Experience will be loaded by cv-texts.js -->
                </div>
            </section>
            
            <section class="section">
                <h2 class="section-title" id="section-education">Education</h2>
                <div id="education-container">
                    <!-- Education will be loaded by cv-texts.js -->
                </div>
            </section>
            
            <section class="section">
                <h2 class="section-title" id="section-projects">Projects & Innovation</h2>
                <div id="projects-container">
                    <!-- Projects will be loaded by cv-texts.js -->
                </div>
            </section>
        </div>
    </div>
    
    <!-- SCRIPTS OBRIGATÓRIOS -->
    <script src="../../cv-texts.js"></script>
    <script src="../../assets/js/dynamic-favicon.js"></script>
    <script>
        // Initialize content when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize with English content
            if (typeof initializeContent !== 'undefined') {
                initializeContent('en');
            }
            
            // Initialize dynamic favicon
            if (typeof DynamicFavicon !== 'undefined') {
                DynamicFavicon.init();
            }
        });
    </script>
</body>
</html>
```

---

## 📄 **TEMPLATE BASE - VERSÃO PT**

Para a versão PT, use o mesmo template com estas mudanças:
1. `<html lang="pt-BR">`
2. `initializeContent('pt');`
3. Textos dos botões em português
4. Nome do arquivo: `[EMPRESA]_pt.html`

---

## 🎯 **CHECKLIST PARA NOVO TEMPLATE**

### ☑️ **Antes de criar:**
- [ ] Verificar se empresa já existe
- [ ] Obter cores oficiais da marca
- [ ] Preparar logo (se houver)

### ☑️ **Ao criar:**
- [ ] Usar este template como base
- [ ] Substituir [EMPRESA] pelo nome real
- [ ] Adicionar cores corretas
- [ ] Container DEVE ser 1000px centralizado
- [ ] Incluir todos os IDs obrigatórios
- [ ] Adicionar scripts cv-texts.js e dynamic-favicon.js

### ☑️ **Elementos obrigatórios:**
- [ ] IDs básicos: cv-name, cv-role, cv-email, cv-phone, cv-location, cv-linkedin, cv-repository
- [ ] IDs de seção: section-skills, section-experience, section-education, section-projects
- [ ] Container: cv-container com max-width: 1000px
- [ ] Scripts: cv-texts.js e dynamic-favicon.js
- [ ] Language Toggle: Botão EN/PT no canto superior direito
- [ ] Print Button: Botão PDF que abre cv_styles em nova aba e aciona print
- [ ] Email Modal: Modal para envio de email via Formspree
- [ ] Phone Modal: Modal com opções de contato (telefone/WhatsApp)
- [ ] Tooltips: Sistema de tooltips nas experiências (renderTooltip function)

### ☑️ **Após criar:**
- [ ] Executar `python validate-project.py`
- [ ] Testar em ambos idiomas
- [ ] Verificar impressão

---

## 🚫 **PROIBIDO**

1. **NÃO** alterar largura do container (sempre 1000px)
2. **NÃO** remover IDs obrigatórios
3. **NÃO** esquecer scripts essenciais
4. **NÃO** usar variáveis CSS de outras empresas
5. **NÃO** criar sem consultar este template

---

## 📊 **ESTRUTURA DE ARQUIVOS**

Para cada nova empresa, criar:
```
templates/companies/
├── [empresa].html          # Versão EN
└── [empresa]_pt.html       # Versão PT

cv_styles/
├── cv_[empresa]_style_EN.html   # Impressão EN
└── cv_[empresa]_style_PT.html   # Impressão PT
```

---

## 🔄 **PROCESSO COMPLETO**

1. **Copiar** este template
2. **Substituir** [EMPRESA] e cores
3. **Salvar** com nome correto
4. **Validar** com script
5. **Testar** funcionalidades
6. **Documentar** no log

---

**IMPORTANTE:** Este é o padrão OFICIAL. Todos os novos templates DEVEM seguir este modelo!