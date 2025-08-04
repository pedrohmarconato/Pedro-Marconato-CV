# Template Creation Checklist

## ❌ NUNCA FAÇA:
1. **NUNCA** crie templates manualmente
2. **NUNCA** copie e cole de templates existentes
3. **NUNCA** implemente JavaScript customizado para funcionalidades padrão
4. **NUNCA** pule as etapas de validação
5. **NUNCA** comite sem rodar `python validate-project.py`

## ✅ SEMPRE FAÇA:
1. **SEMPRE** use `python create-new-template.py` para criar novos templates
2. **SEMPRE** siga os padrões estabelecidos em templates bem-sucedidos (ex: Willbank)
3. **SEMPRE** rode validação antes de cada commit
4. **SEMPRE** teste ambas versões EN e PT
5. **SEMPRE** use os padrões de cv-texts.js para conteúdo dinâmico

## 📋 Checklist de Criação

### Passo 1: Inicialização
- [ ] Executei `python create-new-template.py`
- [ ] Informei o nome da empresa corretamente
- [ ] Validei que os arquivos foram criados

### Passo 2: Customização Visual
- [ ] Defini as variáveis CSS no `:root`
- [ ] Mantive `.cv-container { max-width: 1000px; margin: 30px auto; }`
- [ ] Adicionei estilos específicos da empresa

### Passo 3: Estrutura HTML
- [ ] Mantive todos IDs obrigatórios (`cv-name`, `cv-role`, etc.)
- [ ] Mantive IDs de seção (`section-skills`, `section-experience`, etc.)
- [ ] Não removi elementos padrão

### Passo 4: Funcionalidades
- [ ] Tooltips seguem o padrão Willbank (se aplicável)
- [ ] Conteúdo carrega do cv-texts.js
- [ ] Scripts padrão estão incluídos

### Passo 5: Validação
- [ ] Executei `python validate-project.py`
- [ ] Corrigi todos os erros reportados
- [ ] Testei funcionalidades em ambos idiomas

### Passo 6: Commit
- [ ] Validação passou sem erros
- [ ] Ambas versões (EN/PT) funcionando
- [ ] Mensagem de commit descritiva

## 🚨 Sinais de Alerta

Se você está:
- Escrevendo mais de 50 linhas de JavaScript customizado
- Criando sistemas de carregamento de conteúdo próprios
- Implementando tooltips do zero
- Mudando a estrutura básica do container

**PARE!** Você está violando os padrões. Use os padrões existentes.

## 📚 Referências
- `TEMPLATE_PADRAO.md` - Estrutura obrigatória
- `REGRAS_PROJETO.md` - Regras gerais
- Templates de referência: Willbank, Sicredi, Boticario