// Page-only enhancements; canonical CV content remains in cv-texts.js.
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    const lang = document.documentElement.lang === 'pt-BR' ? 'pt' : 'en';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const get = (path) => typeof getText === 'function' ? getText(path, lang) : null;
    const paused = () => reduced.matches || document.body.classList.contains('motion-paused');

    function contacts() {
        const email = get('contact.email'), phone = get('contact.phone');
        const emailLink = document.getElementById('cv-email'), phoneLink = document.getElementById('cv-phone');
        if (emailLink && typeof email === 'string') emailLink.href = 'mailto:' + email;
        if (phoneLink && typeof phone === 'string') phoneLink.href = 'https://wa.me/' + phone.replace(/\D/g, '');
        document.querySelectorAll('.hero-contact, .footer-contact').forEach((link) => {
            if (typeof email === 'string') link.href = 'mailto:' + email;
        });
    }

    function nativePrint() {
        const link = document.querySelector('.print-button');
        if (!link) return;
        link.addEventListener('click', function (event) {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            const popup = window.open(this.href, '_blank');
            if (!popup) return;
            event.preventDefault();
            popup.opener = null;
            popup.addEventListener('load', async () => {
                if (popup.document.fonts) await popup.document.fonts.ready;
                popup.print();
            }, { once: true });
        });
    }

    function hero() {
        const skills = get('skills'), capabilities = document.getElementById('hero-capabilities');
        if (capabilities && skills) {
            const selected = [skills.strategic && skills.strategic[0], skills.tools && skills.tools[2], skills.emerging && skills.emerging[0]].filter(Boolean);
            capabilities.replaceChildren(...selected.map((skill) => {
                const span = document.createElement('span');
                span.textContent = skill.name;
                return span;
            }));
        }
        const name = document.getElementById('cv-name'), fullName = get('name');
        if (!name || typeof fullName !== 'string') return;
        const words = fullName.trim().split(/\s+/);
        name.replaceChildren(...[words.slice(0, -1), words.slice(-1)].filter(Boolean).map((line, lineIndex) => {
            const lineEl = document.createElement('span');
            lineEl.className = 'name-line';
            line.forEach((word, index) => {
                const wordEl = document.createElement('span');
                wordEl.className = 'name-word';
                wordEl.textContent = word;
                lineEl.append(wordEl, index < line.length - 1 ? ' ' : '');
            });
            if (lineIndex === 0) lineEl.append(' ');
            return lineEl;
        }));
        name.setAttribute('aria-label', fullName);
    }

    const metricFrom = (value) => {
        const match = String(value || '').match(/[+−-]?\s*\d+(?:[.,]\d+)?\s*(?:%|p\.?\s*p\.?)/i);
        return match ? match[0].replace(/\s+/g, ' ').trim() : '';
    };

    function impact() {
        const grid = document.getElementById('impact-grid'), experience = get('experience');
        if (!grid || !Array.isArray(experience)) return;
        const wanted = [[0, 2], [1, 1], [1, 3], [2, 3]];
        const cards = wanted.map(([experienceIndex, achievementIndex]) => {
            const source = experience[experienceIndex];
            const achievement = source && source.achievements && source.achievements[achievementIndex];
            return { experienceIndex, source, achievement, metric: achievement && metricFrom(achievement.description) };
        }).filter((card) => card.source && card.achievement && card.metric);
        grid.replaceChildren(...cards.map((card) => {
            const link = document.createElement('a');
            link.className = 'impact-card';
            link.href = '#experience-' + card.experienceIndex;
            link.setAttribute('aria-label', card.achievement.title + ': ' + card.achievement.description);
            const value = document.createElement('span');
            value.className = 'impact-value';
            value.textContent = value.dataset.final = card.metric;
            value.setAttribute('aria-label', card.metric);
            [['impact-label', card.achievement.title], ['impact-source', card.source.company], ['impact-detail', card.achievement.description]].forEach(([className, content]) => {
                const part = document.createElement('span');
                part.className = className;
                part.textContent = content;
                link.append(part);
            });
            link.prepend(value);
            return link;
        }));
    }

    function ticker() {
        const track = document.getElementById('stack-track'), skills = get('skills');
        if (!track || !skills) return;
        const all = [...(skills.tools || []), ...(skills.emerging || [])];
        const group = (hidden) => {
            const element = document.createElement('span');
            element.className = 'stack-group';
            if (hidden) element.setAttribute('aria-hidden', 'true');
            element.append(...all.map((skill) => {
                const item = document.createElement('span');
                item.textContent = skill.name;
                return item;
            }));
            return element;
        };
        track.replaceChildren(group(false), group(true));
    }

    function decorate() {
        document.querySelectorAll('.experience-item').forEach((item, index) => { item.id = 'experience-' + index; });
        const icons = ['fa-chart-pie', 'fa-eye', 'fa-microchip'];
        document.querySelectorAll('.project-item').forEach((item, index) => {
            if (!item.querySelector('.project-icon')) {
                const icon = document.createElement('i');
                icon.className = 'project-icon fas ' + icons[index % icons.length];
                icon.setAttribute('aria-hidden', 'true');
                item.prepend(icon);
            }
            if (!item.querySelector('.project-index')) {
                const number = document.createElement('span');
                number.className = 'project-index';
                number.textContent = String(index + 1).padStart(2, '0');
                number.setAttribute('aria-hidden', 'true');
                item.prepend(number);
            }
        });
        document.querySelectorAll('.education-item').forEach((item, index) => { item.dataset.educationIndex = String(index + 1).padStart(2, '0'); });
    }

    function markMetrics(root) {
        if (!root || !document.createTreeWalker) return;
        const nodes = [], pattern = /([+−-]?\s*\d+(?:[.,]\d+)?\s*(?:%|p\.?\s*p\.?))/ig;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                pattern.lastIndex = 0;
                return node.parentElement && !node.parentElement.closest('strong, script, style') && pattern.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        });
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach((node) => {
            pattern.lastIndex = 0;
            const fragment = document.createDocumentFragment();
            let cursor = 0;
            node.nodeValue.replace(pattern, (match, value, offset) => {
                fragment.append(node.nodeValue.slice(cursor, offset));
                const strong = document.createElement('strong');
                strong.className = 'metric';
                strong.textContent = value;
                fragment.append(strong);
                cursor = offset + match.length;
                return match;
            });
            fragment.append(node.nodeValue.slice(cursor));
            node.replaceWith(fragment);
        });
    }

    function countUp() {
        const values = document.querySelectorAll('.impact-value[data-final]');
        if (paused()) return values.forEach((value) => { value.textContent = value.dataset.final; });
        values.forEach((value) => {
            const final = value.dataset.final, numeric = final.match(/\d+(?:[.,]\d+)?/);
            if (!numeric) return;
            const target = Number(numeric[0].replace(',', '.')), decimals = (numeric[0].split(/[.,]/)[1] || '').length, start = performance.now();
            value.textContent = final.replace(numeric[0], '0');
            const draw = (now) => {
                if (paused()) { value.textContent = final; return; }
                const progress = Math.min(1, (now - start) / 850);
                const current = target * (1 - Math.pow(1 - progress, 3));
                const display = decimals ? current.toFixed(decimals).replace('.', numeric[0].includes(',') ? ',' : '.') : String(Math.round(current));
                value.textContent = final.replace(numeric[0], display);
                if (progress < 1) requestAnimationFrame(draw);
                else value.textContent = final;
            };
            requestAnimationFrame(draw);
        });
    }

    function tooltips() {
        const items = [...document.querySelectorAll('.tooltip')], open = new Map();
        const close = (tooltip) => {
            const state = open.get(tooltip);
            if (!state) return;
            state.placeholder.replaceWith(state.details);
            state.details.classList.remove('is-open');
            state.details.removeAttribute('style');
            tooltip.classList.remove('is-open');
            state.button.setAttribute('aria-expanded', 'false');
            open.delete(tooltip);
        };
        const closeAll = () => items.forEach(close);
        items.forEach((tooltip, index) => {
            const icon = tooltip.querySelector('.tooltip-icon'), details = tooltip.querySelector('.tooltip-text');
            if (!icon || !details) return;
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'tooltip-trigger';
            button.setAttribute('aria-label', (details.querySelector('.tooltip-header') || details).textContent.trim());
            button.setAttribute('aria-expanded', 'false');
            details.id = details.id || 'experience-details-' + index;
            button.setAttribute('aria-controls', details.id);
            icon.setAttribute('aria-hidden', 'true');
            icon.replaceWith(button);
            button.append(icon);
            button.addEventListener('click', () => {
                const wasOpen = open.has(tooltip);
                closeAll();
                if (wasOpen) return;
                const placeholder = document.createComment('tooltip portal');
                details.replaceWith(placeholder);
                document.body.append(details);
                details.classList.add('is-open');
                details.style.display = 'block';
                tooltip.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
                const rect = button.getBoundingClientRect(), width = details.offsetWidth, height = details.offsetHeight;
                details.style.left = Math.max(16, Math.min(rect.left, innerWidth - width - 16)) + 'px';
                details.style.top = Math.max(16, Math.min(rect.bottom + 8, innerHeight - height - 16)) + 'px';
                open.set(tooltip, { button, details, placeholder });
            });
        });
        document.addEventListener('click', (event) => {
            const inPortal = [...open.values()].some((state) => state.details.contains(event.target));
            if (!event.target.closest('.tooltip') && !inPortal) closeAll();
        });
        document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeAll(); });
        addEventListener('resize', closeAll, { passive: true });
        addEventListener('scroll', closeAll, { passive: true });
    }

    function reveals() {
        if (!('IntersectionObserver' in window) || reduced.matches) return () => {};
        const elements = document.querySelectorAll('.section, .experience-item, .education-item, .project-item, .skills-grid > div');
        if (!elements.length) return () => {};
        document.body.classList.add('motion-ready');
        elements.forEach((element) => element.classList.add('reveal'));
        const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
            if (entry.isIntersecting || paused()) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        }), { threshold: .1, rootMargin: '0px 0px -5%' });
        elements.forEach((element) => observer.observe(element));
        return () => { elements.forEach((element) => element.classList.add('is-visible')); observer.disconnect(); };
    }

    function navigation() {
        const progress = document.getElementById('reading-progress'), top = document.querySelector('.scroll-top');
        const links = [...document.querySelectorAll('.section-nav a[href^="#"]')];
        const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
        const update = () => {
            const max = document.documentElement.scrollHeight - innerHeight;
            if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')';
            if (top) top.classList.toggle('is-visible', scrollY > innerHeight * .55);
            let active = sections[0];
            sections.forEach((section) => { if (section.getBoundingClientRect().top <= 140) active = section; });
            links.forEach((link) => {
                if (active && link.getAttribute('href') === '#' + active.id) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        };
        addEventListener('scroll', update, { passive: true });
        addEventListener('resize', update, { passive: true });
        if (top) top.addEventListener('click', () => scrollTo({ top: 0, behavior: paused() ? 'auto' : 'smooth' }));
        update();
    }

    function network() {
        const canvas = document.getElementById('nelogica-network');
        if (!canvas || !canvas.getContext || !('ResizeObserver' in window) || !('IntersectionObserver' in window)) return () => {};
        const ctx = canvas.getContext('2d');
        let frame = 0, visible = true, size = {}, points = [];
        const rebuild = () => {
            const box = canvas.getBoundingClientRect(), ratio = Math.min(devicePixelRatio || 1, 2);
            size = { width: box.width, height: box.height };
            canvas.width = Math.max(1, Math.round(box.width * ratio)); canvas.height = Math.max(1, Math.round(box.height * ratio));
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
            points = Array.from({ length: Math.max(10, Math.min(34, Math.round(box.width * box.height / 15000))) }, () => ({ x: Math.random() * box.width, y: Math.random() * box.height, vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2 }));
        };
        const draw = () => {
            frame = 0;
            if (!visible || document.hidden || paused()) return;
            ctx.clearRect(0, 0, size.width, size.height);
            points.forEach((point, index) => {
                point.x += point.vx; point.y += point.vy;
                if (point.x < 0 || point.x > size.width) point.vx *= -1;
                if (point.y < 0 || point.y > size.height) point.vy *= -1;
                points.slice(index + 1).forEach((other) => {
                    const distance = Math.hypot(point.x - other.x, point.y - other.y);
                    if (distance < 125) { ctx.strokeStyle = 'rgba(84, 124, 162, ' + ((1 - distance / 125) * .32) + ')'; ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(other.x, other.y); ctx.stroke(); }
                });
                ctx.fillStyle = 'rgba(84, 124, 162, .72)'; ctx.beginPath(); ctx.arc(point.x, point.y, 1.6, 0, Math.PI * 2); ctx.fill();
            });
            frame = requestAnimationFrame(draw);
        };
        const start = () => { if (!frame && visible && !document.hidden && !paused()) frame = requestAnimationFrame(draw); };
        rebuild(); start();
        const resize = new ResizeObserver(() => { rebuild(); start(); });
        const observer = new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; if (visible) start(); }, { threshold: 0 });
        resize.observe(canvas); observer.observe(canvas); document.addEventListener('visibilitychange', start);
        return start;
    }

    function motion(finishReveals, startNetwork) {
        const button = document.querySelector('.motion-toggle');
        const labels = lang === 'pt' ? ['Pausar animações', 'Retomar animações'] : ['Pause animations', 'Resume animations'];
        const update = () => {
            if (button) { button.setAttribute('aria-pressed', String(paused())); button.textContent = paused() ? labels[1] : labels[0]; }
            if (paused()) { finishReveals(); countUp(); } else startNetwork();
        };
        if (button) button.addEventListener('click', () => { document.body.classList.toggle('motion-paused'); update(); });
        reduced.addEventListener('change', update);
        update();
    }

    contacts(); nativePrint(); hero(); impact(); ticker(); decorate();
    document.querySelectorAll('.achievement-description, #cv-profile').forEach(markMetrics);
    tooltips();
    const finishReveals = reveals();
    navigation();
    const startNetwork = network();
    motion(finishReveals, startNetwork);
    const impactGrid = document.getElementById('impact-grid');
    if (impactGrid && 'IntersectionObserver' in window && !paused()) {
        const impactObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                countUp();
                impactObserver.disconnect();
            }
        }, { threshold: .15 });
        impactObserver.observe(impactGrid);
    } else countUp();
});
