#!/usr/bin/env python3
"""
Módulo principal do projeto SOL_PY
"""

import logging
from typing import Optional
import sys


def setup_logging(level: str = "INFO") -> None:
    """
    Configura o sistema de logging.
    
    Args:
        level: Nível de logging (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    """
    logging.basicConfig(
        level=getattr(logging, level.upper()),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )


def main(args: Optional[list] = None) -> int:
    """
    Função principal do programa.
    
    Args:
        args: Lista de argumentos da linha de comando
        
    Returns:
        Código de saída (0 para sucesso, diferente de 0 para erro)
    """
    setup_logging()
    logger = logging.getLogger(__name__)
    
    logger.info("Iniciando SOL_PY...")
    
    try:
        # TODO: Adicione sua lógica principal aqui
        logger.info("SOL_PY executado com sucesso!")
        
        # Exemplo de uso
        print("Bem-vindo ao SOL_PY!")
        print("Este é um projeto Python básico.")
        
        return 0
        
    except Exception as e:
        logger.error(f"Erro durante a execução: {str(e)}", exc_info=True)
        return 1
    finally:
        logger.info("Finalizando SOL_PY...")


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))