// ULTRA PREMIUM CYBER/CRYPTO ANIMATIONS

// Matrix Rain Effect
function createMatrixRain() {
    const container = document.createElement('div');
    container.className = 'matrix-rain';
    document.body.appendChild(container);

    const chars = '01₿ΞŁABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = `${i * 20}px`;
        char.style.animationDuration = `${Math.random() * 3 + 2}s`;
        char.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(char);

        setInterval(() => {
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
        }, Math.random() * 1000 + 500);
    }
}

// Crypto Particles
function createCryptoParticles() {
    const hero = document.querySelector('.hero-modern, .hero');
    if (!hero) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'crypto-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 6 + 4}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        hero.appendChild(particle);
    }
}

// Circuit Board Nodes
function createCircuitNodes() {
    const sections = document.querySelectorAll('.flow-section, .marketplace-modern');

    sections.forEach(section => {
        const circuitBg = document.createElement('div');
        circuitBg.className = 'circuit-bg';
        section.style.position = 'relative';
        section.insertBefore(circuitBg, section.firstChild);

        for (let i = 0; i < 10; i++) {
            const node = document.createElement('div');
            node.className = 'circuit-node';
            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            node.style.animationDelay = `${Math.random() * 2}s`;
            circuitBg.appendChild(node);
        }
    });
}

// Animated Counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toFixed(2);
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(2);
        }
    }, 16);
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate counters when visible
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                    counter.removeAttribute('data-count');
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.flow-step, .pricing-card, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-modern, .navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Bitcoin Floating Animation Enhanced
function createFloatingBitcoins() {
    const hero = document.querySelector('.hero-modern, .hero');
    if (!hero) return;

    const bitcoinContainer = document.createElement('div');
    bitcoinContainer.className = 'bitcoin-animation';
    hero.appendChild(bitcoinContainer);

    for (let i = 0; i < 5; i++) {
        const bitcoin = document.createElement('div');
        bitcoin.className = 'bitcoin-coin';
        bitcoin.textContent = '₿';
        bitcoin.style.position = 'absolute';
        bitcoin.style.left = `${Math.random() * 100}%`;
        bitcoin.style.top = `${Math.random() * 100}%`;
        bitcoin.style.fontSize = `${Math.random() * 40 + 30}px`;
        bitcoin.style.opacity = '0.1';
        bitcoin.style.animationDelay = `${Math.random() * 3}s`;
        bitcoin.style.animationDuration = `${Math.random() * 2 + 2}s`;
        bitcoinContainer.appendChild(bitcoin);
    }
}

// Holographic Card Effect
function initHoloCards() {
    document.querySelectorAll('.pricing-card, .flow-step').forEach(card => {
        card.classList.add('holo-card', 'hover-lift');
    });
}

// Hash Stream Visualization
function createHashStream() {
    const miningViz = document.querySelectorAll('.mining-viz');

    miningViz.forEach(viz => {
        for (let i = 0; i < 5; i++) {
            const stream = document.createElement('div');
            stream.className = 'hash-stream';
            stream.style.top = `${i * 40}px`;
            stream.style.animationDelay = `${i * 0.5}s`;

            const hash = generateRandomHash();
            stream.textContent = hash;

            viz.appendChild(stream);

            setInterval(() => {
                stream.textContent = generateRandomHash();
            }, 3000);
        }
    });
}

function generateRandomHash() {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
}

// Lightning Effects
function createLightning() {
    const hero = document.querySelector('.hero-modern, .hero');
    if (!hero) return;

    for (let i = 0; i < 3; i++) {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        lightning.style.left = `${Math.random() * 100}%`;
        lightning.style.animationDelay = `${Math.random() * 5}s`;
        hero.appendChild(lightning);
    }
}

// Blockchain Grid
function createBlockchainGrid() {
    const sections = document.querySelectorAll('.hero-modern, .marketplace-modern');

    sections.forEach(section => {
        const grid = document.createElement('div');
        grid.className = 'blockchain-grid';
        section.style.position = 'relative';
        section.insertBefore(grid, section.firstChild);
    });
}

// Scan Lines
function createScanLines() {
    document.querySelectorAll('.pricing-card, .hero-modern').forEach(el => {
        const scanLines = document.createElement('div');
        scanLines.className = 'scan-lines';
        el.style.position = 'relative';
        el.appendChild(scanLines);
    });
}

// Status Indicators
function addStatusIndicators() {
    const stats = document.querySelectorAll('.stat-animated, .balance-stat');

    stats.forEach(stat => {
        const dot = document.createElement('div');
        dot.className = 'status-dot';
        dot.style.position = 'absolute';
        dot.style.top = '10px';
        dot.style.right = '10px';
        stat.style.position = 'relative';
        stat.appendChild(dot);
    });
}

// FAQ Interactions
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mouse Glow Effect
function createMouseGlow() {
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.width = '300px';
    glow.style.height = '300px';
    glow.style.borderRadius = '50%';
    glow.style.background = 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '9999';
    glow.style.transform = 'translate(-50%, -50%)';
    glow.style.transition = 'opacity 0.3s';
    glow.style.opacity = '0';
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
}

// Loading Screen
function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loading-screen';
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.width = '100%';
    loader.style.height = '100%';
    loader.style.background = 'var(--bg-primary)';
    loader.style.display = 'flex';
    loader.style.alignItems = 'center';
    loader.style.justifyContent = 'center';
    loader.style.zIndex = '10000';
    loader.style.transition = 'opacity 0.5s';

    loader.innerHTML = `
        <div style="text-align: center;">
            <div class="cyber-spinner"></div>
            <p style="margin-top: 20px; color: var(--accent-gold); font-weight: 600;">Loading VoltMine...</p>
        </div>
    `;

    document.body.prepend(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    createLoadingScreen();
    createMatrixRain();
    createCryptoParticles();
    createCircuitNodes();
    createFloatingBitcoins();
    createLightning();
    createBlockchainGrid();
    createScanLines();
    initHoloCards();
    initScrollAnimations();
    initNavbarScroll();
    initFAQ();
    initSmoothScroll();
    addStatusIndicators();
    // createHashStream(); // DISABLED - using custom mining-animation.js instead
    createMouseGlow();

    console.log('🚀 VoltMine Cyber Effects Initialized');
});

// Particle System on Click
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'var(--accent-gold)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';

            const angle = (Math.PI * 2 * i) / 10;
            const velocity = 2;

            document.body.appendChild(particle);

            let frame = 0;
            const animate = () => {
                frame++;
                const x = Math.cos(angle) * velocity * frame;
                const y = Math.sin(angle) * velocity * frame - (frame * 0.5);

                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = 1 - (frame / 60);

                if (frame < 60) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };

            animate();
        }
    }
});
