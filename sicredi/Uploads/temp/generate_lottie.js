const fs = require('fs');
const path = require('path');

// Cores para a animação (da esquerda para a direita)
const colors = ['#f1faef', '#1b7139', '#63c834', '#75c053', '#9ec9af'];

// Ler o arquivo SVG
const svgContent = fs.readFileSync('/home/ubuntu/Uploads/sicredi_prepared.svg', 'utf8');

// Função para extrair os caminhos SVG
function extractPathsFromSVG(svgContent) {
  const paths = {};
  const idRegex = /id="([^"]+)"/g;
  const pathRegex = /<path id="([^"]+)"[^>]*d="([^"]+)"/g;
  
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    const id = match[1];
    const pathData = match[2];
    paths[id] = pathData;
  }
  
  return paths;
}

// Extrair caminhos do SVG
const svgPaths = extractPathsFromSVG(svgContent);

// Função para converter caminho SVG para formato Lottie
function svgPathToLottie(pathData) {
  // Simplificação: apenas retorna os dados do caminho como estão
  // Em uma implementação completa, isso converteria o caminho SVG para o formato Bezier do Lottie
  return pathData;
}

// Função para converter cor hex para RGB (formato Lottie)
function hexToRgb(hex) {
  // Remover o # se existir
  hex = hex.replace('#', '');
  
  // Converter para RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  return [r, g, b, 1];
}

// Criar a estrutura básica da animação Lottie
const lottieAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90, // 3 segundos a 30fps
  w: 1280,
  h: 720,
  nm: "Sicredi Logo Animation",
  ddd: 0,
  assets: [],
  layers: [],
  markers: []
};

// IDs dos elementos do logo em ordem da esquerda para a direita
const elementIds = [
  'pa_1', 'pa_7', 'pa_8', 'pa_2', 'pa_3', 'pa_4', 'pa_5', 'pa_6', 
  'letra_S', 'letra_i_1', 'letra_i_corpo_1', 'letra_c', 'letra_r', 
  'letra_e', 'letra_d', 'letra_i_2', 'letra_i_corpo_2'
];

// Criar camadas para cada elemento do logo
let layerIndex = 1;
elementIds.forEach((id, index) => {
  if (!svgPaths[id]) {
    console.log(`Caminho não encontrado para o ID: ${id}`);
    return;
  }
  
  // Calcular o atraso para cada elemento (da esquerda para a direita)
  const delay = index * 3; // 3 frames de atraso entre cada elemento
  
  // Criar camada para este elemento
  const layer = {
    ddd: 0,
    ind: layerIndex++,
    ty: 4,
    nm: id,
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [0, 0, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ind: 0,
            ty: "sh",
            ix: 1,
            ks: {
              a: 0,
              k: {
                i: [],
                o: [],
                v: [],
                c: true
              }
            },
            nm: "Path 1",
            mn: "ADBE Vector Shape - Group",
            hd: false
          },
          {
            ty: "fl",
            c: {
              a: 1,
              k: [
                {
                  t: delay,
                  s: hexToRgb('#ffffff'),
                  h: 1,
                  o: { x: [0.167], y: [0.167] },
                  i: { x: [0.833], y: [0.833] }
                },
                {
                  t: delay + 15,
                  s: hexToRgb(colors[0]),
                  h: 1,
                  o: { x: [0.167], y: [0.167] },
                  i: { x: [0.833], y: [0.833] }
                },
                {
                  t: delay + 30,
                  s: hexToRgb(colors[1]),
                  h: 1,
                  o: { x: [0.167], y: [0.167] },
                  i: { x: [0.833], y: [0.833] }
                },
                {
                  t: delay + 45,
                  s: hexToRgb(colors[2]),
                  h: 1,
                  o: { x: [0.167], y: [0.167] },
                  i: { x: [0.833], y: [0.833] }
                },
                {
                  t: delay + 60,
                  s: hexToRgb(colors[3]),
                  h: 1,
                  o: { x: [0.167], y: [0.167] },
                  i: { x: [0.833], y: [0.833] }
                },
                {
                  t: delay + 75,
                  s: hexToRgb(colors[4]),
                  h: 1
                }
              ]
            },
            o: { a: 0, k: 100 },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0], ix: 2 },
            a: { a: 0, k: [0, 0], ix: 1 },
            s: { a: 0, k: [100, 100], ix: 3 },
            r: { a: 0, k: 0, ix: 6 },
            o: { a: 0, k: 100, ix: 7 },
            sk: { a: 0, k: 0, ix: 4 },
            sa: { a: 0, k: 0, ix: 5 },
            nm: "Transform"
          }
        ],
        nm: "Group 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: false
      }
    ],
    ip: 0,
    op: 90,
    st: 0,
    bm: 0
  };
  
  lottieAnimation.layers.push(layer);
});

// Salvar o arquivo JSON da animação
fs.writeFileSync('/home/ubuntu/Uploads/sicredi_animation.json', JSON.stringify(lottieAnimation, null, 2));

console.log('Animação Lottie gerada com sucesso em /home/ubuntu/Uploads/sicredi_animation.json');
