#!/bin/bash
# 🔧 CONFIGURAÇÃO DOS HOOKS DO PROJETO

echo "🛡️  Configurando sistema de validação do projeto..."

# Verificar se Python está disponível
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado. Instale Python3 para usar as validações."
    exit 1
fi

# Tornar o validador executável
chmod +x validate-project.py

# Verificar se pre-commit está instalado
if ! command -v pre-commit &> /dev/null; then
    echo "⚠️  pre-commit não está instalado."
    echo "📦 Para instalar: pip install pre-commit"
    echo "📋 Ou use apenas: python validate-project.py"
else
    echo "✅ Instalando hooks do pre-commit..."
    pre-commit install
    echo "✅ Hooks instalados com sucesso!"
fi

# Criar hook manual se pre-commit não estiver disponível
if ! command -v pre-commit &> /dev/null; then
    echo "📋 Criando hook manual do Git..."
    
    # Criar diretório de hooks se não existir
    mkdir -p .git/hooks
    
    # Criar hook pre-commit manual
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# 🛡️ Hook de Validação Manual

echo "🔍 Executando validação do projeto..."
python validate-project.py

if [ $? -ne 0 ]; then
    echo "❌ Validação falhou. Commit cancelado."
    echo "📋 Consulte REGRAS_PROJETO.md"
    exit 1
fi

echo "✅ Validação passou. Prosseguindo com commit..."
EOF

    chmod +x .git/hooks/pre-commit
    echo "✅ Hook manual instalado!"
fi

echo ""
echo "🎯 CONFIGURAÇÃO CONCLUÍDA!"
echo ""
echo "📋 Como usar:"
echo "   • Validação manual: python validate-project.py"
echo "   • Consultar regras: cat REGRAS_PROJETO.md"
echo "   • Os hooks funcionarão automaticamente nos commits"
echo ""
echo "⚠️  IMPORTANTE:"
echo "   • SEMPRE consulte REGRAS_PROJETO.md antes de modificar código"
echo "   • Execute validação antes de commits importantes"
echo "   • Peça autorização para mudanças estruturais"
echo ""