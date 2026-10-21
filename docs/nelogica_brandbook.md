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


## Revisão visual — 21/10/2026

A segunda versão amplia o frontend a partir das referências Boticário, Insider,
Renner, ACT e TKE, mantendo o container de 1000 px e os conteúdos canônicos.

- Hero com rede de dados em canvas, grade, conexões animadas entre CRM/dados/IA,
  nome com entrada por palavras e marca em evidência.
- Quatro indicadores extraídos diretamente das experiências já cadastradas:
  otimização de custos, incremental de CRM, redução de churn e conversão.
  Cada destaque preserva empresa e contexto e leva à experiência correspondente.
- Perfil em composição editorial; três painéis de competências com níveis
  animados; faixa contínua de tecnologias; timeline com marcadores e conquistas;
  formação em cartões e projetos com identidade visual própria.
- Navegação fixa por seções, progresso de leitura, voltar ao topo e à home,
  contatos e impressão no idioma selecionado.
- Controles de pausa, preferência por movimento reduzido e suspensão do canvas
  quando fora da tela ou com a aba oculta. Tooltips são apresentados fora dos
  ancestrais animados para não serem cortados e funcionam com teclado e toque.
- Paleta corporativa preservada; azul claro auxiliar nas conexões e indicadores.
  Tipografia Inter + Space Grotesk para a apresentação tecnológica.
- HTML/CSS/JS exclusivos da Nelogica; nenhum conteúdo canônico ou PDF alterado.

Artefatos de verificação visual e funcional desta revisão:
`/private/tmp/nelogica-upgrade/`.

Validação da revisão: validador do projeto sem erros/avisos; Chrome em PT/EN
nas larguras 320, 390, 768, 1024 e 1440; métricas e textos comparados às fontes
canônicas; pausa/retomada do canvas confirmada por snapshots; preferência de
movimento reduzido, links dos indicadores, navegação e impressão PT/EN testados.
Nenhum erro JavaScript ou recurso local com falha.

## Refinamento de fundo e contato — 21/10/2026

- Título de indicadores simplificado para “Alguns resultados” / “Selected results”,
  sem chamada ou descrição promocional adicional.
- Fundo externo em grafite, iluminação azul acinzentada, grade sutil e arcos;
  cabeçalho e rodapé com tons coordenados. As camadas decorativas preservam
  contraste, pausa de animações e preferência por movimento reduzido.
- Botões “Vamos conversar” / “Let’s talk” do cabeçalho e rodapé abrem o WhatsApp
  em nova aba. O número continua vindo do contato canônico, com fallback no HTML.
  O link de e-mail dedicado permanece disponível.
- CSS e JS versionados para evitar que o cache restaure o destino anterior do
  botão. Validador de referências locais ajustado para reconhecer arquivos com
  query string ou fragmento, preservando a detecção de caminhos inexistentes.
- Chrome: abertura dos dois botões por clique/teclado em PT/EN e toque em celular,
  destino e ausência de opener verificados. Navegação externa interceptada apenas
  no teste, sem envio de mensagens. Layout conferido em 320, 390, 768 e 1440 px;
  pausa/movimento reduzido e ausência de erros JavaScript verificados.
- Artefatos visuais e verificação em `/private/tmp/nelogica-polish/`.
