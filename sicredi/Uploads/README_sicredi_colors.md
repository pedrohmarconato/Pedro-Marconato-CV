# Animação dotLottie do Logo Sicredi - Cores Girando

Este projeto contém uma animação do logo da Sicredi onde as cores giram como uma engrenagem, transitando entre diferentes tonalidades de verde e voltando à cor original.

## Arquivos Incluídos

- `sicredi_colors.lottie`: Arquivo dotLottie contendo a animação
- `sicredi_colors.json`: Arquivo JSON Lottie contendo a animação
- `sicredi_colors_demo_final.html`: Página de demonstração que permite visualizar a animação em ambos os formatos
- `sicredi_colors_demo.html`: Página de demonstração usando o formato dotLottie
- `sicredi_colors_demo_json.html`: Página de demonstração usando o formato JSON

## Cores Utilizadas

A animação transita entre as seguintes cores:
- `#009A49`: Verde Sicredi (cor original)
- `#f1faef`: Verde muito claro
- `#1b7139`: Verde escuro
- `#63c834`: Verde vibrante
- `#75c053`: Verde médio
- `#9ec9af`: Verde acinzentado

## Como Usar

1. Abra o arquivo `sicredi_colors_demo_final.html` em um navegador para visualizar a animação
2. Use os botões "Versão JSON" e "Versão dotLottie" para alternar entre os formatos
3. Use os botões "Reproduzir", "Pausar" e "Parar" para controlar a animação

## Implementação em Outros Projetos

### Usando o formato dotLottie

```html
<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>

<dotlottie-player
    src="caminho/para/sicredi_colors.lottie"
    background="transparent"
    speed="1"
    style="width: 300px; height: 300px;"
    loop
    autoplay>
</dotlottie-player>
```

### Usando o formato JSON

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>

<div id="animation" style="width: 300px; height: 300px;"></div>

<script>
    const animation = lottie.loadAnimation({
        container: document.getElementById('animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'caminho/para/sicredi_colors.json'
    });
</script>
```

## Notas Técnicas

- A animação foi criada usando JavaScript e a biblioteca Lottie
- O efeito de cores girando é aplicado tanto ao símbolo (catavento) quanto ao texto "Sicredi"
- A duração total da animação é de 4 segundos (120 frames a 30fps)
- A animação é em loop contínuo
