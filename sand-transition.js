// sand-transition.js
// Sistema de transição com efeito de areia física realista entre cv_general.html e sicredi.html
// Implementa uma simulação avançada de partículas de areia com formação de dunas

window.sandTransition = (function() {
  // Configurações do tema
  const THEMES = {
    'cv_general': {
      primary: '#0d3b66',
      secondary: '#1e5f94',
      accent: '#4a90e2',
      light: '#e5f0ff',
      dark: '#053159',
      quadrant: '#E6F2FF',
      lightBg: '#f5f7fa',
      text: '#2c3e50',
      border: '#e0e6ed',
      sandColor: '#2e9fff'
    },
    'sicredi': {
      primary: '#1b7139',
      secondary: '#63c834',
      accent: '#75c053',
      light: '#9ec9af', 
      dark: '#1b7139',
      quadrant: '#f1faef',
      lightBg: '#f1faef',
      text: '#2c3e50',
      border: '#9ec9af',
      sandColor: '#27ae60'
    }
  };

  // Detecta se é um link de transição entre as páginas
  function isTransitionLink(link) {
    const href = link.getAttribute('href');
    if (!href) return false;
    return (
      (href.includes('cv_general.html') && window.location.pathname.endsWith('sicredi.html')) ||
      (href.includes('sicredi.html') && window.location.pathname.endsWith('cv_general.html'))
    );
  }

  // Encontra o tema de destino baseado no href
  function getThemeForHref(href) {
    if (href.includes('cv_general.html')) return THEMES['cv_general.html'];
    if (href.includes('sicredi.html')) return THEMES['sicredi.html'];
    return THEMES['cv_general.html'];
  }

  // Cria e executa a animação de areia
  function sandTransition(destinationHref) {
    const theme = getThemeForHref(destinationHref);
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = 9999;
    canvas.style.pointerEvents = 'none';
    canvas.style.background = 'transparent';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const PARTICLE_COUNT = Math.floor(window.innerWidth / 2);
    const particles = [];
    const gravity = 0.32;
    const friction = 0.91;
    const sandRadius = 2.2;
    let finished = false;

    // Inicializa partículas na lateral esquerda
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: -Math.random() * 40,
        y: Math.random() * window.innerHeight,
        vx: 2.5 + Math.random() * 2.5,
        vy: (Math.random() - 0.5) * 2,
        color: theme.sandColor
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, sandRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.95;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function update() {
      let allDone = true;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += gravity * (0.5 + Math.random() * 0.5);
        p.vx *= friction;
        p.vy *= friction;
        // Colisão com "chão"
        if (p.y > window.innerHeight - sandRadius) {
          p.y = window.innerHeight - sandRadius;
          p.vy *= -0.3;
          p.vx *= 0.95;
        }
        if (p.x < window.innerWidth - 40) {
          allDone = false;
        }
      }
      return allDone;
    }

    function animate() {
      draw();
      if (!finished) {
        finished = update();
        requestAnimationFrame(animate);
      } else {
        // Fade-out branco
        canvas.style.transition = 'opacity 0.35s';
        canvas.style.opacity = 0;
        setTimeout(() => {
          document.body.removeChild(canvas);
          window.location.href = destinationHref;
        }, 350);
      }
    }

    animate();
  }

  // Intercepta cliques em links entre as páginas
  document.addEventListener('click', function(e) {
    let target = e.target;
    while (target && target.tagName !== 'A') {
      target = target.parentElement;
    }
    if (target && isTransitionLink(target)) {
      e.preventDefault();
      sandTransition(target.getAttribute('href'));
    }
  });

  // Ajuste responsivo para o canvas
  window.addEventListener('resize', () => {
    const canvas = document.querySelector('canvas[data-sand-transition]');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
  // Expor função programática para animação customizada
  function startSandEffect(sourceTheme, destinationTheme, onComplete) {
    // Verificar e buscar os temas corretos
    const source = THEMES[sourceTheme] || THEMES['cv_general'];
    const destination = THEMES[destinationTheme] || THEMES['sicredi'];
    
    // Etapa 1: Carregar sicredi.html em um iframe invisível para preparar a transição
    const iframe = document.createElement('iframe');
    iframe.style.opacity = '0';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.style.pointerEvents = 'none';
    iframe.style.zIndex = '-1';
    document.body.appendChild(iframe);
    iframe.src = 'sicredi.html';
    
    // Elementos a receberem efeito de areia
    const sandElements = [
      document.querySelector('.header'),
      ...Array.from(document.querySelectorAll('h2.section-title'))
    ].filter(Boolean);
    
    // Total de efeitos a serem completados antes da finalização
    let totalEffects = sandElements.length;
    let completedEffects = 0;
    
    // Etapa 2: Aplicar gradualmente a mudança de cores em todos os elementos (exceto alvo da areia)
    const colorTransitionDuration = 2500; // ms
    const colorTransitionStart = Date.now();
    
    // Funções para interpolação de cores
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function rgbToHex(r, g, b) {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    
    function interpolateColor(color1, color2, factor) {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      if (!rgb1 || !rgb2) return color2;
      
      const r = Math.round(rgb1.r + factor * (rgb2.r - rgb1.r));
      const g = Math.round(rgb1.g + factor * (rgb2.g - rgb1.g));
      const b = Math.round(rgb1.b + factor * (rgb2.b - rgb1.b));
      
      return rgbToHex(r, g, b);
    }
    
    // Identifica todos os elementos coloridos para transição gradual
    function updateColors() {
      const progress = Math.min(1, (Date.now() - colorTransitionStart) / colorTransitionDuration);
      
      // Atualizar gradiente do header
      const header = document.querySelector('.header');
      if (header) {
        header.style.background = `linear-gradient(135deg, ${interpolateColor(source.primary, destination.primary, progress)}, ${interpolateColor(source.secondary, destination.secondary, progress)})`;      
      }
      
      // Atualizar gradiente de todos os section-titles
      document.querySelectorAll('h2.section-title').forEach(title => {
        title.style.background = `linear-gradient(135deg, ${interpolateColor(source.primary, destination.primary, progress)}, ${interpolateColor(source.secondary, destination.secondary, progress)})`;      
      });
      
      // Atualizar cores de botões
      document.querySelectorAll('.cta-button, .contact-button, button:not(.tooltip-mobile-close)').forEach(btn => {
        if (btn.style.backgroundColor) {
          btn.style.backgroundColor = interpolateColor(source.primary, destination.primary, progress);
        }
      });
      
      // Continuar atualizando cores até completar
      if (progress < 1) {
        requestAnimationFrame(updateColors);
      }
    }
    
    // Iniciar transição de cores
    setTimeout(updateColors, 300);
    
    // Etapa 3: Aplicar efeito de areia sobre elementos específicos
    sandElements.forEach(el => {
      setTimeout(() => {
        applySandEffect(el, source, destination, () => {
          completedEffects++;
          if (completedEffects === totalEffects) {
            // Etapa 4: Fade out/in final
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'white';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.5s';
            overlay.style.zIndex = '10000';
            document.body.appendChild(overlay);
            
            setTimeout(() => {
              overlay.style.opacity = '0.8';
              setTimeout(() => {
                if (typeof onComplete === 'function') {
                  onComplete();
                } else {
                  window.location.href = 'sicredi.html';
                }
              }, 500);
            }, 200);
          }
        });
      }, Math.random() * 400); // Começa em momentos ligeiramente diferentes
    });
  }
  
  // Função para aplicar efeito de areia em um único elemento
  function applySandEffect(el, sourceTheme, destTheme, callback) {
    // Configurar efeito consistente para todos os elementos (header e section-titles)
    
    const rect = el.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.position = 'absolute';
    canvas.style.left = rect.left + window.scrollX + 'px';
    canvas.style.top = rect.top + window.scrollY + 'px';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    
    // Adicionar o canvas com opacidade reduzida para manter o texto original visível
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let done = false;
    
    // Duração da animação em milissegundos
    const duration = 1800;
    const startTime = performance.now();
    
    // Converter cores hex para RGB
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    // Cores de origem e destino em RGB
    const currentPrimary = hexToRgb(sourceTheme.primary);
    const currentSecondary = hexToRgb(sourceTheme.secondary);
    const newPrimary = hexToRgb(destTheme.primary);
    const newSecondary = hexToRgb(destTheme.secondary);
    
    // Criar pontos de emissão de areia no lado esquerdo
    const emitters = [];
    const emitterCount = 12;
    
    for (let i = 0; i < emitterCount; i++) {
      emitters.push({
        x: 0,
        y: (canvas.height / emitterCount) * i + (canvas.height / emitterCount / 2),
        rate: 2 + Math.random() * 3, // Partículas por frame
        progress: 0,
        activeUntil: (0.7 + Math.random() * 0.2) // Percentual da animação até quando este emissor permanece ativo
      });
    }
    
    // Criar camadas de grãos (para dar profundidade)
    const layers = [
      { depth: 0.8, size: 1.5, speed: 1.0, count: 0, particles: [] }, // Fundo (mais lento)
      { depth: 0.9, size: 2.0, speed: 1.3, count: 0, particles: [] }, // Meio
      { depth: 1.0, size: 2.5, speed: 1.5, count: 0, particles: [] }  // Frente (mais rápido)
    ];
    
    // Quantidade total de partículas desejada
    const totalParticles = Math.floor((canvas.width * canvas.height) / 120);
    
    // Distribuir partículas entre as camadas
    layers[0].count = Math.floor(totalParticles * 0.5); // 50% na camada de fundo
    layers[1].count = Math.floor(totalParticles * 0.3); // 30% na camada do meio
    layers[2].count = Math.floor(totalParticles * 0.2); // 20% na camada da frente
    
    // Inicializar arrays de partículas para cada camada
    layers.forEach(layer => {
      layer.particles = [];
    });
    
    // Superfícies para colisão (simular "montículos" de areia)
    const surfaces = [
      { x1: 0, y1: canvas.height * 0.95, x2: canvas.width, y2: canvas.height * 0.95 } // Base
    ];
    
    // Pilha de areia que vai se formando (atualizada dinamicamente)
    const sandPiles = [];
    const pileSegments = 40; // Dividir a largura em segmentos
    const segmentWidth = canvas.width / pileSegments;
    
    for (let i = 0; i < pileSegments; i++) {
      sandPiles.push({
        x: i * segmentWidth,
        height: 0,
        maxHeight: (canvas.height * 0.2) + (Math.random() * canvas.height * 0.05) // Altura máxima variável
      });
    }
    
    // Função para criar uma nova partícula de areia
    function createSandParticle(emitter, layerIndex) {
      const layer = layers[layerIndex];
      
      // Calcular posição com pequena variação aleatória
      const x = emitter.x + (Math.random() * 5);
      const y = emitter.y + (Math.random() * 6 - 3);
      
      // Calcular a posição de cor no gradiente (baseado na posição vertical)
      const colorPosition = y / canvas.height;
      
      // Usar as mesmas cores de destino para todos os elementos
      // Misturar as cores com base na posição
      const color = {
        r: Math.round(newPrimary.r * (1 - colorPosition) + newSecondary.r * colorPosition),
        g: Math.round(newPrimary.g * (1 - colorPosition) + newSecondary.g * colorPosition),
        b: Math.round(newPrimary.b * (1 - colorPosition) + newSecondary.b * colorPosition)
      };
      
      // Adicionar variação sutil à cor para efeito de granulação
      const colorVariation = 10; // Variação RGB
      color.r = Math.max(0, Math.min(255, color.r + (Math.random() * colorVariation * 2 - colorVariation)));
      color.g = Math.max(0, Math.min(255, color.g + (Math.random() * colorVariation * 2 - colorVariation)));
      color.b = Math.max(0, Math.min(255, color.b + (Math.random() * colorVariation * 2 - colorVariation)));
      
      // Criar partícula com propriedades específicas
      return {
        x,
        y,
        // Velocidade inicial
        vx: (2 + Math.random() * 2) * layer.speed,
        vy: (Math.random() * 1 - 0.5) * layer.speed,
        // Propriedades físicas
        gravity: 0.04 * layer.speed,
        friction: 0.99,
        // Tamanho (variação para cada partícula)
        size: (Math.random() * 0.5 + 0.8) * layer.size,
        // Aparência
        color,
        // Comportamento
        bounced: false,
        settled: false,
        opacity: 0.9 * layer.depth,
        // Forma (para dar variedade de grãos de areia)
        shape: Math.floor(Math.random() * 3) // 0, 1, 2 para diferentes formas
      };
    }
    
    // Função para verificar colisão com superfícies e pilhas de areia
    function checkCollisions(particle) {
      // Verificar colisão com superfícies
      for (const surface of surfaces) {
        if (
          particle.y + particle.size >= surface.y1 &&
          particle.y - particle.size <= surface.y1 + 2 &&
          particle.x >= surface.x1 &&
          particle.x <= surface.x2 &&
          particle.vy > 0
        ) {
          // Colisão com superfície base
          particle.y = surface.y1 - particle.size;
          particle.vy = -particle.vy * 0.3; // Amortecimento
          particle.vx *= 0.8; // Fricção
          particle.bounced = true;
          return true;
        }
      }
      
      // Verificar colisão com pilhas de areia
      const pileIndex = Math.floor(particle.x / segmentWidth);
      if (
        pileIndex >= 0 &&
        pileIndex < pileSegments &&
        particle.y + particle.size >= canvas.height - sandPiles[pileIndex].height &&
        particle.vy > 0
      ) {
        // Colisão com pilha de areia
        particle.y = canvas.height - sandPiles[pileIndex].height - particle.size;
        
        // Se a velocidade for pequena, considerar que assentou
        if (Math.abs(particle.vy) < 0.5 && Math.abs(particle.vx) < 0.5) {
          particle.settled = true;
          particle.vx = 0;
          particle.vy = 0;
          
          // Aumentar altura da pilha de areia neste segmento
          if (sandPiles[pileIndex].height < sandPiles[pileIndex].maxHeight) {
            sandPiles[pileIndex].height += particle.size * 0.5;
          }
          
          // Simular a areia se espalhando para os lados
          if (pileIndex > 0 && 
              sandPiles[pileIndex].height > sandPiles[pileIndex-1].height + particle.size * 2) {
            // Espalhar para a esquerda
            sandPiles[pileIndex].height -= particle.size * 0.2;
            sandPiles[pileIndex-1].height += particle.size * 0.2;
          }
          if (pileIndex < pileSegments - 1 && 
              sandPiles[pileIndex].height > sandPiles[pileIndex+1].height + particle.size * 2) {
            // Espalhar para a direita
            sandPiles[pileIndex].height -= particle.size * 0.2;
            sandPiles[pileIndex+1].height += particle.size * 0.2;
          }
        } else {
          // Quicar com amortecimento
          particle.vy = -particle.vy * 0.2;
          particle.vx *= 0.8;
          particle.bounced = true;
        }
        return true;
      }
      
      return false;
    }
    
    // Função para desenhar uma partícula de areia
    function drawSandParticle(ctx, particle) {
      ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity})`;
      
      switch (particle.shape) {
        case 0: // Círculo (grão arredondado)
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 1: // Quadrado (grão angular)
          ctx.fillRect(
            particle.x - particle.size / 1.5, 
            particle.y - particle.size / 1.5, 
            particle.size * 1.3, 
            particle.size * 1.3
          );
          break;
          
        case 2: // Triângulo irregular (grão pontiagudo)
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - particle.size);
          ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
          ctx.lineTo(particle.x - particle.size, particle.y + particle.size * 0.8);
          ctx.closePath();
          ctx.fill();
          break;
      }
    }
    
    // Função principal de animação
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      
      // Progresso total da animação (0 a 1)
      const progress = Math.min(elapsed / duration, 1);
      
      // Limpar o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Desenhar o gradiente de fundo atual com transparência para mostrar o texto
      // Usar o mesmo nível de transparência para todos os elementos
      const gradientOpacity = 0.6; // Opacidade suficiente para ver o efeito mas ainda ver o texto
      const gradientBg = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradientBg.addColorStop(0, `rgba(${currentPrimary.r}, ${currentPrimary.g}, ${currentPrimary.b}, ${gradientOpacity})`);
      gradientBg.addColorStop(1, `rgba(${currentSecondary.r}, ${currentSecondary.g}, ${currentSecondary.b}, ${gradientOpacity})`);
      ctx.fillStyle = gradientBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Emitir novas partículas se estiver na fase de emissão
      if (progress < 0.8) {
        emitters.forEach((emitter, emitterIndex) => {
          if (progress <= emitter.activeUntil) {
            // Determinar quantas partículas emitir neste frame
            const particlesToEmit = Math.random() < 0.5 ? Math.floor(emitter.rate) : Math.ceil(emitter.rate);
            
            for (let i = 0; i < particlesToEmit; i++) {
              // Escolher uma camada com preferência para a camada de fundo
              const layerIndex = Math.random() < 0.7 ? 0 : (Math.random() < 0.7 ? 1 : 2);
              layers[layerIndex].particles.push(createSandParticle(emitter, layerIndex));
            }
          }
        });
      }
      
      // Atualizar e desenhar partículas por camada (de trás para frente)
      layers.forEach(layer => {
        // Atualizar partículas (física)
        layer.particles.forEach(particle => {
          if (!particle.settled) {
            // Aplicar gravidade
            particle.vy += particle.gravity;
            
            // Aplicar atrito
            particle.vx *= particle.friction;
            particle.vy *= particle.friction;
            
            // Atualizar posição
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Verificar colisões
            checkCollisions(particle);
            
            // Verificar se saiu do canvas
            if (particle.x < 0 || particle.x > canvas.width || particle.y > canvas.height) {
              particle.settled = true;
            }
          }
        });
        
        // Desenhar partículas desta camada
        layer.particles.forEach(particle => {
          drawSandParticle(ctx, particle);
        });
      });
      
      // Sobrepor gradualmente o novo gradiente (para áreas sem areia) com opacidade reduzida
      const overlayOpacity = Math.min(progress * 1.2, 0.6); // Mesma opacidade do gradiente de fundo (0.6)
      
      const newGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      newGradient.addColorStop(0, `rgba(${newPrimary.r}, ${newPrimary.g}, ${newPrimary.b}, ${overlayOpacity})`);
      newGradient.addColorStop(1, `rgba(${newSecondary.r}, ${newSecondary.g}, ${newSecondary.b}, ${overlayOpacity})`);
      
      ctx.fillStyle = newGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Continuar a animação ou finalizar
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Finalizar a animação
        canvas.style.transition = 'opacity 0.5s';
        canvas.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(canvas);
          // Não precisamos mais remover clone de texto, pois não estamos criando um
          if (typeof callback === 'function') callback();
        }, 500);
      }
    }
    
    // Iniciar a animação
    requestAnimationFrame(animate);
  }
  
  // Função para criar efeito de partículas aleatórias que aparecem brevemente
  function createParticlesBurst(x, y, count, color, container) {
    const particles = [];
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth || window.innerWidth;
    canvas.height = container.offsetHeight || window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x,
        y: y,
        vx: -5 + Math.random() * 10,
        vy: -5 + Math.random() * 10,
        size: 2 + Math.random() * 5,
        color: color,
        life: 1.0
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let anyAlive = false;
      
      for (const p of particles) {
        if (p.life > 0) {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02;
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.vy += 0.1; // leve gravidade
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.fill();
          
          anyAlive = true;
        }
      }
      
      if (anyAlive) {
        requestAnimationFrame(animate);
      } else {
        container.removeChild(canvas);
      }
    }
    
    animate();
  }
  
  return {
    startSandEffect,
    createParticlesBurst
  };
})();


const sandTransition = {
    // Temas extraídos dos arquivos HTML
    themes: {
      blue: {
        primary: '#0d3b66',
        secondary: '#1e5f94',
        name: 'CV General (Azul)'
      },
      green: {
        primary: '#1b7139',
        secondary: '#63c834',
        name: 'Sicredi (Verde)'
      }
    },
    
    // Elementos e estados
    canvas: null,
    ctx: null,
    animationFrame: null,
    isTransitioning: false,
    destinationUrl: '',
    
    // Função para inicializar o sistema
    init: function() {
      // Criar elemento canvas para a transição
      this.createTransitionCanvas();
      
      // Capturar cliques em links entre as páginas
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        
        // Verificar se é um link entre as duas páginas específicas
        const href = link.getAttribute('href');
        if ((href === 'cv_general.html' || href === 'sicredi.html') && !this.isTransitioning) {
          e.preventDefault();
          
          // Iniciar transição
          this.startTransition(href);
        }
      });
    },
    
    // Criar canvas para a transição
    createTransitionCanvas: function() {
      this.canvas = document.createElement('canvas');
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.zIndex = '9999';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.display = 'none';
      document.body.appendChild(this.canvas);
      
      this.ctx = this.canvas.getContext('2d');
    },
    
    // Função para converter cores hex para RGB
    hexToRgb: function(hex) {
      hex = hex.replace(/^#/, '');
      const bigint = parseInt(hex, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
      };
    },
    
    // Iniciar a transição para uma nova página
    startTransition: function(destUrl) {
      if (this.isTransitioning) return;
      
      this.isTransitioning = true;
      this.destinationUrl = destUrl;
      
      // Determinar os temas de origem e destino
      const currentTheme = destUrl.includes('sicredi') ? 'blue' : 'green';
      const targetTheme = destUrl.includes('sicredi') ? 'green' : 'blue';
      
      // Configurar o canvas
      this.setupCanvas();
      
      // Obter cores para a transição
      const currentPrimary = this.hexToRgb(this.themes[currentTheme].primary);
      const currentSecondary = this.hexToRgb(this.themes[currentTheme].secondary);
      const newPrimary = this.hexToRgb(this.themes[targetTheme].primary);
      const newSecondary = this.hexToRgb(this.themes[targetTheme].secondary);
      
      // Iniciar a animação de partículas
      this.animateSandTransition(currentPrimary, currentSecondary, newPrimary, newSecondary);
    },
    
    // Configurar o canvas para a transição
    setupCanvas: function() {
      // Ajustar o tamanho do canvas para a janela
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.style.display = 'block';
    },
    
    // Animação de transição com efeito de areia
    animateSandTransition: function(currentPrimary, currentSecondary, newPrimary, newSecondary) {
      // Configurações da animação
      const duration = 1800; // ms
      const startTime = performance.now();
      
      // Criar emissores de partículas (lado esquerdo)
      const emitters = [];
      const emitterCount = 12;
      
      for (let i = 0; i < emitterCount; i++) {
        emitters.push({
          x: 0,
          y: (this.canvas.height / emitterCount) * i + (this.canvas.height / emitterCount / 2),
          rate: 2 + Math.random() * 3, // Partículas por frame
          progress: 0,
          activeUntil: (0.7 + Math.random() * 0.2) // Percentual da animação até quando este emissor permanece ativo
        });
      }
      
      // Criar camadas de partículas (para dar profundidade)
      const layers = [
        { depth: 0.8, size: 1.5, speed: 1.0, count: 0, particles: [] }, // Fundo (mais lento)
        { depth: 0.9, size: 2.0, speed: 1.3, count: 0, particles: [] }, // Meio
        { depth: 1.0, size: 2.5, speed: 1.5, count: 0, particles: [] }  // Frente (mais rápido)
      ];
      
      // Quantidade total de partículas
      const totalParticles = Math.floor((this.canvas.width * this.canvas.height) / 120);
      
      // Distribuir partículas entre camadas
      layers[0].count = Math.floor(totalParticles * 0.5);
      layers[1].count = Math.floor(totalParticles * 0.3);
      layers[2].count = Math.floor(totalParticles * 0.2);
      
      // Inicializar arrays de partículas
      layers.forEach(layer => {
        layer.particles = [];
      });
      
      // Superfícies para colisão (simular "montículos" de areia)
      const surfaces = [
        { x1: 0, y1: this.canvas.height * 0.95, x2: this.canvas.width, y2: this.canvas.height * 0.95 } // Base
      ];
      
      // Pilha de areia que vai se formando (atualizada dinamicamente)
      const sandPiles = [];
      const pileSegments = 40; // Dividir a largura em segmentos
      const segmentWidth = this.canvas.width / pileSegments;
      
      for (let i = 0; i < pileSegments; i++) {
        sandPiles.push({
          x: i * segmentWidth,
          height: 0,
          maxHeight: (this.canvas.height * 0.2) + (Math.random() * this.canvas.height * 0.05) // Altura máxima variável
        });
      }
      
      // Função para criar uma nova partícula
      const createSandParticle = (emitter, layerIndex) => {
        const layer = layers[layerIndex];
        
        // Calcular posição com pequena variação aleatória
        const x = emitter.x + (Math.random() * 5);
        const y = emitter.y + (Math.random() * 6 - 3);
        
        // Calcular a posição de cor no gradiente (baseado na posição vertical)
        const colorPosition = y / this.canvas.height;
        
        // Misturar as cores com base na posição
        const color = {
          r: Math.round(newPrimary.r * (1 - colorPosition) + newSecondary.r * colorPosition),
          g: Math.round(newPrimary.g * (1 - colorPosition) + newSecondary.g * colorPosition),
          b: Math.round(newPrimary.b * (1 - colorPosition) + newSecondary.b * colorPosition)
        };
        
        // Adicionar variação sutil à cor para efeito de granulação
        const colorVariation = 10; // Variação RGB
        color.r = Math.max(0, Math.min(255, color.r + (Math.random() * colorVariation * 2 - colorVariation)));
        color.g = Math.max(0, Math.min(255, color.g + (Math.random() * colorVariation * 2 - colorVariation)));
        color.b = Math.max(0, Math.min(255, color.b + (Math.random() * colorVariation * 2 - colorVariation)));
        
        // Criar partícula com propriedades
        return {
          x,
          y,
          // Velocidade inicial
          vx: (2 + Math.random() * 2) * layer.speed,
          vy: (Math.random() * 1 - 0.5) * layer.speed,
          // Propriedades físicas
          gravity: 0.04 * layer.speed,
          friction: 0.99,
          // Tamanho
          size: (Math.random() * 0.5 + 0.8) * layer.size,
          // Aparência
          color,
          // Comportamento
          bounced: false,
          settled: false,
          opacity: 0.9 * layer.depth,
          // Forma (grãos de areia variados)
          shape: Math.floor(Math.random() * 3) // 0, 1, 2 = diferentes formas
        };
      };
      
      // Verificar colisão com superfícies e pilhas
      const checkCollisions = (particle) => {
        // Verificar colisão com superfícies
        for (const surface of surfaces) {
          if (
            particle.y + particle.size >= surface.y1 &&
            particle.y - particle.size <= surface.y1 + 2 &&
            particle.x >= surface.x1 &&
            particle.x <= surface.x2 &&
            particle.vy > 0
          ) {
            // Colisão com superfície base
            particle.y = surface.y1 - particle.size;
            particle.vy = -particle.vy * 0.3; // Amortecimento
            particle.vx *= 0.8; // Fricção
            particle.bounced = true;
            return true;
          }
        }
        
        // Verificar colisão com pilhas de areia
        const pileIndex = Math.floor(particle.x / segmentWidth);
        if (
          pileIndex >= 0 &&
          pileIndex < pileSegments &&
          particle.y + particle.size >= this.canvas.height - sandPiles[pileIndex].height &&
          particle.vy > 0
        ) {
          // Colisão com pilha de areia
          particle.y = this.canvas.height - sandPiles[pileIndex].height - particle.size;
          
          // Se a velocidade for pequena, considerar que assentou
          if (Math.abs(particle.vy) < 0.5 && Math.abs(particle.vx) < 0.5) {
            particle.settled = true;
            particle.vx = 0;
            particle.vy = 0;
            
            // Aumentar altura da pilha de areia neste segmento
            if (sandPiles[pileIndex].height < sandPiles[pileIndex].maxHeight) {
              sandPiles[pileIndex].height += particle.size * 0.5;
            }
            
            // Simular a areia se espalhando para os lados
            if (pileIndex > 0 && 
                sandPiles[pileIndex].height > sandPiles[pileIndex-1].height + particle.size * 2) {
              // Espalhar para a esquerda
              sandPiles[pileIndex].height -= particle.size * 0.2;
              sandPiles[pileIndex-1].height += particle.size * 0.2;
            }
            if (pileIndex < pileSegments - 1 && 
                sandPiles[pileIndex].height > sandPiles[pileIndex+1].height + particle.size * 2) {
              // Espalhar para a direita
              sandPiles[pileIndex].height -= particle.size * 0.2;
              sandPiles[pileIndex+1].height += particle.size * 0.2;
            }
          } else {
            // Quicar com amortecimento
            particle.vy = -particle.vy * 0.2;
            particle.vx *= 0.8;
            particle.bounced = true;
          }
          return true;
        }
        
        return false;
      };
      
      // Desenhar uma partícula
      const drawSandParticle = (particle) => {
        this.ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity})`;
        
        switch (particle.shape) {
          case 0: // Círculo (grão arredondado)
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            break;
            
          case 1: // Quadrado (grão angular)
            this.ctx.fillRect(
              particle.x - particle.size / 1.5, 
              particle.y - particle.size / 1.5, 
              particle.size * 1.3, 
              particle.size * 1.3
            );
            break;
            
          case 2: // Triângulo irregular (grão pontiagudo)
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y - particle.size);
            this.ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
            this.ctx.lineTo(particle.x - particle.size, particle.y + particle.size * 0.8);
            this.ctx.closePath();
            this.ctx.fill();
            break;
        }
      };
      
      // Função de animação
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        
        // Progresso da animação (0 a 1)
        const progress = Math.min(elapsed / duration, 1);
        
        // Limpar o canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenhar o gradiente de fundo atual
        const gradientBg = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
        gradientBg.addColorStop(0, `rgb(${currentPrimary.r}, ${currentPrimary.g}, ${currentPrimary.b})`);
        gradientBg.addColorStop(1, `rgb(${currentSecondary.r}, ${currentSecondary.g}, ${currentSecondary.b})`);
        this.ctx.fillStyle = gradientBg;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Emitir novas partículas se estiver na fase de emissão
        if (progress < 0.8) {
          emitters.forEach((emitter, emitterIndex) => {
            if (progress <= emitter.activeUntil) {
              // Determinar quantas partículas emitir neste frame
              const particlesToEmit = Math.random() < 0.5 ? Math.floor(emitter.rate) : Math.ceil(emitter.rate);
              
              for (let i = 0; i < particlesToEmit; i++) {
                // Escolher uma camada com preferência para a camada de fundo
                const layerIndex = Math.random() < 0.7 ? 0 : (Math.random() < 0.7 ? 1 : 2);
                layers[layerIndex].particles.push(createSandParticle(emitter, layerIndex));
              }
            }
          });
        }
        
        // Atualizar e desenhar partículas por camada (de trás para frente)
        layers.forEach(layer => {
          // Atualizar partículas (física)
          layer.particles.forEach(particle => {
            if (!particle.settled) {
              // Aplicar gravidade
              particle.vy += particle.gravity;
              
              // Aplicar atrito
              particle.vx *= particle.friction;
              particle.vy *= particle.friction;
              
              // Atualizar posição
              particle.x += particle.vx;
              particle.y += particle.vy;
              
              // Verificar colisões
              checkCollisions(particle);
              
              // Verificar se saiu do canvas
              if (particle.x < 0 || particle.x > this.canvas.width || particle.y > this.canvas.height) {
                particle.settled = true;
              }
            }
          });
          
          // Desenhar partículas desta camada
          layer.particles.forEach(particle => {
            drawSandParticle(particle);
          });
        });
        
        // Sobrepor gradualmente o novo gradiente (para áreas sem areia)
        const overlayOpacity = Math.min(progress * 1.2, 0.95);
        
        const newGradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
        newGradient.addColorStop(0, `rgba(${newPrimary.r}, ${newPrimary.g}, ${newPrimary.b}, ${overlayOpacity})`);
        newGradient.addColorStop(1, `rgba(${newSecondary.r}, ${newSecondary.g}, ${newSecondary.b}, ${overlayOpacity})`);
        
        this.ctx.fillStyle = newGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Continuar a animação ou finalizar
        if (progress < 1) {
          this.animationFrame = requestAnimationFrame(animate);
        } else {
          // Finalizar a animação e navegar para o destino
          this.completeTransition();
        }
      };
      
      // Iniciar a animação
      this.animationFrame = requestAnimationFrame(animate.bind(this));
    },
    
    // Finalizar a transição e navegar para a nova página
    completeTransition: function() {
      // Criar um overlay de fade-out branco
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'white';
      overlay.style.zIndex = '10000';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease-in-out';
      document.body.appendChild(overlay);
      
      // Fade-out suave
      setTimeout(() => {
        overlay.style.opacity = '1';
        setTimeout(() => {
          // Limpar o canvas e navegar para o destino
          if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
          }
          window.location.href = this.destinationUrl;
        }, 300);
      }, 50);
    }
  };
  
  // Inicializar o sistema quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', () => {
    sandTransition.init();
  });