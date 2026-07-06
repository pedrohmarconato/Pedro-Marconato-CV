# Documentação — Pedro Marconato CV

Notas de arquitetura e referências de marca usadas para criar/manter as versões
personalizadas do currículo. Para o mapa geral do projeto, veja o `CLAUDE.md`
na raiz do repositório.

## Brandbooks

Resumo da identidade visual (cores, tipografia, tom) de cada empresa-alvo,
usado como referência ao criar um novo template com `create-new-template.py`.
Hoje existem em dois formatos:

- `docs/{empresa}_brandbook.md` — arquivo único por empresa.
- `assets/brandbooks/{empresa}/` — pasta por empresa (para casos com mais de
  um arquivo de referência).

## Outros documentos desta pasta

- `REGRAS_PROJETO.md` — regras de processo para modificar o projeto.
- `TEMPLATE_PADRAO.md` — especificação do template padrão de uma página de empresa.
