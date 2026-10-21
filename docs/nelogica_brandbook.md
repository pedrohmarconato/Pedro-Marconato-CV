# Nelogica — aplicação ao currículo

Referências consultadas em 21/10/2026:

- [Página oficial acessível](https://use.nelogica.com.br/): azul-escuro `#182433`, preto e branco; tipografia Effra/Roc Grotesk.
- [Landing oficial Profit Business](https://use.nelogica.com.br/pr-capt-lp-profit-business-virada-de-chave): superfície `#E9F3FF` e tipografia Clash Display. O dourado dessa campanha não foi incorporado ao currículo.
- [Logo branco oficial](https://nelogicacombr.swipepages.media/2025/1/670ff6a1a69ea70011e5cd2e/-zjo531qnrv.png): cópia local em `assets/images/nelogica/logo-white.png` (465 × 154, PNG transparente).

A homepage `www.nelogica.com.br` bloqueou a leitura automatizada com HTTP 403.
As referências acima são páginas oficiais acessíveis, não um manual corporativo
formal. A implementação usa Inter, já adotada pelo projeto, com fallback Arial.
O tom auxiliar `#40576E` foi escolhido para manter textos pequenos legíveis em
fundo claro. O favicon pessoal permanece o mesmo; o logo identifica a empresa
para a qual o currículo foi preparado.

## Aplicação

- Cabeçalho escuro, logo branco, conteúdo claro e seções numeradas.
- Container de 1000 px e controles de idioma/impressão conforme o padrão existente.
- Navegação por seções, contato por e-mail/WhatsApp e detalhes das experiências acessíveis por teclado e toque.
- Conteúdo web exclusivamente de `assets/js/cv-texts.js`, sem alteração de qualificações ou métricas.
- Impressão estática em ambos os idiomas, com texto idêntico à base canônica Boticário e identidade Nelogica.
- Busca da home reconhece `nelogica`, `neologica`, `nelogica sistemas` e `nelogica sistemas de software`.

## Registro de atividades — 21/10/2026

1. Validação inicial: zero erros/avisos; 42 empresas existentes.
2. Geração oficial: `python3 create-new-template.py Nelogica '#182433' '#000000' '#E9F3FF'`.
3. Personalização dos dois templates e das duas versões de impressão; CSS e interações específicos em `assets/css/nelogica.css` e `assets/js/nelogica.js`.
4. Integração da marca e da busca. Correção do favicon pessoal para não solicitar PNGs inexistentes e preservar a cor de tema declarada pelo template.
5. Validação do projeto: zero erros/avisos; 43 empresas e 86 versões de impressão.
6. Conferência com Chrome/Playwright: PT/EN, larguras 320/390/768/1440, conteúdo dinâmico, imagens, ausência de overflow, detalhes por teclado/toque, contatos, troca de idioma, seis buscas na home e abertura/impressão dos PDFs no idioma correto. Nenhum erro JavaScript ou recurso local com falha nas páginas novas.
7. PDFs gerados e texto comparado à base canônica; screenshots desktop/mobile revisados. Artefatos locais de conferência em `/private/tmp/nelogica-review/`.
