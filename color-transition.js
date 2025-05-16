<!-- Adicione este arquivo como color-transition.js -->
// color-transition.js - Sistema de transição de cores quadro a quadro

// Configurações da transição
const colorTransition = {
  duration: 1000, // Duração da transição em milissegundos
  frameRate: 60,  // Taxa de quadros por segundo
  isAnimating: false,

  // Inicializa o sistema
  init: function() {
    // Captura cliques em links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      
      const url = new URL(link.href, window.location.origin);
      const isSameDomain = url.origin === window.location.origin;
      
      if (isSameDomain && !link.getAttribute('href').startsWith('#') && !link.target) {
        e.preventDefault();
        
        if (!this.isAnimating) {
          this.applyTransition(link.href);
        }
      }
    });
  },
  
  // Aplica a transição de cores e depois navega para o novo URL
  applyTransition: function(destinationUrl) {
    this.isAnimating = true;
    
    // Captura o cabeçalho atual
    const header = document.querySelector('.header');
    if (!header) {
      // Se não encontrar o header, navegue normalmente
      window.location.href = destinationUrl;
      return;
    }
    
    // Busca a página de destino para extrair as cores
    fetch(destinationUrl)
      .then(response => response.text())
      .then(html => {
        // Cria um DOM temporário para extrair as cores
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');
        
        // Extrai as cores CSS da nova página
        const style = newDoc.querySelector('style');
        let newPrimaryColor = '#0d47a1';   // Azul escuro padrão
        let newSecondaryColor = '#2196f3'; // Azul claro padrão
        
        if (style) {
          const styleText = style.textContent;
          const primaryMatch = styleText.match(/--primary-color:\s*(#[0-9a-fA-F]{6})/);
          const secondaryMatch = styleText.match(/--secondary-color:\s*(#[0-9a-fA-F]{6})/);
          
          if (primaryMatch) newPrimaryColor = primaryMatch[1];
          if (secondaryMatch) newSecondaryColor = secondaryMatch[1];
        }
        
        // Obtém as cores atuais
        const computedStyle = getComputedStyle(document.documentElement);
        const currentPrimaryColor = computedStyle.getPropertyValue('--primary-color').trim() || '#1b7139';
        const currentSecondaryColor = computedStyle.getPropertyValue('--secondary-color').trim() || '#63c834';
        
        // Inicia a animação quadro a quadro
        this.animateColorFrames(
          header, 
          this.hexToRgb(currentPrimaryColor), 
          this.hexToRgb(currentSecondaryColor),
          this.hexToRgb(newPrimaryColor), 
          this.hexToRgb(newSecondaryColor),
          destinationUrl
        );
      })
      .catch(error => {
        console.error('Erro ao buscar a página de destino:', error);
        window.location.href = destinationUrl;
      });
  },
  
  // Animação quadro a quadro das cores
  animateColorFrames: function(element, startPrimary, startSecondary, endPrimary, endSecondary, destinationUrl) {
    const totalFrames = Math.floor(this.duration / (1000 / this.frameRate));
    let currentFrame = 0;
    
    // Função para interpolar cores entre dois valores
    const interpolateColor = (start, end, progress) => {
      return {
        r: Math.round(start.r + (end.r - start.r) * progress),
        g: Math.round(start.g + (end.g - start.g) * progress),
        b: Math.round(start.b + (end.b - start.b) * progress)
      };
    };
    
    // Cria um elemento de overlay para cobrir a tela durante a transição
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'white';
    overlay.style.zIndex = '9999';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease-in-out';
    document.body.appendChild(overlay);
    
    // Função que executa cada quadro da animação
    const animateFrame = () => {
      if (currentFrame >= totalFrames) {
        // Animação concluída, navegue para a nova página
        overlay.style.opacity = '1';
        
        setTimeout(() => {
          window.location.href = destinationUrl;
        }, 300); // Pequeno atraso para a transição de opacidade
        return;
      }
      
      // Calcula o progresso atual (0 a 1)
      const progress = currentFrame / totalFrames;
      
      // Interpola as cores para o quadro atual
      const currentPrimary = interpolateColor(startPrimary, endPrimary, progress);
      const currentSecondary = interpolateColor(startSecondary, endSecondary, progress);
      
      // Aplica as cores interpoladas ao header
      element.style.background = `linear-gradient(135deg, 
        rgb(${currentPrimary.r}, ${currentPrimary.g}, ${currentPrimary.b}), 
        rgb(${currentSecondary.r}, ${currentSecondary.g}, ${currentSecondary.b}))`;
      
      // Avança para o próximo quadro
      currentFrame++;
      requestAnimationFrame(animateFrame);
    };
    
    // Inicia a animação
    requestAnimationFrame(animateFrame);
  },
  
  // Utilitário para converter cores hex para RGB
  hexToRgb: function(hex) {
    // Remove o # se presente
    hex = hex.replace(/^#/, '');
    
    // Analisa a string hex
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    
    return { r, g, b };
  }
};

// Inicializa o sistema quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  colorTransition.init();
});

/*
========================================
INSTRUÇÕES DE IMPLEMENTAÇÃO
========================================

1. Salve este arquivo como "color-transition.js"
2. Adicione o script a ambos os arquivos HTML:
   <script src="color-transition.js"></script>
   
Personalizações:
- Ajuste colorTransition.duration para mudar a velocidade da transição
- Ajuste colorTransition.frameRate para controlar a suavidade da animação
*/