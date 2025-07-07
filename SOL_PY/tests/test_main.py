"""
Testes para o módulo principal
"""

import pytest
import sys
from pathlib import Path

# Adiciona o diretório src ao path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from main import main, setup_logging


class TestMain:
    """Testes para a função main"""
    
    def test_main_success(self):
        """Testa se a função main retorna 0 em caso de sucesso"""
        result = main([])
        assert result == 0
    
    def test_main_with_args(self):
        """Testa a função main com argumentos"""
        result = main(["arg1", "arg2"])
        assert result == 0


class TestLogging:
    """Testes para configuração de logging"""
    
    def test_setup_logging_default(self):
        """Testa configuração padrão de logging"""
        # Não deve lançar exceção
        setup_logging()
    
    def test_setup_logging_debug(self):
        """Testa configuração de logging em modo DEBUG"""
        # Não deve lançar exceção
        setup_logging("DEBUG")


if __name__ == "__main__":
    pytest.main([__file__])