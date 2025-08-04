# Template Patterns - Padrões Comprovados

## 1. Padrão de Container CSS

### ✅ CORRETO:
```css
.cv-container {
    max-width: 1000px;      /* OBRIGATÓRIO */
    margin: 30px auto;      /* OBRIGATÓRIO */
    padding: 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: relative;
    z-index: 1;
}
```

### ❌ INCORRETO:
```css
.cv-container {
    max-width: 1200px;      /* ERRADO - deve ser 1000px */
    margin: 0 auto;         /* ERRADO - deve ser 30px auto */
}
```

## 2. Padrão de Tooltips (Baseado em Willbank)

### ✅ CORRETO:
```javascript
// Use as funções do cv-texts.js
// NÃO reimplemente do zero
```

### Estrutura HTML:
```html
<div class="experience-item">
    <div class="experience-header">
        <h3 class="job-title">
            <span id="job-title-1"></span>
            <span class="tooltip-icon" onclick="toggleTooltip('tooltip-1')">
                <i class="fas fa-info-circle"></i>
            </span>
        </h3>
    </div>
    <div id="tooltip-1" class="tooltip-content" style="display: none;">
        <!-- Conteúdo carregado do cv-texts.js -->
    </div>
</div>
```

### CSS do Tooltip:
```css
.tooltip-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    padding: 30px;
    max-width: 500px;
    z-index: 10000;
    display: none;
}

.tooltip-icon {
    cursor: pointer;
    color: var(--primary-color);
    margin-left: 10px;
    transition: all 0.3s ease;
}

.tooltip-icon:hover {
    transform: scale(1.2);
}
```

## 3. Padrão de Carregamento de Conteúdo

### ✅ CORRETO:
```html
<!-- No HTML, apenas IDs -->
<h1 id="cv-name"></h1>
<p id="cv-role"></p>
<span id="cv-email"></span>

<!-- Scripts no final -->
<script src="../../cv-texts.js"></script>
<script>
    // O cv-texts.js já faz o carregamento automaticamente
    // NÃO reimplemente sistemas de carregamento
</script>
```

### ❌ INCORRETO:
```javascript
// NÃO faça sistemas customizados de carregamento
function loadContent() {
    if (typeof CVTexts !== 'undefined') {
        // Centenas de linhas de código customizado
    }
}
```

## 4. Padrão de Logos

### ✅ CORRETO:
```html
<div class="header">
    <div class="logo-container">
        <img src="../../assets/images/company/logo.png" alt="Company" class="logo">
    </div>
    <div class="header-content">
        <!-- Conteúdo do header -->
    </div>
</div>
```

### CSS do Logo:
```css
.logo {
    height: 60px;
    width: auto;
    transition: transform 0.3s ease;
}

.logo:hover {
    transform: scale(1.05);
}
```

## 5. Padrão de Seções

### ✅ CORRETO:
```html
<!-- IDs obrigatórios nas seções -->
<section class="section" id="section-skills">
    <h2 class="section-title">Skills</h2>
    <div id="cv-skills-grid">
        <!-- Conteúdo carregado do cv-texts.js -->
    </div>
</section>

<section class="section" id="section-experience">
    <h2 class="section-title">Professional Experience</h2>
    <div id="cv-experience-timeline">
        <!-- Conteúdo carregado do cv-texts.js -->
    </div>
</section>
```

## 6. Padrão de Botões de Contato

### ✅ CORRETO:
```html
<button class="contact-button" onclick="openEmailForm()">
    <i class="fas fa-envelope"></i> <span id="cv-email"></span>
</button>
```

### CSS:
```css
.contact-button {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.contact-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
```

## 7. Variáveis CSS Obrigatórias

### ✅ CORRETO:
```css
:root {
    --primary-color: #D80073;      /* Cor principal da empresa */
    --secondary-color: #FF69B4;    /* Cor secundária */
    --text-color: #333;            /* Cor do texto */
    --bg-color: #f5f5f5;          /* Cor de fundo */
    --hover-color: #FF1493;       /* Cor de hover */
}
```

## 8. Scripts Obrigatórios

### ✅ CORRETO:
```html
<!-- Sempre no final do body -->
<script src="../../cv-texts.js"></script>
<script src="../../assets/js/dynamic-favicon.js"></script>
```

## 9. Padrão de Responsividade

### ✅ CORRETO:
```css
@media (max-width: 768px) {
    .cv-container {
        margin: 10px;
        padding: 20px;
    }
    
    .header {
        flex-direction: column;
    }
}
```

## 10. Estrutura de Print

### ✅ CORRETO:
```css
@media print {
    .cv-container {
        max-width: 100%;
        margin: 0;
        box-shadow: none;
    }
    
    .contact-button {
        display: none;
    }
}
```

## ⚠️ IMPORTANTE

**SEMPRE** use estes padrões como base. Se precisar de algo diferente:
1. Documente o motivo
2. Valide com a equipe
3. Adicione ao TEMPLATE_PATTERNS.md se for aprovado

**NUNCA** crie implementações customizadas para funcionalidades que já têm padrão estabelecido.