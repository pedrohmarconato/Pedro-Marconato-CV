# Documentação - Pedro Marconato CV

## Brandbooks

Esta pasta contém os brandbooks gerados automaticamente pelo MCP Pipeline.

### Estrutura

- `brandbooks/` - Brandbooks das marcas pesquisadas
- Cada arquivo segue o padrão: `{company_slug}-brandbook.md`

### Como usar

1. Execute o MCP Step 1 para gerar um brandbook:
   ```bash
   python mcp_pipeline/step1_brand_research.py "Nome da Empresa" company_slug
   ```

2. O brandbook será salvo em `docs/brandbooks/{company_slug}-brandbook.md`

3. Execute o MCP Step 2 que usará o brandbook como referência:
   ```bash
   python mcp_pipeline/step2_sonnet_templates.py company_slug
   ```

### Conteúdo dos Brandbooks

- Identidade da marca
- Cores primárias e secundárias  
- Tipografia
- Estilo visual
- Referências técnicas para CV
- Configurações para templates

---
*Documentação gerada automaticamente pelo MCP Pipeline*