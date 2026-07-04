// Fallback script for Portuguese CV files
// This script provides basic functionality when cv-texts.js cannot be loaded

if (typeof initializeBasicContent === 'undefined') {
    console.log('cv-texts.js não carregou, usando fallback local');
    
    function initializeBasicContent(lang = 'pt') {
        // Basic content initialization for pt
        const name = "PEDRO HENRIQUE LIMA MARCONATO";
        const role = "Gestão de CRM e Inteligência de Dados";
        
        const nameEl = document.getElementById('cv-name');
        if (nameEl) nameEl.textContent = name;
        
        const roleEl = document.getElementById('cv-role');
        if (roleEl) roleEl.textContent = role;
        
        // Contact info
        const emailEl = document.getElementById('cv-email');
        if (emailEl) emailEl.textContent = "pedrohmarconato@gmail.com";
        
        const phoneEl = document.getElementById('cv-phone');
        if (phoneEl) phoneEl.textContent = "+55 (55) 981147758";
        
        const locationEl = document.querySelector('#cv-location span');
        if (locationEl) locationEl.textContent = "Cachoeira do Sul, RS";
        
        const linkedinEl = document.getElementById('cv-linkedin');
        if (linkedinEl) linkedinEl.textContent = "LinkedIn";
        
        const repositoryEl = document.getElementById('cv-repository');
        if (repositoryEl) repositoryEl.textContent = "Repositório";
        
        // Section titles
        const skillsTitle = document.getElementById('section-skills');
        if (skillsTitle) skillsTitle.textContent = "HABILIDADES E FERRAMENTAS";
        
        const experienceTitle = document.getElementById('section-experience');
        if (experienceTitle) experienceTitle.textContent = "EXPERIÊNCIA PROFISSIONAL";
        
        const educationTitle = document.getElementById('section-education');
        if (educationTitle) educationTitle.textContent = "FORMAÇÃO ACADÊMICA";
        
        const projectsTitle = document.getElementById('section-projects');
        if (projectsTitle) projectsTitle.textContent = "PROJETOS E INOVAÇÃO";
        
        // Profile
        const profileEl = document.getElementById('cv-profile');
        if (profileEl) {
            profileEl.textContent = "Profissional em Gestão de CRM e Inteligência de Dados focado em resultados quantificáveis. No Grupo RBS, liderei auditoria de pesquisa Brand Equity que suportou decisões estratégicas. Na DBC/Realize CFI, desenvolvi pipeline para análise de concorrentes gerando insights sobre R$1B em transações e automatizei relatórios críticos. Como Coordenador de CRM na Lojas Renner, otimizei orçamento gerando 10% de economia anual, implementei 80% de comunicações automatizadas e estratégias que resultaram em aumento de consumo. Minha abordagem integra dados, tecnologia e visão estratégica para resultados tangíveis.";
        }
        
        // Contact CTAs
        const emailCTA = document.getElementById('cv-cta-email');
        if (emailCTA) emailCTA.textContent = "Clique para enviar um e-mail";
        
        const phoneCTA = document.getElementById('cv-cta-phone');
        if (phoneCTA) phoneCTA.textContent = "Clique para enviar uma mensagem";
        
        const linkedinCTA = document.getElementById('cv-cta-linkedin');
        if (linkedinCTA) linkedinCTA.textContent = "Clique para visitar o LinkedIn";
        
        const repositoryCTA = document.getElementById('cv-cta-repository');
        if (repositoryCTA) repositoryCTA.textContent = "Ver código fonte";
    }
    
    function renderSkills(containerId, skillCategory, lang = 'pt') {
        const skillsData = {
            strategic: [
                { name: "Gestão de CRM", level: 5 },
                { name: "Customer Equity", level: 5 },
                { name: "Business Intelligence", level: 4 },
                { name: "Liderança Estratégica", level: 4 },
                { name: "Brand Equity", level: 4 },
                { name: "Gestão de Marca", level: 4 }
            ],
            tools: [
                { name: "PowerBI", level: 5 },
                { name: "Oracle/Databricks", level: 5 },
                { name: "Python/SQL", level: 4 },
                { name: "Kanbanize", level: 5 }
            ],
            emerging: [
                { name: "LLM e Agentes IA", level: 4 },
                { name: "IA para CRM", level: 4 },
                { name: "APIs IA/LLM", level: 4 },
                { name: "Análise de Dados", level: 5 },
                { name: "Machine Learning", level: 4 },
                { name: "Responsys", level: 4 }
            ]
        };
        
        const categoryTitles = {
            strategic: "Habilidades Estratégicas",
            tools: "Ferramentas e Tecnologias", 
            emerging: "Tecnologias Emergentes"
        };
        
        const container = document.getElementById(containerId);
        if (!container || !skillsData[skillCategory]) return;
        
        const skills = skillsData[skillCategory];
        const title = categoryTitles[skillCategory];
        
        let html = `<h3>${title}</h3>`;
        
        skills.forEach(skill => {
            const levelText = skill.level === 5 ? 'Expert' : skill.level === 4 ? 'Avançado' : 'Intermediário';
            
            html += `
                <div class="tool-item">
                    <div class="tool-name">
                        <span>${skill.name}</span>
                        <span class="tool-percentage">${levelText}</span>
                    </div>
                    <div class="dots-container">`;
            
            for (let i = 1; i <= 10; i++) {
                const filled = i <= (skill.level * 2) ? 'filled' : '';
                html += `<div class="dot ${filled}"></div>`;
            }
            
            html += '</div></div>';
        });
        
        container.innerHTML = html;
    }
    
    window.initializeBasicContent = initializeBasicContent;
    window.renderSkills = renderSkills;
}