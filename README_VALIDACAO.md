# 🛡️ SISTEMA DE VALIDAÇÃO E REGRAS

## 📋 **ARQUIVOS CRIADOS**

### 1. **REGRAS_PROJETO.md** - Manual Completo
- 📖 Regras obrigatórias para modificações
- 🎯 Instruções específicas para IAs
- ✅ Checklist pré-commit
- 🚫 Lista de práticas proibidas
- 📁 Estrutura de arquivos permitida

### 2. **validate-project.py** - Validador Automático
- 🔍 Verifica estrutura de arquivos
- ✅ Valida templates HTML
- 🔗 Checa integração cv-texts.js
- 🎨 Verifica consistência CSS
- 📊 Gera relatório detalhado

### 3. **setup-hooks.sh** - Configuração Automática
- ⚙️ Instala hooks do Git
- 🔧 Configura validação automática
- 📋 Instruções de uso

### 4. **.pre-commit-config.yaml** - Hooks Automáticos
- 🚨 Validação antes de commits
- 🔄 Verificação de consistência PT/EN
- 🚫 Bloqueio de arquivos proibidos

### 5. **.gitignore** - Proteção de Arquivos
- 🛡️ Bloqueia arquivos proibidos
- 📁 Mantém estrutura limpa

---

## 🚀 **COMO USAR**

### ⚙️ **Configuração Inicial (uma vez só):**
```bash
chmod +x setup-hooks.sh
./setup-hooks.sh
```

### 🔍 **Validação Manual:**
```bash
python validate-project.py
```

### 📋 **Consultar Regras:**
```bash
cat REGRAS_PROJETO.md
```

---

## 🎯 **PARA OUTRAS IAs**

### ⚠️ **ANTES DE MODIFICAR QUALQUER CÓDIGO:**

1. **LEIA OBRIGATORIAMENTE:** `REGRAS_PROJETO.md`
2. **EXECUTE:** `python validate-project.py`
3. **PEÇA AUTORIZAÇÃO** para mudanças estruturais
4. **DOCUMENTE** todas as alterações

### 🚫 **NUNCA FAÇA SEM CONSULTAR:**
- Criar novos templates
- Alterar estrutura de diretórios
- Modificar cv-texts.js
- Remover arquivos existentes

---

## 📊 **STATUS ATUAL**

🚨 **O validador encontrou 31 erros críticos no projeto atual!**

### Principais problemas identificados:
- Templates sem IDs obrigatórios (cv-email, cv-phone, etc.)
- Scripts dinâmicos faltando em alguns templates
- Arquivo cv-texts.js não encontrado
- Nomenclatura incorreta de cv_styles

### 📝 **PRÓXIMOS PASSOS:**
1. Corrigir erros identificados pelo validador
2. Padronizar todos os templates
3. Implementar validação automática nos commits

---

## 🔄 **COMO O SISTEMA FUNCIONA**

### ✅ **Funciona:**
- Validação local antes de commits
- Documentação clara das regras
- Scripts de verificação automática
- Bloqueio de arquivos proibidos

### ❌ **Limitações:**
- IAs externas não são "forçadas" a seguir regras
- Funciona apenas se as IAs consultarem a documentação
- Hooks são locais (cada clone precisa configurar)

---

## 📈 **EVOLUÇÃO DO SISTEMA**

O sistema foi criado para ser **evolutivo**. Você pode:
- Adicionar novas regras em `REGRAS_PROJETO.md`
- Melhorar validações em `validate-project.py`
- Criar novos hooks específicos
- Expandir a documentação

---

## 🎯 **OBJETIVO**

Garantir que **todas as modificações futuras** sigam os padrões estabelecidos, mantendo:
- ✅ Consistência entre templates
- 🔗 Integração completa com cv-texts.js
- 📁 Estrutura de arquivos organizada
- 📖 Documentação sempre atualizada