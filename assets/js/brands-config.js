// Configuração centralizada de todas as marcas
const BRANDS_CONFIG = {
    general: {
        name: 'General',
        colors: {
            primary: '#1a4b84',
            secondary: '#2c5aa0',
            accent: '#3a73c2',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(26, 75, 132, 0.2)'
        },
        gradient: 'linear-gradient(135deg, #1a4b84 0%, #2c5aa0 100%)',
        logo: null,
        tagline: {
            en: 'Building Excellence Together',
            pt: 'Construindo Excelência Juntos'
        },
        shapes: 'circles', // circles, hexagons, squares
        animations: 'standard'
    },
    
    willbank: {
        name: 'Will Bank',
        colors: {
            primary: '#FFD700',
            secondary: '#F7DC00', 
            accent: '#FDD835',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(255, 215, 0, 0.2)'
        },
        gradient: 'linear-gradient(135deg, #FFD700 0%, #F7DC00 100%)',
        logo: '../assets/images/willbank_will-bank.svg',
        tagline: {
            en: 'Banking Made Simple',
            pt: 'Banco Digital Simples'
        },
        shapes: 'circles',
        animations: 'coins'
    },
    
    wehandle: {
        name: 'WeHandle',
        colors: {
            primary: '#D81B60',
            secondary: '#1C2D4B',
            accent: '#D81B60',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(216, 27, 96, 0.2)'
        },
        gradient: 'linear-gradient(135deg, #1C2D4B 0%, #D81B60 100%)',
        logo: '../assets/images/wehandle_logo.svg',
        tagline: {
            en: 'Let\'s Handle Success Together',
            pt: 'Vamos Lidar com o Sucesso Juntos'
        },
        shapes: 'hexagons',
        animations: 'hexagonal'
    },
    
    ifood: {
        name: 'iFood',
        colors: {
            primary: '#EA1D2C',
            secondary: '#FF6B35',
            accent: '#FFB800',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(234, 29, 44, 0.2)'
        },
        gradient: 'linear-gradient(135deg, #EA1D2C 0%, #FF6B35 100%)',
        logo: '../assets/images/ifood_logo.svg',
        tagline: {
            en: 'Connecting People Through Food',
            pt: 'Conectando Pessoas Através da Comida'
        },
        shapes: 'circles',
        animations: 'food'
    },
    
    sicredi: {
        name: 'Sicredi',
        colors: {
            primary: '#00A859',
            secondary: '#4CAF50',
            accent: '#8BC34A',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(0, 168, 89, 0.2)'
        },
        gradient: 'linear-gradient(135deg, #00A859 0%, #4CAF50 100%)',
        logo: '../assets/images/sicredi_logo.svg',
        tagline: {
            en: 'Growing Together Cooperatively',
            pt: 'Crescendo Juntos de Forma Cooperativa'
        },
        shapes: 'cooperative',
        animations: 'growth'
    },
    
    boticario: {
        name: 'O Boticário',
        colors: {
            primary: '#8B4513',
            secondary: '#D2691E',
            accent: '#CD853F',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(139, 69, 19, 0.2)'
        },
        gradient: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
        logo: '../assets/images/boticario_logo.svg',
        tagline: {
            en: 'Beauty in Every Detail',
            pt: 'Beleza em Cada Detalhe'
        },
        shapes: 'organic',
        animations: 'beauty'
    },
    
    contaazul: {
        name: 'ContaAzul',
        colors: {
            primary: '#0066CC',
            secondary: '#4A90E2',
            accent: '#87CEEB',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(0, 102, 204, 0.2)'
        },
        gradient: 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)',
        logo: '../assets/images/contaazul_logo.svg',
        tagline: {
            en: 'Simplifying Business Management',
            pt: 'Simplificando a Gestão do Negócio'
        },
        shapes: 'tech',
        animations: 'digital'
    },
    
    allos: {
        name: 'Allos',
        colors: {
            primary: '#2E8B57',
            secondary: '#3CB371',
            accent: '#90EE90',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(46, 139, 87, 0.2)'
        },
        gradient: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)',
        logo: '../assets/images/allos_logo.svg',
        tagline: {
            en: 'Strategic Consulting Excellence',
            pt: 'Excelência em Consultoria Estratégica'
        },
        shapes: 'modern',
        animations: 'consulting'
    },
    
    completebari: {
        name: 'Complete Bari',
        colors: {
            primary: '#4B0082',
            secondary: '#663399',
            accent: '#9370DB',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(75, 0, 130, 0.2)'
        },
        gradient: 'linear-gradient(135deg, #4B0082 0%, #663399 100%)',
        logo: '../assets/images/completebari_logo.svg',
        tagline: {
            en: 'Complete Bariatric Solutions',
            pt: 'Soluções Bariátricas Completas'
        },
        shapes: 'medical',
        animations: 'health'
    },
    
    neogroup: {
        name: 'Neo Group',
        colors: {
            primary: '#FF4500',
            secondary: '#FF6347',
            accent: '#FFB347',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(255, 69, 0, 0.2)'
        },
        gradient: 'linear-gradient(135deg, #FF4500 0%, #FF6347 100%)',
        logo: '../assets/images/neogroup_logo.svg',
        tagline: {
            en: 'Innovation at Every Step',
            pt: 'Inovação a Cada Passo'
        },
        shapes: 'futuristic',
        animations: 'neo'
    },
    
    rdstation: {
        name: 'RD Station',
        colors: {
            primary: '#2ECC71',
            secondary: '#27AE60',
            accent: '#58D68D',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(46, 204, 113, 0.2)'
        },
        gradient: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)',
        logo: '../assets/images/rdstation_logo.svg',
        tagline: {
            en: 'Digital Marketing Excellence',
            pt: 'Excelência em Marketing Digital'
        },
        shapes: 'digital',
        animations: 'marketing'
    }
};

// Função para obter configuração de uma marca
function getBrandConfig(brandKey) {
    return BRANDS_CONFIG[brandKey] || BRANDS_CONFIG.general;
}

// Função para aplicar tema da marca
function applyBrandTheme(brandKey) {
    const config = getBrandConfig(brandKey);
    const root = document.documentElement;
    
    // Aplicar variáveis CSS
    root.style.setProperty('--primary-color', config.colors.primary);
    root.style.setProperty('--secondary-color', config.colors.secondary);
    root.style.setProperty('--accent-color', config.colors.accent);
    root.style.setProperty('--text-color', config.colors.text);
    root.style.setProperty('--white-text', config.colors.whiteText);
    root.style.setProperty('--gray-text', config.colors.grayText);
    root.style.setProperty('--border-color', config.colors.border);
    root.style.setProperty('--background-gradient', config.gradient);
    
    return config;
}

// Função para obter marca da URL
function getBrandFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand');
    
    if (brandParam && BRANDS_CONFIG[brandParam]) {
        return brandParam;
    }
    
    // Fallback: detectar pela URL do arquivo
    const currentPath = window.location.pathname;
    for (const [brand, config] of Object.entries(BRANDS_CONFIG)) {
        if (currentPath.includes(brand)) {
            return brand;
        }
    }
    
    return 'general';
}

// Auto-aplicar tema baseado na URL
document.addEventListener('DOMContentLoaded', function() {
    const currentBrand = getBrandFromURL();
    const config = applyBrandTheme(currentBrand);
    
    // Aplicar logo se existir
    const logoElements = document.querySelectorAll('.company-logo');
    logoElements.forEach(logo => {
        if (config.logo) {
            logo.src = config.logo;
            logo.alt = config.name;
            logo.style.display = 'block';
        } else {
            logo.style.display = 'none';
        }
    });
    
    // Aplicar tagline
    const taglineElements = document.querySelectorAll('.header-tagline');
    taglineElements.forEach(tagline => {
        const lang = document.documentElement.lang === 'pt-BR' ? 'pt' : 'en';
        tagline.textContent = config.tagline[lang];
    });
    
    // Aplicar classe de marca para animações específicas
    document.body.classList.add(`brand-${currentBrand}`);
});

// Exportar para uso global
window.BRANDS_CONFIG = BRANDS_CONFIG;
window.getBrandConfig = getBrandConfig;
window.applyBrandTheme = applyBrandTheme;
window.getBrandFromURL = getBrandFromURL;