# 🚀 PROTOCOLO: Adicionar Nova Marca

## Automação Completa Criada!

Agora quando você solicitar **"adicionar nova marca"** ou **"criar template para [empresa]"**, seguirei este protocolo automatizado:

## ⚡ Comando Rápido
```bash
python add_new_brand.py
```

## 📋 O que o Script Automatiza

### ✅ Arquivos Criados Automaticamente:
1. **`templates/companies/[marca].html`** - Template inglês
2. **`templates/companies/[marca]_pt.html`** - Template português  
3. **`cv_styles/cv_[marca]_style_EN.html`** - PDF inglês
4. **`cv_styles/cv_[marca]_style.html`** - PDF português
5. **`index.html`** - Atualização do mapeamento

### ⚙️ Personalizações Automáticas:
- ✅ Cores da marca (primária/secundária)
- ✅ Keywords para busca
- ✅ Links de navegação entre idiomas
- ✅ Botões PDF corretos
- ✅ Mapeamento no index.html
- ✅ Logo da empresa (opcional)

## 📥 Dados Solicitados:
1. **Nome da marca** (ex: microsoft)
2. **Keywords** (ex: microsoft, ms, msft, azure)
3. **Cor primária** (ex: #00a1f1)
4. **Cor secundária** (ex: #0078d4)
5. **Logo** (opcional, ex: microsoft_logo.svg)

## 🎯 Protocolo de Uso

### Quando você disser:
- *"Adicionar nova marca [X]"*
- *"Criar template para [empresa]"*
- *"Preciso adicionar [marca] ao sistema"*

### Eu vou:
1. ✅ Executar `python add_new_brand.py`
2. ✅ Pedir os dados necessários
3. ✅ Criar todos os 4 arquivos + atualizar index
4. ✅ **VERIFICAR OBRIGATÓRIO**: Keywords funcionando no index.html
5. ✅ Testar busca com todas as keywords
6. ✅ Confirmar URLs de teste
7. ✅ Lembrar sobre logo (se aplicável)

## 🔄 Resultado Final:
```
🎉 Marca [EMPRESA] adicionada com sucesso!

📄 Arquivos criados:
  ✓ templates/companies/empresa.html
  ✓ templates/companies/empresa_pt.html  
  ✓ cv_styles/cv_empresa_style_EN.html
  ✓ cv_styles/cv_empresa_style.html
  ✓ index.html (atualizado)

🔗 URLs disponíveis:
  • /templates/companies/empresa.html
  • /templates/companies/empresa_pt.html

🏷️ Keywords de teste: palavra1, palavra2, sigla
```

## 🎨 Customização Adicional

Após a automação, você pode solicitar:
- Ajustes de cor específicos
- Modificação de layout
- Personalização de conteúdo
- Adição de elementos especiais

## ⚠️ Pré-requisitos
- ✅ Templates `general.html` e `general_pt.html` como base
- ✅ Estilos `cv_general_style.html` e `cv_general_style_EN.html`
- ✅ Python 3.6+ instalado

---

## 🚨 VERIFICAÇÃO OBRIGATÓRIA PÓS-CRIAÇÃO

### ✅ **CHECKLIST CRÍTICO:**
1. **Keywords funcionando**: Testar todas as keywords no index.html
2. **Templates acessíveis**: Verificar se as URLs funcionam
3. **CV-styles corretos**: Confirmar nomes PT/EN corretos
4. **Mapeamento atualizado**: Verificar se a entrada foi adicionada ao companyMappings

### 🔧 **TROUBLESHOOTING COMUM:**

#### ❌ **Problema**: Keywords não funcionam
- **Causa**: Script falhou em atualizar index.html
- **Solução**: Adicionar manualmente no companyMappings
- **Linha**: `'templates/companies/[marca].html': ['keyword1', 'keyword2'],`

#### ❌ **Problema**: CV-style PT não funciona  
- **Causa**: Nome incorreto do arquivo
- **Solução**: Renomear de `cv_[marca]_style.html` para `cv_[marca]_style_PT.html`

#### ❌ **Problema**: Template não aparece
- **Causa**: Arquivo não criado ou com erro
- **Solução**: Recriar template manualmente ou executar script novamente

**🤖 AUTOMAÇÃO ATIVA:** Basta solicitar uma nova marca que o protocolo será executado automaticamente!

**⚠️ IMPORTANTE:** Sempre verificar keywords após criação!